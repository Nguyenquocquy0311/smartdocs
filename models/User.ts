import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firebase_uid: string;
  email: string;
  password: string;
  full_name: string;
  registry_date: Date;
  role: string;
  profile_picture: string;
  gender: string;
  points: number;
  is_verified: boolean;
}

const UserSchema: Schema = new Schema({
  firebase_uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  registry_date: { type: Date, default: Date.now },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile_picture: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female'], required: true },
  points: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
