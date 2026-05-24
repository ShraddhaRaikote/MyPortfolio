import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe, SectionHeaderComponent, GlassCardComponent, SkillBadgeComponent],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <app-section-header eyebrow="About" title="About Me" />

      <div class="grid gap-6 lg:grid-cols-3">
        @if (profile$ | async; as profile) {
          <app-glass-card className="lg:col-span-2">
            @for (paragraph of profile.fullBio.split('\n\n'); track paragraph) {
              <p class="mb-4 text-sm leading-relaxed text-text-muted">{{ paragraph }}</p>
            }
          </app-glass-card>

          <app-glass-card>
            <h2 class="font-display text-lg font-semibold">Details</h2>
            <ul class="mt-4 space-y-3 text-sm text-text-muted">
              <li><span class="text-text-primary">Role:</span> {{ profile.title }}</li>
              <li><span class="text-text-primary">Location:</span> {{ profile.location }}</li>
              <li><span class="text-text-primary">Experience:</span> {{ profile.yearsExp }}+ years</li>
            </ul>
          </app-glass-card>
        }
      </div>

      <section class="mt-12">
        <h2 class="font-display text-2xl font-bold">Experience</h2>
        @if (experience$ | async; as experience) {
          <div class="mt-6 space-y-4">
            @for (item of experience; track item.id) {
              <app-glass-card [hoverable]="false">
                <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 class="font-display font-semibold">{{ item.role }}</h3>
                    <p class="text-sm text-accent-indigo">{{ item.company }}</p>
                  </div>
                  <p class="font-label text-xs text-text-muted">
                    {{ item.startDate }} — {{ item.endDate ?? 'Present' }}
                  </p>
                </div>
                <p class="mt-3 text-sm text-text-muted">{{ item.description }}</p>
              </app-glass-card>
            }
          </div>
        }
      </section>

      <section class="mt-12">
        <h2 class="font-display text-2xl font-bold">Skills</h2>
        @if (skills$ | async; as skills) {
          <div class="mt-6 flex flex-wrap gap-2">
            @for (skill of skills; track skill.name) {
              <app-skill-badge [label]="skill.name" />
            }
          </div>
        }
      </section>
    </div>
  `,
})
export class AboutComponent {
  private readonly content = inject(ContentService);
  readonly profile$ = this.content.getProfile();
  readonly experience$ = this.content.getExperience();
  readonly skills$ = this.content.getSkills();
}
