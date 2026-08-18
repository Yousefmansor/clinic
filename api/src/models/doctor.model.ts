import mongoose, { Schema, type Document } from "mongoose";

// جدول عمل الدكتور (الأيام المتاحة + ساعات الشغل)
export interface IDoctorSchedule {
  days: number[]; // أرقام الأيام: 0=الأحد ... 6=السبت
  start: string; // بداية الشغل مثل "09:00"
  end: string; // نهاية الشغل مثل "17:00"
  duration: number; // مدة الموعد بالدقائق
}

export interface IDoctor extends Document {
  name: string;
  specialty: string;
  phone: string;
  maxSlotsPerDay: number;
  status: "active" | "inactive" | "on-leave";
  schedule: IDoctorSchedule;
}

// الأيام الافتراضية: من الأحد (0) إلى الخميس (4)
const defaultSchedule: IDoctorSchedule = {
  days: [0, 1, 2, 3, 4],
  start: "09:00",
  end: "17:00",
  duration: 30,
};

const scheduleSchema = new Schema<IDoctorSchedule>({
  days: { type: [Number], default: defaultSchedule.days },
  start: { type: String, default: defaultSchedule.start },
  end: { type: String, default: defaultSchedule.end },
  duration: { type: Number, default: defaultSchedule.duration },
});

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    phone: { type: String, required: true },
    maxSlotsPerDay: { type: Number, default: 10 },
    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
    },
    schedule: { type: scheduleSchema, default: () => defaultSchedule },
  },
  { timestamps: true },
);

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);
