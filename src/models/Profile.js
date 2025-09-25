import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
}, { _id: false });

export default ProfileSchema;
