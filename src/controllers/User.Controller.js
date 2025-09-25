import User from '../models/User.js';

// Listar usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios' });
  }
};

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user || user.isDeleted) return res.status(404).json({ message: 'Usuario no encontrado' });

    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ message: 'Usuario actualizado', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar usuario (lógica)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user || user.isDeleted) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.isDeleted = true;
    await user.save();
    res.status(200).json({ message: 'Usuario eliminado (lógico)' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando usuario' });
  }
};
