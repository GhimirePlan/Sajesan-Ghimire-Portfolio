import test from 'node:test';
import assert from 'node:assert/strict';
import { contentPayload, cleanHtml, safeUrl } from '../lib/content.js';
import { imageType } from '../routes/mediaRoutes.js';
test('drafts may be saved incrementally while publication requires complete article fields', () => {
  const draft = contentPayload({ title: 'A draft', slug: 'a-draft' }, 'blog');
  assert.equal(draft.isPublished, false);
  assert.throws(
    () => contentPayload({ ...draft, isPublished: true }, 'blog'),
    /Summary|thumbnail|body/
  );
});
test('rich content retains tables and formatting while removing active content', () => {
  const html = cleanHtml(
    '<h2 class="ql-align-center">Design</h2><table><tr><td data-row="1">Cell</td></tr></table><img src="/api/media/507f1f77bcf86cd799439011" onerror="alert(1)"><script>alert(1)</script><iframe src="https://evil.example/embed"></iframe>'
  );
  assert.match(html, /<table>/);
  assert.match(html, /ql-align-center/);
  assert.match(html, /data-row="1"/);
  assert.doesNotMatch(html, /onerror|<script|src="https:\/\/evil/);
});
test('link validation rejects executable and unsupported image paths', () => {
  assert.throws(() => safeUrl('javascript:alert(1)'));
  assert.throws(() => safeUrl('data:image/svg+xml,bad'));
  assert.equal(
    safeUrl('/api/media/507f1f77bcf86cd799439011'),
    '/api/media/507f1f77bcf86cd799439011'
  );
});
test('project metadata validates its type, discipline, and stable identifier', () => {
  assert.throws(() =>
    contentPayload(
      { title: 'Bad', id: 'unsafe/id', scope: 'professional', discipline: 'solar' },
      'project'
    )
  );
  const project = contentPayload(
    {
      title: 'PV design',
      id: 'pv-design',
      scope: 'professional',
      discipline: 'solar',
      description: 'Design study',
      isPublished: true,
    },
    'project'
  );
  assert.equal(project.id, 'pv-design');
  assert.equal(project.isPublished, true);
});
test('archiving always removes content from publication', () => {
  const project = contentPayload(
    {
      title: 'PV design',
      id: 'pv-design',
      scope: 'professional',
      discipline: 'solar',
      description: 'Design study',
      isPublished: true,
      isArchived: true,
    },
    'project'
  );
  assert.equal(project.isPublished, false);
});
test('image uploads require a supported binary signature', () => {
  assert.equal(imageType(Buffer.from('<svg onload="alert(1)">')), null);
  assert.equal(imageType(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0])), 'image/png');
  assert.equal(imageType(Buffer.from('RIFF0000WEBP')), 'image/webp');
});
