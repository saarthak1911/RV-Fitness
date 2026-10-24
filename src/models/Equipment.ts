import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  category: 'Cardio' | 'Strength' | 'Free Weights' | 'Functional';
  description: string;
  imageUrl: string;
  model3dUrl?: string;
  musclesWorked: string[];
  howToUse: string[];
  benefits: string[];
  safetyTips: string[];
  recommendedSetsReps: string;
  status: 'available' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

const EquipmentSchema = new Schema<IEquipment>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Cardio', 'Strength', 'Free Weights', 'Functional'],
      required: true,
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    model3dUrl: { type: String },
    musclesWorked: [{ type: String }],
    howToUse: [{ type: String }],
    benefits: [{ type: String }],
    safetyTips: [{ type: String }],
    recommendedSetsReps: { type: String },
    status: { type: String, enum: ['available', 'maintenance'], default: 'available' },
  },
  { timestamps: true }
);

export const Equipment: Model<IEquipment> =
  mongoose.models.Equipment || mongoose.model<IEquipment>('Equipment', EquipmentSchema);
export default Equipment;
