import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import spendingRoutes from './routes/spendingRoutes';

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

app.use('/users/', userRoutes);
app.use('/tokens/', tokenRoutes);
app.use('/spendings/', spendingRoutes);

export default app;
