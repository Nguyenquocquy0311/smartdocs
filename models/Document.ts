import mongoose, { Schema, Document } from 'mongoose';

interface IDocument extends Document {
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  source?: string;
  downloadPoints?: number;
  tags: string[];
  fileType: 'doc' | 'docx' | 'pdf' | 'ppt' | 'pptx';
  author: string;
  createdAt: Date;
  updatedAt: Date;
  approved: boolean;
  downloadCount: number;
  views?: number;
  like?: number;
  liked?: boolean;
  vip?: boolean;
  justPosted?: boolean;
  status?: string;
}

const DocumentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    fileUrl: { type: String, required: true },
    source: { type: String },
    downloadPoints: { type: Number, default: 0 },
    tags: { type: [String] },
    fileType: {
      type: String,
      enum: ['doc', 'docx', 'pdf', 'pptx', 'ppt'],
      required: true
    },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    approved: { type: Boolean, default: false },
    downloadCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    vip: { type: Boolean, default: false },
    justPosted: { type: Boolean, default: true },
    status: { type: String, default: 'pending' }
  },
  {
    timestamps: true,
  }
);

DocumentSchema.pre('find', function (next) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  this.updateMany(
    { createdAt: { $lte: oneWeekAgo }, justPosted: true },
    { $set: { justPosted: false } }
  ).exec();
  next();
});

export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);
