import { body } from 'express-validator';

export const userValidation = [
  body('username').notEmpty().withMessage('El username es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una mayúscula'),
  body('profile.firstName').notEmpty().withMessage('El nombre es obligatorio'),
  body('profile.lastName').notEmpty().withMessage('El apellido es obligatorio'),
];
