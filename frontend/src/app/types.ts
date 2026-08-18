// الواجهات المشتركة بين الفرونت إند والباك إند

export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  maxSlotsPerDay: number;
  status: "active" | "inactive" | "on-leave";
}

export interface Patient {
  _id: string;
  name: string;
  phone: string;
  countryCode: string;
}

export interface Appointment {
  _id: string;
  patient: Patient;
  doctor: Doctor;
  date: string;
  time: string;
  visitType: "new" | "returning";
  status: "pending" | "confirmed" | "cancelled";
}

// واجهة بيانات تسجيل الدخول
export interface LoginResponse {
  success: boolean;
  token?: string;
  admin?: { name: string; email: string };
  message?: string;
}
