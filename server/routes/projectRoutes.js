import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  archiveProject,
  importProjects,
} from '../controllers/projectController.js';
const router = express.Router();
router.get('/manage', protect, admin, listProjects);
router.get('/manage/:id', protect, admin, getProject);
router.post('/import', protect, admin, importProjects);
router.get('/', listProjects);
router.post('/', protect, admin, createProject);
router.get('/:id', getProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, archiveProject);
export default router;
