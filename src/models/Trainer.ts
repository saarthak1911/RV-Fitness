import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrainer extends Document {
  name: string;
  specialization: string;
  experienceYears: number;
  certifications: string[];
  rating: number;
  availability: {
    days: string[];
    slots: string[];
  };
  bio: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experienceYears: { type: Number, required: true, default: 1 },
    certifications: [{ type: String }],
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    availability: {
      days: [{ type: String }],
      slots: [{ type: String }],
    },
    bio: { type: String, required: true },
    photoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Trainer: Model<ITrainer> = mongoose.models.Trainer || mongoose.model<ITrainer>('Trainer', TrainerSchema);
export default Trainer;
