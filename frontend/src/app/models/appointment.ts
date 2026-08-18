import type { Doctor } from "./doctor";
import type { Patient } from "./patient";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface Appointment {
  _id: string;
  patientId: string | Patient;
  doctorId: string | Doctor;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAppointmentInput {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

export interface UpdateAppointmentInput {
  status?: AppointmentStatus;
}
