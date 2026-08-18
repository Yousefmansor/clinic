import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../api.service";
import { Appointment } from "../types";

@Component({
  selector: "app-dashboard",
  imports: [CommonModule, FormsModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  total = 0;
  newPatients = 0;
  loading = true;

  // بيانات الأدمن من المتصفح
  adminName = localStorage.getItem("admin_name") || "Admin";

  constructor(
    private api: ApiService,
    private router: Router,
  ) {
    // حماية الصفحة: لو مفيش توكن ارجع لصفحة الدخول
    if (!localStorage.getItem("admin_token")) {
      this.router.navigate(["/admin"]);
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.api.getTodayAppointments().subscribe({
      next: (res) => {
        this.appointments = res.data.appointments;
        this.total = res.data.total;
        this.newPatients = res.data.newPatients;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  // تغيير حالة الموعد
  setStatus(id: string, status: string): void {
    this.api.updateStatus(id, status).subscribe({
      next: () => this.loadData(),
      error: () => {},
    });
  }

  // تسجيل الخروج
  logout(): void {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    this.router.navigate(["/admin"]);
  }

  get statusClass(): (s: string) => string {
    return (s: string) =>
      s === "confirmed"
        ? "badge-confirmed"
        : s === "cancelled"
          ? "badge-cancelled"
          : "badge-pending";
  }
}
