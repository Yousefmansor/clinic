import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../api.service";

@Component({
  selector: "app-admin-login",
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./admin-login.component.html",
  styleUrl: "./admin-login.component.css",
})
export class AdminLoginComponent {
  email = "";
  password = "";
  message = "";
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {
    // لو مسجل دخول قبل كده ادخل مباشرة للوحة التحكم
    if (localStorage.getItem("admin_token")) {
      this.router.navigate(["/dashboard"]);
    }
  }

  login(): void {
    this.message = "";
    if (!this.email || !this.password) {
      this.message = "Please enter your email and password";
      return;
    }
    this.loading = true;
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.token) {
          // حفظ التوكن في المتصفح
          localStorage.setItem("admin_token", res.token);
          localStorage.setItem(
            "admin_name",
            res.admin?.name || "Admin",
          );
          this.router.navigate(["/dashboard"]);
        } else {
          this.message = res.message || "Invalid credentials";
        }
      },
      error: (err) => {
        this.loading = false;
        this.message = err?.error?.message || "Login failed";
      },
    });
  }
}
