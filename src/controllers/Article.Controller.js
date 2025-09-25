import Article from '../models/Article.js';
import Comment from '../models/Comment.js';

// Listar todos los artículos
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isDeleted: false }).populate('author tags');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo artículos', error: error.message });
  }
};

// Listar mis artículos
export const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id, isDeleted: false }).populate('author tags');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo mis artículos', error: error.message });
  }
};

// Obtener artículo por ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author tags');
    if (!article || article.isDeleted) return res.status(404).json({ message: 'Artículo no encontrado' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo artículo', error: error.message });
  }
};

// Crear artículo
export const createArticle = async (req, res) => {
  try {
    const newArticle = new Article({ ...req.body, author: req.user.id });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: 'Error creando artículo', error: error.message });
  }
};

// Actualizar artículo
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article || article.isDeleted) return res.status(404).json({ message: 'Artículo no encontrado' });

    Object.assign(article, req.body);
    await article.save();
    res.status(200).json({ message: 'Artículo actualizado', article });
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando artículo', error: error.message });
  }
};

// Eliminar artículo (lógico) + eliminación en cascada de comentarios
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article || article.isDeleted) return res.status(404).json({ message: 'Artículo no encontrado' });

    article.isDeleted = true;
    await article.save();

    await Comment.updateMany({ article: req.params.id }, { isDeleted: true });

    res.status(200).json({ message: 'Artículo eliminado (lógico) y comentarios en cascada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando artículo', error: error.message });
  }
};
