import mongoose, { Schema, Document } from 'mongoose';

interface IDownload extends Document {
  userId: string;
  documentId: Schema.Types.ObjectId;
  downloadedAt: Date;
}

const DownloadSchema: Schema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  documentId: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
  downloadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Download || mongoose.model<IDownload>('Download', DownloadSchema);
