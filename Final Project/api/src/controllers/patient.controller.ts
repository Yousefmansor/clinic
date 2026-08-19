import type { Request, Response } from "express";
import { Patient } from "../models/patient.model";

export async function list(req: Request, res: Response): Promise<void> {
  const patients = await Patient.find();
  res.json({ success: true, data: patients });
}

export async function get(req: Request, res: Response): Promise<void> {
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    res.status(404).json({ success: false, message: "Patient not found" });
    return;
  }
  res.json({ success: true, data: patient });
}

export async function create(req: Request, res: Response): Promise<void> {
  const patient = await Patient.create(req.body);
  res.status(201).json({ success: true, data: patient });
}

export async function update(req: Request, res: Response): Promise<void> {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!patient) {
    res.status(404).json({ success: false, message: "Patient not found" });
    return;
  }
  res.json({ success: true, data: patient });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) {
    res.status(404).json({ success: false, message: "Patient not found" });
    return;
  }
  res.json({ success: true, message: "Deleted" });
}
