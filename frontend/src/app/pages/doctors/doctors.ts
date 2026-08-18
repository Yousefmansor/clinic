import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { DoctorService } from "../../core/services/doctor.service";
import type { Doctor, CreateDoctorInput } from "../../models/doctor";

@Component({
  selector: "app-doctors",
  imports: [FormsModule],
  templateUrl: "./doctors.html",
  styleUrls: ["./doctors.css"],
})
export class Doctors implements OnInit {
  private readonly doctorService = inject(DoctorService);

  doctors = signal<Doctor[]>([]);
  loading = signal(false);
  message = signal("");
  editingDoctorId = signal<string | null>(null);

  form: CreateDoctorInput = {
    name: "",
    specialty: "",
    phone: "",
    status: "active",
    maxSlotsPerDay: 10,
    bookedSlots: 0,
  };

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading.set(true);
    this.message.set("");

    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.doctors.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.message.set("Could not load doctors");
        this.loading.set(false);
      },
    });
  }

  getBadgeClass(status: string): string {
    if (status === "active") return "badge-success";
    if (status === "inactive") return "badge-danger";
    return "badge-warning";
  }

  getRemainingSlots(doctor: Doctor): number {
    return Math.max(doctor.maxSlotsPerDay - doctor.bookedSlots, 0);
  }

  resetForm(): void {
    this.form = {
      name: "",
      specialty: "",
      phone: "",
      status: "active",
      maxSlotsPerDay: 10,
      bookedSlots: 0,
    };
  }

  saveDoctor(): void {
    this.message.set("");

    const editingId = this.editingDoctorId();

    if (editingId) {
      this.doctorService.updateDoctor(editingId, this.form).subscribe({
        next: () => {
          this.message.set("Doctor updated successfully");
          this.cancelEdit();
          this.loadDoctors();
        },
        error: () => {
          this.message.set("Could not update doctor");
        },
      });
      return;
    }

    this.doctorService.createDoctor(this.form).subscribe({
      next: () => {
        this.message.set("Doctor added successfully");
        this.resetForm();
        this.loadDoctors();
      },
      error: () => {
        this.message.set("Could not add doctor");
      },
    });
  }

  deleteDoctor(id: string): void {
    const confirmed = window.confirm("Delete this doctor?");
    if (!confirmed) return;

    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.message.set("Doctor deleted");
        this.loadDoctors();
      },
      error: () => {
        this.message.set("Could not delete doctor");
      },
    });
  }

  startEdit(doctor: Doctor): void {
    this.editingDoctorId.set(doctor._id);
    this.form = {
      name: doctor.name,
      specialty: doctor.specialty,
      phone: doctor.phone,
      status: doctor.status,
      maxSlotsPerDay: doctor.maxSlotsPerDay,
      bookedSlots: doctor.bookedSlots,
    };
  }

  cancelEdit(): void {
    this.editingDoctorId.set(null);
    this.resetForm();
  }
}
