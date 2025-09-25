import Article from '../models/Article.js';

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isDeleted: false }).populate('author tags');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo artículos' });
  }
};

export const createArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
