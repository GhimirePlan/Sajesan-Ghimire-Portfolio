import express from 'express';
import {
  getLinkedInPosts,
  addLinkedInPost,
  updateLinkedInPost,
  deleteLinkedInPost,
} from '../controllers/linkedinController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getLinkedInPosts).post(protect, admin, addLinkedInPost);
router
  .route('/:id')
  .put(protect, admin, updateLinkedInPost)
  .delete(protect, admin, deleteLinkedInPost);

export default router;
