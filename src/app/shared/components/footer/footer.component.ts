import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-footer',
  imports: [AsyncPipe],
  template: `
    @if (showFooter()) {
      @if (settings$ | async; as settings) {
        <footer class="position-relative border-top border-secondary border-opacity-25 py-4 mt-4" style="z-index: 1; background: transparent">
          <div class="container container-lg portfolio-container px-3 px-md-4">
            <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
              <p class="text-secondary small mb-0">&copy; {{ year }} Shraddha Raikote</p>
              <div class="d-flex gap-3">
                <a [href]="settings.githubUrl" target="_blank" rel="noopener noreferrer" class="text-secondary text-decoration-none small">GitHub</a>
                <a [href]="settings.linkedinUrl" target="_blank" rel="noopener noreferrer" class="text-secondary text-decoration-none small">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      }
    }
  `,
})
export class FooterComponent {
  private readonly content = inject(ContentService);
  private readonly router = inject(Router);

  readonly settings$ = this.content.getSiteSettings();
  readonly year = new Date().getFullYear();

  private readonly onHome = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.isHomeUrl()),
      startWith(this.isHomeUrl()),
    ),
    { initialValue: this.isHomeUrl() },
  );

  showFooter(): boolean {
    return this.onHome() ?? false;
  }

  private isHomeUrl(): boolean {
    const url = this.router.url.split('?')[0];
    return url === '/' || url === '';
  }
}
