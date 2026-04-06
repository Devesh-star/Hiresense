# Design System Strategy: The Cinematic Intelligence

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Sanctuary."** 

In the high-stakes environment of AI-driven interviews, traditional "HR Tech" interfaces often feel cold, mechanical, or anxiety-inducing. This system moves beyond the "standard SaaS dashboard" by adopting a high-end editorial aesthetic that feels more like a premium cinematic experience than a database. 

We break the "template" look through **Intentional Asymmetry** and **Tonal Depth**. Instead of rigid, boxed-in grids, we utilize generous breathing room and overlapping elements to create a sense of flow. This system is designed to reduce the candidate's cognitive load and the recruiter’s fatigue by replacing harsh lines with soft, luminous transitions and sophisticated layering.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, nocturnal foundation, utilizing the `surface` and `surface-container` tokens to build a world that feels vast yet focused.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through:
- **Background Color Shifts:** Placing a `surface-container-low` section against the `surface` background.
- **Tonal Transitions:** Using vertical whitespace to imply separation.
- **Glassmorphism:** Leveraging `surface-variant` with a 60% opacity and a 20px backdrop blur to create "islands" of content.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of tinted obsidian.
- **Level 0 (Base):** `surface` (#060e20) for the primary application canvas.
- **Level 1 (Sub-sections):** `surface-container-low` (#091328) for large structural areas like sidebars.
- **Level 2 (Active Content):** `surface-container-high` (#141f38) for primary cards and interaction zones.
- **Level 3 (Modals/Popovers):** `surface-container-highest` (#192540) to draw the eye to the most immediate task.

### The "Glass & Gradient" Rule
To elevate the "AI" presence, use the `surface-tint` (#85adff) at 5% opacity for floating elements. Primary CTAs and AI active states should utilize a subtle linear gradient: `primary` (#85adff) to `primary-container` (#6e9fff) at a 135-degree angle. This provides a "visual pulse" that flat colors cannot replicate.

---

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headlines) with **Inter** (Body/Labels) to balance technological precision with human-centric legibility.

*   **Display & Headline (Manrope):** These are your "Statement" tiers. Use `display-lg` and `headline-md` with tighter letter-spacing (-0.02em) to create an authoritative, editorial feel. These should feel like titles in a premium film.
*   **Body & Title (Inter):** Designed for high-speed scanning. `body-md` (0.875rem) is the workhorse for candidate data.
*   **The Hierarchy of Calm:** Use `on-surface-variant` (#a3aac4) for secondary metadata to reduce visual noise. Save `on-surface` (#dee5ff) for the core narrative of the page.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural scaffolding.

*   **The Layering Principle:** Place a `surface-container-lowest` (#000000) card on a `surface-container-low` section. This creates a "recessed" look that feels integrated into the interface rather than taped on top of it.
*   **Ambient Shadows:** For floating elements (e.g., recording controls), use a shadow with a 40px blur, 0px offset, and 8% opacity. The shadow color must be a tint of `surface-container-highest`—never pure black—to maintain the "glow" of the dark theme.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (#40485d) at **15% opacity**. It should be a suggestion of a boundary, not a cage.
*   **AI Glow:** Active AI elements (transcriptions, sentiment analysis) should use a subtle outer glow utilizing the `secondary` (#69f6b8) token at 20% opacity.

---

## 5. Components

### Primary Recording Controls
The "Heart" of the platform. Use a wide, pill-shaped container (`rounded-full`) using `surface-container-highest`. The "Record" state should not just be a color change, but a subtle "breathing" animation using the `error` (#ff716c) glow.

### Buttons
*   **Primary:** Gradient from `primary` to `primary-container`. `rounded-md`. No border.
*   **Secondary:** `surface-container-highest` background with `primary` text.
*   **Tertiary:** Ghost style. No background. `on-surface-variant` text, shifting to `primary` on hover.

### Cards & Intelligence Lists
**Prohibition:** No divider lines.
Separate candidate list items using a `1.5` (0.375rem) spacing gap and a subtle shift from `surface` to `surface-container-low`. Use `headline-sm` for the candidate name and `label-md` for status chips.

### AI Insight Chips
Use `secondary-container` (#006c49) with `on-secondary` (#005a3c) text. These should feel like organic tags that have "emerged" from the data.

### Input Fields
Avoid the "box" look. Use `surface-container-low` with a bottom-only `outline-variant` (20% opacity). On focus, the bottom border scales to 2px and shifts to `primary`, while a subtle `primary` glow appears behind the text.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins (e.g., a wider left margin for headlines) to create an editorial layout.
*   **Do** use `secondary` (#69f6b8) sparingly—only for "Success," "AI Confirmed," or "Active Interview" states.
*   **Do** maximize the use of `surface-bright` (#1f2b49) for subtle hover states on cards.

### Don't
*   **Don't** use 100% opaque `outline` tokens. They shatter the "Digital Sanctuary" feel.
*   **Don't** use standard "Drop Shadows." Use ambient, large-scale blurs that mimic soft studio lighting.
*   **Don't** crowd the interface. If a screen feels full, increase the spacing tokens (use `12` or `16`) and hide secondary actions in a `surface-container-highest` overflow menu.
*   **Don't** use pure white (#ffffff) for text. Always use `on-surface` (#dee5ff) to keep the contrast levels calming for the eyes in a dark environment.