import Blog from '../models/blogModel.js';
import { contentPayload, sendContentError } from '../lib/content.js';
export async function getBlogs(req, res) {
  try {
    const blogs = await Blog.find(
      req.user?.isAdmin ? {} : { isPublished: true, isArchived: { $ne: true } }
    )
      .select('-content')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    res.json(blogs);
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function getBlogById(req, res) {
  try {
    const key = /^[a-f0-9]{24}$/i.test(req.params.idOrSlug)
      ? { _id: req.params.idOrSlug }
      : { slug: req.params.idOrSlug };
    const filter = {
      ...key,
      ...(req.user?.isAdmin ? {} : { isPublished: true, isArchived: { $ne: true } }),
    };
    const blog = req.user?.isAdmin
      ? await Blog.findOne(filter)
      : await Blog.findOneAndUpdate(filter, { $inc: { views: 1 } }, { returnDocument: 'after' });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function createBlog(req, res) {
  try {
    res.status(201).json(await Blog.create(contentPayload(req.body, 'blog')));
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function updateBlog(req, res) {
  try {
    const key = /^[a-f0-9]{24}$/i.test(req.params.idOrSlug)
      ? { _id: req.params.idOrSlug }
      : { slug: req.params.idOrSlug };
    const blog = await Blog.findOne(key);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    Object.assign(blog, contentPayload({ ...blog.toObject(), ...req.body }, 'blog'));
    res.json(await blog.save());
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function deleteBlog(req, res) {
  try {
    const key = /^[a-f0-9]{24}$/i.test(req.params.idOrSlug)
      ? { _id: req.params.idOrSlug }
      : { slug: req.params.idOrSlug };
    if (req.query.permanent === 'true') {
      const archived = await Blog.findOne(key);
      if (!archived) return res.status(404).json({ message: 'Blog not found' });
      if (!archived.isArchived)
        return res
          .status(400)
          .json({ message: 'Archive the article before permanently deleting it.' });
      await archived.deleteOne();
      return res.json({ message: 'Article permanently deleted' });
    }
    const blog = await Blog.findOneAndUpdate(
      key,
      { isArchived: true, isPublished: false },
      { returnDocument: 'after' }
    );
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Article archived' });
  } catch (error) {
    sendContentError(res, error);
  }
}
