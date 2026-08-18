export type DoctorStatus = "active" | "inactive" | "on-leave";

export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  status: DoctorStatus;
  maxSlotsPerDay: number;
  bookedSlots: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDoctorInput {
  name: string;
  specialty: string;
  phone: string;
  status: DoctorStatus;
  maxSlotsPerDay: number;
  bookedSlots?: number;
}

export interface UpdateDoctorInput {
  name?: string;
  specialty?: string;
  phone?: string;
  status?: DoctorStatus;
  maxSlotsPerDay?: number;
  bookedSlots?: number;
}
