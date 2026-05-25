import Comment from '../models/commentModel.js';

// @desc    Add a comment
// @route   POST /api/comments
// @access  Public
const addComment = async (req, res) => {
  const { blogId, name, email, comment } = req.body;

  const newComment = new Comment({
    blog: blogId,
    name,
    email,
    comment,
  });

  const createdComment = await newComment.save();
  res.status(201).json(createdComment);
};

// @desc    Get comments for a blog
// @route   GET /api/comments/:blogId
// @access  Public
const getCommentsByBlog = async (req, res) => {
  const comments = await Comment.find({ blog: req.params.blogId, isApproved: true });
  res.json(comments);
};

// @desc    Get all comments (Admin)
// @route   GET /api/comments
// @access  Private/Admin
const getAllComments = async (req, res) => {
  const comments = await Comment.find({}).populate('blog', 'title');
  res.json(comments);
};

// @desc    Approve/Reject comment
// @route   PUT /api/comments/:id
// @access  Private/Admin
const updateCommentStatus = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    comment.isApproved = req.body.isApproved;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    await comment.deleteOne();
    res.json({ message: 'Comment removed' });
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
};

export {
  addComment,
  getCommentsByBlog,
  getAllComments,
  updateCommentStatus,
  deleteComment,
};
