import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import doctorRoutes from "./routes/doctor.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

// السماح بالطلبات من الفرونت إند
app.use(cors());
app.use(express.json());

// تسجيل الروابط الأساسية
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

// التأكد من أن السيرفر شغال
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
