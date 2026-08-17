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
- Cinematic desktop hero video with a seamless forward/reverse loop and responsive still-image fallbacks.
- Accessible desktop navigation and keyboard-operable mobile menu.
- Expandable diagnostic and expertise disclosures.
- GSAP and Motion-powered reveal, journey, and score animations.
- Server-side Growth Audit and strategy-call forms with Zod validation, durable Supabase storage, attribution capture, and best-effort Resend notifications.
- Protected owner workspace at `/admin` for the pipeline, journey history, quotes, agreements, projects, hosting, maintenance, and recurring revenue.
- Database-enforced quote numbering, line totals, VAT totals, agreement numbering, timestamps, constraints, and Row Level Security.
- Dedicated no-index thank-you page shown only after successful email delivery.
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
| Data and auth | Supabase Postgres, Auth, RLS | Lead intake, CRM, commercial documents, delivery records, recurring services, and one-account admin access |
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
  -> Supabase write-only intake
  -> Postgres trigger normalises firm, contact, enquiry, opportunity and journey event
  -> Best-effort Resend notification
  -> Thank-you page

Owner
  -> /admin/login
  -> Supabase Auth + admin role check
  -> Pipeline -> quote -> agreement -> project -> recurring service
```

## Routes

| Route | Purpose | Indexing |
|---|---|---|
| `/` | Canonical Jurivo Black Label website | Allowed |
| `/black-label` | Legacy path; permanently redirects to `/` | Redirected |
| `/thank-you` | Successful Growth Audit confirmation and next-step guidance | No-index |
| `/strategy-call` | High-intent website strategy brief and scheduling path | Allowed |
| `/strategy-call/received` | Email follow-up confirmation when no calendar is configured | No-index |
| `/admin/login` | Restricted owner sign-in | No-index and disallowed |
| `/admin` | Commercial overview and journey timeline | Protected; no-index and disallowed |
| `/admin/pipeline` | Opportunity stages, values, probabilities, next actions, and due dates | Protected; no-index and disallowed |
| `/admin/quotes` | Quote register, builder, and printable quote views | Protected; no-index and disallowed |
| `/admin/agreements` | Agreement register, editable draft builder, and printable views | Protected; no-index and disallowed |
| `/admin/projects` | Delivery portfolio and recurring service ledger | Protected; no-index and disallowed |
| `/executive-editorial` | Archived internal design reference | Disallowed in `robots.txt` |
| `/modern-counsel` | Archived internal design reference | Disallowed in `robots.txt` |
| `/sitemap.xml` | Canonical sitemap | Public |
| `/robots.txt` | Crawler policy and sitemap discovery | Public |
| `/manifest.webmanifest` | Web-app metadata and theme colours | Public |

## Getting started

### Prerequisites

- Node.js 20.9 or newer.
- npm 10 or newer.
- A Supabase project for durable lead storage and admin authentication.
- A Resend account and verified sender domain for optional lead-notification emails.

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
| `RESEND_API_KEY` | For live forms | Server only | Sending-access Resend API key used by lead Server Actions |
| `RESEND_FROM_EMAIL` | For live forms | Server only | Verified sender, for example `Jurivo Website <website@jurivo.co.za>` |
| `AUDIT_TO_EMAIL` | For live forms | Server only | Inbox that receives qualified audit requests |
| `STRATEGY_TO_EMAIL` | Optional | Server only | Inbox for high-intent strategy briefs; falls back to `AUDIT_TO_EMAIL` |
| `NEXT_PUBLIC_STRATEGY_CALL_URL` | Recommended | Browser | Absolute booking URL opened after a strategy brief is delivered |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Browser/build | Canonical production origin used for metadata, structured data, sitemap, and robots; set to `https://www.jurivo.co.za` |
| `GOOGLE_SITE_VERIFICATION` | Optional | Server/build | Google Search Console HTML verification token |
| `BING_SITE_VERIFICATION` | Optional | Server/build | Bing Webmaster Tools HTML verification token |
| `NEXT_PUBLIC_SUPABASE_URL` | Required | Browser/server | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Required | Browser/server | Publishable key protected by database RLS; this is not a secret |
| `DATABASE_URL` | Optional | Local tooling only | Direct Postgres connection string. Never expose it to the browser or commit the password |

Example:

```dotenv
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Jurivo Website <website@yourdomain.co.za>
AUDIT_TO_EMAIL=hello@yourdomain.co.za
STRATEGY_TO_EMAIL=hello@yourdomain.co.za
NEXT_PUBLIC_STRATEGY_CALL_URL=https://cal.com/your-team/strategy-call
NEXT_PUBLIC_SITE_URL=https://www.jurivo.co.za
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
```

Because variables prefixed with `NEXT_PUBLIC_` are embedded in the browser bundle, never use that prefix for secrets. Create a sending-access Resend key restricted to the verified sending domain where possible, and rotate any key that has been exposed outside the deployment environment.

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

- An optional website URL; when supplied it must be a complete HTTP or HTTPS address.
- Contact name and law-firm name.
- A valid work email address.
- Primary practice area and growth priority.
- The expected site or concept identifier.
- An empty hidden company field used as a honeypot.

On a valid submission, the Server Action first creates an immutable `lead_submissions` record. A database trigger normalises it into a firm, contact, enquiry, opportunity, and initial journey event. The visitor redirects to `/thank-you` only after this durable write succeeds. Resend then sends a best-effort notification when configured; an email-provider outage no longer discards a valid lead. A firm without a website is accepted and represented explicitly.

## Strategy-call workflow

Every “Book a Strategy Call” action opens `/strategy-call`, a separate high-intent route for firms that have already decided to move on a new website, strategic redesign or connected visibility system. The page explains the intended outcome of the conversation before asking for a commercial brief.

The strategy brief captures contact details, an optional website, priority practice area, project need, desired start, decision role, investment readiness and the reason the project has become urgent. Resend delivers it to `STRATEGY_TO_EMAIL`, falling back to `AUDIT_TO_EMAIL`, and uses the visitor's work email as `replyTo`.

After successful database storage, a valid `NEXT_PUBLIC_STRATEGY_CALL_URL` takes the visitor to the scheduling provider. When no valid calendar URL is configured, the visitor goes to `/strategy-call/received`, which truthfully confirms that Jurivo will arrange the conversation by email. Storage failures remain on the form and never imply that a call was booked.

## Supabase CRM and admin setup

The schema is migration-driven under `supabase/migrations/` and is intentionally reusable by a future management application. The public website can only insert a validated lead intake record. Anonymous users cannot read, update, or delete CRM data. Authenticated users still receive no CRM access unless their `profiles.role` is `admin`.

The model stores useful operational data beyond the original forms:

- Original submission payload, landing page, referrer, and UTM attribution.
- Firm, primary contact, lead source, practice area, commercial need, urgency, decision role, and investment readiness.
- Opportunity stage, estimated value, close probability, expected close, next action, due date, and lost reason.
- Append-only journey events and follow-up tasks.
- Quotes, itemised scope, issue/expiry dates, VAT, totals, status, and linked opportunity.
- Agreement drafts, client signatory, effective date, and signature status.
- Project scope, budget, delivery status, dates, and project URL.
- Hosting, maintenance, SEO, support, billing interval, recurring amount, provider, and renewal date.

### Create the single admin account

1. In Supabase Dashboard, open **Authentication → Users → Add user** and create the owner account with a strong password.
2. Confirm the trigger created a matching row in `public.profiles`.
3. Promote only that address in the SQL editor:

```sql
update public.profiles
set role = 'admin'
where lower(email) = lower('owner@example.com');
```

4. Disable public user sign-ups in Supabase Auth settings. There is deliberately no sign-up route in this application.
5. Sign in at `/admin/login` and test the pipeline and document workflows.

Agreement generation is an editable drafting aid, not legal advice. Replace every bracketed prompt, add Jurivo's confirmed legal entity/payment/VAT details, and obtain qualified South African legal review before issuing or signing a document.

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
  thank-you/page.tsx            Successful audit confirmation and next-step page
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

No persistent filesystem is required. Supabase is the system of record; Resend is an optional notification channel rather than the source of truth.

## Production checklist

- [ ] Confirm the final Jurivo domain and set `NEXT_PUBLIC_SITE_URL`.
- [ ] Replace the placeholder strategy-call link.
- [ ] Verify the Resend sending domain.
- [ ] Create a restricted sending-access Resend API key and configure it without committing it.
- [ ] Configure the verified sender and audit recipient.
- [ ] Apply all Supabase migrations and configure the URL and publishable key.
- [ ] Create the sole Auth user, promote its profile to `admin`, and disable public sign-ups.
- [ ] Submit both public forms and verify the intake, firm, contact, enquiry, opportunity, and journey records.
- [ ] Confirm successful storage redirects correctly and a storage failure remains recoverable on the form.
- [ ] Confirm optional Resend delivery and `replyTo` behaviour.
- [ ] Add approved Jurivo legal entity, VAT, banking, commercial terms, privacy/POPIA, and agreement wording.
- [ ] Confirm legal contact details and add privacy/POPIA copy where required.
- [ ] Replace illustrative proof with approved case studies or testimonials when available.
- [ ] Test social previews and search metadata against the production URL.
- [ ] Run lint, production build, desktop QA, mobile QA, and reduced-motion QA.
- [ ] Add analytics only after consent and privacy requirements are defined.

## Troubleshooting

### A lead form says it could not securely save the request

Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, apply every migration under `supabase/migrations/`, and restart the development server. Check Supabase API and Postgres logs if the configuration is correct.

### The admin account signs in but is rejected

Confirm the Auth user's `public.profiles` row exists and has `role = 'admin'`. The application intentionally signs out authenticated non-admin users.

### Resend rejects the sender

`RESEND_FROM_EMAIL` must use a domain verified in the active Resend account. The visible display name can be changed, but the email domain must match an approved sender.

### The strategy brief does not open the calendar

Set `NEXT_PUBLIC_STRATEGY_CALL_URL` to an absolute `https://` booking URL and restart or redeploy. Without it, successfully delivered strategy briefs use the honest `/strategy-call/received` email-follow-up route.

### Canonical URLs show the wrong domain

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin and rebuild. The same value drives metadata, JSON-LD, sitemap, and robots output.

### Fonts or images do not appear during development

Confirm the development environment can reach Google Fonts during the first build and that both hero image files remain in `public/`. The site uses `next/font` so font assets are self-hosted after compilation.

## Repository policy

Copyright remains with the repository owner. No open-source licence is granted by this README. Do not commit credentials, client information, production lead data, or unapproved legal-firm proof.
