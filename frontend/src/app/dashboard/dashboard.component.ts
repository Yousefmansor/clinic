import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../api.service";
import { Appointment, Doctor } from "../types";

// أسماء الأيام لعرضها في صفحة تعديل جدول الدكتور
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  dayNames = DAY_NAMES;

  // تبويب الصفحة: 'appointments' أو 'doctors'
  tab: "appointments" | "doctors" = "appointments";

  // إدارة الدكاترة
  doctors: Doctor[] = [];
  editingDoctor: Doctor | null = null;
  editDays: boolean[] = [];
  editStart = "09:00";
  editEnd = "17:00";
  editDuration = 30;

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

  // ---------------- تبويب الدكاترة ----------------
  switchTab(tab: "appointments" | "doctors"): void {
    this.tab = tab;
    this.editingDoctor = null;
    if (tab === "doctors" && this.doctors.length === 0) {
      this.loadDoctors();
    }
  }

  loadDoctors(): void {
    this.api.getDoctors().subscribe({
      next: (res) => {
        this.doctors = res.data;
      },
      error: () => {},
    });
  }

  // فتح نموذج تعديل جدول الدكتور
  openEdit(doc: Doctor): void {
    this.editingDoctor = doc;
    // تحويل أيام العمل إلى مصفوفة checkbox
    this.editDays = [false, false, false, false, false, false, false];
    doc.schedule.days.forEach((d) => (this.editDays[d] = true));
    this.editStart = doc.schedule.start;
    this.editEnd = doc.schedule.end;
    this.editDuration = doc.schedule.duration;
  }

  // حفظ جدول الدكتور بعد التعديل
  saveSchedule(): void {
    if (!this.editingDoctor) return;
    const days = this.editDays
      .map((v, i) => (v ? i : -1))
      .filter((i) => i >= 0);

    // التحقق من وجود يوم واحد على الأقل وأن البداية قبل النهاية
    if (days.length === 0 || this.editStart >= this.editEnd) {
      alert("Please select at least one working day and valid hours");
      return;
    }

    this.api
      .updateSchedule(this.editingDoctor._id, {
        days,
        start: this.editStart,
        end: this.editEnd,
        duration: this.editDuration,
      })
      .subscribe({
        next: () => {
          this.editingDoctor = null;
          this.loadDoctors();
        },
        error: () => {},
      });
  }

  cancelEdit(): void {
    this.editingDoctor = null;
  }

  // حذف دكتور
  deleteDoctor(id: string): void {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    this.api.deleteDoctor(id).subscribe({
      next: () => this.loadDoctors(),
      error: () => {},
    });
  }

  // تسجيل الخروج
  logout(): void {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    this.router.navigate(["/admin"]);
  }

  // عرض أسماء الأيام المختصرة للدكتور
  dayList(doc: Doctor): string {
    return doc.schedule.days.map((d) => DAY_NAMES[d].slice(0, 3)).join(", ");
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
