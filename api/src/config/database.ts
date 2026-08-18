import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/care-clinic";
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}
