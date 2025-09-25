import express from 'express';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/Article.Controller.js';
import { validate, articleValidation, validateMongoId } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', getArticles);
router.post('/', validate(articleValidation), createArticle);
router.put('/:id', validateMongoId('id'), validate(articleValidation), updateArticle);
router.delete('/:id', validateMongoId('id'), deleteArticle);

export default router;
