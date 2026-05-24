import { trigger, transition, style, animate, query } from '@angular/animations';

/** Simple fade — avoids absolute positioning that breaks content on navigate back */
export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0 }), animate('280ms 60ms ease-out', style({ opacity: 1 }))], {
      optional: true,
    }),
  ]),
]);
