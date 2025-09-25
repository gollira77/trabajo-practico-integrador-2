import express from 'express';
import { getTags, createTag, updateTag, deleteTag } from '../controllers/Tag.Controller.js';
import { validate, tagValidation, validateMongoId } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', getTags);
router.post('/', validate(tagValidation), createTag);
router.put('/:id', validateMongoId('id'), validate(tagValidation), updateTag);
router.delete('/:id', validateMongoId('id'), deleteTag);

export default router;
