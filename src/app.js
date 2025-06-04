import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { resolve } from 'path';

import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import spendingRoutes from './routes/spendingRoutes.js';
import invoicesRoutes from './routes/invoicesRoutes.js';
import savingsRoutes from './routes/savingRoutes.js';

const app = express();
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.emit('ready');
  })
  .catch((e) => console.log(e));

const corsOptions = {
  origin: process.env.CORS_URL,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json('An API built in express about finances');
});

app.use('/users/', userRoutes);
app.use('/tokens/', tokenRoutes);
app.use('/spendings/', spendingRoutes);
app.use('/invoices/', invoicesRoutes);
app.use('/savings/', savingsRoutes);

export default app;
