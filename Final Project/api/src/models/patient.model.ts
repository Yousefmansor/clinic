import mongoose, { Schema, type Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  phone: string;
  countryCode: string;
}

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+996" },
  },
  { timestamps: true },
);

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
