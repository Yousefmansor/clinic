import { Routes } from "@angular/router";
import { DoctorsComponent } from "./doctors/doctors.component";
import { BookingComponent } from "./booking/booking.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { adminGuard } from "./admin.guard";

export const routes: Routes = [
  { path: "", redirectTo: "/doctors", pathMatch: "full" },
  { path: "doctors", component: DoctorsComponent },
  { path: "booking/:doctorId", component: BookingComponent },
  { path: "admin", component: AdminLoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [adminGuard] },
  { path: "**", redirectTo: "/doctors" },
];
