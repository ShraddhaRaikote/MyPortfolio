import { Injectable, inject } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { Observable, concat, from, map, of, catchError, shareReplay } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  MOCK_EXPERIENCE,
  MOCK_INTERESTS,
  MOCK_PROFILE,
  MOCK_PROJECTS,
  MOCK_SITE_SETTINGS,
  MOCK_SKILLS,
} from '../data/mock-data';
import {
  Experience,
  Interest,
  Profile,
  Project,
  SiteSettings,
  Skill,
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly client: SanityClient | null = environment.useSanity && environment.sanity.projectId
    ? createClient({
        projectId: environment.sanity.projectId,
        dataset: environment.sanity.dataset,
        apiVersion: environment.sanity.apiVersion,
        useCdn: environment.sanity.useCdn,
      })
    : null;

  private readonly siteSettings$ = this.fetchOrMock<SiteSettings>(
    `*[_type == "siteSettings"][0]{
      metaTitle, metaDescription, contactEmail, githubUrl, linkedinUrl, twitterUrl,
      homeWelcomeText, homeStoryEyebrow, homeStoryTitle, projectsPageTitle, contactPageTitle
    }`,
    MOCK_SITE_SETTINGS,
  ).pipe(
    map((settings) => ({ ...MOCK_SITE_SETTINGS, ...settings })),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private readonly profile$ = this.fetchOrMock<Profile>(
    `*[_type == "profile"][0]{
      name, title, tagline, shortBio, fullBio,
      "avatar": avatar.asset->url, location, yearsExp, openToWork
    }`,
    MOCK_PROFILE,
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private readonly projects$ = this.fetchOrMock<Project[]>(
    `*[_type == "project"] | order(order asc) {
      "id": _id, title, "slug": slug.current, summary, body,
      "image": image.asset->url, tech, liveUrl, githubUrl, featured, order
    }`,
    MOCK_PROJECTS,
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private readonly skills$ = this.fetchOrMock<Skill[]>(
    `*[_type == "skill"] | order(name asc) { name, category }`,
    MOCK_SKILLS,
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private readonly experience$ = this.fetchOrMock<Experience[]>(
    `*[_type == "experience"] | order(order asc) {
      "id": _id, company, role, startDate, endDate, description, order
    }`,
    MOCK_EXPERIENCE,
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private readonly interests$ = this.fetchOrMock<Interest[]>(
    `*[_type == "interest"] | order(order asc) {
      "id": _id, title, description, icon
    }`,
    MOCK_INTERESTS,
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  getSiteSettings(): Observable<SiteSettings> {
    return this.siteSettings$;
  }

  getProfile(): Observable<Profile> {
    return this.profile$;
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.getProjects().pipe(
      map((projects) => projects.filter((p) => p.featured).slice(0, 3)),
    );
  }

  getProjectBySlug(slug: string): Observable<Project | undefined> {
    return this.getProjects().pipe(map((projects) => projects.find((p) => p.slug === slug)));
  }

  getSkills(): Observable<Skill[]> {
    return this.skills$;
  }

  getExperience(): Observable<Experience[]> {
    return this.experience$;
  }

  getInterests(): Observable<Interest[]> {
    return this.interests$;
  }

  private fetchOrMock<T>(query: string, mock: T): Observable<T> {
    if (!this.client) {
      return of(mock);
    }

    const remote$ = from(this.client.fetch<T>(query)).pipe(
      map((result) => (result ? result : mock)),
      catchError(() => of(mock)),
    );

    return concat(of(mock), remote$);
  }
}
