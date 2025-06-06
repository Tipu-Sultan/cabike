import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}