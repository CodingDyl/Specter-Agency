---
version: 1
slug: "app-admin-protected-page-tsx"
primary_target: "app/admin/(protected)/page.tsx"
related_targets: ["app/admin/(protected)/pipeline/page.tsx","app/admin/(protected)/quotes","app/admin/(protected)/agreements","app/admin/(protected)/projects","components/admin"]
---

# Jurivo owner workspace

- Scope: `/admin` and protected descendants; visitor mode: Operate. This is a single-owner CRM and document workspace, not a second marketing site.
- User/job: the Jurivo owner needs to see every new law-firm lead, move opportunities through a commercial journey, issue quotes and agreement drafts, begin projects, and retain hosting/maintenance context without switching systems.
- Primary action: identify the next commercial action. Secondary actions: update pipeline stage, create a quote, create an agreement draft, open a project, and record a recurring service.
- Information model: firms and contacts are durable entities; enquiries record first intent; opportunities own the commercial pipeline; journey events preserve history; quotes, agreements, projects and services remain separately queryable for a future management application.
- Direction: Black Label translated into an operator surface—carbon navigation, warm-paper workspace, restrained wine only for selection or risk, Instrument Sans throughout the UI, square controls, thin rules and compact data density.
- Memorable moment: the dashboard reads like a disciplined matter list, with “Next action” more prominent than decorative metrics.
- Constraints: authenticated admin only, no public signup, no display typography in controls, no invented revenue or legal status, no client data in URLs, responsive tables that become stacked records, keyboard-visible controls and no decorative motion.
- Open: initial admin email/password, approved Jurivo legal entity details, quote defaults, VAT registration status/rate, bank/payment details, agreement language approved by counsel, privacy/POPIA notice, notification preferences, and production deployment URL.
