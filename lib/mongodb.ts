import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedDb: mongoose.Connection | null = null;

const connectDB = async (): Promise<mongoose.Connection> => {
  if (cachedDb) {
    console.log("Using cached MongoDB connection");
    return cachedDb;
  }

  // Connect to MongoDB without the deprecated options
  const conn = await mongoose.connect(MONGODB_URI);

  cachedDb = conn.connection;
  return cachedDb;
};

export default connectDB;
