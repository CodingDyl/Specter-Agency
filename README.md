# Specter website

Black Label is the selected production direction for Specter, a South African legal-growth agency. The canonical website is served from `/`.

- `/` — canonical Black Label website
- `/black-label` — permanent redirect to `/`
- `/executive-editorial` and `/modern-counsel` — unlinked internal references excluded from indexing

The production homepage uses a responsive cinematic hero, accessible mobile navigation, diagnostic disclosures, GSAP/Motion sequences, and the Resend-backed Growth Audit form.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Audit email delivery

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — must be a sender verified in Resend
- `AUDIT_TO_EMAIL`
- `NEXT_PUBLIC_STRATEGY_CALL_URL`

Without these values, the pages remain fully reviewable and the audit form returns a clear configuration message instead of pretending a request was sent.

## Architecture decision

| Option | Advantages | Trade-offs |
|---|---|---|
| Separate Next.js routes (selected) | Each concept has independent metadata, composition, responsive rules, and a shareable URL | Some intentional page-level duplication remains |
| One route with a theme switch | Less repeated content and a single URL | Encourages shallow skinning and makes distinct structures harder to preserve |
| Three separate applications | Maximum isolation and independent deployment | Duplicates infrastructure, forms, dependencies, and maintenance |

Shared behaviour is modularised in `components/`; concept-specific composition stays in each route so the selected direction can later evolve without carrying two discarded visual systems.

## Verification

```bash
npm run lint
npm run build
```

Desktop and mobile review captures are stored under `.impeccable/screenshots/`.
