export interface Patient {
  _id: string;
  name: string;
  phone: string;
  age: number;
  gender: "male" | "female";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePatientInput {
  name: string;
  phone: string;
  age: number;
  gender: "male" | "female";
  notes?: string;
}

export interface UpdatePatientInput {
  name?: string;
  phone?: string;
  age?: number;
  gender?: "male" | "female";
  notes?: string;
}
