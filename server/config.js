import dotenv from "dotenv";

// Load variables from .env file
dotenv.config();

// Export environment variables
export const PORT = process.env.PORT;

export const MONGO_URI = process.env.MONGO_URI;

export const CLIENT_URL = process.env.CLIENT_URL;