import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-headerbar',
  standalone: true,
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css'],
  imports: [RouterModule],
})
export class HeaderbarComponent {
  isNavbarVisible = false;
  isPopupVisible = false;

  constructor(private router: Router) {}

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.toggle('active');
    }
  }

  onNavItemClick() {
    this.isNavbarVisible = false;
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
  }

  isChildRouteActive(routes: string[]): boolean {
    return routes.some((route) =>
      this.router.isActive(route, {
        paths: 'exact',
        queryParams: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored',
      }),
    );
  }

  toggleDropdown(event: Event) {
    const dropdown = (event.target as HTMLElement).parentElement;
    if (dropdown && window.innerWidth <= 768) {
      dropdown.classList.toggle('active');
    }
  }

  showPopup() {
    this.isPopupVisible = true;
    this.isNavbarVisible = false;
  }

  hidePopup() {
    this.isPopupVisible = false;
    this.onNavItemClick();
  }
}
