import { Routes } from "@angular/router";

import { Doctors } from "./pages/doctors/doctors";
import { Patients } from "./pages/patients/patients";
import { Appointments } from "./pages/appointments/appointments";

export const routes: Routes = [
  { path: "", redirectTo: "doctors", pathMatch: "full" },
  { path: "doctors", component: Doctors },
  { path: "patients", component: Patients },
  { path: "appointments", component: Appointments },
  { path: "**", redirectTo: "doctors" },
];
