import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
    try {
        // For demo purposes, we will bypass DB if it fails but we'll try once
        const conn = await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.warn('MongoDB connection failed. Switching to Memory Store for demo.');
        // We don't exit(1) so the server can run in memory mode
    }
};

export default connectDB;
