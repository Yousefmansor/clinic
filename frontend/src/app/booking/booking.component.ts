import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../api.service";
import { Doctor } from "../types";

// خيارات الكود الدولي
const COUNTRY_CODES = ["+20", "+966", "+971", "+996", "+1"];

// أسماء الأيام بالإنجليزية لعرضها في الاختيار
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
  selector: "app-booking",
  imports: [CommonModule, FormsModule],
  templateUrl: "./booking.component.html",
  styleUrl: "./booking.component.css",
})
export class BookingComponent implements OnInit {
  doctor: Doctor | null = null;

  // الخطوة الحالية (1: بيانات المريض + التاريخ والوقت، 2: التأكيد)
  step = 1;

  // بيانات المريض
  fullName = "";
  phone = "";
  countryCode = "+20";
  visitType: "new" | "returning" = "new";
  generalConsultation = false;
  followUp = false;

  // التاريخ والوقت
  date = "";
  time = "";
  timeSlots: string[] = [];
  dayNames = DAY_NAMES;

  // رسالة النجاح أو الخطأ
  message = "";
  done = false;
  loading = true;
  loadingSlots = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("doctorId") || "";
    // تحميل بيانات الدكتور المختار (ومعه جدول عمله)
    this.api.getDoctors().subscribe({
      next: (res) => {
        this.doctor = res.data.find((d) => d._id === id) || null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get countryCodes(): string[] {
    return COUNTRY_CODES;
  }

  // هل اليوم من أيام عمل الدكتور؟
  isWorkingDay(dateStr: string): boolean {
    if (!this.doctor) return false;
    const d = new Date(dateStr + "T00:00:00");
    return this.doctor.schedule.days.includes(d.getDay());
  }

  // تحميل السلات المتاحة عند اختيار التاريخ
  onDateChange(): void {
    this.time = "";
    this.timeSlots = [];
    this.message = "";
    if (!this.date || !this.doctor) return;

    if (!this.isWorkingDay(this.date)) {
      this.message = "This doctor does not work on this day";
      return;
    }

    // جلب السلات المتاحة من الباك إند بناءً على جدول الدكتور
    this.loadingSlots = true;
    this.api.getAvailableSlots(this.doctor._id, this.date).subscribe({
      next: (res) => {
        this.timeSlots = res.data.slots;
        this.loadingSlots = false;
      },
      error: () => {
        this.loadingSlots = false;
        this.timeSlots = [];
      },
    });
  }

  // الانتقال لخطوة التأكيد بعد التحقق من الحقول
  nextStep(): void {
    this.message = "";
    if (!this.fullName.trim() || !this.phone.trim()) {
      this.message = "Please fill in your name and phone number";
      return;
    }
    if (!this.date || !this.time) {
      this.message = "Please select an available date and time";
      return;
    }
    this.step = 2;
  }

  prevStep(): void {
    this.message = "";
    this.step = 1;
  }

  // تأكيد الحجز
  confirm(): void {
    this.message = "";
    const reasons: string[] = [];
    if (this.generalConsultation) reasons.push("General Consultation");
    if (this.followUp) reasons.push("Follow up");

    // أولاً إنشاء المريض، ثم الحجز
    this.api
      .createPatient({
        name: this.fullName,
        phone: this.phone,
        countryCode: this.countryCode,
      })
      .subscribe({
        next: (res) => {
          this.api
            .createAppointment({
              doctorId: this.doctor!._id,
              date: this.date,
              time: this.time,
              patientId: res.data._id,
              visitType: this.visitType,
              reason: reasons,
            })
            .subscribe({
              next: () => {
                this.done = true;
              },
              error: (err) => {
                this.message =
                  err?.error?.message || "Failed to book. Please try again.";
              },
            });
        },
        error: (err) => {
          this.message =
            err?.error?.message || "Failed to save your data. Please try again.";
        },
      });
  }

  // أقل تاريخ مسموح = اليوم
  minDate(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  goHome(): void {
    this.router.navigate(["/doctors"]);
  }
}
