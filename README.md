# Jurivo

Jurivo is a digital design and growth agency for established South African law firms. This repository contains its production marketing website: a cinematic, editorial Next.js experience designed to build trust, explain the agency's connected growth offer, and convert qualified visitors into digital growth audit requests.

The selected visual direction is **Black Label**, internally described as **The Boardroom After Dark**. It combines carbon surfaces, warm bone typography, restrained wine accents, Bodoni editorial scale, and subtle motion without relying on traditional legal or luxury clichés.

## Contents

- [Core capabilities](#core-capabilities)
- [Technology](#technology)
- [Architecture](#architecture)
- [Routes](#routes)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Growth audit workflow](#growth-audit-workflow)
- [SEO and discoverability](#seo-and-discoverability)
- [Design and motion](#design-and-motion)
- [Accessibility](#accessibility)
- [Project structure](#project-structure)
- [Quality assurance](#quality-assurance)
- [Deployment](#deployment)
- [Production checklist](#production-checklist)
- [Troubleshooting](#troubleshooting)

## Core capabilities

- Responsive, conversion-focused homepage for South African law-firm decision-makers.
- Cinematic desktop and mobile hero artwork with optimised responsive image sources.
- Accessible desktop navigation and keyboard-operable mobile menu.
- Expandable diagnostic and expertise disclosures.
- GSAP and Motion-powered reveal, journey, and score animations.
- Server-side growth audit form with Zod validation and Resend delivery.
- Honeypot field for basic automated-submission resistance.
- Canonical metadata, Open Graph, Twitter cards, JSON-LD, sitemap, robots, and web manifest.
- Reduced-motion support, visible focus states, semantic landmarks, and a skip link.
- Two unlinked design-reference routes retained for internal comparison.

## Technology

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 16, App Router | Server rendering, routing, metadata, Server Actions, and static generation |
| UI | React 19 | Component composition and interactive state |
| Styling | Tailwind CSS 4 | Responsive utility-first styling and design tokens |
| Animation | GSAP, `@gsap/react`, Motion | Scroll reveals, journey progression, and interaction motion |
| Icons | Lucide React | Lightweight interface icons |
| Forms | React Server Actions, Zod | Typed submission handling and server-side validation |
| Email | Resend | Growth audit notification delivery |
| Language | TypeScript | Static typing across application and configuration code |
| Quality | ESLint, Next.js production build | Static analysis, type checking, and build verification |

Dependency versions are locked in `package-lock.json`. Use `npm ci` for reproducible installations.

## Architecture

The App Router is used throughout. The root page re-exports the selected Black Label implementation, allowing the production route to stay canonical while the original design route redirects to it. Shared interaction and form behaviour lives in `components/`; page-specific editorial composition stays close to the relevant route.

| Approach | Advantages | Trade-offs | Decision |
|---|---|---|---|
| Canonical page plus archived reference routes | Keeps one production experience while preserving prior concepts for internal review | Some page-level duplication remains | Selected |
| One route with runtime theme switching | Reduces repeated route files | Encourages shallow visual skinning and ships unused production UI | Rejected |
| Separate applications per concept | Maximum isolation | Duplicates infrastructure, forms, dependencies, and maintenance | Rejected |

The production request flow is:

```text
Visitor
  -> Jurivo homepage
  -> Growth audit form
  -> Server Action
  -> Zod validation + honeypot check
  -> Resend API
  -> Configured audit inbox
```

## Routes

| Route | Purpose | Indexing |
|---|---|---|
| `/` | Canonical Jurivo Black Label website | Allowed |
| `/black-label` | Legacy path; permanently redirects to `/` | Redirected |
| `/executive-editorial` | Archived internal design reference | Disallowed in `robots.txt` |
| `/modern-counsel` | Archived internal design reference | Disallowed in `robots.txt` |
| `/sitemap.xml` | Canonical sitemap | Public |
| `/robots.txt` | Crawler policy and sitemap discovery | Public |
| `/manifest.webmanifest` | Web-app metadata and theme colours | Public |

## Getting started

### Prerequisites

- Node.js 20.9 or newer.
- npm 10 or newer.
- A Resend account and verified sender domain for live audit delivery.

### Installation

```bash
git clone https://github.com/CodingDyl/Specter-Agency.git
cd Specter-Agency
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The visual site can be reviewed without external credentials. Until the Resend variables are configured, the audit form returns an explicit configuration message and never pretends a request was delivered.

## Environment variables

Create `.env.local` from `.env.example`. Never commit `.env.local` or production secrets.

| Variable | Required | Exposure | Description |
|---|---:|---|---|
| `RESEND_API_KEY` | For live forms | Server only | Resend API key used by the audit Server Action |
| `RESEND_FROM_EMAIL` | For live forms | Server only | Verified sender, for example `Jurivo Website <website@jurivo.co.za>` |
| `AUDIT_TO_EMAIL` | For live forms | Server only | Inbox that receives qualified audit requests |
| `NEXT_PUBLIC_STRATEGY_CALL_URL` | Recommended | Browser | Absolute booking URL; falls back to the audit section when omitted |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Browser/build | Public origin used for canonical metadata, structured data, sitemap, and robots; defaults to `https://jurivo.co.za` |

Example:

```dotenv
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Jurivo Website <website@yourdomain.co.za>
AUDIT_TO_EMAIL=hello@yourdomain.co.za
NEXT_PUBLIC_STRATEGY_CALL_URL=https://cal.com/your-team/strategy-call
NEXT_PUBLIC_SITE_URL=https://jurivo.co.za
```

Because variables prefixed with `NEXT_PUBLIC_` are embedded in the browser bundle, never use that prefix for secrets.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local Next.js development server |
| `npm run build` | Creates the optimised production build and performs TypeScript validation |
| `npm run start` | Serves the completed production build |
| `npm run lint` | Runs ESLint across the repository |

For a production-like local check:

```bash
npm run build
npm run start
```

## Growth audit workflow

The form is rendered by `components/AuditForm.tsx` and submitted to the `submitAudit` Server Action in `app/actions.ts`.

The server validates:

- A complete website URL.
- Contact name and law-firm name.
- A valid work email address.
- Primary practice area and growth priority.
- The expected site or concept identifier.
- An empty hidden company field used as a honeypot.

On a valid submission, Resend sends a plain-text lead summary to `AUDIT_TO_EMAIL` and sets the visitor's address as `replyTo`. API failures return a generic user-safe error; secrets and provider details are not exposed to the client.

Before accepting production traffic, add provider-side rate limiting or an edge/WAF rule if submission volume or abuse risk warrants it. The honeypot is deliberately a lightweight first layer, not a complete anti-spam system.

## SEO and discoverability

SEO is implemented with Next.js metadata routes and page metadata:

- `app/layout.tsx` defines the metadata base, title template, social cards, category, and theme colour.
- `app/black-label/page.tsx` defines canonical page metadata and `ProfessionalService` JSON-LD.
- `app/sitemap.ts` publishes the canonical homepage URL.
- `app/robots.ts` exposes the sitemap and excludes archived concept routes.
- `app/manifest.ts` provides installable-site metadata and brand colours.

Set `NEXT_PUBLIC_SITE_URL` to the exact production origin, without a trailing slash, before deployment. Social previews use the desktop Johannesburg hero image.

## Design and motion

The production design system is documented in [`DESIGN.md`](./DESIGN.md). Product intent, audience, content boundaries, and brand constraints are documented in [`PRODUCT.md`](./PRODUCT.md).

Key rules:

- Carbon `#090a0b` is the primary dark surface.
- Bone `#efece5` is the primary light text colour.
- Wine is reserved for meaningful emphasis and interaction.
- Bodoni Moda carries editorial display typography; Instrument Sans carries interface and body copy.
- Gold, neon gradients, glass cards, rounded SaaS chrome, and invented social proof are excluded.
- Motion must communicate hierarchy, progression, or feedback.

`components/MotionSystem.tsx` contains the shared motion primitives. The application respects `prefers-reduced-motion`; new animation work must preserve that behaviour.

## Accessibility

The current implementation includes:

- Semantic `main`, `section`, `header`, `nav`, and `footer` landmarks.
- A keyboard-visible skip link to the main content.
- Visible `:focus-visible` treatment.
- Minimum 44px interactive targets and 48px primary actions.
- Escape-key support and accurate `aria-expanded` state in the mobile menu.
- Native `details` and `summary` disclosure semantics.
- Form labels, autocomplete hints, status announcements, and pending feedback.
- Responsive typography and no horizontal overflow at tested mobile widths.
- Reduced-motion fallbacks for animated content.

Preserve keyboard access, colour contrast, semantic HTML, and reduced-motion handling when extending the site.

## Project structure

```text
app/
  actions.ts                    Audit Server Action and validation
  black-label/page.tsx          Selected production page composition
  executive-editorial/page.tsx  Archived design reference
  modern-counsel/page.tsx       Archived design reference
  globals.css                   Global tokens, reset, and accessibility styles
  layout.tsx                    Fonts, global metadata, and root layout
  manifest.ts                   Web manifest metadata route
  page.tsx                      Canonical root-page export
  robots.ts                     Crawler policy metadata route
  sitemap.ts                    Sitemap metadata route
components/
  AuditForm.tsx                 Interactive audit form
  BlackLabelNavigation.tsx      Desktop and mobile navigation
  DiagnosticDisclosure.tsx      Diagnostic disclosure row
  MotionSystem.tsx              GSAP and Motion primitives
  SiteSwitcher.tsx              Internal concept-navigation utility
public/
  black-label-johannesburg-office.png
  black-label-johannesburg-office-mobile.png
DESIGN.md                       Canonical visual system
PRODUCT.md                      Product and content brief
```

## Quality assurance

Run both required checks before committing or deploying:

```bash
npm run lint
npm run build
```

Manual browser QA should cover at least:

- Desktop and mobile hero cropping.
- Navigation anchors and mobile menu keyboard behaviour.
- All disclosures and calls to action.
- Growth audit validation, success, and provider-failure states.
- No horizontal overflow at 390px, 768px, and wide desktop widths.
- Console errors and hydration warnings.
- Reduced-motion mode.
- Canonical metadata, JSON-LD, `/robots.txt`, and `/sitemap.xml`.

Local visual-review screenshots are written under `.impeccable/screenshots/` and intentionally ignored by Git.

## Deployment

The application is suitable for Vercel or any Node.js platform capable of running Next.js Server Actions.

### Vercel

1. Import the GitHub repository into Vercel.
2. Keep the detected framework preset as Next.js.
3. Configure all variables from the environment-variable table for Production and Preview as appropriate.
4. Verify the sending domain in Resend and ensure `RESEND_FROM_EMAIL` uses that domain.
5. Deploy the application.
6. Attach the production domain and set `NEXT_PUBLIC_SITE_URL` to its exact HTTPS origin.
7. Redeploy after changing any `NEXT_PUBLIC_` value because public variables are embedded at build time.

No database or persistent filesystem is required. Audit requests are delivered directly through Resend.

## Production checklist

- [ ] Confirm the final Jurivo domain and set `NEXT_PUBLIC_SITE_URL`.
- [ ] Replace the placeholder strategy-call link.
- [ ] Verify the Resend sending domain.
- [ ] Configure the Resend API key, sender, and audit recipient.
- [ ] Submit a real audit request and verify delivery plus `replyTo` behaviour.
- [ ] Confirm legal contact details and add privacy/POPIA copy where required.
- [ ] Replace illustrative proof with approved case studies or testimonials when available.
- [ ] Test social previews and search metadata against the production URL.
- [ ] Run lint, production build, desktop QA, mobile QA, and reduced-motion QA.
- [ ] Add analytics only after consent and privacy requirements are defined.

## Troubleshooting

### The audit form says the inbox is not configured

Ensure `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `AUDIT_TO_EMAIL` are defined in the environment where the Server Action runs. Restart the development server after editing `.env.local`.

### Resend rejects the sender

`RESEND_FROM_EMAIL` must use a domain verified in the active Resend account. The visible display name can be changed, but the email domain must match an approved sender.

### The booking button scrolls to the form

This is the intended fallback when `NEXT_PUBLIC_STRATEGY_CALL_URL` is missing. Set it to an absolute booking URL and restart or redeploy.

### Canonical URLs show the wrong domain

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin and rebuild. The same value drives metadata, JSON-LD, sitemap, and robots output.

### Fonts or images do not appear during development

Confirm the development environment can reach Google Fonts during the first build and that both hero image files remain in `public/`. The site uses `next/font` so font assets are self-hosted after compilation.

## Repository policy

Copyright remains with the repository owner. No open-source licence is granted by this README. Do not commit credentials, client information, production lead data, or unapproved legal-firm proof.
