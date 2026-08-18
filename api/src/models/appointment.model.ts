import mongoose, { Schema, type Document, type Types } from "mongoose";

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  time: string;
  visitType: "new" | "returning";
  reason: string[];
  status: "pending" | "confirmed" | "cancelled";
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    visitType: { type: String, enum: ["new", "returning"], default: "new" },
    reason: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema,
);
