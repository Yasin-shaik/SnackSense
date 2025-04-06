import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
// import openAIRoutes from './Routes/openAIRoutes.js';
import userRoutes from './Routes/userRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5100; // Port can be defined in the .env file or fallback to 5100
const mongoURI = process.env.MONGO_URI ; // MongoDB URI from .env

// Check if MongoDB URI exists
if (!mongoURI) {
    console.error('ERROR: MONGO_URI is not set in the .env file.');
    process.exit(1); // Exit the process if MONGO_URI is missing
}

// ✅ CORS Configuration for Port 5173
const corsOptions = {
    origin: "http://localhost:5173", // Allow frontend on port 5173
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], // Allowed headers
};

app.use(cors(corsOptions)); // Apply CORS Middleware
app.use(express.json());
app.use(cookieParser()); 


// MongoDB connection and server startup inside async function
const startServer = async () => {
    try {
        // Connecting to MongoDB
        await mongoose.connect(mongoURI, {
            autoIndex: process.env.NODE_ENV === 'production' ? false : true, // Disable auto-index in production
        });
        console.log('MongoDB Connected Successfully');

        // Starting the server
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with a failure code if DB connection fails
    }
};

// Call startServer to initialize the app
startServer();

// API routes
app.use('/api/auth', authRoutes);
// app.use('/api/openAI', openAIRoutes);
app.use('/api/user', userRoutes);

// Graceful shutdown: Handle process termination (SIGINT, SIGTERM)
process.on('SIGINT', async () => {
    console.log('Gracefully shutting down...');
    try {
        await mongoose.connection.close();  // Use async/await here for proper closure
        console.log('MongoDB connection closed.');
        process.exit(0);  // Exit cleanly
    } catch (error) {
        console.error('Error during MongoDB connection close:', error);
        process.exit(1);  // Exit with failure code if there's an error closing the DB connection
    }
});

