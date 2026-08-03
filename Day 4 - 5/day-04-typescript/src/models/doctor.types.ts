// models/doctor.types.ts

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'active' | 'inactive' | 'on-leave';
  maxSlotsPerDay: number;
  bookedSlots: number;
}
