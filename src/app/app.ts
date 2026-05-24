import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AmbientBackgroundComponent } from './shared/components/ambient-background/ambient-background.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { routeAnimations } from './shared/animations/route.animations';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AmbientBackgroundComponent, FooterComponent],
  animations: [routeAnimations],
  template: `
    <app-ambient-background />
    <main class="portfolio-main position-relative min-vh-100 text-light" style="z-index: 1">
      <div [@routeAnimations]="routeKey(outlet)" class="container container-lg portfolio-container px-3 px-md-4">
        <router-outlet #outlet="outlet" />
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.body.classList.add('portfolio-dark', 'text-light');

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          setTimeout(() => ScrollTrigger.refresh(), 400);
        });
      }
    });
  }

  routeKey(outlet: RouterOutlet): string {
    return outlet.isActivated ? outlet.activatedRoute.snapshot.url.map((s) => s.path).join('/') || 'home' : 'home';
  }
}
