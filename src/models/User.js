import mongoose from 'mongoose';
import ProfileSchema from './Profile.js';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile: { type: ProfileSchema, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);