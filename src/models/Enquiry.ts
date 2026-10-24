import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  interest: 'membership' | 'trainer' | 'free_trial' | 'other';
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    interest: {
      type: String,
      enum: ['membership', 'trainer', 'free_trial', 'other'],
      default: 'membership',
    },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  },
  { timestamps: true }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
export default Enquiry;
