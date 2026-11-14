import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import './rich-content.css';
export function sanitizeRichContent(html: string) {
  const clean = DOMPurify.sanitize(html || '', {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allowfullscreen',
      'frameborder',
      'data-list',
      'data-row',
      'target',
      'rel',
      'loading',
      'title',
    ],
  });
  const doc = new DOMParser().parseFromString(clean, 'text/html');
  doc.querySelectorAll('iframe').forEach(frame => {
    try {
      const url = new URL(frame.src);
      if (
        url.protocol !== 'https:' ||
        !['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'].includes(url.hostname)
      )
        throw new Error();
      frame.setAttribute('loading', 'lazy');
      frame.setAttribute('title', frame.title || 'Embedded video');
    } catch {
      frame.remove();
    }
  });
  doc.querySelectorAll('img').forEach(img => {
    if (
      /^data:/i.test(img.getAttribute('src') || '') &&
      !/^data:image\/(png|jpeg|webp|gif);/i.test(img.getAttribute('src') || '')
    )
      img.remove();
    img.loading = 'lazy';
  });
  doc
    .querySelectorAll('a[target="_blank"]')
    .forEach(link => link.setAttribute('rel', 'noopener noreferrer'));
  return doc.body.innerHTML;
}
export default function RichContent({
  html,
  className = '',
}: {
  html: string;
  className?: string;
}) {
  const safe = useMemo(() => sanitizeRichContent(html), [html]);
  return <div className={`rich-content ${className}`} dangerouslySetInnerHTML={{ __html: safe }} />;
}
