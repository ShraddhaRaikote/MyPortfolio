# Portfolio — Angular Bento Glass

A modern developer portfolio built with **Angular**, **Tailwind CSS v4**, and **Sanity CMS**.

## Features

- Bento Glass homepage with responsive grid layout
- Pages: Home, Projects, Project Detail, About, Contact
- Glowing skill badges and glassmorphism cards
- Headless CMS (Sanity) for content updates without code changes
- Contact form via Web3Forms (serverless)
- Netlify-ready deployment

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm start
```

Open http://localhost:4200

## Project Structure

```
src/app/
  core/          # Models, mock data, ContentService, ContactService
  shared/        # Reusable UI components (GlassCard, Nav, Footer, etc.)
  pages/         # Route pages
studio/          # Sanity CMS schemas and Studio config
```

## Content

With `useSanity: true`, the site reads from Sanity project **cq64slan**. Mock data in `src/app/core/data/mock-data.ts` is used only as a fallback when Sanity is unavailable or empty.

See [CONTENT_QUESTIONNAIRE.md](./CONTENT_QUESTIONNAIRE.md) for what to personalize.

## Sanity CMS Setup (project `cq64slan`)

### 1. CORS origins (required)

In [Sanity Manage](https://sanity.io/manage) → **API** → **CORS origins**, add:

- `http://localhost:4200` (local Angular dev)
- Your Netlify URL, e.g. `https://your-site.netlify.app` (production site)

Allow credentials is **not** required for read-only public dataset access.

### 2. Run Sanity Studio locally

```bash
cd studio
npm install
```

`studio/.env` is already configured:

```
SANITY_STUDIO_PROJECT_ID=cq64slan
SANITY_STUDIO_DATASET=production
```

Start the Studio:

```bash
npm run dev
```

Open http://localhost:3333 and sign in with your Sanity account.

### 3. Seed placeholder content (optional)

1. Create a **write token** at [sanity.io/manage](https://sanity.io/manage) → **API** → **Tokens**
2. Add it to `studio/.env`:

   ```
   SANITY_API_TOKEN=your_write_token
   ```

3. Run:

   ```bash
   cd studio
   npm run seed
   ```

This creates Site Settings, Profile, Projects, Skills, Experience, and Interests documents. Add profile/project images manually in Studio afterward.

### 4. Manual content checklist

If you skip the seed script, create these document types in Studio:

| Type | Notes |
|------|-------|
| **Site Settings** | One document: meta title/description, email, social URLs, page labels |
| **Profile** | One document: name, title, bios, location, years of experience |
| **Project** | One per project; set **slug** (used in URLs), tech stack, featured flag, sort order |
| **Skill** | One per skill; category: `frontend`, `backend`, `tools`, or `other` |
| **Experience** | One per role; set sort order |
| **Interest** | One per interest card; **icon** = Material Symbol name (e.g. `palette`, `cloud`) |

### 5. Angular environment

Already configured in `src/environments/environment.ts` and `environment.prod.ts`:

```typescript
sanity: {
  projectId: 'cq64slan',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
},
useSanity: true,
```

Production builds swap in `environment.prod.ts` via `angular.json` fileReplacements.

Refresh http://localhost:4200 after publishing content in Studio.

## Enable Contact Form

1. Get a free access key at [web3forms.com](https://web3forms.com)
2. Add to `src/environments/environment.ts`:

```typescript
web3formsAccessKey: 'YOUR_KEY',
```

## Deploy to Netlify

1. Push code to GitHub
2. Connect repo at [netlify.com](https://netlify.com)
3. Build settings are in `netlify.toml` (auto-detected)
4. Add your Netlify URL to Sanity CORS origins (see above)

Deploy Sanity Studio:

```bash
cd studio
npm run deploy
```

## Edit Content (No Code)

1. Open Studio locally (`npm run dev` in `studio/`) or your deployed Studio URL (`cq64slan.sanity.studio` after deploy)
2. Edit Profile, Projects, Skills, Experience, Interests, Site Settings
3. Changes appear on the site after refresh

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Angular 21 |
| Styling | Tailwind CSS v4 |
| CMS | Sanity.io |
| Contact | Web3Forms |
| Hosting | Netlify |
