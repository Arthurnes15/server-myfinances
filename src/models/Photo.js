import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  originalname: { type: String },
  filename: { type: String },
  url: { type: String, default: '' },
});

export default mongoose.model('Photo', PhotoSchema);
