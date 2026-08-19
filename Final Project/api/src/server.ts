import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import { seedAdmin } from "./controllers/auth.controller";
import { seedDoctors } from "./data/default-doctors";

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/care-clinic";

// الاتصال بقاعدة البيانات وتشغيل السيرفر
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // Create default admin and sample doctors only for an empty database.
    await seedAdmin();
    await seedDoctors();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
