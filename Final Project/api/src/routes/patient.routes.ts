import { Router } from "express";
import * as patientController from "../controllers/patient.controller";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", patientController.list);
router.get("/:id", patientController.get);
// إنشاء المريض متاح للجميع لأن الحجز من صفحة عامة
router.post("/", patientController.create);
router.patch("/:id", requireAdmin, patientController.update);
router.delete("/:id", requireAdmin, patientController.remove);

export default router;
