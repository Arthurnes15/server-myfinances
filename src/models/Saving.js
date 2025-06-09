import mongoose from 'mongoose';

const SavingSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Campo obrigatório'] },
  price: { type: Number, required: [true, 'Campo obrigatório'] },
  investment: { type: Number, required: [true, 'Campo obrigatório'] },
  percentage: { type: Number, default: 0 },
  user: { type: String, required: [true, 'Campo obrigatório'] },
  image: { type: String },
  createdOn: { type: Date, default: Date.now() },
});

SavingSchema.pre('save', function (next) {
  this.percentage = ((this.investment * 100) / this.price).toFixed(2);

  next();
});

export default mongoose.model('Saving', SavingSchema);
