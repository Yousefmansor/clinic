// الواجهات المشتركة بين الفرونت إند والباك إند

// جدول عمل الدكتور: الأيام المتاحة + ساعات الشغل
export interface DoctorSchedule {
  // days: أرقام الأيام المتاحة (0=الأحد، 1=الاثنين، ... 6=السبت)
  days: number[];
  // start: بداية الشغل مثل "09:00"
  start: string;
  // end: نهاية الشغل مثل "17:00"
  end: string;
  // duration: مدة الموعد بالدقائق مثل 30 أو 60
  duration: number;
}

export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  phone: string;
  maxSlotsPerDay: number;
  status: "active" | "inactive" | "on-leave";
  schedule: DoctorSchedule;
  bio?: string;
  image?: string;
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
