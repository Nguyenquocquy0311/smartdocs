import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
  name: { type: String, required: true },
});

const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema);

export default Tag;