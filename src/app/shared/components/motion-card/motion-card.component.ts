import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-motion-card',
  template: `
    <button
      type="button"
      (click)="go()"
      class="motion-card btn w-100 text-start p-4 p-md-5 rounded-4 border position-relative overflow-hidden"
      style="background: rgba(8,8,12,0.98)"
    >
      <div class="position-absolute top-0 end-0 rounded-circle opacity-25" style="width:12rem;height:12rem;background:#6366f1;filter:blur(60px);transform:translate(30%,-30%)"></div>

      <div class="position-relative">
        <span class="section-eyebrow">{{ eyebrow() }}</span>
        <h3 class="mt-3 font-display fw-bold fs-3 text-light">{{ title() }}</h3>
        <p class="mt-2 text-secondary mb-0" style="max-width: 36rem">{{ description() }}</p>
        <span class="btn btn-outline-primary rounded-pill mt-4 d-inline-flex align-items-center gap-2">
          {{ cta() }}
          <span class="material-symbols-outlined">arrow_forward</span>
        </span>
      </div>
    </button>
  `,
})
export class MotionCardComponent {
  private readonly router = inject(Router);

  readonly route = input.required<string>();
  readonly eyebrow = input('Explore');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly cta = input('View more');

  go(): void {
    void this.router.navigateByUrl(this.route());
  }
}
