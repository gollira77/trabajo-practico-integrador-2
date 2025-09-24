import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

dotenv.config();
connectDB();

const app = express();

// Middlewares globales
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
