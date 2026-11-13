import express from 'express';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/manage', protect, admin, getBlogs);
router.get('/manage/:idOrSlug', protect, admin, getBlogById);

router.route('/').get(getBlogs).post(protect, admin, createBlog);
router
  .route('/:idOrSlug')
  .get(getBlogById)
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
