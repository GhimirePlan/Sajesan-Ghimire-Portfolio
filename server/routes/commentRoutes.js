import express from 'express';
import {
  addComment,
  getCommentsByBlog,
  getAllComments,
  updateCommentStatus,
  deleteComment,
} from '../controllers/commentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(addComment).get(protect, admin, getAllComments);
router.route('/:blogId').get(getCommentsByBlog);
router
  .route('/:id')
  .put(protect, admin, updateCommentStatus)
  .delete(protect, admin, deleteComment);

export default router;
