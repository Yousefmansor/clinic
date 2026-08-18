import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatientById,
  getPatients,
  updatePatient,
} from "../controllers/patient.controller";

const router = Router();

router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.patch("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
