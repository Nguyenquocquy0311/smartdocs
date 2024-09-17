import mongoose, { Schema, Document, Types } from 'mongoose';

interface IFeedback extends Document {
  author: Types.ObjectId;
  document: Types.ObjectId;
  rating: number;
  comment: string;
  feedback_date: Date;
}

const FeedbackSchema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    document: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    feedback_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
