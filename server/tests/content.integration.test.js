import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const uri = process.env.TEST_MONGO_URI;
test(
  'content and media lifecycle against an isolated MongoDB database',
  { skip: !uri },
  async t => {
    const mongoose = (await import('mongoose')).default;
    const dbName = `portfolio_test_${crypto.randomBytes(6).toString('hex')}`;
    process.env.MONGO_URI = uri;
    process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
    await mongoose.connect(uri, { dbName });
    const User = (await import('../models/userModel.js')).default;
    const app = (await import('../index.js')).default;
    await User.create({
      name: 'Integration Administrator',
      email: 'content-test@example.invalid',
      password: 'temporary-integration-password',
      isAdmin: true,
    });
    const server = app.listen(0);
    const base = `http://127.0.0.1:${server.address().port}`;
    let token;
    let image;
    let article;
    let project;
    async function request(path, method = 'GET', body, auth = true) {
      const headers = {};
      if (auth && token) headers.Authorization = `Bearer ${token}`;
      if (body) headers['Content-Type'] = 'application/json';
      const response = await fetch(base + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      return { status: response.status, data: await response.json() };
    }
    try {
      const login = await request(
        '/api/users/login',
        'POST',
        { email: 'content-test@example.invalid', password: 'temporary-integration-password' },
        false
      );
      assert.equal(login.status, 200);
      token = login.data.token;
      await t.test('admin endpoints reject unauthenticated access', async () => {
        for (const path of ['/api/projects/manage', '/api/blogs/manage', '/api/media/manage'])
          assert.equal((await request(path, 'GET', undefined, false)).status, 401);
      });
      await t.test('experience stays private for writes and caches filtered public reads', async () => {
        assert.equal((await request('/api/experience/manage', 'GET', undefined, false)).status, 401);
        const entry = { title: 'Electrical Engineer', companyName: 'Test Company', date: '2025 – Present', icon: '', iconBg: '#383e56', points: ['Solar design'], isPublished: true };
        assert.equal((await request('/api/experience', 'PUT', { entries: [entry] }, false)).status, 401);
        assert.equal((await request('/api/experience', 'PUT', { entries: [{ ...entry, icon: 'javascript:alert(1)' }] })).status, 400);
        assert.equal((await request('/api/experience', 'PUT', { entries: [entry, { ...entry, isPublished: false }] })).status, 200);
        const Catalog = mongoose.model('ExperienceCatalog');
        const original = Catalog.findOne;
        let reads = 0;
        Catalog.findOne = function (...args) { reads++; return original.apply(this, args); };
        try {
          const responses = await Promise.all(Array.from({ length: 5 }, () => fetch(base + '/api/experience')));
          for (const response of responses) {
            assert.equal(response.status, 200);
            assert.match(response.headers.get('cache-control'), /s-maxage=60/);
            assert.equal((await response.json()).entries.length, 1);
          }
          assert.equal(reads, 1, 'concurrent public requests share a single database read');
          await fetch(base + '/api/experience');
          assert.equal(reads, 1, 'warm cache avoids database queries');
        } finally { Catalog.findOne = original; }
        assert.equal((await request('/api/experience/manage')).data.entries.length, 2);
        await request('/api/experience', 'PUT', { entries: [] });
        assert.deepEqual((await request('/api/experience', 'GET', undefined, false)).data.entries, []);
      });
      await t.test('image binary persists and is served with immutable cache headers', async () => {
        const buffer = Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aV1sAAAAASUVORK5CYII=',
          'base64'
        );
        const uploaded = await fetch(base + '/api/media', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'image/png',
            'X-Filename': 'test.png',
          },
          body: buffer,
        });
        assert.equal(uploaded.status, 201);
        image = await uploaded.json();
        const read = await fetch(base + image.url);
        assert.equal(read.status, 200);
        assert.match(read.headers.get('cache-control'), /immutable/);
        assert.deepEqual(Buffer.from(await read.arrayBuffer()), buffer);
        const metadata = (await request('/api/media/manage')).data;
        assert.equal(metadata.length, 1);
        assert.ok(!('data' in metadata[0]));
        await request('/api/experience', 'PUT', { entries: [{ title: 'Engineer', companyName: 'Test', date: '2025', icon: image.url, iconBg: '#383e56', points: [], isPublished: true }] });
        assert.equal((await request('/api/media/' + image._id, 'DELETE')).status, 409, 'experience logos cannot be deleted while in use');
        await request('/api/experience', 'PUT', { entries: [] });
        const denied = await fetch(base + '/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'image/png' },
          body: buffer,
        });
        assert.equal(denied.status, 401);
      });
      await t.test(
        'article drafts, publishing, formatting, and archives obey visibility',
        async () => {
          let result = await request('/api/blogs', 'POST', {
            title: 'Integration draft',
            slug: 'integration-draft',
          });
          assert.equal(result.status, 201);
          article = result.data;
          assert.equal(
            (await request('/api/blogs/integration-draft', 'GET', undefined, false)).status,
            404
          );
          assert.equal(
            (await request(`/api/blogs/${article._id}`, 'PUT', { isPublished: true })).status,
            400
          );
          result = await request(`/api/blogs/${article._id}`, 'PUT', {
            description: 'Article summary',
            coverImage: image.url,
            coverAlt: 'A test image',
            content:
              '<h2>Engineering</h2><p>Body content.</p><table><tr><td>Cell</td></tr></table><script>bad()</script>',
            tags: ['Solar'],
            isPublished: true,
          });
          assert.equal(result.status, 200);
          const read = await request('/api/blogs/integration-draft', 'GET', undefined, false);
          assert.equal(read.status, 200);
          assert.match(read.data.content, /<table>/);
          assert.doesNotMatch(read.data.content, /<script/);
          const listed = (await request('/api/blogs', 'GET', undefined, false)).data;
          assert.ok(!('content' in listed[0]));
          await request(`/api/blogs/${article._id}`, 'DELETE');
          assert.equal(
            (await request('/api/blogs/integration-draft', 'GET', undefined, false)).status,
            404
          );
          await request(`/api/blogs/${article._id}`, 'PUT', { isArchived: false });
          assert.equal((await request(`/api/blogs/manage/${article._id}`)).data.isPublished, false);
        }
      );
      await t.test(
        'original project import preserves identifiers and never overwrites edits',
        async () => {
          assert.equal((await request('/api/projects/import', 'POST', {})).status, 200);
          const imported = (await request('/api/projects/manage')).data;
          assert.equal(imported.length, 21);
          const first = imported[0];
          await request(`/api/projects/${first.id}`, 'PUT', { title: 'Edited original project' });
          await request('/api/projects/import', 'POST', {});
          assert.equal(
            (await request(`/api/projects/manage/${first.id}`)).data.title,
            'Edited original project'
          );
        }
      );
      await t.test('managed project lifecycle preserves rich body and stable links', async () => {
        let result = await request('/api/projects', 'POST', {
          title: 'Integration project',
          id: 'integration-project',
          scope: 'professional',
          discipline: 'solar',
        });
        assert.equal(result.status, 201);
        project = result.data;
        assert.equal(
          (await request('/api/projects/integration-project', 'GET', undefined, false)).status,
          404
        );
        result = await request(`/api/projects/${project.id}`, 'PUT', {
          title: 'Renamed project',
          id: 'attempted-link-change',
          description: 'Project summary',
          content: '<h2>Project scope</h2><p>Detailed case study.</p>',
          coverImage: image.url,
          isPublished: true,
          isFeatured: true,
        });
        assert.equal(result.status, 200);
        assert.equal(result.data.id, 'integration-project');
        const read = await request('/api/projects/integration-project', 'GET', undefined, false);
        assert.match(read.data.content, /Detailed case study/);
        assert.equal(read.data.isFeatured, true);
        assert.ok(
          !(await request('/api/projects', 'GET', undefined, false)).data.some(item => item.content)
        );
        await request(`/api/projects/${project.id}`, 'DELETE');
        assert.equal(
          (await request('/api/projects/integration-project', 'GET', undefined, false)).status,
          404
        );
        await request(`/api/projects/${project.id}`, 'PUT', { isArchived: false });
        assert.equal((await request(`/api/projects/manage/${project.id}`)).data.isPublished, false);
      });
      await t.test(
        'used media is protected and permanent deletion requires archiving',
        async () => {
          assert.equal((await request('/api/media/' + image._id, 'DELETE')).status, 409);
          assert.equal(
            (await request('/api/blogs/' + article._id + '?permanent=true', 'DELETE')).status,
            400
          );
          await request('/api/blogs/' + article._id, 'DELETE');
          await request('/api/projects/' + project.id, 'DELETE');
          assert.equal(
            (await request('/api/blogs/' + article._id + '?permanent=true', 'DELETE')).status,
            200
          );
          assert.equal(
            (await request('/api/projects/' + project.id + '?permanent=true', 'DELETE')).status,
            200
          );
          assert.equal((await request('/api/media/' + image._id, 'DELETE')).status, 200);
        }
      );
    } finally {
      await new Promise(resolve => server.close(resolve));
      if (mongoose.connection.name.startsWith('portfolio_test_'))
        await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
    }
  }
);
