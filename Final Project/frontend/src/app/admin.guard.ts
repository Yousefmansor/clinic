import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";

// حارس يضمن أن الأدمن سجل دخوله قبل دخول لوحة التحكم
export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem("admin_token");
  if (!token) {
    // غير مسجل دخول — تحويل لصفحة تسجيل الدخول
    return router.createUrlTree(["/admin"]);
  }
  return true;
};
