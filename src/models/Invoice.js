import mongoose from 'mongoose';
import { getInstallmentsMonths } from '../utils/getInstallmentsMonths.js';

const InvoiceSchema = new mongoose.Schema({
  item: { type: String, required: [true, 'Campo obrigatório'] },
  total: { type: Number, required: [true, 'Campo obrigatório'] },
  installmentsNumber: { type: Number, required: [true, 'Campo obrigatório'] },
  date: {
    type: Date,
    required: [true, 'Campo obrigatório'],
    cast: '{VALUE} não é uma data',
  },
  status: {
    type: String,
    required: [true, 'Campo obrigatório'],
    default: 'Pendente',
  },
  user: { type: String, required: [true, 'Campo obrigatório'] },
  installmentsValue: Number,
  restToPay: Number,
  months: Array,
});

InvoiceSchema.pre('save', function (next) {
  const installmentsMonths = getInstallmentsMonths(
    this.installmentsNumber,
    this.date
  );

  this.months.push(...installmentsMonths);
  this.installmentsValue = (this.total / this.installmentsNumber).toFixed(2);
  this.restToPay = this.total;

  next();
});

export default mongoose.model('Invoice', InvoiceSchema);
