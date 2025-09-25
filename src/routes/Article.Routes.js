import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ownerOrAdminMiddleware } from '../middlewares/ownerOrAdminMiddleware.js';
import { createArticle, updateArticle, deleteArticle, getAllArticles, getArticleById, getMyArticles } from '../controllers/Article.controller.js';
import { validate } from '../middlewares/validators.js';
import { articleValidation } from '../validators/articleValidator.js';

const router = express.Router();

router.post('/', authMiddleware, validate(articleValidation), createArticle);
router.get('/', authMiddleware, getAllArticles);
router.get('/my', authMiddleware, getMyArticles);
router.get('/:id', authMiddleware, getArticleById);
router.put('/:id', authMiddleware, ownerOrAdminMiddleware, validate(articleValidation), updateArticle);
router.delete('/:id', authMiddleware, ownerOrAdminMiddleware, deleteArticle);

export default router;
