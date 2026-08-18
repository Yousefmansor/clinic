import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
} from "../controllers/doctor.controller";

const router = Router();

router.post("/", createDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
