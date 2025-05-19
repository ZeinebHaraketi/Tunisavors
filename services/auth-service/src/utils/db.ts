import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.DB_NAME,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};