import User from '../models/User.js';
import { generateToken } from '../helpers/jwt.js';
import { comparePassword } from '../helpers/bcrypt.js';

export const register = async (req, res) => {
  try {
    const { email, password, profile } = req.body;

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El email ya está registrado' });

    const newUser = new User({ email, password, profile });
    await newUser.save();

    // Generar token
    const token = generateToken({ id: newUser._id, role: newUser.role });

    // Enviar cookie httpOnly
    res
      .cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 })
      .status(201)
      .json({ message: 'Usuario registrado correctamente', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email o contraseña incorrectos' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Email o contraseña incorrectos' });

    const token = generateToken({ id: user._id, role: user.role });

    res
      .cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 })
      .status(200)
      .json({ message: 'Login exitoso', user });
  } catch (error) {
    res.status(500).json({ message: 'Error iniciando sesión' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout exitoso' });
};

// Perfil GET
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -isDeleted');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo perfil' });
  }
};

// Perfil PUT
export const updateProfile = async (req, res) => {
  try {
    const { profile, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (email) user.email = email;
    if (profile) user.profile = profile;

    await user.save();
    res.status(200).json({ message: 'Perfil actualizado correctamente', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
