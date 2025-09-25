import express from 'express';
import { getArticles, createArticle } from '../controllers/Article.Controller.js';
const router = express.Router();

router.get('/', getArticles);
router.post('/', createArticle);

export default router;
