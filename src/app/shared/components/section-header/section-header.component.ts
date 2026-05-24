import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <header class="mb-8">
      <p class="font-label text-sm uppercase tracking-widest text-accent-indigo">{{ eyebrow() }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold sm:text-4xl">{{ title() }}</h1>
      @if (subtitle()) {
        <p class="mt-2 max-w-2xl text-text-muted">{{ subtitle() }}</p>
      }
    </header>
  `,
})
export class SectionHeaderComponent {
  readonly eyebrow = input('Portfolio');
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
