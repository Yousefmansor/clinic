import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

// تسجيل دخول الأدمن والحصول على التوكن
router.post("/login", authController.login);

export default router;
