import Comment from '../models/Comment.js';

// Listar comentarios
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isDeleted: false }).populate('author article');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo comentarios' });
  }
};

// Crear comentario
export const createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar comentario
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment || comment.isDeleted) return res.status(404).json({ message: 'Comentario no encontrado' });

    Object.assign(comment, req.body);
    await comment.save();
    res.status(200).json({ message: 'Comentario actualizado', comment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar comentario (lógico)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment || comment.isDeleted) return res.status(404).json({ message: 'Comentario no encontrado' });

    comment.isDeleted = true;
    await comment.save();
    res.status(200).json({ message: 'Comentario eliminado (lógico)' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando comentario' });
  }
};
