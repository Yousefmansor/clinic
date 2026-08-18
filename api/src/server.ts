import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import { seedAdmin } from "./controllers/auth.controller";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/care-clinic";

// الاتصال بقاعدة البيانات وتشغيل السيرفر
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // إنشاء أدمن افتراضي لو مش موجود
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
