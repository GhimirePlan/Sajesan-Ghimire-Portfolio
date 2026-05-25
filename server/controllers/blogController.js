import Blog from '../models/blogModel.js';

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.json(blogs);
};

// @desc    Fetch single blog
// @route   GET /api/blogs/:idOrSlug
// @access  Public
const getBlogById = async (req, res) => {
  const { idOrSlug } = req.params;
  
  try {
    let blog;
    // Check if idOrSlug is a valid MongoDB ObjectId
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    } else {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (blog) {
      blog.views += 1;
      await blog.save();
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  const { title, slug, description, content, coverImage, tags, isPublished } = req.body;

  const blog = new Blog({
    title,
    slug,
    description,
    content,
    coverImage,
    tags,
    isPublished,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  const { title, slug, description, content, coverImage, tags, isPublished } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = title !== undefined ? title : blog.title;
      blog.slug = slug !== undefined ? slug : blog.slug;
      blog.description = description !== undefined ? description : blog.description;
      blog.content = content !== undefined ? content : blog.content;
      blog.coverImage = coverImage !== undefined ? coverImage : blog.coverImage;
      blog.tags = tags !== undefined ? tags : blog.tags;
      blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
