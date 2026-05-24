import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let refreshScheduled = false;

function scheduleScrollRefresh(): void {
  if (refreshScheduled) return;
  refreshScheduled = true;
  requestAnimationFrame(() => {
    refreshScheduled = false;
    ScrollTrigger.refresh();
  });
}

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly delay = input(0);
  readonly y = input(32);
  readonly duration = input(0.75);

  private tween?: gsap.core.Tween;
  private scrollTrigger?: ScrollTrigger;
  private fallbackTimer?: ReturnType<typeof setTimeout>;
  private reducedMotion = false;

  constructor() {
    afterNextRender(() => {
      requestAnimationFrame(() => this.setupReveal());
    });
  }

  private setupReveal(): void {
    const element = this.el.nativeElement;

    this.reducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.reducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
      element.classList.add('scroll-revealed');
      return;
    }

    const yOffset = this.y();

    const reset = () => {
      this.tween?.kill();
      gsap.killTweensOf(element);
      gsap.set(element, { opacity: 0, y: yOffset });
      element.classList.remove('scroll-revealed');
    };

    const reveal = () => {
      this.tween?.kill();
      gsap.killTweensOf(element);

      this.tween = gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: this.duration(),
        delay: this.delay(),
        ease: 'power3.out',
        onComplete: () => element.classList.add('scroll-revealed'),
      });
    };

    reset();

    this.scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      onEnter: reveal,
      onEnterBack: reveal,
      onLeave: reset,
      onLeaveBack: reset,
    });

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      reveal();
    }

    this.fallbackTimer = setTimeout(() => {
      const opacity = Number(gsap.getProperty(element, 'opacity') ?? 1);
      if (opacity < 0.05) {
        reveal();
      }
    }, 900);

    scheduleScrollRefresh();
  }

  ngOnDestroy(): void {
    if (this.fallbackTimer) clearTimeout(this.fallbackTimer);
    this.scrollTrigger?.kill();
    this.tween?.kill();
    gsap.killTweensOf(this.el.nativeElement);

    const element = this.el.nativeElement;
    if (this.reducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
    } else {
      gsap.set(element, { clearProps: 'opacity,transform' });
    }
  }
}
