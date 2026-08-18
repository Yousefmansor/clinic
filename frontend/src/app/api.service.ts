import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Doctor, Patient, Appointment, LoginResponse } from "./types";

// عنوان الباك إند (المسار النسبي يعيد التوجيه عبر proxy.conf.json في وضع التطوير)
const BASE = "/api";

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  // ---------------- الدكاترة ----------------
  getDoctors(): Observable<{ success: boolean; data: Doctor[] }> {
    return this.http.get<{ success: boolean; data: Doctor[] }>(`${BASE}/doctors`);
  }

  // جلب السلات المتاحة لدكتور في تاريخ معين
  getAvailableSlots(
    doctorId: string,
    date: string,
  ): Observable<{ success: boolean; data: { slots: string[]; date: string } }> {
    return this.http.get<any>(`${BASE}/appointments/available-slots`, {
      params: { doctorId, date },
    });
  }

  // تعديل جدول عمل الدكتور (أدمن)
  updateSchedule(
    doctorId: string,
    schedule: { days: number[]; start: string; end: string; duration: number },
  ): Observable<any> {
    return this.http.patch(`${BASE}/doctors/${doctorId}`, { schedule }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}` },
    });
  }

  // ---------------- المرضى ----------------
  createPatient(body: {
    name: string;
    phone: string;
    countryCode: string;
  }): Observable<{ success: boolean; data: Patient }> {
    return this.http.post<{ success: boolean; data: Patient }>(`${BASE}/patients`, body);
  }

  // ---------------- الحجوزات ----------------
  createAppointment(body: {
    doctorId: string;
    date: string;
    time: string;
    patientId: string;
    visitType: "new" | "returning";
    reason: string[];
  }): Observable<{ success: boolean; data: Appointment }> {
    return this.http.post<{ success: boolean; data: Appointment }>(
      `${BASE}/appointments`,
      body,
    );
  }

  // ---------------- الأدمن ----------------
  login(body: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE}/auth/login`, body);
  }

  getTodayAppointments(): Observable<{
    success: boolean;
    data: { appointments: Appointment[]; total: number; newPatients: number };
  }> {
    return this.http.get<any>(`${BASE}/appointments/today`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}` },
    });
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${BASE}/appointments/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}` },
    });
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${BASE}/doctors/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}` },
    });
  }
}
