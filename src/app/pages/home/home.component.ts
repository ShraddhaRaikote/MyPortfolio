import { AfterViewInit, Component, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentService } from '../../core/services/content.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';
import { MotionCardComponent } from '../../shared/components/motion-card/motion-card.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, ScrollRevealDirective, SkillBadgeComponent, MotionCardComponent],
  template: `
    <div class="home-flow">
      <!-- Hero -->
      <section id="hero" class="position-relative d-flex align-items-center justify-content-center text-center section-padding min-vh-100 overflow-hidden">
        <div class="row justify-content-center w-100 position-relative" style="z-index: 1">
          <div #heroContent class="col-12 col-lg-10 col-xl-9">
            <h1 class="hero-welcome font-display fw-bold hero-glow mb-0" style="font-size: clamp(2.5rem, 8vw, 5rem); line-height: 1.1">
              @if (settings$ | async; as settings) {
                <span class="text-gradient d-block">{{ settings.homeWelcomeText }}</span>
              }
            </h1>

            @if (profile$ | async; as profile) {
              <p class="hero-name font-display mt-4 mb-0 text-light" style="font-size: clamp(1.75rem, 5vw, 3.5rem); font-weight: 500">
                Hi, I'm <span class="text-gradient">{{ profile.name }}</span>
              </p>
              <p class="hero-role mt-3 mb-0 text-primary" style="letter-spacing: 0.05em">{{ profile.title }}</p>
              <p class="hero-tagline mx-auto mt-4 text-secondary" style="max-width: 36rem; font-size: 1rem; line-height: 1.7">
                {{ profile.tagline }}
              </p>
              @if (profile.openToWork) {
                <div class="hero-badge d-inline-flex align-items-center gap-2 mt-4 px-4 py-2 rounded-pill border border-success border-opacity-25 text-success" style="background: rgba(34,197,94,0.1)">
                  <span class="rounded-circle bg-success animate-pulse" style="width:8px;height:8px"></span>
                  Open to opportunities
                </div>
              }
            }
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- About -->
      <section id="about" class="section-padding">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9">
            <div appScrollReveal class="glass-panel text-center text-lg-start">
              @if (profile$ | async; as profile) {
                @if (settings$ | async; as settings) {
                  <span class="section-eyebrow">{{ settings.homeStoryEyebrow }}</span>
                  <h2 class="mt-3 font-display fw-bold text-light">{{ settings.homeStoryTitle }}</h2>
                }
                @for (paragraph of profile.fullBio.split('\n\n'); track paragraph) {
                  <p class="mt-4 text-secondary mb-0" style="line-height: 1.8">{{ paragraph }}</p>
                }
                <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 mt-4">
                  <span class="badge rounded-pill border border-secondary border-opacity-25 text-secondary px-3 py-2">{{ profile.location }}</span>
                  <span class="badge rounded-pill border border-secondary border-opacity-25 text-secondary px-3 py-2">{{ profile.yearsExp }}+ years experience</span>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Interests -->
      <section id="interests" class="section-padding">
        <div class="row justify-content-center mb-4">
          <div class="col-12 col-lg-10 text-center">
            <div appScrollReveal>
              <span class="section-eyebrow">Interests</span>
              <h2 class="mt-3 font-display fw-bold text-light">What I love building</h2>
            </div>
          </div>
        </div>
        @if (interests$ | async; as interests) {
          <div class="row g-4 justify-content-center">
            @for (interest of interests; track interest.id; let i = $index) {
              <div class="col-sm-6 col-lg-3" appScrollReveal [delay]="i * 0.08">
                <article class="interest-card glass-surface rounded-4 p-4 h-100 text-center">
                  <div class="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 p-3">
                    <span class="material-symbols-outlined text-primary fs-3">{{ interest.icon }}</span>
                  </div>
                  <h3 class="mt-4 font-display fs-5 fw-semibold text-light">{{ interest.title }}</h3>
                  <p class="mt-2 small text-secondary mb-0">{{ interest.description }}</p>
                </article>
              </div>
            }
          </div>
        }
      </section>

      <!-- Projects CTA -->
      <section id="projects" class="section-padding">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9" appScrollReveal>
            <app-motion-card
              route="/projects"
              eyebrow="Portfolio"
              title="I've made several projects"
              description="Full-stack apps, developer tools, and UI experiments — tap to explore everything I've built."
              cta="View all projects"
            />
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="section-padding">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9">
            <div appScrollReveal class="glass-panel text-center">
              <span class="section-eyebrow">Skills</span>
              <h2 class="mt-3 font-display fw-bold text-light">Technologies I work with</h2>
              @if (skills$ | async; as skills) {
                <div class="d-flex flex-wrap justify-content-center gap-2 mt-4 skills-badge-row">
                  @for (skill of skills; track skill.name) {
                    <app-skill-badge [label]="skill.name" />
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section id="contact" class="section-padding pb-5">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9" appScrollReveal>
            <app-motion-card
              route="/contact"
              eyebrow="Let's talk"
              title="Contact me"
              description="Got a project, role, or idea? I'd love to hear from you — let's build something great together."
              cta="Open contact form"
            />
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly content = inject(ContentService);
  private readonly heroContent = viewChild<ElementRef>('heroContent');

  readonly profile$ = this.content.getProfile();
  readonly settings$ = this.content.getSiteSettings();
  readonly skills$ = this.content.getSkills();
  readonly interests$ = this.content.getInterests();

  private heroScrollTrigger?: ScrollTrigger;
  private heroTween?: gsap.core.Tween;

  ngAfterViewInit(): void {
    const heroSection = document.getElementById('hero');
    const root = this.heroContent()?.nativeElement as HTMLElement | undefined;
    if (!heroSection || !root) return;

    const reducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = root.querySelectorAll<HTMLElement>(
      '.hero-welcome, .hero-name, .hero-role, .hero-tagline, .hero-badge',
    );

    if (reducedMotion || !targets.length) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const reset = () => {
      this.heroTween?.kill();
      gsap.killTweensOf(targets);
      gsap.set(targets, { opacity: 0, y: 36 });
    };

    const play = () => {
      this.heroTween?.kill();
      gsap.killTweensOf(targets);
      reset();
      this.heroTween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.15,
      });
    };

    reset();

    this.heroScrollTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top 85%',
      onEnter: play,
      onEnterBack: play,
      onLeave: reset,
      onLeaveBack: reset,
    });

    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      play();
    }

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 400);
    });
  }

  ngOnDestroy(): void {
    this.heroScrollTrigger?.kill();
    this.heroTween?.kill();
  }
}
