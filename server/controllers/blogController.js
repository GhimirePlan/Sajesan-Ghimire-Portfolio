import Blog from '../models/blogModel.js';

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
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
      // Use findOneAndUpdate to increment views atomically and avoid validation issues with missing fields
      blog = await Blog.findOneAndUpdate(
        { _id: idOrSlug },
        { $inc: { views: 1 } },
        { new: true }
      );
    } else {
      blog = await Blog.findOneAndUpdate(
        { slug: idOrSlug },
        { $inc: { views: 1 } },
        { new: true }
      );
    }

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const { title, slug, description, content, coverImage, tags, isPublished, pdfUrl } = req.body;

    const blog = new Blog({
      title,
      slug,
      description,
      content,
      coverImage,
      tags,
      isPublished,
      pdfUrl,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog', error: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:idOrSlug
// @access  Private/Admin
const updateBlog = async (req, res) => {
  const { title, slug, description, content, coverImage, tags, isPublished, pdfUrl } = req.body;

  try {
    const { idOrSlug } = req.params;
    let blog;
    
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    } else {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (blog) {
      blog.title = title !== undefined ? title : blog.title;
      blog.slug = slug !== undefined ? slug : blog.slug;
      blog.description = description !== undefined ? description : blog.description;
      blog.content = content !== undefined ? content : blog.content;
      blog.coverImage = coverImage !== undefined ? coverImage : blog.coverImage;
      blog.pdfUrl = pdfUrl !== undefined ? pdfUrl : blog.pdfUrl;
      blog.tags = tags !== undefined ? tags : blog.tags;
      blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
      

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:idOrSlug
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let blog;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    } else {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
