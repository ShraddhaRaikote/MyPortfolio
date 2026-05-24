import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, SectionHeaderComponent, GlassCardComponent],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <app-section-header eyebrow="404" title="Page not found" subtitle="The page you are looking for does not exist." />
      <app-glass-card className="max-w-md">
        <a routerLink="/" class="font-label text-sm text-accent-indigo hover:underline">← Back to home</a>
      </app-glass-card>
    </div>
  `,
})
export class NotFoundComponent {}
