import mongoose from 'mongoose';
import ProfileSchema from './Profile.js';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile: { type: ProfileSchema, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// Hash password antes de guardar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



export default mongoose.model('User', UserSchema);