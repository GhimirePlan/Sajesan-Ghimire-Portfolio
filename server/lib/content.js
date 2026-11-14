import sanitizeHtml from 'sanitize-html';
export function problem(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}
const string = (value, name, max, required = false) => {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim()))
    throw problem(`${name} ${required ? 'is required and ' : ''}must be under ${max} characters.`);
  return value.trim();
};
export function safeUrl(value, name = 'URL') {
  const url = string(value ?? '', name, 2048);
  if (!url) return '';
  if (/^\/api\/media\/[a-f0-9]{24}$/i.test(url)) return url;
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error();
    return parsed.href;
  } catch {
    throw problem(`${name} must be a valid HTTP or HTTPS link.`);
  }
}
export function cleanHtml(html) {
  return sanitizeHtml(string(html ?? '', 'Body', 500000), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'iframe', 's', 'u', 'sub', 'sup'],
    allowedAttributes: {
      '*': ['class', 'style'],
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
      iframe: ['src', 'title', 'width', 'height', 'allowfullscreen', 'frameborder'],
      li: ['data-list'],
      td: ['data-row', 'colspan', 'rowspan'],
      th: ['colspan', 'rowspan'],
    },
    allowedClasses: { '*': [/^ql-/] },
    allowedStyles: {
      '*': {
        color: [/^#[0-9a-f]{3,8}$/i, /^rgb\([\d\s,]+\)$/],
        'background-color': [/^#[0-9a-f]{3,8}$/i, /^rgb\([\d\s,]+\)$/],
        'text-align': [/^(left|right|center|justify)$/],
        'font-size': [/^\d+(px|em|rem)$/],
      },
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
      img: sanitizeHtml.simpleTransform('img', { loading: 'lazy' }),
    },
  });
}
const list = (values, name, max = 20, length = 120) => {
  if (!Array.isArray(values) || values.length > max)
    throw problem(`${name} must contain at most ${max} items.`);
  return [...new Set(values.map(value => string(value, name, length)).filter(Boolean))];
};
export function contentPayload(input, kind) {
  const published = input.isPublished === true;
  const data = {
    title: string(input.title ?? '', 'Title', 220, true),
    description: string(input.description ?? '', 'Summary', 1600, published),
    content: cleanHtml(input.content),
    coverImage: safeUrl(input.coverImage, 'Thumbnail'),
    coverAlt: string(input.coverAlt ?? '', 'Thumbnail description', 250),
    pdfUrl: safeUrl(input.pdfUrl, 'Document URL'),
    tags: list(input.tags ?? [], 'Tags'),
    isPublished: published,
    isArchived: input.isArchived === true,
  };
  if (data.isArchived) data.isPublished = false;
  if (kind === 'blog') {
    data.slug = string(input.slug ?? '', 'Slug', 180, true);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug))
      throw problem('Use lowercase letters, numbers, and hyphens for the slug.');
    if (
      published &&
      (!data.coverImage ||
        (!data.content.replace(/<[^>]+>/g, '').trim() && !data.content.includes('<img')))
    )
      throw problem('Published articles need a thumbnail and body content.');
  } else {
    data.id = string(input.id ?? '', 'Project link', 180, true);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id))
      throw problem('Use lowercase letters, numbers, and hyphens for the project link.');
    if (!['professional', 'academic'].includes(input.scope))
      throw problem('Choose a project type.');
    if (!['solar', 'power', 'buildings', 'automation'].includes(input.discipline))
      throw problem('Choose an engineering discipline.');
    Object.assign(data, {
      scope: input.scope,
      discipline: input.discipline,
      subtitle: string(input.subtitle ?? '', 'Subtitle', 280),
      group: string(input.group ?? '', 'Project group', 180),
      details: list(input.details ?? [], 'Highlights', 20, 500),
      sourceUrl: safeUrl(input.sourceUrl, 'Source URL'),
      isFeatured: input.isFeatured === true,
      sortOrder: Number.isFinite(Number(input.sortOrder))
        ? Math.max(0, Math.min(10000, Number(input.sortOrder)))
        : 0,
    });
  }
  return data;
}
export function sendContentError(res, error) {
  const status =
    error.code === 11000 ? 409 : error.status || (error.name === 'ValidationError' ? 400 : 500);
  res
    .status(status)
    .json({
      message:
        error.code === 11000
          ? 'This link is already in use. Choose a different slug.'
          : status < 500
            ? error.message
            : 'The content could not be saved. Please try again.',
    });
}
