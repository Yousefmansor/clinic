import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
} from "../controllers/appointment.controller";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
