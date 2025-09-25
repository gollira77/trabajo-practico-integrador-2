import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/User.Controller.js';
import { validate, userValidation, validateMongoId } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', validate(userValidation), createUser);
router.put('/:id', validateMongoId('id'), validate(userValidation), updateUser);
router.delete('/:id', validateMongoId('id'), deleteUser);

export default router;
