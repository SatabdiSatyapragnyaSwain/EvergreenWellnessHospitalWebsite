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

  constructor(private router: Router) {}

  isNavbarVisible: boolean = false;

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  isChildRouteActive(routes: string[]): boolean {
    return routes.some(route => this.router.url.includes(route));
  }

  onNavItemClick() {
    this.isNavbarVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (
      this.isNavbarVisible &&
      !targetElement.closest('.navbar') &&
      !targetElement.closest('.hamburger')
    ) {
      this.isNavbarVisible = false;
    }
  }
}
