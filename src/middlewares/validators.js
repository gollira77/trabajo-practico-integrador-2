import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Middleware para capturar errores de validación
export const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};

// Validar ID de MongoDB
export const validateMongoId = (field) => [
  param(field).custom(value => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('ID inválido');
    }
    return true;
  })
];

// Validaciones para campos de usuario
export const userValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('profile.firstName').notEmpty().withMessage('El nombre es obligatorio'),
  body('profile.lastName').notEmpty().withMessage('El apellido es obligatorio'),
];

// Validaciones para tags
export const tagValidation = [
  body('name').notEmpty().withMessage('El nombre del tag es obligatorio'),
];

// Validaciones para artículos
export const articleValidation = [
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('content').notEmpty().withMessage('El contenido es obligatorio'),
  body('author').notEmpty().withMessage('El autor es obligatorio'),
];

// Validaciones para comentarios
export const commentValidation = [
  body('content').notEmpty().withMessage('El contenido es obligatorio'),
  body('author').notEmpty().withMessage('El autor es obligatorio'),
  body('article').notEmpty().withMessage('El artículo es obligatorio'),
];
