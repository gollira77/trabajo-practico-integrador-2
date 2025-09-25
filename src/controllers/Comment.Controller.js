import Comment from '../models/Comment.js';

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isDeleted: false }).populate('author article');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo comentarios' });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
