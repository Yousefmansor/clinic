import { model, Schema } from "mongoose";

export type DoctorStatus = "active" | "inactive" | "on-leave";

export interface DoctorDocument {
  name: string;
  specialty: string;
  phone: string;
  status: DoctorStatus;
  maxSlotsPerDay: number;
  bookedSlots: number;
  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema = new Schema<DoctorDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
    },
    maxSlotsPerDay: {
      type: Number,
      required: true,
      min: 1,
      default: 10,
    },
    bookedSlots: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = model<DoctorDocument>("Doctor", doctorSchema);
