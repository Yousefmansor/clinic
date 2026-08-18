import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  template: `
    <!-- شريط التنقل العلوي -->
    <header class="topbar">
      <div class="topbar-inner">
        <a routerLink="/doctors" class="logo">
          <span class="logo-icon">&#10010;</span>
          <div>
            <strong>Care Clinic</strong>
            <small>Your health, our priority</small>
          </div>
        </a>
        <nav>
          <a routerLink="/doctors" routerLinkActive="active">Doctors</a>
          <a routerLink="/admin" routerLinkActive="active">Sign In</a>
        </nav>
      </div>
    </header>

    <!-- محتوى الصفحات -->
    <main><router-outlet></router-outlet></main>

    <!-- الفوتر -->
    <footer class="site-footer">
      <p>&copy; 2023 Care Clinic. All rights reserved.</p>
    </footer>
  `,
})
export class AppComponent {}
