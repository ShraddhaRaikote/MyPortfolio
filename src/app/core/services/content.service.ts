import { Injectable, inject } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { Observable, from, map, of, catchError } from 'rxjs';

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

  getSiteSettings(): Observable<SiteSettings> {
    return this.fetchOrMock<SiteSettings>(
      `*[_type == "siteSettings"][0]{
        metaTitle, metaDescription, contactEmail, githubUrl, linkedinUrl, twitterUrl
      }`,
      MOCK_SITE_SETTINGS,
    );
  }

  getProfile(): Observable<Profile> {
    return this.fetchOrMock<Profile>(
      `*[_type == "profile"][0]{
        name, title, tagline, shortBio, fullBio,
        "avatar": avatar.asset->url, location, yearsExp, openToWork
      }`,
      MOCK_PROFILE,
    );
  }

  getProjects(): Observable<Project[]> {
    return this.fetchOrMock<Project[]>(
      `*[_type == "project"] | order(order asc) {
        "id": _id, title, "slug": slug.current, summary, body,
        "image": image.asset->url, tech, liveUrl, githubUrl, featured, order
      }`,
      MOCK_PROJECTS,
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.getProjects().pipe(
      map((projects) => projects.filter((p) => p.featured).slice(0, 3)),
    );
  }

  getProjectBySlug(slug: string): Observable<Project | undefined> {
    if (this.client) {
      return from(
        this.client.fetch<Project>(
          `*[_type == "project" && slug.current == $slug][0] {
            "id": _id, title, "slug": slug.current, summary, body,
            "image": image.asset->url, tech, liveUrl, githubUrl, featured, order
          }`,
          { slug },
        ),
      ).pipe(catchError(() => of(undefined)));
    }

    return of(MOCK_PROJECTS.find((p) => p.slug === slug));
  }

  getSkills(): Observable<Skill[]> {
    return this.fetchOrMock<Skill[]>(
      `*[_type == "skill"] | order(name asc) { name, category }`,
      MOCK_SKILLS,
    );
  }

  getExperience(): Observable<Experience[]> {
    return this.fetchOrMock<Experience[]>(
      `*[_type == "experience"] | order(order asc) {
        "id": _id, company, role, startDate, endDate, description, order
      }`,
      MOCK_EXPERIENCE,
    );
  }

  getInterests(): Observable<Interest[]> {
    return this.fetchOrMock<Interest[]>(
      `*[_type == "interest"] | order(order asc) {
        "id": _id, title, description, icon
      }`,
      MOCK_INTERESTS,
    );
  }

  private fetchOrMock<T>(query: string, mock: T): Observable<T> {
    if (!this.client) {
      return of(mock);
    }

    return from(this.client.fetch<T>(query)).pipe(
      map((result) => (result ? result : mock)),
      catchError(() => of(mock)),
    );
  }
}
