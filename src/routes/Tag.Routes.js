import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { createTag, getTags, updateTag, deleteTag } from '../controllers/Tag.controller.js';
import { validate } from '../middlewares/validators.js';
import { tagValidation } from '../validators/tagValidator.js';

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, validate(tagValidation), createTag);
router.get('/', authMiddleware, getTags);
router.put('/:id', authMiddleware, adminMiddleware, validate(tagValidation), updateTag);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTag);

export default router;
