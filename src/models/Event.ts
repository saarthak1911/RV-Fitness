import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  coverImage: string;
  galleryImages: string[];
  seatLimit: number;
  registeredUsers: mongoose.Types.ObjectId[];
  isFeatured?: boolean;
  status: 'upcoming' | 'ongoing' | 'past';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, default: 'RV Fitness, Narsobawadi' },
    coverImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    seatLimit: { type: Number, default: 50 },
    registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['upcoming', 'ongoing', 'past'], default: 'upcoming' },
  },
  { timestamps: true }
);

export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
export default Event;
