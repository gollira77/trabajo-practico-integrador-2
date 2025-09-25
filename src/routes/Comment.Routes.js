import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ownerOrAdminMiddleware } from '../middlewares/ownerOrAdminMiddleware.js';
import { createComment, updateComment, deleteComment, getCommentsByArticle, getMyComments } from '../controllers/Comment.controller.js';
import { validate } from '../middlewares/validators.js';
import { commentValidation } from '../validators/commentValidator.js';

const router = express.Router();

router.post('/', authMiddleware, validate(commentValidation), createComment);
router.get('/article/:articleId', authMiddleware, getCommentsByArticle);
router.get('/my', authMiddleware, getMyComments);
router.put('/:id', authMiddleware, ownerOrAdminMiddleware, validate(commentValidation), updateComment);
router.delete('/:id', authMiddleware, ownerOrAdminMiddleware, deleteComment);

export default router;
