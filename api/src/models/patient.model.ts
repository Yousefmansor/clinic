import { model, Schema } from "mongoose";

export interface PatientDocument {
  name: string;
  phone: string;
  age: number;
  gender: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<PatientDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = model<PatientDocument>("Patient", patientSchema);
