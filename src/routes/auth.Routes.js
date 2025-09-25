import express from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth.Controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate, userValidation } from '../middlewares/validators.js';

const router = express.Router();

router.post('/register', validate(userValidation), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, validate(userValidation), updateProfile);

export default router;
