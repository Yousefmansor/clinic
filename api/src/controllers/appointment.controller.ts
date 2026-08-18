import type { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";

// تحويل نص الوقت "09:30" إلى دقائق منذ منتصف الليل
function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

// توليد السلات المتاحة لدكتور في تاريخ معين بناءً على جدوله
function generateSlots(
  start: string,
  end: string,
  duration: number,
): string[] {
  const startMin = toMinutes(start);
  const endMin = toMinutes(end);
  const slots: string[] = [];
  for (let t = startMin; t + duration <= endMin; t += duration) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    slots.push(
      `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`,
    );
  }
  return slots;
}

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

// جلب السلات المتاحة لدكتور في تاريخ معين (متاح للجميع)
export async function availableSlots(
  req: Request,
  res: Response,
): Promise<void> {
  const { doctorId, date } = req.query;
  if (!doctorId || !date) {
    res
      .status(400)
      .json({ success: false, message: "doctorId and date are required" });
    return;
  }

  // التحقق من صحة doctorId (ObjectId صحيح من 24 خانة سداسية)
  if (!/^[a-fA-F0-9]{24}$/.test(String(doctorId))) {
    res.status(400).json({ success: false, message: "Invalid doctor id" });
    return;
  }

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(404).json({ success: false, message: "Doctor not found" });
    return;
  }
  if (doctor.status !== "active") {
    res.status(400).json({ success: false, message: "Doctor is not available" });
    return;
  }

  // قراءة التاريخ من الـ query بصيغة YYYY-MM-DD بالتوقيت المحلي
  const dateStr = String(date);
  const selected = new Date(`${dateStr}T00:00:00.000Z`);
  const dayOfWeek = selected.getDay();

  // التأكد أن اليوم من أيام عمل الدكتور
  if (!doctor.schedule.days.includes(dayOfWeek)) {
    res.json({ success: true, data: { slots: [], date: dateStr } });
    return;
  }

  // توليد السلات من جدول الدكتور
  const slots = generateSlots(
    doctor.schedule.start,
    doctor.schedule.end,
    doctor.schedule.duration,
  );

  // معرفة السلات المحجوزة بالفعل في هذا اليوم
  const booked = await Appointment.find({
    doctor: doctorId,
    date: {
      $gte: new Date(`${dateStr}T00:00:00.000Z`),
      $lt: new Date(`${dateStr}T23:59:59.999Z`),
    },
    status: { $ne: "cancelled" },
  }).select("time");
  const bookedTimes = booked.map((a) => a.time);

  // السلات المتاحة = السلات المولدة - المحجوزة
  const available = slots.filter((s) => !bookedTimes.includes(s));

  res.json({ success: true, data: { slots: available, date: dateStr } });
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

  // التأكد أن التاريخ يقع في يوم من أيام عمل الدكتور
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay();
  if (!doctor.schedule.days.includes(dayOfWeek)) {
    res
      .status(400)
      .json({ success: false, message: "Doctor does not work on this day" });
    return;
  }

  // التأكد أن الوقت يقع داخل ساعات شغل الدكتور
  const timeMin = toMinutes(time);
  const startMin = toMinutes(doctor.schedule.start);
  const endMin = toMinutes(doctor.schedule.end);
  if (
    timeMin < startMin ||
    timeMin + doctor.schedule.duration > endMin
  ) {
    res
      .status(400)
      .json({ success: false, message: "Time is outside working hours" });
    return;
  }

  // التحقق من عدم التكرار في نفس الموعد
  const booked = await Appointment.countDocuments({
    doctor: doctorId,
    date: new Date(date),
    time,
    status: { $ne: "cancelled" },
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
