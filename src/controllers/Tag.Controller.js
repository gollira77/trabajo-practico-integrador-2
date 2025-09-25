import Tag from '../models/Tag.js';
import Article from '../models/Article.js';

// Listar tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo tags', error: error.message });
  }
};

// Obtener un tag por ID
export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag no encontrado' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo tag', error: error.message });
  }
};


// Crear tag
export const createTag = async (req, res) => {
  try {
    const newTag = new Tag(req.body);
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: 'Error creando tag', error: error.message });
  }
};

// Actualizar tag
export const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag no encontrado' });

    Object.assign(tag, req.body);
    await tag.save();
    res.status(200).json({ message: 'Tag actualizado', tag });
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando tag', error: error.message });
  }
};

// Eliminar tag y removerlo de todos los artículos
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag no encontrado' });

    await Tag.findByIdAndDelete(req.params.id);
    await Article.updateMany({ tags: req.params.id }, { $pull: { tags: req.params.id } });

    res.status(200).json({ message: 'Tag eliminado y removido de artículos' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando tag', error: error.message });
  }
};
