import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_BASE_URL } from "../api.config";
import type { ApiResponse } from "../../models/api-response";
import type {
  CreatePatientInput,
  Patient,
  UpdatePatientInput,
} from "../../models/patient";

@Injectable({ providedIn: "root" })
export class PatientService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/patients`;

  getPatients(): Observable<ApiResponse<Patient[]>> {
    return this.http.get<ApiResponse<Patient[]>>(this.url);
  }

  getPatientById(id: string): Observable<ApiResponse<Patient>> {
    return this.http.get<ApiResponse<Patient>>(`${this.url}/${id}`);
  }

  createPatient(patient: CreatePatientInput): Observable<ApiResponse<Patient>> {
    return this.http.post<ApiResponse<Patient>>(this.url, patient);
  }

  updatePatient(
    id: string,
    updates: UpdatePatientInput
  ): Observable<ApiResponse<Patient>> {
    return this.http.patch<ApiResponse<Patient>>(`${this.url}/${id}`, updates);
  }

  deletePatient(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.url}/${id}`
    );
  }
}
