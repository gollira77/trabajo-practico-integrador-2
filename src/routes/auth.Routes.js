import express from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth.Controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Registro y login
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Perfil
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;
