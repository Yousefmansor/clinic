import type { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";

export async function list(req: Request, res: Response): Promise<void> {
  const appointments = await Appointment.find()
    .populate("patient")
    .populate("doctor")
    .sort({ date: -1, time: 1 });
  res.json({ success: true, data: appointments });
}

export async function today(req: Request, res: Response): Promise<void> {
  // اليوم بالتوقيت المحلي فقط (نفس طريقة تخزين التاريخ في create)
  // نستخدم مقارنة نصية لأن التاريخ يُخزن كـ Midnight UTC
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const appointments = await Appointment.find({
    date: {
      $gte: new Date(`${todayStr}T00:00:00.000Z`),
      $lt: new Date(`${todayStr}T23:59:59.999Z`),
    },
  })
    .populate("patient")
    .populate("doctor")
    .sort({ time: 1 });

  const total = await Appointment.countDocuments({
    date: {
      $gte: new Date(`${todayStr}T00:00:00.000Z`),
      $lt: new Date(`${todayStr}T23:59:59.999Z`),
    },
  });
  const newPatients = await Appointment.countDocuments({
    date: {
      $gte: new Date(`${todayStr}T00:00:00.000Z`),
      $lt: new Date(`${todayStr}T23:59:59.999Z`),
    },
    visitType: "new",
  });

  res.json({ success: true, data: { appointments, total, newPatients } });
}

export async function create(req: Request, res: Response): Promise<void> {
  const { doctorId, date, time, patientId, visitType, reason } = req.body;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(404).json({ success: false, message: "Doctor not found" });
    return;
  }

  if (doctor.status !== "active") {
    res.status(400).json({ success: false, message: "Doctor is not available" });
    return;
  }

  // check slot availability
  const booked = await Appointment.countDocuments({
    doctor: doctorId,
    date: new Date(date),
    time,
  });

  if (booked > 0) {
    res
      .status(400)
      .json({ success: false, message: "This time slot is already booked" });
    return;
  }

  const appointment = await Appointment.create({
    doctor: doctorId,
    patient: patientId,
    date: new Date(date),
    time,
    visitType: visitType || "new",
    reason: reason || [],
  });

  res.status(201).json({ success: true, data: appointment });
}

export async function updateStatus(
  req: Request,
  res: Response,
): Promise<void> {
  const { status } = req.body as { status: string };
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  ).populate("patient").populate("doctor");

  if (!appointment) {
    res.status(404).json({ success: false, message: "Appointment not found" });
    return;
  }
  res.json({ success: true, data: appointment });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) {
    res
      .status(404)
      .json({ success: false, message: "Appointment not found" });
    return;
  }
  res.json({ success: true, message: "Deleted" });
}
