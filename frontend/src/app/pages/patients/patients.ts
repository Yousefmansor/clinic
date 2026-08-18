import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PatientService } from "../../core/services/patient.service";
import type { Patient, CreatePatientInput } from "../../models/patient";

@Component({
  selector: "app-patients",
  imports: [FormsModule],
  templateUrl: "./patients.html",
  styleUrls: ["./patients.css"],
})
export class Patients implements OnInit {
  private readonly patientService = inject(PatientService);

  patients = signal<Patient[]>([]);
  loading = signal(false);
  message = signal("");
  editingPatientId = signal<string | null>(null);

  form: CreatePatientInput = {
    name: "",
    phone: "",
    age: 0,
    gender: "male",
    notes: "",
  };

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading.set(true);
    this.message.set("");

    this.patientService.getPatients().subscribe({
      next: (response) => {
        this.patients.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.message.set("Could not load patients");
        this.loading.set(false);
      },
    });
  }

  getBadgeClass(gender: string): string {
    return gender === "female" ? "badge-warning" : "badge-success";
  }

  resetForm(): void {
    this.form = {
      name: "",
      phone: "",
      age: 0,
      gender: "male",
      notes: "",
    };
  }

  savePatient(): void {
    this.message.set("");

    const editingId = this.editingPatientId();

    if (editingId) {
      this.patientService.updatePatient(editingId, this.form).subscribe({
        next: () => {
          this.message.set("Patient updated successfully");
          this.cancelEdit();
          this.loadPatients();
        },
        error: () => {
          this.message.set("Could not update patient");
        },
      });
      return;
    }

    this.patientService.createPatient(this.form).subscribe({
      next: () => {
        this.message.set("Patient added successfully");
        this.resetForm();
        this.loadPatients();
      },
      error: () => {
        this.message.set("Could not add patient");
      },
    });
  }

  deletePatient(id: string): void {
    const confirmed = window.confirm("Delete this patient?");
    if (!confirmed) return;

    this.patientService.deletePatient(id).subscribe({
      next: () => {
        this.message.set("Patient deleted");
        this.loadPatients();
      },
      error: () => {
        this.message.set("Could not delete patient");
      },
    });
  }

  startEdit(patient: Patient): void {
    this.editingPatientId.set(patient._id);
    this.form = {
      name: patient.name,
      phone: patient.phone,
      age: patient.age,
      gender: patient.gender,
      notes: patient.notes,
    };
  }

  cancelEdit(): void {
    this.editingPatientId.set(null);
    this.resetForm();
  }
}
