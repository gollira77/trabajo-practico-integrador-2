import { body } from 'express-validator';

export const commentValidation = [
  body('content').notEmpty().withMessage('El contenido es obligatorio'),
  body('article').notEmpty().withMessage('El ID del artículo es obligatorio'),
];
