import type { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";

export async function list(req: Request, res: Response): Promise<void> {
  const doctors = await Doctor.find();
  res.json({ success: true, data: doctors });
}

export async function get(req: Request, res: Response): Promise<void> {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404).json({ success: false, message: "Doctor not found" });
    return;
  }
  res.json({ success: true, data: doctor });
}

export async function create(req: Request, res: Response): Promise<void> {
  const doctor = await Doctor.create(req.body);
  res.status(201).json({ success: true, data: doctor });
}

export async function update(req: Request, res: Response): Promise<void> {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doctor) {
    res.status(404).json({ success: false, message: "Doctor not found" });
    return;
  }
  res.json({ success: true, data: doctor });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) {
    res.status(404).json({ success: false, message: "Doctor not found" });
    return;
  }
  res.json({ success: true, message: "Deleted" });
}
