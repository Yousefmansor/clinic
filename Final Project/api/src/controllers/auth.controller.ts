import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { Admin } from "../models/admin.model";

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400).json({ success: false, message: "Email and password required" });
    return;
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  const valid = await admin.comparePassword(password);
  if (!valid) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }

  const secret = process.env.JWT_SECRET || "care-clinic-secret";
  const token = jwt.sign({ adminId: admin._id.toString() }, secret, {
    expiresIn: "7d",
  });

  res.json({ success: true, token, admin: { name: admin.name, email: admin.email } });
}

export async function seedAdmin(): Promise<void> {
  const exists = await Admin.findOne({ email: "admin@careclinic.com" });
  if (!exists) {
    await Admin.create({
      email: "admin@careclinic.com",
      password: "admin123",
      name: "Admin",
    });
    console.log("Default admin created: admin@careclinic.com / admin123");
  }
}
