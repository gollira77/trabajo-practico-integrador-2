import express from 'express';
import { authMiddleware, ownerOrAdminMiddleware } from '../middlewares/auth.middleware.js';
import {createComment, getCommentsByArticle, getMyComments, updateComment, deleteComment} from '../controllers/Comment.controller.js';

const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/article/:articleId', authMiddleware, getCommentsByArticle);
router.get('/my', authMiddleware, getMyComments);
router.put('/:id', authMiddleware, ownerOrAdminMiddleware, updateComment);
router.delete('/:id', authMiddleware, ownerOrAdminMiddleware, deleteComment);

export default router;
