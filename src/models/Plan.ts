import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold VIP' | 'Titanium Elite';
  description: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  features: string[];
  excludedFeatures?: string[];
  isPopular?: boolean;
  isPremium?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true },
    tier: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold VIP', 'Titanium Elite'],
      required: true,
    },
    description: { type: String, required: true },
    monthlyPrice: { type: Number, required: true },
    quarterlyPrice: { type: Number, required: true },
    yearlyPrice: { type: Number, required: true },
    features: [{ type: String, required: true }],
    excludedFeatures: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Plan: Model<IPlan> = mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema);
export default Plan;
