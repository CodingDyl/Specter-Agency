---
name: "Specter Black Label"
description: "Cinematic professional authority for a South African legal-growth consultancy."
colors:
  carbon: "#090a0b"
  charcoal: "#181a1c"
  bone: "#efece5"
  paper: "#f3f0e9"
  wine: "#6a3038"
  wine-soft: "#c49098"
  copy-light: "#a4a5a3"
  copy-on-image: "#c1c0bc"
  copy-paper: "#565650"
  rule-dark: "#343638"
  rule-light: "#cbc6bc"
  rule-strong: "#9f9d96"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(3.6rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(2.9rem, 5vw, 4.8rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "clamp(2rem, 5vw, 4.4rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  navigation:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  square: "0px"
  control: "2px"
  field: "4px"
  full: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-wide: "32px"
  control-y: "12px"
  control-x: "24px"
  panel: "32px"
  section-mobile: "80px"
  section-desktop: "112px"
components:
  button-bone:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.carbon}"
    typography: "{typography.navigation}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-bone-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.carbon}"
  button-carbon:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.bone}"
    typography: "{typography.navigation}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-carbon-hover:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.bone}"
  input:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.carbon}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "48px"
---

# Design System: Specter Black Label

## Overview

**Creative North Star: "The Boardroom After Dark"**

Specter Black Label is the selected, canonical visual world. It turns the atmosphere of a sophisticated Johannesburg office at blue hour into a serious professional-services system: carbon darkness, warm paper, precise rules, controlled wine, and editorial serif scale. The feeling is commanding and memorable without drifting into luxury theatre.

The page moves through dark and light fields in a deliberate rhythm. Cinematic imagery establishes authority once; typography and evidence-led structure carry the rest. The visual system rejects generic agency gradients, legal clichés, gold, fake proof, and feature-card scaffolds.

**Key Characteristics:**

- Cinematic carbon hero followed by alternating warm-paper and dark sections.
- Bodoni Moda creates drama; Instrument Sans keeps controls and body copy direct.
- Thin rules and tonal shifts provide structure instead of shadows or ornamental chrome.
- Wine appears only in connections, selected states, and decisive typographic moments.
- Motion is slow, linear, and architectural: image drift, line drawing, and controlled disclosure.

## Colors

Black Label uses a near-black and warm-paper polarity, with bone for action and muted wine as the only chromatic voice.

### Primary

- **Carbon**: the hero, expertise, form, close, and global page ground.
- **Warm Paper**: long-reading and diagnostic sections that break the darkness.
- **Bone**: primary text and controls on carbon surfaces.

### Secondary

- **Restrained Wine**: connection lines, active disclosure details, selected words, and dark-surface hover states.

### Neutral

- **Charcoal**: secondary dark surface used for the client-journey field.
- **Copy Light**: secondary text on dark sections; never used for primary actions.
- **Copy Paper**: body text on warm paper.
- **Dark and Light Rules**: one-pixel structure appropriate to their surface.

**The No Gold Rule.** Gold turns cinematic authority into a luxury cliché; it is never part of Specter.

**The Wine Rarity Rule.** Wine should remain a deliberate signal, not a large surface or general decoration.

## Typography

**Display Font:** Bodoni Moda (Didot fallback)

**Body Font:** Instrument Sans (Arial fallback)

**Character:** Bodoni supplies editorial confidence and compressed drama. Instrument Sans keeps navigation, forms, diagnostics, and supporting copy commercially clear.

### Hierarchy

- **Display** (400, `clamp(3.6rem, 7vw, 6rem)`, 0.92): hero promises and major closing statements.
- **Headline** (400, `clamp(2.9rem, 5vw, 4.8rem)`, 0.96): section theses.
- **Title** (400, `clamp(2rem, 5vw, 4.4rem)`, 1): expandable expertise and diagnostic titles.
- **Body** (400, 16px, 1.75): explanatory copy, capped around 62–70 characters.
- **Navigation** (500, 13px): navigation and compact actions.
- **Label** (600, 12px, tracked): genuine interface metadata only, never eyebrow scaffolding above headings.

**The Statement Rule.** Headings state the commercial idea directly; they do not require a pre-heading label to explain their purpose.

## Layout

The canonical container is 1320px with 20px mobile gutters and 32px wide-screen gutters. Sections use roughly 80px vertical space on mobile and 112px on desktop. The opening fills at least 850px and holds content at the lower edge; subsequent sections alternate full-width fields with asymmetrical two-column editorial grids.

At 768px the hero switches from the wide architectural image to its portrait companion. The horizontal client journey becomes a centred vertical sequence with visible connecting lines. At 1024px the primary navigation expands from an accessible disclosure menu into the full inline navigation.

## Elevation & Depth

Black Label is flat by default. Depth comes from photography, full-field tonal contrast, and section transitions. The mobile navigation is the only lifted surface, using a deep downward ambient shadow because it must separate from the hero while open.

**The Flat Authority Rule.** Content sections do not use card shadows; a thin rule or a surface change is enough.

## Shapes

Controls use 2px corners and fields use 4px corners. Full circles are reserved for disclosure buttons and small status marks. Cards are not a page-building primitive. Borders remain one pixel and inherit the temperature of their surface.

## Components

### Buttons

- **Bone primary:** bone fill, carbon text, 2px radius, 48px minimum height; hover moves to white.
- **Carbon primary:** carbon fill, bone text, 2px radius; hover moves to wine only on paper.
- **Text action:** no container, with an arrow that shifts slightly on hover.
- **Focus:** two-pixel visible outline with four-pixel offset.

### Inputs / Fields

- Bone surface, carbon text, 4px radius, 48px minimum height.
- Labels remain visible above the field; placeholders never replace labels.
- Pending submission disables the action and names the in-progress state.
- Errors explain the problem and provide a recovery path while preserving input.

### Navigation

- Transparent over the hero with a one-pixel lower rule.
- Desktop shows four anchored destinations and the audit action.
- Mobile uses a 44px menu control with `aria-expanded`, Escape-key closure, full-width destinations, and the audit action inside the expanded panel.

### Diagnostic Disclosure

- One horizontal row per diagnostic area, separated by a light rule.
- The circular plus control rotates to indicate state.
- Touch and keyboard activation share the same state and expose `aria-expanded` and `aria-controls`.

### Expertise Disclosure

- Oversized uppercase Bodoni titles on carbon, with one-pixel separators.
- Native `details`/`summary` semantics preserve no-JavaScript operation.
- Open state uses soft wine type and a 45-degree plus rotation.

### Client Journey

- Five named stages connected by wine lines.
- Desktop draws horizontally; mobile draws vertically.
- The lines animate once with GSAP and remain visible without animation.

## Do's and Don'ts

### Do:

- **Do** alternate carbon, warm paper, and charcoal to maintain the signature rhythm.
- **Do** let typography and one decisive image carry the atmosphere.
- **Do** keep interactions fully operable by keyboard and touch.
- **Do** use South African English and explicit law-firm commercial language.
- **Do** label illustrative diagnostics and avoid invented performance proof.

### Don't:

- **Don't** add gold, neon, gradients, glass cards, or glow effects.
- **Don't** use gavels, scales, handshakes, courtrooms, or staged lawyers.
- **Don't** turn the page into an uninterrupted dark site; the paper transitions are essential.
- **Don't** use rounded SaaS cards or icon-feature grids as primary structure.
- **Don't** add repeated eyebrow labels above headings.
- **Don't** fabricate clients, testimonials, case studies, or growth statistics.
