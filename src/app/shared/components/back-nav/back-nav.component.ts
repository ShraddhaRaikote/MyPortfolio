import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-nav',
  template: `
    <div class="row justify-content-center pt-3 pb-2">
      <div class="col-12 col-lg-10">
        <button
          type="button"
          (click)="goBack()"
          class="btn btn-outline-secondary rounded-pill d-inline-flex align-items-center gap-2"
        >
          <span class="material-symbols-outlined" style="font-size: 1.1rem">arrow_back</span>
          {{ backLabel() }}
        </button>
      </div>
    </div>
  `,
})
export class BackNavComponent {
  private readonly router = inject(Router);

  readonly backRoute = input<string>('/');
  readonly backLabel = input<string>('Back to home');

  goBack(): void {
    void this.router.navigate([this.backRoute()]);
  }
}
