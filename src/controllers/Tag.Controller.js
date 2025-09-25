import Tag from '../models/Tag.js';
import Article from '../models/Article.js';

// Listar tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo tags' });
  }
};

// Crear tag
export const createTag = async (req, res) => {
  try {
    const newTag = new Tag(req.body);
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar tag
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) return res.status(404).json({ message: 'Tag no encontrado' });

    Object.assign(tag, req.body);
    await tag.save();
    res.status(200).json({ message: 'Tag actualizado', tag });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar tag y remover de artículos
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) return res.status(404).json({ message: 'Tag no encontrado' });

    // Eliminación física
    await Tag.findByIdAndDelete(id);

    // Quitar tag de todos los artículos
    await Article.updateMany({ tags: id }, { $pull: { tags: id } });

    res.status(200).json({ message: 'Tag eliminado y removido de artículos' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando tag' });
  }
};
