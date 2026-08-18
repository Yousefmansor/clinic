import express from "express";
import cors from "cors";

import doctorRouter from "./routes/doctor.routes";
import patientRouter from "./routes/patient.routes";
import appointmentRouter from "./routes/appointment.routes";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:4200" }));

// Health check
app.get("/api/health", (_request, response) => {
  response.json({ success: true, message: "Care Clinic API is running" });
});

// Routes
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointments", appointmentRouter);

export default app;
