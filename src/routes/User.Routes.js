import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { createUser, updateUser, getUsers, deleteUser } from '../controllers/User.Controller.js';
import { validate } from '../middlewares/validators.js';
import { userValidation } from '../validators/userValidator.js';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);
router.post('/', validate(userValidation), authMiddleware, adminMiddleware, createUser);
router.put('/:id', validate(userValidation), authMiddleware, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
