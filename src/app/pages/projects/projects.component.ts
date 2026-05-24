import { Component, inject, signal, computed } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../core/services/content.service';
import { BackNavComponent } from '../../shared/components/back-nav/back-nav.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  imports: [AsyncPipe, BackNavComponent, ProjectCardComponent, ScrollRevealDirective],
  template: `
    <app-back-nav class="d-block position-relative" style="z-index: 2" />

    <div class="page-view pb-5">
      <div class="row justify-content-center mb-5">
        <div class="col-12 col-lg-10 text-center">
          <header appScrollReveal class="page-header">
            <p class="section-eyebrow mb-2">Work</p>
            @if (settings$ | async; as settings) {
              <h1 class="font-display fw-bold display-5 mb-3">
                <span class="text-gradient">{{ settings.projectsPageTitle }}</span>
              </h1>
            }
            <p class="text-secondary mx-auto mb-0" style="max-width: 32rem">
              Apps, tools, and experiments — each built with care for design and performance.
            </p>
          </header>
        </div>
      </div>

      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-10">
          <div appScrollReveal [delay]="0.08" class="d-flex flex-wrap justify-content-center gap-2">
            <button type="button" (click)="setFilter('all')" [class]="filterButtonClass('all')">All</button>
            @for (tag of allTags(); track tag) {
              <button type="button" (click)="setFilter(tag)" [class]="filterButtonClass(tag)">{{ tag }}</button>
            }
          </div>
        </div>
      </div>

      @if (projects$ | async; as projects) {
        <div class="row g-4 justify-content-center">
          @for (project of filteredProjects(projects); track project.id; let i = $index) {
            <div class="col-sm-6 col-lg-4" appScrollReveal [delay]="i * 0.06">
              <app-project-card [project]="project" />
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class ProjectsComponent {
  private readonly content = inject(ContentService);
  readonly settings$ = this.content.getSiteSettings();
  readonly projects$ = this.content.getProjects();
  readonly activeFilter = signal('all');

  readonly allTags = computed(() => {
    const projects = this.projectsSnapshot();
    const tags = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  });

  private readonly projectsSnapshot = toSignal(this.projects$, { initialValue: [] });

  setFilter(tag: string): void {
    this.activeFilter.set(tag);
  }

  filterButtonClass(tag: string): string {
    const base = 'btn btn-sm rounded-pill px-3';
    return this.activeFilter() === tag
      ? `${base} btn-primary`
      : `${base} btn-outline-secondary`;
  }

  filteredProjects(projects: Project[]): Project[] {
    const filter = this.activeFilter();
    if (filter === 'all') return projects;
    return projects.filter((p) => p.tech.includes(filter));
  }
}
