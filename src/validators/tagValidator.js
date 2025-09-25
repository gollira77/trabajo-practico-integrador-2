import { body } from 'express-validator';

export const tagValidation = [
  body('name').notEmpty().withMessage('El nombre de la etiqueta es obligatorio'),
];
