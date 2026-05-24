import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { BackNavComponent } from '../../shared/components/back-nav/back-nav.component';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-project-detail',
  imports: [AsyncPipe, RouterLink, BackNavComponent, SkillBadgeComponent, ScrollRevealDirective],
  template: `
    <app-back-nav backRoute="/projects" backLabel="Back to projects" class="d-block position-relative" style="z-index: 2" />

    <div class="page-view pb-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-9">
          <a routerLink="/projects" class="text-decoration-none small text-primary">← All projects</a>

          @if (project$ | async; as project) {
            @if (project) {
              @if (project.image) {
                <img
                  appScrollReveal
                  [src]="project.image"
                  [alt]="project.title"
                  class="detail-image w-100 rounded-4 object-fit-cover mt-4"
                  style="height: 16rem; max-height: 20rem"
                />
              }

              <h1 appScrollReveal [delay]="0.06" class="detail-title font-display fw-bold display-5 text-light mt-4">{{ project.title }}</h1>
              <p appScrollReveal [delay]="0.1" class="detail-summary lead text-secondary">{{ project.summary }}</p>

              <div appScrollReveal [delay]="0.14" class="detail-tech d-flex flex-wrap gap-2 mt-3">
                @for (tech of project.tech; track tech) {
                  <app-skill-badge [label]="tech" />
                }
              </div>

              <div appScrollReveal [delay]="0.18" class="detail-links d-flex flex-wrap gap-2 mt-4">
                @if (project.liveUrl) {
                  <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary rounded-pill px-4">Live Demo</a>
                }
                @if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary rounded-pill px-4">GitHub</a>
                }
              </div>

              <div appScrollReveal [delay]="0.22" class="detail-body glass-panel mt-4 text-center text-lg-start">
                @for (paragraph of project.body.split('\n\n'); track paragraph) {
                  <p class="text-secondary mb-4" style="line-height: 1.8">{{ paragraph }}</p>
                }
              </div>
            } @else {
              <div appScrollReveal class="glass-panel mt-4 text-center">
                <p class="text-secondary">Project not found.</p>
                <a routerLink="/projects" class="btn btn-link text-primary">Back to projects</a>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  readonly project$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? ''),
    switchMap((slug) => this.content.getProjectBySlug(slug)),
  );
}
