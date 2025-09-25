import Comment from '../models/Comment.js';

// Listar comentarios de un artículo
export const getCommentsByArticle = async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId, isDeleted: false }).populate('author article');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo comentarios', error: error.message });
  }
};

// Listar mis comentarios
export const getMyComments = async (req, res) => {
  try {
    const comments = await Comment.find({ author: req.user.id, isDeleted: false }).populate('article');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo mis comentarios', error: error.message });
  }
};

// Crear comentario
export const createComment = async (req, res) => {
  try {
    const newComment = new Comment({ ...req.body, author: req.user.id });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: 'Error creando comentario', error: error.message });
  }
};

// Actualizar comentario
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment || comment.isDeleted) return res.status(404).json({ message: 'Comentario no encontrado' });

    Object.assign(comment, req.body);
    await comment.save();
    res.status(200).json({ message: 'Comentario actualizado', comment });
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando comentario', error: error.message });
  }
};

// Eliminar comentario (lógico)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment || comment.isDeleted) return res.status(404).json({ message: 'Comentario no encontrado' });

    comment.isDeleted = true;
    await comment.save();
    res.status(200).json({ message: 'Comentario eliminado (lógico)' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando comentario', error: error.message });
  }
};
