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
}
