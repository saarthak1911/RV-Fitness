import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransformationStory extends Document {
  slug: string;
  memberName: string;
  memberInitials: string;
  memberSince: string;
  programTitle: string;
  resultBadge: string; // e.g. "-14 kg Fat Loss"
  quote: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  durationMonths: number;
  stats: {
    weightLossKg?: number;
    muscleGainKg?: number;
    bodyFatReducedPercent?: number;
  };
  approach: {
    workout: string;
    nutrition: string;
  };
  guidedByTrainer?: string;
  fullTestimonial: string;
  milestones: {
    month: number;
    title: string;
    description: string;
  }[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TransformationStorySchema = new Schema<ITransformationStory>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    memberName: { type: String, required: true },
    memberInitials: { type: String, required: true },
    memberSince: { type: String, required: true },
    programTitle: { type: String, required: true },
    resultBadge: { type: String, required: true },
    quote: { type: String, required: true },
    beforeImageUrl: { type: String, required: true },
    afterImageUrl: { type: String, required: true },
    durationMonths: { type: Number, required: true },
    stats: {
      weightLossKg: { type: Number },
      muscleGainKg: { type: Number },
      bodyFatReducedPercent: { type: Number },
    },
    approach: {
      workout: { type: String, required: true },
      nutrition: { type: String, required: true },
    },
    guidedByTrainer: { type: String },
    fullTestimonial: { type: String, required: true },
    milestones: [
      {
        month: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TransformationStory: Model<ITransformationStory> =
  mongoose.models.TransformationStory ||
  mongoose.model<ITransformationStory>('TransformationStory', TransformationStorySchema);
export default TransformationStory;
