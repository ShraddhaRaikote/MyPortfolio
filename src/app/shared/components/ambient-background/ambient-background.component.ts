import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import gsap from 'gsap';

type DensityTier = 'sm' | 'md' | 'lg' | 'xl';

interface ShapeAnimConfig {
  drift?: gsap.TweenVars;
  rotate?: gsap.TweenVars;
}

const TIER_ORDER: Record<DensityTier, number> = { sm: 0, md: 1, lg: 2, xl: 3 };

const BREAKPOINTS = { md: 768, lg: 1024, xl: 1280 } as const;

const SHAPE_ANIMS: Record<string, ShapeAnimConfig> = {
  orb1: {
    drift: { y: 24, x: 14, duration: 10, ease: 'sine.inOut' },
    rotate: { rotationY: 360, rotationX: 12, duration: 22, ease: 'none' },
  },
  orb2: {
    drift: { y: -18, x: -12, duration: 12, ease: 'sine.inOut' },
    rotate: { rotationX: -360, rotationZ: 8, duration: 28, ease: 'none' },
  },
  orb3: {
    drift: { y: 16, x: 10, duration: 9, ease: 'sine.inOut' },
    rotate: { rotationY: -360, duration: 24, ease: 'none' },
  },
  plane1: {
    drift: { y: -14, duration: 11, ease: 'sine.inOut' },
    rotate: { rotationZ: 360, rotationY: 18, duration: 26, ease: 'none' },
  },
  plane2: {
    drift: { y: 12, duration: 13, ease: 'sine.inOut' },
    rotate: { rotationX: 360, rotationZ: -360, duration: 21, ease: 'none' },
  },
  ring: {
    drift: { y: -8, x: 6, duration: 14, ease: 'sine.inOut' },
    rotate: { rotationZ: 360, rotationY: 180, duration: 29, ease: 'none' },
  },
  particle1: {
    drift: { y: -20, x: 12, duration: 8, ease: 'sine.inOut' },
    rotate: { rotationZ: 360, duration: 20, ease: 'none' },
  },
  particle2: {
    drift: { y: 18, x: -10, duration: 7.5, ease: 'sine.inOut' },
    rotate: { rotationZ: -360, duration: 23, ease: 'none' },
  },
  orb4: {
    drift: { y: -16, x: 10, duration: 10.5, ease: 'sine.inOut' },
    rotate: { rotationY: 360, rotationX: -10, duration: 27, ease: 'none' },
  },
  ring2: {
    drift: { y: 10, duration: 15, ease: 'sine.inOut' },
    rotate: { rotationZ: -360, rotationX: 90, duration: 25, ease: 'none' },
  },
  plane3: {
    drift: { y: -10, x: -8, duration: 12, ease: 'sine.inOut' },
    rotate: { rotationY: 360, rotationZ: 24, duration: 30, ease: 'none' },
  },
  particle3: {
    drift: { y: -14, x: -8, duration: 9, ease: 'sine.inOut' },
    rotate: { rotationY: 360, duration: 22, ease: 'none' },
  },
  orb5: {
    drift: { y: 14, x: -12, duration: 9.5, ease: 'sine.inOut' },
    rotate: { rotationX: 360, duration: 26, ease: 'none' },
  },
  ring3: {
    drift: { y: 8, x: -6, duration: 16, ease: 'sine.inOut' },
    rotate: { rotationZ: 360, rotationX: -45, duration: 21, ease: 'none' },
  },
  plane4: {
    drift: { y: -12, duration: 11.5, ease: 'sine.inOut' },
    rotate: { rotationX: -360, rotationY: 24, duration: 28, ease: 'none' },
  },
  orb6: {
    drift: { y: 20, x: 8, duration: 10, ease: 'sine.inOut' },
    rotate: { rotationY: -360, rotationZ: 12, duration: 24, ease: 'none' },
  },
  ring4: {
    drift: { y: -6, duration: 18, ease: 'sine.inOut' },
    rotate: { rotationZ: -360, duration: 20, ease: 'none' },
  },
  particle4: {
    drift: { y: 12, x: 8, duration: 8.5, ease: 'sine.inOut' },
    rotate: { rotationX: -360, rotationZ: 180, duration: 29, ease: 'none' },
  },
  orb7: {
    drift: { y: -10, x: -14, duration: 11, ease: 'sine.inOut' },
    rotate: { rotationY: 360, rotationX: 16, duration: 23, ease: 'none' },
  },
  plane5: {
    drift: { y: 8, x: 6, duration: 12.5, ease: 'sine.inOut' },
    rotate: { rotationZ: -360, rotationY: -20, duration: 27, ease: 'none' },
  },
  ring5: {
    drift: { y: -12, x: 4, duration: 17, ease: 'sine.inOut' },
    rotate: { rotationZ: 360, rotationX: 60, duration: 25, ease: 'none' },
  },
};

@Component({
  selector: 'app-ambient-background',
  template: `
    <div class="ambient-bg pointer-events-none fixed inset-0" style="z-index: 0" aria-hidden="true">
      <div class="ambient-base position-absolute top-0 start-0 w-100 h-100" style="background: #000000"></div>
      <div
        class="ambient-grid position-absolute top-0 start-0 w-100 h-100 opacity-35"
        style="background-image: radial-gradient(rgba(99,102,241,0.15) 1px, transparent 1px); background-size: 28px 28px"
      ></div>
      <div #scene class="ambient-3d-scene">
        <!-- sm: 9 elements — full viewport grid coverage -->
        <div class="ambient-3d-shape ambient-3d-orb ambient-3d-orb--indigo" data-shape="orb1"></div>
        <div class="ambient-3d-shape ambient-3d-orb ambient-3d-orb--violet" data-shape="orb2"></div>
        <div class="ambient-3d-shape ambient-3d-orb ambient-3d-orb--pink" data-shape="orb3"></div>
        <div class="ambient-3d-shape ambient-3d-plane ambient-3d-plane--1" data-shape="plane1"></div>
        <div class="ambient-3d-shape ambient-3d-plane ambient-3d-plane--2" data-shape="plane2"></div>
        <div class="ambient-3d-shape ambient-3d-ring ambient-3d-ring--1" data-shape="ring"></div>
        <div class="ambient-3d-shape ambient-3d-particle ambient-3d-particle--1" data-shape="particle1"></div>
        <div class="ambient-3d-shape ambient-3d-particle ambient-3d-particle--2" data-shape="particle2"></div>
        <div class="ambient-3d-shape ambient-3d-orb ambient-3d-orb--cyan ambient-3d-orb--bottom" data-shape="orb4"></div>

        <!-- md: +3 → 12 -->
        <div
          class="ambient-3d-shape ambient-3d-ring ambient-3d-ring--2 ambient-3d-tier"
          data-shape="ring2"
          data-tier="md"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-plane ambient-3d-plane--3 ambient-3d-tier"
          data-shape="plane3"
          data-tier="md"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-particle ambient-3d-particle--3 ambient-3d-tier"
          data-shape="particle3"
          data-tier="md"
        ></div>

        <!-- lg: +4 → 16 -->
        <div
          class="ambient-3d-shape ambient-3d-orb ambient-3d-orb--amber ambient-3d-tier"
          data-shape="orb5"
          data-tier="lg"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-ring ambient-3d-ring--3 ambient-3d-tier"
          data-shape="ring3"
          data-tier="lg"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-plane ambient-3d-plane--4 ambient-3d-tier"
          data-shape="plane4"
          data-tier="lg"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-orb ambient-3d-orb--teal ambient-3d-orb--bottom ambient-3d-tier"
          data-shape="orb6"
          data-tier="lg"
        ></div>

        <!-- xl: +5 → 21 -->
        <div
          class="ambient-3d-shape ambient-3d-ring ambient-3d-ring--4 ambient-3d-tier"
          data-shape="ring4"
          data-tier="xl"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-particle ambient-3d-particle--4 ambient-3d-tier"
          data-shape="particle4"
          data-tier="xl"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-orb ambient-3d-orb--rose ambient-3d-tier"
          data-shape="orb7"
          data-tier="xl"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-plane ambient-3d-plane--5 ambient-3d-tier"
          data-shape="plane5"
          data-tier="xl"
        ></div>
        <div
          class="ambient-3d-shape ambient-3d-ring ambient-3d-ring--5 ambient-3d-tier"
          data-shape="ring5"
          data-tier="xl"
        ></div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .ambient-3d-scene {
      position: fixed;
      inset: 0;
      perspective: 900px;
      transform-style: preserve-3d;
      overflow: hidden;
    }

    .ambient-3d-shape {
      position: absolute;
      will-change: transform;
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }

    .ambient-3d-tier {
      display: none;
    }

    @media (min-width: 768px) {
      .ambient-3d-tier[data-tier='md'] {
        display: block;
      }
    }

    @media (min-width: 1024px) {
      .ambient-3d-tier[data-tier='lg'] {
        display: block;
      }
    }

    @media (min-width: 1280px) {
      .ambient-3d-tier[data-tier='xl'] {
        display: block;
      }
    }

    .ambient-3d-orb {
      border-radius: 50%;
      filter: blur(48px);
    }

  /* ── Orbs: positioned on 10/30/50/70/90 grid ── */

    .ambient-3d-orb--indigo {
      width: 20rem;
      height: 20rem;
      top: 10%;
      left: 10%;
      background: radial-gradient(circle at 35% 35%, rgba(129, 140, 248, 0.65), rgba(79, 70, 229, 0.2) 70%);
      opacity: 0.5;
      transform: translateZ(-80px) rotateX(18deg) rotateY(-24deg);
    }

    .ambient-3d-orb--violet {
      width: 16rem;
      height: 16rem;
      top: 10%;
      right: 10%;
      background: radial-gradient(circle at 40% 40%, rgba(167, 139, 250, 0.58), rgba(99, 102, 241, 0.18) 72%);
      opacity: 0.42;
      transform: translateZ(40px) rotateX(-12deg) rotateY(32deg);
    }

    .ambient-3d-orb--pink {
      width: 14rem;
      height: 14rem;
      top: 50%;
      left: 10%;
      background: radial-gradient(circle at 45% 45%, rgba(244, 114, 182, 0.52), rgba(236, 72, 153, 0.15) 75%);
      opacity: 0.35;
      transform: translateZ(20px) rotateX(22deg) rotateY(-18deg);
    }

    .ambient-3d-orb--cyan {
      width: 18rem;
      height: 18rem;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%) translateZ(-30px) rotateX(14deg) rotateY(20deg);
      background: radial-gradient(circle at 40% 40%, rgba(34, 211, 238, 0.45), rgba(6, 182, 212, 0.12) 75%);
      opacity: 0.38;
    }

    .ambient-3d-orb--amber {
      width: 12rem;
      height: 12rem;
      top: 30%;
      left: 50%;
      transform: translateX(-50%) translateZ(50px) rotateX(-16deg) rotateY(-28deg);
      background: radial-gradient(circle at 42% 42%, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.1) 75%);
      opacity: 0.28;
    }

    .ambient-3d-orb--teal {
      width: 22rem;
      height: 22rem;
      bottom: 10%;
      right: 10%;
      background: radial-gradient(circle at 38% 38%, rgba(45, 212, 191, 0.42), rgba(20, 184, 166, 0.12) 75%);
      opacity: 0.32;
      transform: translateZ(-20px) rotateX(10deg) rotateY(36deg);
    }

    .ambient-3d-orb--rose {
      width: 13rem;
      height: 13rem;
      top: 70%;
      right: 30%;
      background: radial-gradient(circle at 40% 40%, rgba(251, 113, 133, 0.44), rgba(244, 63, 94, 0.12) 75%);
      opacity: 0.3;
      transform: translateZ(30px) rotateX(-14deg) rotateY(22deg);
    }

    .ambient-3d-orb--bottom {
      filter: blur(56px);
    }

  /* ── Planes ── */

    .ambient-3d-plane {
      border-radius: 1.5rem;
      border: 1px solid rgba(129, 140, 248, 0.12);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(244, 114, 182, 0.04));
      box-shadow: 0 0 40px rgba(99, 102, 241, 0.08);
    }

    .ambient-3d-plane--1 {
      width: 9rem;
      height: 9rem;
      top: 10%;
      left: 50%;
      transform: translateX(-50%) translateZ(60px) rotateX(55deg) rotateY(-35deg) rotateZ(12deg);
      opacity: 0.5;
    }

    .ambient-3d-plane--2 {
      width: 6rem;
      height: 6rem;
      top: 50%;
      right: 10%;
      transform: translateZ(-40px) rotateX(-48deg) rotateY(28deg) rotateZ(-8deg);
      opacity: 0.35;
    }

    .ambient-3d-plane--3 {
      width: 7rem;
      height: 7rem;
      top: 30%;
      left: 30%;
      transform: translateZ(25px) rotateX(42deg) rotateY(-22deg) rotateZ(6deg);
      opacity: 0.38;
    }

    .ambient-3d-plane--4 {
      width: 5.5rem;
      height: 5.5rem;
      top: 70%;
      left: 30%;
      transform: translateZ(-55px) rotateX(-38deg) rotateY(18deg) rotateZ(-14deg);
      opacity: 0.32;
    }

    .ambient-3d-plane--5 {
      width: 6.5rem;
      height: 6.5rem;
      top: 50%;
      left: 70%;
      transform: translateZ(35px) rotateX(50deg) rotateY(-30deg) rotateZ(10deg);
      opacity: 0.34;
    }

  /* ── Rings ── */

    .ambient-3d-ring {
      border-radius: 50%;
      border: 1px solid rgba(167, 139, 250, 0.2);
      background: transparent;
      box-shadow:
        inset 0 0 24px rgba(129, 140, 248, 0.08),
        0 0 32px rgba(244, 114, 182, 0.06);
    }

    .ambient-3d-ring--1 {
      width: 10rem;
      height: 10rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) translateZ(30px) rotateX(70deg) rotateZ(45deg);
      opacity: 0.4;
    }

    .ambient-3d-ring--2 {
      width: 7rem;
      height: 7rem;
      top: 30%;
      left: 70%;
      transform: translateZ(-15px) rotateX(62deg) rotateZ(-30deg);
      opacity: 0.32;
      border-color: rgba(34, 211, 238, 0.18);
    }

    .ambient-3d-ring--3 {
      width: 8.5rem;
      height: 8.5rem;
      top: 70%;
      left: 70%;
      transform: translateZ(45px) rotateX(58deg) rotateZ(60deg);
      opacity: 0.34;
      border-color: rgba(45, 212, 191, 0.2);
    }

    .ambient-3d-ring--4 {
      width: 6rem;
      height: 6rem;
      top: 90%;
      left: 30%;
      transform: translateZ(-25px) rotateX(75deg) rotateZ(-50deg);
      opacity: 0.28;
      border-color: rgba(251, 191, 36, 0.16);
    }

    .ambient-3d-ring--5 {
      width: 9rem;
      height: 9rem;
      top: 30%;
      right: 10%;
      transform: translateZ(20px) rotateX(65deg) rotateZ(35deg);
      opacity: 0.3;
      border-color: rgba(251, 113, 133, 0.18);
    }

  /* ── Particles ── */

    .ambient-3d-particle {
      border-radius: 50%;
      filter: blur(6px);
    }

    .ambient-3d-particle--1 {
      width: 0.75rem;
      height: 0.75rem;
      bottom: 10%;
      left: 10%;
      background: rgba(129, 140, 248, 0.55);
      opacity: 0.45;
      transform: translateZ(70px);
    }

    .ambient-3d-particle--2 {
      width: 0.5rem;
      height: 0.5rem;
      bottom: 10%;
      right: 10%;
      background: rgba(244, 114, 182, 0.5);
      opacity: 0.4;
      transform: translateZ(-10px);
    }

    .ambient-3d-particle--3 {
      width: 0.625rem;
      height: 0.625rem;
      top: 70%;
      left: 10%;
      background: rgba(167, 139, 250, 0.48);
      opacity: 0.38;
      transform: translateZ(35px);
    }

    .ambient-3d-particle--4 {
      width: 0.5rem;
      height: 0.5rem;
      top: 90%;
      right: 50%;
      transform: translateX(50%) translateZ(15px);
      background: rgba(45, 212, 191, 0.5);
      opacity: 0.42;
    }

    @media (prefers-reduced-motion: reduce) {
      .ambient-3d-shape {
        animation: none !important;
      }
    }
  `,
})
export class AmbientBackgroundComponent implements AfterViewInit, OnDestroy {
  private readonly scene = viewChild<ElementRef<HTMLElement>>('scene');
  private tweens: gsap.core.Tween[] = [];
  private resizeObserver: (() => void) | null = null;
  private reducedMotion = false;
  private currentTier: DensityTier = 'sm';
  private animatedKeys = new Set<string>();

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) return;

    this.currentTier = this.resolveTier(window.innerWidth);
    this.syncAnimations();

    const onResize = (): void => {
      const tier = this.resolveTier(window.innerWidth);
      if (tier !== this.currentTier) {
        this.currentTier = tier;
      }
      this.syncAnimations();
    };

    window.addEventListener('resize', onResize, { passive: true });
    this.resizeObserver = () => window.removeEventListener('resize', onResize);
  }

  ngOnDestroy(): void {
    this.clearAnimations();
    this.resizeObserver?.();
    this.resizeObserver = null;
  }

  private resolveTier(width: number): DensityTier {
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    return 'sm';
  }

  private isShapeVisible(el: HTMLElement): boolean {
    const tier = el.dataset['tier'] as DensityTier | undefined;
    if (!tier) return true;
    return TIER_ORDER[this.currentTier] >= TIER_ORDER[tier];
  }

  private syncAnimations(): void {
    const root = this.scene()?.nativeElement;
    if (!root) return;

    const shapes = root.querySelectorAll<HTMLElement>('[data-shape]');
    const activeKeys = new Set<string>();

    shapes.forEach((el) => {
      const key = el.dataset['shape'];
      if (!key || !this.isShapeVisible(el)) return;

      activeKeys.add(key);
      if (this.animatedKeys.has(key)) return;

      const config = SHAPE_ANIMS[key];
      if (!config) return;

      if (config.drift) {
        this.tweens.push(
          gsap.to(el, {
            ...config.drift,
            repeat: -1,
            yoyo: true,
          }),
        );
      }

      if (config.rotate) {
        this.tweens.push(
          gsap.to(el, {
            ...config.rotate,
            repeat: -1,
            yoyo: false,
          }),
        );
      }

      this.animatedKeys.add(key);
    });

    if (activeKeys.size === this.animatedKeys.size) return;

    const staleKeys = [...this.animatedKeys].filter((k) => !activeKeys.has(k));
    if (staleKeys.length === 0) return;

    this.tweens = this.tweens.filter((t) => {
      const target = t.targets()[0] as HTMLElement | undefined;
      const key = target?.dataset?.['shape'];
      if (key && staleKeys.includes(key)) {
        t.kill();
        return false;
      }
      return true;
    });

    staleKeys.forEach((k) => this.animatedKeys.delete(k));
  }

  private clearAnimations(): void {
    this.tweens.forEach((t) => t.kill());
    this.tweens = [];
    this.animatedKeys.clear();
  }
}
