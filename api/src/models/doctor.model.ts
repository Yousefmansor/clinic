import mongoose, { Schema, type Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  specialty: string;
  phone: string;
  maxSlotsPerDay: number;
  status: "active" | "inactive" | "on-leave";
}

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
  },
  { timestamps: true },
);

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);
