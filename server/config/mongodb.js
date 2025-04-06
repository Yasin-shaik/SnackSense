import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI;  // Ensure the URI is from .env

const connectDB = async () => {
    try {
        // Connecting to MongoDB
        await mongoose.connect(MONGODB_URI, {
            autoIndex: false,  // Optional: Disable auto-index creation on startup (for production)
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);  // Forcefully exit if DB connection fails
    }
};

export default connectDB;
