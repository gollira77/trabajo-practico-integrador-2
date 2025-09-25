import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import authRoutes from './src/routes/auth.Routes.js';
import userRoutes from './src/routes/User.Routes.js';
import tagRoutes from './src/routes/Tag.Routes.js';
import articleRoutes from './src/routes/Article.Routes.js';
import commentRoutes from './src/routes/Comment.Routes.js';

dotenv.config();
connectDB();

const app = express();

// Middlewares globales
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
