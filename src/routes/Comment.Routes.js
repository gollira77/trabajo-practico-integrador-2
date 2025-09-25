import express from 'express';
import { getComments, createComment, updateComment, deleteComment } from '../controllers/Comment.Controller.js';
import { validate, commentValidation, validateMongoId } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', validate(commentValidation), createComment);
router.put('/:id', validateMongoId('id'), validate(commentValidation), updateComment);
router.delete('/:id', validateMongoId('id'), deleteComment);

export default router;
