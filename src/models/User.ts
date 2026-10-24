import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'member' | 'trainer' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  membership?: {
    planId: mongoose.Types.ObjectId;
    startDate: Date;
    expiryDate: Date;
    status: 'active' | 'expired' | 'frozen';
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    role: { type: String, enum: ['member', 'trainer', 'admin'], default: 'member' },
    avatar: { type: String },
    membership: {
      planId: { type: Schema.Types.ObjectId, ref: 'Plan' },
      startDate: { type: Date },
      expiryDate: { type: Date },
      status: { type: String, enum: ['active', 'expired', 'frozen'], default: 'active' },
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
