import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ContactFormPayload, ContactFormResponse } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'https://api.web3forms.com/submit';

  submit(payload: ContactFormPayload): Observable<ContactFormResponse> {
    const accessKey = environment.web3formsAccessKey;

    if (!accessKey) {
      return of({
        success: false,
        message:
          'Contact form is not configured yet. Add your Web3Forms key to environment.ts',
      });
    }

    return this.http
      .post<{ success: boolean; message?: string }>(this.endpoint, {
        access_key: accessKey,
        name: payload.name,
        email: payload.email,
        message: payload.message,
        subject: `Portfolio contact from ${payload.name}`,
      })
      .pipe(
        map((res) => ({
          success: res.success,
          message: res.message ?? 'Message sent successfully!',
        })),
        catchError(() =>
          of({
            success: false,
            message: 'Failed to send message. Please try again or email directly.',
          }),
        ),
      );
  }
}
