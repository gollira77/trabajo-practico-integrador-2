import User from '../models/User.js';
import { comparePassword } from '../helpers/bcrypt.js';
import { generateToken } from '../helpers/jwt.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: 'Usuario o email ya registrados' });

    const newUser = new User({ username, email, password, profile });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = generateToken({ id: user._id, role: user.role });
    res
      .cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' })
      .status(200)
      .json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profile },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json({ message: 'Perfil actualizado con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
};
