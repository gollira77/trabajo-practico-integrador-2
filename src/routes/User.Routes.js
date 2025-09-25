import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/User.Controller.js';
import { validate, userValidation, validateMongoId } from '../middlewares/validators.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas protegidas: solo usuarios autenticados y admin pueden acceder
router.get('/', authMiddleware, adminMiddleware, getUsers);
router.post('/', authMiddleware, adminMiddleware, validate(userValidation), createUser);
router.put('/:id', authMiddleware, adminMiddleware, validateMongoId('id'), validate(userValidation), updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, validateMongoId('id'), deleteUser);

export default router;
