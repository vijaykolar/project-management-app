import mongoose from 'mongoose';
import { config } from '../config/app-config';

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to the database');
  } catch (error) {
    console.log(error);
  }
}
