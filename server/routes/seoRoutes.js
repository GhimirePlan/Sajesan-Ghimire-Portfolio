import express from 'express';
import sanitizeHtml from 'sanitize-html';
import connectDB from '../config/db.js';
import Blog from '../models/blogModel.js';
import Project from '../models/projectModel.js';
const router = express.Router();
export const SITE = 'https://sajesanghimire.com.np';
export const escapeMarkup = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const jsonScript = data => JSON.stringify(data).replace(/</g, '\\u003c');
const person = { '@type': 'Person', name: 'Sajesan Ghimire', url: `${SITE}/`, jobTitle: 'Electrical Engineer & Researcher', sameAs: ['https://www.linkedin.com/in/sajesan/'] };
let shell;
let shellUntil = 0;
let shellPending;
async function getShell() {
  if (shell && Date.now() < shellUntil) return shell;
  if (!shellPending) shellPending = (async () => {
    // index.html is a static asset; this never fetches a routed blog page.
    const response = await fetch(`${SITE}/index.html`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error('Page shell unavailable');
    const html = await response.text();
    if (!html.includes('id="root"') || !html.includes('/assets/')) throw new Error('Invalid page shell');
    shell = html; shellUntil = Date.now() + 300_000;
    return html;
  })().finally(() => { shellPending = undefined; });
  return shellPending;
}
export function renderBlogHtml(template, blog) {
  const url = `${SITE}/blogs/${encodeURIComponent(blog.slug || blog._id)}`;
  const title = `${blog.title} | Sajesan Ghimire`;
  const image = blog.coverImage ? new URL(blog.coverImage, SITE).href : `${SITE}/apple-touch-icon.png`;
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: blog.title, description: blog.description, image, datePublished: blog.createdAt, dateModified: blog.updatedAt || blog.createdAt, author: person, mainEntityOfPage: url };
  const head = `<title>${escapeMarkup(title)}</title>
<link rel="canonical" href="${escapeMarkup(url)}">
<meta name="description" content="${escapeMarkup(blog.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Sajesan Ghimire">
<meta property="og:title" content="${escapeMarkup(title)}">
<meta property="og:description" content="${escapeMarkup(blog.description)}">
<meta property="og:url" content="${escapeMarkup(url)}">
<meta property="og:image" content="${escapeMarkup(image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeMarkup(title)}">
<meta name="twitter:description" content="${escapeMarkup(blog.description)}">
<meta name="twitter:image" content="${escapeMarkup(image)}">
<script id="page-structured-data" type="application/ld+json">${jsonScript(schema)}</script>`;
  const body = sanitizeHtml(blog.content || '', {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: { a: ['href'], img: ['src', 'alt', 'width', 'height'] },
    allowedSchemes: ['https', 'http', 'mailto'], allowProtocolRelative: false,
  });
  return template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*(?:name=["'](?:description|robots|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*id=["']page-structured-data["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root"><main style="max-width:900px;margin:100px auto;padding:24px;color:#bcb5cf"><a href="/">Sajesan Ghimire</a><article><h1>${escapeMarkup(blog.title)}</h1><p>${escapeMarkup(blog.description)}</p>${body}</article></main></div>`);
}
const pages = new Map();
const pendingPages = new Map();
router.get('/blogs/:slug', async (req, res, next) => {
  try {
    const key = req.params.slug;
    let cached = pages.get(key);
    if (!cached || cached.until < Date.now()) {
      if (!pendingPages.has(key)) pendingPages.set(key, (async () => {
        await connectDB();
        const lookup = /^[a-f0-9]{24}$/i.test(key) ? { _id: key } : { slug: key };
        const blog = await Blog.findOne({ ...lookup, isPublished: true, isArchived: { $ne: true } }).lean();
        if (!blog) return null;
        const page = { html: renderBlogHtml(await getShell(), blog), until: Date.now() + 120_000 };
        if (pages.size >= 100) pages.delete(pages.keys().next().value);
        pages.set(key, page);
        return page;
      })().finally(() => pendingPages.delete(key)));
      cached = await pendingPages.get(key);
    }
    if (!cached) return res.status(404).set('X-Robots-Tag', 'noindex').type('html').send('<!doctype html><html lang="en"><head><title>Article not found | Sajesan Ghimire</title></head><body><main><h1>Article not found</h1><a href="/">Return to portfolio</a></main></body></html>');
    res.set('Cache-Control', 'public, max-age=60, s-maxage=120, stale-while-revalidate=300').type('html').send(cached.html);
  } catch (error) {
    console.error('Article HTML unavailable:', error.message);
    res.set({ 'Retry-After': '60', 'X-Robots-Tag': 'noindex' }).status(503).type('html').send('<!doctype html><html lang="en"><head><title>Temporarily unavailable</title></head><body><p>Please try again shortly.</p><a href="/">Return to portfolio</a></body></html>');
  }
});
let sitemap;
let sitemapUntil = 0;
let sitemapPending;
export function sitemapXml(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(entry => `<url><loc>${escapeMarkup(SITE + entry.path)}</loc>${entry.updatedAt ? `<lastmod>${new Date(entry.updatedAt).toISOString()}</lastmod>` : ''}</url>`).join('')}</urlset>`;
}
router.get('/sitemap.xml', async (req, res, next) => {
  try {
    if (!sitemap || sitemapUntil < Date.now()) {
      if (!sitemapPending) sitemapPending = (async () => {
        await connectDB();
        const [blogs, projects] = await Promise.all([
          Blog.find({ isPublished: true, isArchived: { $ne: true } }).select('slug updatedAt').limit(5000).lean(),
          Project.find({ isPublished: true, isArchived: { $ne: true } }).select('id updatedAt').limit(5000).lean(),
        ]);
        sitemap = sitemapXml([{ path: '/' }, { path: '/projects' },
          ...blogs.map(blog => ({ path: `/blogs/${encodeURIComponent(blog.slug || blog._id)}`, updatedAt: blog.updatedAt })),
          ...projects.map(project => ({ path: `/projects?project=${encodeURIComponent(project.id)}`, updatedAt: project.updatedAt })),
        ]);
        sitemapUntil = Date.now() + 300_000;
      })().finally(() => { sitemapPending = undefined; });
      await sitemapPending;
    }
    res.set('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=600').type('application/xml').send(sitemap);
  } catch (error) { next(error); }
});
export default router;
