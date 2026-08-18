import { Router } from "express";
import * as appointmentController from "../controllers/appointment.controller";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", requireAdmin, appointmentController.list);
router.get("/today", requireAdmin, appointmentController.today);
router.post("/", appointmentController.create);
router.patch("/:id/status", requireAdmin, appointmentController.updateStatus);
router.delete("/:id", requireAdmin, appointmentController.remove);

export default router;
