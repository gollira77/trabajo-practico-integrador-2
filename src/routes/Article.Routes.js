import express from 'express';
import { authMiddleware, ownerOrAdminMiddleware } from '../middlewares/auth.middleware.js';
import {createArticle, getAllArticles, getArticleById, getMyArticles, updateArticle, deleteArticle} from '../controllers/Article.controller.js';

const router = express.Router();

router.post('/', authMiddleware, createArticle);
router.get('/', authMiddleware, getAllArticles);
router.get('/my', authMiddleware, getMyArticles);
router.get('/:id', authMiddleware, getArticleById);
router.put('/:id', authMiddleware, ownerOrAdminMiddleware, updateArticle);
router.delete('/:id', authMiddleware, ownerOrAdminMiddleware, deleteArticle);

export default router;
