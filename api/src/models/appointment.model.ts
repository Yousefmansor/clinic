import { model, Schema, Types } from "mongoose";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface AppointmentDocument {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    reason: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = model<AppointmentDocument>(
  "Appointment",
  appointmentSchema
);
