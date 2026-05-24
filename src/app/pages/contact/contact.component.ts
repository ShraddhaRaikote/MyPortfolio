import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentService } from '../../core/services/content.service';
import { ContactService } from '../../core/services/contact.service';
import { BackNavComponent } from '../../shared/components/back-nav/back-nav.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [AsyncPipe, ReactiveFormsModule, MatSnackBarModule, BackNavComponent, ScrollRevealDirective],
  template: `
    <app-back-nav class="d-block position-relative" style="z-index: 2" />

    <div class="page-view pb-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8 col-xl-7">
          <header appScrollReveal class="page-header text-center mb-5">
            <p class="section-eyebrow mb-2">Contact</p>
            @if (settings$ | async; as settings) {
              <h1 class="font-display fw-bold display-5 mb-3">
                <span class="text-gradient">{{ settings.contactPageTitle }}</span>
              </h1>
            }
            <p class="text-secondary mb-0">Drop a message — I typically reply within 24 hours.</p>
          </header>

          <div appScrollReveal [delay]="0.1" class="contact-form-wrap glass-contact rounded-4 p-4 p-md-5">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="row g-4">
                <div class="col-12">
                  <div class="field-group">
                    <input id="name" type="text" formControlName="name" class="field-input" placeholder=" " autocomplete="name" />
                    <label for="name" class="field-label">Your name</label>
                    <span class="field-icon material-symbols-outlined">person</span>
                    @if (form.controls.name.touched && form.controls.name.invalid) {
                      <p class="text-danger small mt-2 mb-0">Please enter at least 2 characters.</p>
                    }
                  </div>
                </div>

                <div class="col-12">
                  <div class="field-group">
                    <input id="email" type="email" formControlName="email" class="field-input" placeholder=" " autocomplete="email" />
                    <label for="email" class="field-label">Email address</label>
                    <span class="field-icon material-symbols-outlined">mail</span>
                    @if (form.controls.email.touched && form.controls.email.invalid) {
                      <p class="text-danger small mt-2 mb-0">Please enter a valid email.</p>
                    }
                  </div>
                </div>

                <div class="col-12">
                  <div class="field-group">
                    <select id="subject" formControlName="subject" class="field-input" style="padding-top: 1.75rem">
                      <option value="" disabled>Select a topic</option>
                      <option value="project">Project inquiry</option>
                      <option value="job">Job opportunity</option>
                      <option value="collab">Collaboration</option>
                      <option value="other">Something else</option>
                    </select>
                    <label for="subject" class="field-label" style="top: 0.5rem; font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.08em; color: #818cf8">Topic</label>
                    <span class="field-icon material-symbols-outlined">topic</span>
                    @if (form.controls.subject.touched && form.controls.subject.invalid) {
                      <p class="text-danger small mt-2 mb-0">Please select a topic.</p>
                    }
                  </div>
                </div>

                <div class="col-12">
                  <div class="field-group">
                    <textarea id="message" formControlName="message" class="field-input field-textarea" placeholder=" " rows="4"></textarea>
                    <label for="message" class="field-label">Your message</label>
                    @if (form.controls.message.touched && form.controls.message.invalid) {
                      <p class="text-danger small mt-2 mb-0">Message needs at least 10 characters.</p>
                    }
                  </div>
                </div>

                <div class="col-12">
                  <button type="submit" [disabled]="submitting()" class="submit-glow">
                    @if (submitting()) {
                      <span class="d-flex align-items-center justify-content-center gap-2">
                        <span class="spinner-border spinner-border-sm" role="status"></span>
                        Sending...
                      </span>
                    } @else {
                      <span class="d-flex align-items-center justify-content-center gap-2">
                        Send message
                        <span class="material-symbols-outlined">send</span>
                      </span>
                    }
                  </button>
                </div>
              </div>
            </form>
          </div>

          @if (settings$ | async; as settings) {
            <div appScrollReveal [delay]="0.2" class="social-links d-flex flex-wrap justify-content-center gap-2 mt-4">
              <a [href]="settings.githubUrl" target="_blank" rel="noopener noreferrer" class="social-pill">
                <i class="bi bi-github"></i> GitHub
              </a>
              <a [href]="settings.linkedinUrl" target="_blank" rel="noopener noreferrer" class="social-pill">
                <i class="bi bi-linkedin"></i> LinkedIn
              </a>
              <a [href]="'mailto:' + settings.contactEmail" class="social-pill">
                <i class="bi bi-envelope"></i> Email
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);
  private readonly content = inject(ContentService);
  private readonly snackBar = inject(MatSnackBar);

  readonly settings$ = this.content.getSiteSettings();
  readonly submitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const { name, email, message, subject } = this.form.getRawValue();
    this.contact
      .submit({ name, email, message: `[${subject}] ${message}` })
      .subscribe({
        next: (res) => {
          this.submitting.set(false);
          const snackMessage = res.success ? '✓ Message sent successfully!' : res.message;
          this.snackBar.open(snackMessage, '×', {
            duration: 5000,
            panelClass: res.success ? 'snack-success' : 'snack-error',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          if (res.success) this.form.reset({ name: '', email: '', subject: '', message: '' });
        },
        error: () => {
          this.submitting.set(false);
          this.snackBar.open('Something went wrong. Please try again.', '×', {
            duration: 5000,
            panelClass: 'snack-error',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
  }
}
