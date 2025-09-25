import { body } from 'express-validator';

export const articleValidation = [
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('content').notEmpty().withMessage('El contenido es obligatorio'),
  body('tags').optional().isArray().withMessage('Tags debe ser un arreglo de IDs'),
];
