import mongoose, { Schema, type Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  email: string;
  password: string;
  name: string;
  comparePassword(plain: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "Admin" },
});

adminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.comparePassword = function (plain: string): Promise<boolean> {
  return bcrypt.compare(plain, this.password);
};

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
