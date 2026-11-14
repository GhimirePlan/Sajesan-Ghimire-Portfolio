import test from 'node:test';
import assert from 'node:assert/strict';
import { renderBlogHtml, sitemapXml } from '../routes/seoRoutes.js';
const shell = '<!doctype html><html><head><title>Old title</title><meta name="description" content="old"><meta property="og:title" content="old"><link rel="canonical" href="https://old.example"><script id="page-structured-data" type="application/ld+json">{}</script><script type="module" src="/assets/app.js"></script></head><body><div id="root"></div></body></html>';
test('article HTML exposes readable content, unique metadata and safe structured data', () => {
  const html = renderBlogHtml(shell, {
    _id: 'test', slug: 'solar-design', title: 'Solar & "Power" </script><script>alert(1)</script>',
    description: 'Design & research', content: '<h2>Solar design</h2><p>Readable article</p><script>alert(2)</script><img src="javascript:alert(3)">',
    coverImage: '/api/media/123456789012345678901234', createdAt: '2026-01-01', updatedAt: '2026-02-01',
  });
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.equal((html.match(/property="og:title"/g) || []).length, 1);
  assert.match(html, /<h2>Solar design<\/h2>/);
  assert.match(html, /\/assets\/app.js/);
  assert.doesNotMatch(html, /<script>alert|javascript:/);
  const schema = JSON.parse(html.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@type'], 'BlogPosting');
  assert.equal(schema.mainEntityOfPage, 'https://sajesanghimire.com.np/blogs/solar-design');
  assert.equal(schema.dateModified, '2026-02-01');
});
test('sitemap uses valid XML escaping and real modification dates', () => {
  const xml = sitemapXml([{ path: '/' }, { path: '/projects?project=solar&scope=all', updatedAt: '2026-02-01' }]);
  assert.match(xml, /project=solar&amp;scope=all/);
  assert.match(xml, /2026-02-01T00:00:00.000Z/);
  assert.doesNotMatch(xml, /undefined|Invalid Date/);
});
