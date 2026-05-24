import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="['/projects', project().slug]"
      class="d-block text-decoration-none glass-surface rounded-4 overflow-hidden h-100 transition"
      style="transition: transform 0.3s ease, box-shadow 0.3s ease"
    >
      @if (project().image) {
        <div class="position-relative overflow-hidden">
          <img [src]="project().image" [alt]="project().title" class="w-100 object-fit-cover" style="height: 10rem" />
          <div class="position-absolute bottom-0 start-0 w-100" style="height: 4rem; background: linear-gradient(transparent, #0a0a0f)"></div>
        </div>
      }
      <div class="p-4">
        <small class="section-eyebrow">{{ project().tech[0] }}</small>
        <h3 class="font-display fs-6 fw-semibold text-light mt-2">{{ project().title }}</h3>
        <p class="small text-secondary mb-0 mt-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden">{{ project().summary }}</p>
      </div>
    </a>
  `,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
