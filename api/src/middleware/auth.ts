import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  adminId?: string;
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    res.status(401).json({ success: false, message: "Missing token" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "care-clinic-secret";
    const payload = jwt.verify(token, secret) as { adminId: string };
    req.adminId = payload.adminId;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}
