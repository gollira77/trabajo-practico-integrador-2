import Tag from '../models/Tag.js';

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo tags' });
  }
};

export const createTag = async (req, res) => {
  try {
    const newTag = new Tag(req.body);
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
