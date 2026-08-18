import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppointmentService } from "../../core/services/appointment.service";
import { DoctorService } from "../../core/services/doctor.service";
import { PatientService } from "../../core/services/patient.service";
import type { Appointment, CreateAppointmentInput } from "../../models/appointment";
import type { Doctor } from "../../models/doctor";
import type { Patient } from "../../models/patient";

@Component({
  selector: "app-appointments",
  imports: [FormsModule],
  templateUrl: "./appointments.html",
  styleUrls: ["./appointments.css"],
})
export class Appointments implements OnInit {
  private readonly appointmentService = inject(AppointmentService);
  private readonly doctorService = inject(DoctorService);
  private readonly patientService = inject(PatientService);

  appointments = signal<Appointment[]>([]);
  doctors = signal<Doctor[]>([]);
  patients = signal<Patient[]>([]);
  loading = signal(false);
  message = signal("");

  form: CreateAppointmentInput = {
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  };

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  loadAppointments(): void {
    this.loading.set(true);
    this.message.set("");

    this.appointmentService.getAppointments().subscribe({
      next: (response) => {
        this.appointments.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.message.set("Could not load appointments");
        this.loading.set(false);
      },
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.doctors.set(response.data);
      },
      error: () => {},
    });
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (response) => {
        this.patients.set(response.data);
      },
      error: () => {},
    });
  }

  getDoctorName(doctorId: string | Doctor): string {
    if (typeof doctorId === "string") return doctorId;
    return doctorId.name;
  }

  getPatientName(patientId: string | Patient): string {
    if (typeof patientId === "string") return patientId;
    return patientId.name;
  }

  getStatusBadge(status: string): string {
    if (status === "confirmed") return "badge-success";
    if (status === "cancelled") return "badge-danger";
    return "badge-warning";
  }

  saveAppointment(): void {
    this.message.set("");

    this.appointmentService.createAppointment(this.form).subscribe({
      next: () => {
        this.message.set("Appointment booked successfully");
        this.resetForm();
        this.loadAppointments();
      },
      error: (err) => {
        this.message.set(
          err.error?.message || "Could not book appointment"
        );
      },
    });
  }

  cancelAppointment(id: string): void {
    this.appointmentService
      .updateAppointment(id, { status: "cancelled" })
      .subscribe({
        next: () => {
          this.message.set("Appointment cancelled");
          this.loadAppointments();
        },
        error: () => {
          this.message.set("Could not cancel appointment");
        },
      });
  }

  confirmAppointment(id: string): void {
    this.appointmentService
      .updateAppointment(id, { status: "confirmed" })
      .subscribe({
        next: () => {
          this.message.set("Appointment confirmed");
          this.loadAppointments();
        },
        error: () => {
          this.message.set("Could not confirm appointment");
        },
      });
  }

  deleteAppointment(id: string): void {
    const confirmed = window.confirm("Delete this appointment?");
    if (!confirmed) return;

    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.message.set("Appointment deleted");
        this.loadAppointments();
      },
      error: () => {
        this.message.set("Could not delete appointment");
      },
    });
  }

  resetForm(): void {
    this.form = {
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
    };
  }
}
