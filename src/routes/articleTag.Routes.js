import express from 'express';
import { authMiddleware, ownerOrAdminMiddleware } from '../middlewares/auth.middleware.js';
import {addTagToArticle, removeTagFromArticle} from '../controllers/articleTag.controller.js';

const router = express.Router();

router.post('/:articleId/tags/:tagId', authMiddleware, ownerOrAdminMiddleware, addTagToArticle);
router.delete('/:articleId/tags/:tagId', authMiddleware, ownerOrAdminMiddleware, removeTagFromArticle);

export default router;
