import Article from '../models/Article.js';
import Comment from '../models/Comment.js';

// Listar artículos
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isDeleted: false }).populate('author tags');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo artículos' });
  }
};

// Crear artículo
export const createArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar artículo
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article || article.isDeleted) return res.status(404).json({ message: 'Artículo no encontrado' });

    Object.assign(article, req.body);
    await article.save();
    res.status(200).json({ message: 'Artículo actualizado', article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar artículo (lógico) + eliminar comentarios en cascada
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article || article.isDeleted) return res.status(404).json({ message: 'Artículo no encontrado' });

    article.isDeleted = true;
    await article.save();

    // Eliminación en cascada de comentarios
    await Comment.updateMany({ article: id }, { isDeleted: true });

    res.status(200).json({ message: 'Artículo eliminado (lógico) y comentarios en cascada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando artículo' });
  }
};
