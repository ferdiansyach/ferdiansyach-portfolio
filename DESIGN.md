---
name: Ferdiansyach Portfolio
description: A dark, evidence-led portfolio for fullstack, data, and AI work.
colors:
  canvas: "#121214"
  canvas-elevated: "#1a1a1e"
  canvas-light: "#faf9f6"
  surface-card: "#1a1a1e"
  ink: "#e3e3e6"
  body: "#a0a0a5"
  muted: "#707075"
  primary: "#7c3aed"
  primary-hover: "#6d28d9"
  primary-active: "#5b21b6"
  hairline: "#2a2a2e"
  info: "#3b82f6"
  success: "#16a34a"
  warning: "#ea580c"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 6rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(1.5rem, 4vw, 3rem)"
    fontWeight: 700
  body:
    fontFamily: "Inter, sans-serif"
  label:
    fontFamily: "monospace"
    fontSize: "0.65rem"
    fontWeight: 700
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "8px"
  card: "12px"
  hero: "24px"
  pill: "9999px"
spacing:
  xxxs: "4px"
  xxs: "8px"
  xs: "12px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  xxl: "64px"
  super: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.25rem"
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.25rem"
  card-default:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  chip-secondary:
    backgroundColor: "rgba(124, 58, 237, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "0.125rem 0.625rem"
---

# Design System: Ferdiansyach Portfolio

## Overview

**Creative North Star: "Dark Glass Gallery"**

A dark, evidence-led portfolio that presents fullstack, data, and AI work as a curated technical gallery. The near-black canvas allows screenshots, certifications, project proof, and violet actions to hold attention without competing for it. A serif display voice makes names and major headings feel authored; Inter and compact monospace metadata preserve recruiter-friendly scanning.

The system is layered, not ornamental. Elevated graphite surfaces, thin hairlines, translucent overlays, and selective blur establish depth. Product proof remains functional: gallery cards filter, project dialogs reveal the supporting case study, certificates expand, navigation tracks scroll position, and contact inputs expose clear action states. Dark mode is deliberately locked for the current experience; a light token set exists but is not user-selectable.

**Key Characteristics:**
- Dark graphite canvas with Reflect Violet as the action color.
- Serif display hierarchy plus neutral sans body copy and compact technical labels.
- Rounded, hairline-bounded surfaces with restrained glass overlays.
- Screenshot-forward cards, dialogs, certificates, and project proof.
- Motion used for scroll entry, reveal, filtering, and state feedback.

## Colors

The palette is a cool graphite foundation punctuated by one saturated violet action color, with emerald, rose, fuchsia, cyan, and blue used locally to distinguish real status or content categories.

### Primary
- **Reflect Violet** (`primary`): the sole system-wide action and active-state color; use for primary buttons, links, focus rings, selected filters, progress, scroll progress, and key labels.
- **Violet Hover / Active** (`primary-hover` / `primary-active`): darken the primary action on hover or active state rather than introducing another global accent.

### Secondary
- **Proof Emerald** (`#34d399` / `success`): use for availability, verified status, and hero-stat proof.
- **Certification Rose–Fuchsia** (`rose-500` to `fuchsia-500`): reserved for certification filtering and credential-card emphasis.

### Tertiary
- **Technical Blue / Cyan** (`info` and local cyan tones): use only for technology-specific iconography or media context.

### Neutral
- **Obsidian Canvas** (`canvas`): the page field and modal backdrop foundation.
- **Elevated Graphite** (`canvas-elevated` / `surface-card`): cards, navigation controls, dialogs, and form containers.
- **Paper Ink** (`ink`): headings and high-emphasis content on dark surfaces.
- **Quiet Body** (`body`): paragraph copy, secondary navigation, and support text.
- **Muted Metadata** (`muted`): timestamps, secondary labels, and reduced-priority information.
- **Hairline Graphite** (`hairline`): every recurring structural edge, divider, input edge, and card boundary.

**The Single-Action Rule.** Use `primary` for global action, selection, focus, and progression. Local colorful accents classify actual proof; they do not replace global navigation or action semantics.

## Typography

**Display Font:** Lora, Georgia, serif
**Body Font:** Inter, sans-serif
**Label/Mono Font:** browser monospace

**Character:** Lora provides a formal, editorial signature for names and major headings. Inter keeps supporting content direct and legible. Monospace is limited to technical labels, small metadata, counters, and hero-system readouts.

### Hierarchy
- **Display** (900, `clamp(2.5rem, 7vw, 6rem)`, 1, `-0.03em`): the hero name and highest-impact identity statement.
- **Headline** (700, `1.5rem`–`3rem`, default leading): section and dialog titles.
- **Title** (700, `0.875rem`–`1.25rem`): project card titles, contact labels, and component headers.
- **Body** (400–500, `0.75rem`–`1.125rem`): descriptions, long-form project copy, labels, and controls.
- **Label** (700, `0.65rem`, `0.1em`–`0.2em`, uppercase): hero metadata, compact system labels, and category framing.

**The Evidence Hierarchy Rule.** Use serif at identity and key narrative moments; use sans for readable proof; reserve monospace for data-like context rather than general technical decoration.

## Layout

The home route is a vertical evidence narrative: a fixed navigation bar, a hero showcase, then full-width sections separated by a centered `1px` hairline (`max-width: 120px`). Primary content uses Tailwind containers with side padding increasing from `1.5rem` below 640px to `6rem` at 1440px. Typical sections use `py-20` or `py-32`; mobile rules compress these vertical intervals and heading margins.

Grid density changes by proof type. Gallery and certification cards collapse from three columns on desktop to two columns at medium widths and one column on narrow screens. The hero uses a single-column system row below 1024px, then can form a `2fr 1fr` composition at desktop. Project dialogs become a two-column media/content layout at `md`; mobile navigation expands downward from the fixed header.

**The Proof-First Layout Rule.** Screenshots, certificates, project names, and evidence remain the visual anchors. Containers support the artifacts rather than creating abstract dashboard chrome.

## Elevation & Depth

Depth is built from tonal layers, `1px` graphite hairlines, translucent panels, restrained blur, and soft black shadows. Elevated surfaces are graphite rather than bright; media overlays use black transparency and backdrop blur so the artifact remains legible. Hover creates modest lift and denser shadow, while the hero and its orb use selective colored glow.

### Shadow Vocabulary
- **Surface Lift** (`0 4px 20px -2px rgba(0, 0, 0, 0.05)`): default `.glass-card` depth.
- **Hover Lift** (`0 8px 30px -4px rgba(0, 0, 0, 0.08)`): interactive card emphasis.
- **Hero Depth** (`0 20px 40px -15px rgba(0, 0, 0, 0.5)`): contain the immersive hero showcase.
- **Primary Action Glow** (`0 4px 20px rgba(124, 58, 237, 0.35)`): primary action and hero-action emphasis.

**The Layered-Not-Loud Rule.** A surface earns blur or glow only when it establishes hierarchy, state, or atmospheric separation; the default card remains a quiet graphite plane with a hairline.

## Shapes

The shape language is softly technical: small controls use 6–8px rounding, cards use 12px, hero containers use 24px, and action controls / status chips use full pills. Thin graphite borders define structure. Media clips to rounded frames; dialogs use larger 12–16px corners. Circular forms are reserved for singular signals such as the hero logo, action icon, availability indicator, and image-navigation controls.

**The Contained Artifact Rule.** Images, certificates, and project evidence live within clipped, rounded frames; the chrome stays thin so the artifact dominates.

## Components

### Buttons
- **Character:** compact, confident controls that contrast a solid violet action against subdued graphite alternatives.
- **Shape:** standard controls are gently rounded (`6px`–`8px`); icon actions can be full circles.
- **Primary:** violet surface with white text; default sizing is `h-9`, `px-4`, `text-sm`.
- **Hover / Focus:** hover darkens to `primary-hover`; focus uses a 2px violet ring. Contact and hero actions may add small upward movement and violet shadow.
- **Outline / Secondary / Ghost:** graphite or transparent surfaces with hairlines and body-colored text; hover shifts the border and text to violet with a low-opacity violet field.

### Chips
- **Character:** small, rounded metadata markers for filters, categories, tech stacks, and verification.
- **Style:** `rounded-md` or full pill; selected filters may become solid violet or certification-specific rose–fuchsia; secondary chips use transparent violet with a 20% border.
- **State:** selected filter visibly fills; unselected filter is hairline-bounded. `aria-pressed` is used on gallery filters.

### Cards / Containers
- **Character:** card-first glassy proof surfaces; dark, contained, and media-forward.
- **Corner Style:** `12px` cards, `12px`–`16px` dialogs, `24px` hero container.
- **Background:** elevated graphite with a hairline; `.glass-card` may receive a restrained white transparency and blur in specific hero or certificate contexts.
- **Shadow Strategy:** quiet surface shadow at rest; small lift and stronger shadow/border on hover.
- **Internal Padding:** cards commonly use `1rem`–`1.5rem`; contact and dialog containers step from `1.5rem` to `4rem` responsively.

### Inputs / Fields
- **Character:** unobtrusive graphite fields with clear violet focus feedback.
- **Style:** canvas background, `1px` hairline, `rounded-md`, `px-4 py-3`, body-colored placeholder, ink-colored input.
- **Focus:** primary border plus a 2px low-opacity violet ring.
- **Disabled / Feedback:** sending disables the submit button through opacity and cursor state; success uses emerald, error uses red.

### Navigation
- **Style:** fixed full-width header, transparent at top and an 80% opaque, blurred canvas with bottom hairline after 20px scroll.
- **Typography:** compact semibold sans links; portfolio name uses primary serif branding.
- **State:** active item has violet text and a 4px lower line; hover adds a low-opacity violet pill. A primary-colored 4px bar tracks page scroll.
- **Mobile:** desktop links hide under `lg`; a rounded icon control opens a vertically animated, blurred canvas menu with staggered link entry.

### Proof Gallery
- **Character:** screenshot-first project grid, filterable by work category.
- **Behavior:** media frame uses 16:9 crop; hover scales the image and reveals a blurred black proof overlay. Cards open an accessible project dialog; keyboard Enter and Space open the same route.

### Project Dialog
- **Character:** a large, evidence-centered case-study viewer.
- **Behavior:** black blurred backdrop; spring entrance; responsive media/detail grid; scroll lock, Escape close, arrow-key image navigation, thumbnail selection, and external proof actions.

### Hero Showcase
- **Character:** immersive full-height technical profile board inside a `24px` graphite frame.
- **Behavior:** shader-backed backdrop; upper metadata rail, oversized Lora name, monospace supporting line, proof stat panel, progress track, and circular arrow action. The logo orb uses emerald/blue radial color and a slow pulse.

## Do's and Don'ts

### Do:
- **Do** keep the page on the graphite canvas and reserve violet for action, focus, selection, and progression.
- **Do** lead cards, galleries, dialogs, and certificate surfaces with real screenshot or certificate evidence.
- **Do** use Lora for the portfolio identity and major headings; preserve Inter as the readable working face.
- **Do** use a hairline border before adding heavy shadow or glow.
- **Do** preserve `prefers-reduced-motion` behavior: animations and transitions become effectively instant.
- **Do** make mobile grids collapse cleanly, retain touch-sized controls, and use horizontally scrollable tabs where needed.

### Don't:
- **Don't** introduce a second global action color; rose, emerald, cyan, and blue are local proof/status accents.
- **Don't** put decorative blur or glass on every surface; it belongs to layered hero, modal, and selected proof moments.
- **Don't** flatten proof into text-only cards when a real screenshot, certificate, link, or PDF is available.
- **Don't** use mono for ordinary body copy or headings; it signals data and metadata only.
- **Don't** remove visible focus treatment, keyboard dialog handling, scroll lock, or reduced-motion fallbacks from interactive patterns.
