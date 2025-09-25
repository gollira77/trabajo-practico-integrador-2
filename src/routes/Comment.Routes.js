import express from 'express';
import { getComments, createComment } from '../controllers/Comment.Controller.js';
const router = express.Router();

router.get('/', getComments);
router.post('/', createComment);

export default router;
