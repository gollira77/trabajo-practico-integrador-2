import express from 'express';
import { getTags, createTag } from '../controllers/Tag.Controller.js';
const router = express.Router();

router.get('/', getTags);
router.post('/', createTag);

export default router;
