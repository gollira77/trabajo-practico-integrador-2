import express from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';
import {createTag, getAllTags, getTagById, updateTag, deleteTag} from '../controllers/Tag.controller.js';

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createTag);
router.get('/', authMiddleware, getAllTags);
router.get('/:id', authMiddleware, getTagById);
router.put('/:id', authMiddleware, adminMiddleware, updateTag);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTag);

export default router;
