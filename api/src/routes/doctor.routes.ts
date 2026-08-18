import { Router } from "express";
import * as doctorController from "../controllers/doctor.controller";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", doctorController.list);
router.get("/:id", doctorController.get);
router.post("/", requireAdmin, doctorController.create);
router.patch("/:id", requireAdmin, doctorController.update);
router.delete("/:id", requireAdmin, doctorController.remove);

export default router;
