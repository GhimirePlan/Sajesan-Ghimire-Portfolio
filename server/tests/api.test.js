import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../index.js';
import Blog from '../models/blogModel.js';
import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';
import { getBlogs, getBlogById } from '../controllers/blogController.js';
import { getCommentsByBlog, addComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';
const response = () => ({
  code: 200,
  status(code) {
    this.code = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});
test('API stays available and returns honest health/readiness without configuration', async () => {
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const health = await fetch(`${base}/api/health`);
    assert.equal(health.status, 503);
    assert.equal((await health.json()).status, 'degraded');
    const content = await fetch(`${base}/api/blogs`);
    assert.equal(content.status, 503);
    assert.match((await content.json()).message, /temporarily unavailable/);
    const malformed = await fetch(`${base}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    });
    assert.equal(malformed.status, 400);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
test('public list filters drafts and excludes full article bodies', async () => {
  const original = Blog.find;
  let filter, projection;
  Blog.find = value => {
    filter = value;
    return {
      select(value) {
        projection = value;
        return this;
      },
      sort() {
        return this;
      },
      limit() {
        return this;
      },
      lean() {
        return [];
      },
    };
  };
  try {
    await getBlogs({}, response());
    assert.deepEqual(filter, { isPublished: true });
    assert.equal(projection, '-content');
    await getBlogs({ user: { isAdmin: true } }, response());
    assert.deepEqual(filter, {});
  } finally {
    Blog.find = original;
  }
});
test('public article lookup cannot return drafts', async () => {
  const original = Blog.findOneAndUpdate;
  let filter;
  Blog.findOneAndUpdate = async value => {
    filter = value;
    return null;
  };
  try {
    const res = response();
    await getBlogById({ params: { idOrSlug: 'draft-slug' } }, res);
    assert.deepEqual(filter, { slug: 'draft-slug', isPublished: true });
    assert.equal(res.code, 404);
  } finally {
    Blog.findOneAndUpdate = original;
  }
});
test('public comments exclude email and reject invalid identifiers', async () => {
  const original = Comment.find;
  let projection;
  Comment.find = () => ({
    select(value) {
      projection = value;
      return this;
    },
    sort() {
      return this;
    },
    limit() {
      return this;
    },
    lean() {
      return [];
    },
  });
  try {
    await getCommentsByBlog({ params: { blogId: '507f1f77bcf86cd799439011' } }, response());
    assert.equal(projection, '-email');
    const res = response();
    await getCommentsByBlog({ params: { blogId: 'bad' } }, res);
    assert.equal(res.code, 400);
  } finally {
    Comment.find = original;
  }
});
test('invalid comments are rejected before database access', async () => {
  const res = response();
  await addComment(
    { body: { blogId: { $ne: null }, name: 'A', email: 'bad', comment: 'test' } },
    res
  );
  assert.equal(res.code, 400);
});
test('missing authentication never reaches protected handlers', async () => {
  const res = response();
  let called = false;
  await protect({ headers: {} }, res, () => {
    called = true;
  });
  assert.equal(res.code, 401);
  assert.equal(called, false);
});
test('saving profile changes does not rehash an existing password', async () => {
  const user = new User({ name: 'Test', email: 'test@example.com', password: 'already-hashed' });
  user.$isNew = false;
  user.unmarkModified('password');
  await User.schema.s.hooks.execPre('save', user, []);
  assert.equal(user.password, 'already-hashed');
  assert.equal(user.isAdmin, false);
});
