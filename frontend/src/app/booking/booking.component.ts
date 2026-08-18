import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../api.service";
import { Doctor } from "../types";

// أوقات المواعيد المتاحة خلال اليوم (مثل الواير فريم)
const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

// خيارات الكود الدولي
const COUNTRY_CODES = ["+20", "+966", "+971", "+996", "+1"];

@Component({
  selector: "app-booking",
  imports: [CommonModule, FormsModule],
  templateUrl: "./booking.component.html",
  styleUrl: "./booking.component.css",
})
export class BookingComponent implements OnInit {
  doctor: Doctor | null = null;

  // الخطوة الحالية (1: بيانات المريض، 2: التاريخ والوقت)
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
  timeSlots = TIME_SLOTS;

  // رسالة النجاح أو الخطأ
  message = "";
  done = false;
  loading = true;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("doctorId") || "";
    // تحميل بيانات الدكتور المختار
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

  // الانتقال للخطوة الثانية بعد التحقق من الحقول
  nextStep(): void {
    this.message = "";
    if (!this.fullName.trim() || !this.phone.trim()) {
      this.message = "Please fill in your name and phone number";
      return;
    }
    if (!this.date || !this.time) {
      this.message = "Please select a date and a time";
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

  goHome(): void {
    this.router.navigate(["/doctors"]);
  }
}
