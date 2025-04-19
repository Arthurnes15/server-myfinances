import mongoose from 'mongoose';

const SpendingSchema = new mongoose.Schema({
  item: { type: String, required: [true, 'Campo obrigatório'] },
  cost: { type: Number, required: [true, 'Campo obrigatório'] },
  date: {
    type: Date,
    required: true,
    cast: '{VALUE} não é uma data',
  },
  necessity: { type: String, required: [true, 'Campo obrigatório'] },
  user: { type: String, required: [true, 'Campo obrigatório'] },
});

export const SpendingModel = mongoose.model('Spending', SpendingSchema);
