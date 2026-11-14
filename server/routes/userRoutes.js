import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { rateLimit } from 'express-rate-limit';
import { authUser, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', authUser);
router.put('/password', rateLimit({ windowMs: 15 * 60_000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false }), protect, admin, changePassword);

export default router;
