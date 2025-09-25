import Article from '../models/Article.js';
import Tag from '../models/Tag.js';
import mongoose from 'mongoose';

// Agregar tag a artículo
export const addTagToArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(articleId) || !mongoose.Types.ObjectId.isValid(tagId)) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    const article = await Article.findById(articleId).populate('author tags');
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });

    if (article.tags.includes(tagId)) {
      return res.status(400).json({ message: 'Etiqueta ya asociada al artículo' });
    }

    article.tags.push(tagId);
    await article.save();

    const updatedArticle = await Article.findById(articleId).populate('author tags');
    res.status(200).json({ message: 'Etiqueta agregada al artículo', article: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: 'Error agregando etiqueta', error: error.message });
  }
};

// Remover tag de artículo
export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(articleId) || !mongoose.Types.ObjectId.isValid(tagId)) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    const article = await Article.findById(articleId).populate('author tags');
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });

    if (!article.tags.includes(tagId)) {
      return res.status(400).json({ message: 'Etiqueta no asociada al artículo' });
    }

    article.tags = article.tags.filter(tag => tag.toString() !== tagId);
    await article.save();

    const updatedArticle = await Article.findById(articleId).populate('author tags');
    res.status(200).json({ message: 'Etiqueta removida del artículo', article: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: 'Error removiendo etiqueta', error: error.message });
  }
};
