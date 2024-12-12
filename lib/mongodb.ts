import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedDb: mongoose.Connection | null = null;

const connectDB = async (): Promise<mongoose.Connection> => {
  if (cachedDb) {
    return cachedDb;
  }

  const conn = await mongoose.connect(MONGODB_URI);

  cachedDb = conn.connection;
  return cachedDb;
};

export default connectDB;
