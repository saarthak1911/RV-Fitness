import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userRole: string;
  comment: string;
  createdAt: Date;
}

export interface IGalleryPost extends Document {
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  authorRole: 'admin' | 'trainer';
  caption: string;
  category: 'Workouts' | 'Events' | 'Transformations' | 'Facility' | 'Videos';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  likes: mongoose.Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const GalleryPostSchema = new Schema<IGalleryPost>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String, enum: ['admin', 'trainer'], required: true },
    caption: { type: String, required: true },
    category: {
      type: String,
      enum: ['Workouts', 'Events', 'Transformations', 'Facility', 'Videos'],
      default: 'Workouts',
    },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export const GalleryPost: Model<IGalleryPost> =
  mongoose.models.GalleryPost || mongoose.model<IGalleryPost>('GalleryPost', GalleryPostSchema);
export default GalleryPost;
