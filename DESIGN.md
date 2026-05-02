---
version: alpha
name: JetAuth Console
description: A minimal, fluid, dark-first authentication design system inspired by JetBrains-grade product interfaces.
colors:
  background: "#0B0D10"
  background-elevated: "#11141A"
  surface: "#161B22"
  surface-2: "#1B2230"
  surface-3: "#202938"
  primary: "#7C6CFF"
  primary-hover: "#9385FF"
  secondary: "#36C2FF"
  tertiary: "#39D98A"
  neutral: "#A7B0C0"
  text-primary: "#F3F6FB"
  text-secondary: "#A7B0C0"
  text-muted: "#7E8797"
  border-subtle: "#2B3445"
  border-strong: "#39455A"
  success: "#39D98A"
  warning: "#FFB84D"
  error: "#FF6B7A"
  on-primary: "#F7F8FF"
  on-secondary: "#07131B"
  on-surface: "#F3F6FB"
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: -0.025em
  title-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0.12em
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  "2xl": 32px
  "3xl": 48px
  "4xl": 64px
  gutter: 24px
  container: 1400px
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 44px
  button-secondary:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 44px
  button-ghost:
    backgroundColor: "{colors.background-elevated}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  input-field:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 48px
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  alert-success:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.success}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  alert-error:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  alert-info:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
---

# JetAuth Console

## Overview

This design system is for a security-focused authentication frontend with public and authenticated areas. It should feel like a premium product interface rather than a marketing site, demo scaffold, or generic SaaS template.

The visual direction is minimal, fluid, dark-first, and technical. The strongest influence is the product UI language of JetBrains: deep graphite surfaces, sharp hierarchy, cool accents, and a sense of engineered precision. The interface must feel calm, fast, trustworthy, and highly intentional.

This system is not playful, warm, soft, or decorative. It should communicate control, clarity, and confidence. Motion should be subtle and smooth. Layouts should breathe, but never feel empty. Every surface must feel part of the same product shell.

The current product includes:
- a public entry experience
- authentication forms
- password recovery and email verification flows
- an authenticated dashboard
- a security center for password, email, and sessions

All of those areas should feel unified under one coherent system.

## Colors

The palette is anchored in cool graphite neutrals with a single vivid violet as the primary action color and a cyan accent for technical emphasis. The role of color is to establish hierarchy, trust, and focus, not decoration.

- **Background (#0B0D10):** The deepest base layer for the overall application shell.
- **Background Elevated (#11141A):** The next tonal layer for sticky bars and structural areas.
- **Surface / Surface 2 / Surface 3:** Layered dark panels that create depth without heavy shadows.
- **Primary (#7C6CFF):** The main action color. Use it for the highest-priority CTA on a screen.
- **Secondary (#36C2FF):** A technical accent for highlights, focus states, or supporting emphasis.
- **Tertiary (#39D98A):** A restrained success signal, never a branding color.
- **Neutral (#A7B0C0):** Default quiet text and utility tone.
- **Error (#FF6B7A):** Clear but controlled error state for validation and destructive intent.

The system should favor tonal contrast over bright surfaces. Large fields of pure accent color are discouraged. Most screens should remain primarily neutral, with violet used sparingly and intentionally.

## Typography

Typography must feel precise and premium. It should support high readability while preserving a technical product tone. The current font family, Manrope, is acceptable if executed with stronger hierarchy and tighter discipline.

- **Display and headline styles** should be bold, compact, and slightly tightened to create a clear visual signature.
- **Body styles** should remain highly readable and neutral.
- **Label styles** should feel crisp and UI-native, especially in navigation, field labels, metadata, and compact controls.
- **Uppercase micro-labels** may be used for section markers, but only in small amounts.

Use type to create product confidence:
- large hero statements should feel sharp, not soft
- form headings should feel authoritative
- labels should feel structured
- helper text should be quiet and unobtrusive

Avoid mixing too many weights or sizes in one view. A controlled type rhythm is part of the product's trustworthiness.

## Layout

The layout system should feel fluid and deliberate across desktop and mobile.

On public pages:
- mobile should stack vertically with generous but controlled spacing
- desktop should use asymmetric two-column compositions
- the primary form should feel anchored inside a refined panel
- secondary explanatory content should support, not compete

On authenticated pages:
- the app shell should be more compact and operational
- content should sit inside a fixed max-width frame
- sections should be grouped into clearly separated panels
- dashboard and security pages should feel like product workspaces, not landing sections

Spacing should follow a tight, modern rhythm:
- 4px and 8px steps for micro-adjustments
- 12px and 16px for component spacing
- 24px and 32px for section grouping
- 48px and 64px for page-level breathing room

The system should avoid oversized empty areas, especially in desktop auth screens. Density should feel intentional and balanced.

## Elevation & Depth

Depth should come primarily from tonal separation, borders, and controlled glow, not large shadows.

Use these hierarchy tools in order:
1. surface tone shift
2. border contrast
3. subtle inner or outer highlight
4. restrained shadow only when necessary

Primary panels may have a faint violet or neutral atmospheric edge, but this effect must remain subtle. The interface should never look glossy, glassy, or frosted.

Sticky headers and navigation bars should feel structurally integrated into the app shell rather than floating above it.

## Shapes

The shape language is restrained and modern.

- corners should be moderately rounded, not pill-heavy
- inputs and buttons should feel engineered, not playful
- cards should have enough radius to feel contemporary, but still crisp
- circular treatments should be rare and purposeful

Recommended application:
- compact controls: 8px to 12px
- inputs and buttons: 12px
- cards and panels: 16px
- large hero containers: 16px to 20px only when needed

Do not mix sharp and soft extremes on the same screen. The entire product should feel consistent in its geometry.

## Components

**Buttons**
- Primary buttons use the violet accent and should be reserved for the single most important action in a local context.
- Secondary buttons should use dark elevated surfaces with strong text contrast.
- Ghost buttons should be quiet and utility-oriented.
- Hover states should brighten or lift subtly, never bounce.

**Input fields**
- Inputs should be denser and cleaner than the current style.
- Labels must be readable but understated.
- Borders should be clearly visible against dark surfaces.
- Focus states should rely on precise contrast and a soft violet ring.
- Error states should be immediate and legible without becoming visually noisy.

**Cards and panels**
- Cards should feel architectural and product-grade.
- Public auth panels should feel premium and calm.
- Authenticated panels should feel operational and information-dense.
- Nested panels should use tonal steps, not extra decoration.

**Navigation**
- Public navigation should be compact and understated.
- Authenticated navigation should feel like part of a product workspace.
- Active states should be obvious through contrast and controlled accent use.

**Alerts and feedback**
- Success should be calm and technical.
- Error should be visible but not alarming.
- Informational messaging should sit on dark elevated surfaces with muted text.

## Do's and Don'ts

- Do keep the product dark-first across both public and authenticated areas.
- Do use violet as the main action color, not as a decorative wash.
- Do use cyan only as a supporting technical accent.
- Do create depth through tonal layers and borders.
- Do keep form layouts compact, calm, and highly legible.
- Do make the authenticated area feel like a real product shell.
- Do preserve strong contrast for text, labels, and interactive controls.
- Don't reuse the current warm sand, clay, or moss palette.
- Don't use soft glassmorphism, beige gradients, or airy lifestyle aesthetics.
- Don't make every card, button, and chip heavily rounded.
- Don't use multiple saturated accents in the same screen without hierarchy.
- Don't turn the home page into a generic marketing landing page.
- Don't make the dashboard feel decorative; it should feel operational.
- Don't overanimate transitions, panels, or hover states.
