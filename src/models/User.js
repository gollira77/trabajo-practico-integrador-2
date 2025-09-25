import mongoose from 'mongoose';
import ProfileSchema from './Profile.js';
import { hashPassword } from '../helpers/bcrypt.js';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile: { type: ProfileSchema, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// Pre-save hook para hashear password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

export default mongoose.model('User', UserSchema);
