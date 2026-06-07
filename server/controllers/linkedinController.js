import LinkedInPost from '../models/linkedinModel.js';

// @desc    Fetch all LinkedIn posts
// @route   GET /api/linkedin
// @access  Public
const getLinkedInPosts = async (req, res) => {
  try {
    const posts = await LinkedInPost.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching LinkedIn posts', error: error.message });
  }
};

// @desc    Add a LinkedIn post
// @route   POST /api/linkedin
// @access  Private/Admin
const addLinkedInPost = async (req, res) => {
  try {
    console.log('Received LinkedIn post data:', req.body);
    const { url, tag, isFeatured } = req.body;

    const post = new LinkedInPost({
      url,
      tag,
      isFeatured,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: 'Error adding LinkedIn post', error: error.message });
  }
};

// @desc    Update a LinkedIn post
// @route   PUT /api/linkedin/:id
// @access  Private/Admin
const updateLinkedInPost = async (req, res) => {
  try {
    console.log('Updating LinkedIn post:', req.params.id, req.body);
    const { url, tag, isFeatured } = req.body;
    const post = await LinkedInPost.findById(req.params.id);

    if (post) {
      post.url = url !== undefined ? url : post.url;
      post.tag = tag !== undefined ? tag : post.tag;
      post.isFeatured = isFeatured !== undefined ? isFeatured : post.isFeatured;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating LinkedIn post', error: error.message });
  }
};

// @desc    Delete a LinkedIn post
// @route   DELETE /api/linkedin/:id
// @access  Private/Admin
const deleteLinkedInPost = async (req, res) => {
  try {
    const post = await LinkedInPost.findById(req.params.id);

    if (post) {
      await post.deleteOne();
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting LinkedIn post', error: error.message });
  }
};

export { getLinkedInPosts, addLinkedInPost, updateLinkedInPost, deleteLinkedInPost };
