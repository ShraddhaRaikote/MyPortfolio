import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-badge',
  template: `<span class="badge-glow font-label">{{ label() }}</span>`,
})
export class SkillBadgeComponent {
  readonly label = input.required<string>();
}
