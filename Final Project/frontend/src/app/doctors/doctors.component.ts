import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../api.service";
import { Doctor } from "../types";

@Component({
  selector: "app-doctors",
  imports: [CommonModule, FormsModule],
  templateUrl: "./doctors.component.html",
  styleUrl: "./doctors.component.css",
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  // التخصصات المتاحة للتصفية
  specialties: string[] = [];
  selectedSpecialty = "";
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.api.getDoctors().subscribe({
      next: (res) => {
        this.doctors = res.data;
        // استخراج التخصصات الموجودة بدون تكرار
        this.specialties = Array.from(new Set(this.doctors.map((d) => d.specialty)));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  // تطبيق الفلتر حسب التخصص
  get filtered(): Doctor[] {
    if (!this.selectedSpecialty) return this.doctors;
    return this.doctors.filter((d) => d.specialty === this.selectedSpecialty);
  }

  bookDoctor(id: string): void {
    this.router.navigate(["/booking", id]);
  }

  resetFilters(): void {
    this.selectedSpecialty = "";
  }

  // أخذ أول حرفين من اسم الدكتور للأفاتار
  initials(name: string): string {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  }
}
