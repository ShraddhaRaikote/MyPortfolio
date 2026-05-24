import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  imports: [NgClass],
  host: {
    class: 'block',
    '[class]': 'className()',
  },
  template: `
    <article
      [ngClass]="[
        hoverable() ? 'bento-hover cursor-default' : '',
        variant() === 'contact' ? 'glass-contact' : 'glass-surface',
      ]"
      class="h-full rounded-2xl p-6"
    >
      <ng-content />
    </article>
  `,
})
export class GlassCardComponent {
  readonly hoverable = input(true);
  readonly variant = input<'default' | 'contact'>('default');
  readonly className = input('');
}
