import mongoose from 'mongoose';
import CloudinaryStorage from './Storage.js';

const SavingSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Campo obrigatório'] },
  price: { type: Number, required: [true, 'Campo obrigatório'] },
  investment: { type: Number, required: [true, 'Campo obrigatório'] },
  percentage: { type: Number, default: 0 },
  user: { type: String, required: [true, 'Campo obrigatório'] },
  image: String,
  createdOn: { type: Date, default: Date.now() },
});

SavingSchema.pre('save', async function (next) {
  this.percentage = ((this.investment * 100) / this.price).toFixed(2);

  const uploadedImage = await CloudinaryStorage.uploadImage(this.image);

  this.image = uploadedImage ? uploadedImage.secure_url : null;

  next();
});

export default mongoose.model('Saving', SavingSchema);
