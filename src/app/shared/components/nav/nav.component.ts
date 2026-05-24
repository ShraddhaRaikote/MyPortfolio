import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  template: `
    <header
      class="navbar navbar-dark fixed-top transition"
      [class.nav-scrolled]="scrolled()"
      [class.bg-transparent]="!scrolled()"
      [class.bg-black]="scrolled()"
    >
      <div class="container container-lg portfolio-container px-3 px-md-4">
        <div class="d-flex w-100 justify-content-center py-2">
          <a routerLink="/" class="navbar-brand mb-0 font-display fw-bold text-gradient fs-4">SR</a>
        </div>
      </div>
    </header>
    <div style="height: 4.5rem" aria-hidden="true"></div>
  `,
})
export class NavComponent {
  readonly scrolled = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => this.scrolled.set(window.scrollY > 24), { passive: true });
    }
  }
}
