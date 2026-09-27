---
name: Neo-Tactile Trainer HUD
project: LaunchPad / Pokemon Fan Game Interface
version: 1.0.0
colorMode: DARK
colors:
  # Surface & Background Hierarchy
  background: '#0f131d'
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-variant: '#313540'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  
  # Text & Surface Content
  on-background: '#dfe2f1'
  on-surface: '#dfe2f1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  
  # Outlines & Dividers
  outline: '#af8782'
  outline-variant: '#5e3f3a'
  surface-tint: '#ffb4a9'
  
  # Brand & Core Overrides
  brand-neutral: '#0b0f19'
  brand-primary: '#ee1515'
  brand-secondary: '#facc15'
  brand-tertiary: '#06b6d4'
  
  # Primary Palette (PokéBall Vermilion / Coral Accent)
  primary: '#ffb4a9'
  on-primary: '#690002'
  primary-container: '#ff5544'
  on-primary-container: '#5c0001'
  inverse-primary: '#c00008'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930004'
  
  # Secondary Palette (Electric Voltage Gold)
  secondary: '#ffe083'
  on-secondary: '#3c2f00'
  secondary-container: '#eec200'
  on-secondary-container: '#645000'
  secondary-fixed: '#ffe083'
  secondary-fixed-dim: '#eec200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  
  # Tertiary Palette (Sub-Zero Cyan / Tactical Blue)
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  
  # Semantic & Elemental Accents
  element-fire: '#f97316'
  element-fire-bold: '#ef4444'
  element-grass: '#10b981'
  element-electric: '#facc15'
  element-water: '#06b6d4'
  
  # System Feedback & Alerts
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'

typography:
  display-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: -0.02em
  label-badge:
    fontFamily: Sora
    fontSize: 11px
    fontWeight: '800'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em

rounded:
  sm: 0.5rem      # 8px
  DEFAULT: 1rem   # 16px
  md: 1.5rem      # 24px
  lg: 2rem        # 32px
  xl: 3rem        # 48px
  full: 9999px    # Pill / Capsule

spacing:
  gutter: 0.75rem # 12px
  margin: 1rem    # 16px
  space-xs: 0.25rem # 4px
  space-sm: 0.5rem  # 8px
  space-md: 1rem    # 16px
  space-lg: 1.5rem  # 24px
  space-xl: 2.25rem # 36px
---

# Design System: LaunchPad (Neo-Tactile Trainer HUD)

## 1. Brand & Style Overview

The **LaunchPad Neo-Tactile Trainer HUD** design system establishes a high-performance, immersive digital companion and battle HUD engineered for competitive trainers and passionate collectors. It merges tactile arcade responsiveness with precision mobile software engineering.

The personality balances **tactical clarity**, **energetic playfulness**, and **high-tech utility**. Rather than leaning into outdated retro nostalgia or flat corporate sterility, it embraces an arcade-modern neo-tactile approach: deep crystalline surfaces, glowing elemental resonance, layered capacitive HUD modules, and spring-loaded physical interactions.

### Core Principles
- **Atmospheric Depth:** Deep indigo-slate canvases establish high optical contrast, allowing elemental energy signatures and critical stats to inform state changes instantly.
- **Tactile Weight:** Interactive triggers feel physically grounded—bearing distinct bevels, subtle inset shadows, dynamic rim lighting, and reactive physical compression when pressed.
- **HUD Readability:** Critical battle statistics, elemental typings, turn clocks, and monster data remain glanceable across OLED screens through high-contrast typography and modular glass badges.

---

## 2. Color Palette & Theming

The palette is anchored by an ink-dense neutral canvas with multi-layered luminescence, evoking a battle visor or handheld digital companion.

### 2.1 Foundational Brand Palette
| Token | Hex | Role & Description |
| :--- | :--- | :--- |
| `--color-brand-neutral` | `#0B0F19` | Deep abyssal slate-indigo base canvas. Anchors the OLED display. |
| `--color-brand-primary` | `#EE1515` | PokéBall Vermilion. Reserved for critical combat triggers, capture commands, HP alert thresholds, and master branding anchors. |
| `--color-brand-secondary` | `#FACC15` | High-voltage yellow for stamina bars, XP gauges, critical warnings, and priority system indicators. |
| `--color-brand-tertiary` | `#06B6D4` | Sub-zero cyan for tactical data panels, shielding, tech status chips, and mana/PP reserves. |

### 2.2 Surface & Neutral Scale
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#0F131D` | Global app background |
| `--color-surface-container-lowest` | `#0A0E18` | Recessed meter channels, deep dark wells |
| `--color-surface-container-low` | `#171B26` | Inset panels, sub-surface grouping |
| `--color-surface-container` | `#1C1F2A` | Standard card backgrounds and containers |
| `--color-surface-container-high` | `#262A35` | Floating cards, elevated modules |
| `--color-surface-container-highest` | `#313540` | Hovered elements, interactive cards |
| `--color-surface-bright` | `#353944` | Top rim highlights and active indicators |
| `--color-on-surface` | `#DFE2F1` | Primary text and icons on dark surfaces |
| `--color-on-surface-variant` | `#E9BCB6` | Secondary text, captions, and muted labels |
| `--color-outline` | `#AF8782` | Card borders, interactive element borders |
| `--color-outline-variant` | `#5E3F3A` | Subtle dividers and background borders |

### 2.3 Primary Palette (Vermilion / Coral Tones)
| Token | Hex | Description |
| :--- | :--- | :--- |
| `--color-primary` | `#FFB4A9` | Primary accent for active toggles, icons, and highlights |
| `--color-on-primary` | `#690002` | Text/icon color on primary fill |
| `--color-primary-container` | `#FF5544` | High-contrast callout container, attack trigger fill |
| `--color-on-primary-container` | `#5C0001` | Text/icon color on primary container |
| `--color-primary-fixed` | `#FFDAD5` | Constant high-value primary container |
| `--color-inverse-primary` | `#C00008` | High-contrast contrast trigger |

### 2.4 Secondary Palette (Electric Gold)
| Token | Hex | Description |
| :--- | :--- | :--- |
| `--color-secondary` | `#FFE083` | High-energy accent, active badge fill |
| `--color-on-secondary` | `#3C2F00` | Text/icon color on secondary fill |
| `--color-secondary-container` | `#EEC200` | EXP gauge fill, warning chips |
| `--color-on-secondary-container` | `#645000` | Text on secondary container |

### 2.5 Tertiary Palette (Cyan / Frost)
| Token | Hex | Description |
| :--- | :--- | :--- |
| `--color-tertiary` | `#4CD7F6` | Tactical indicators, mana/PP gauge, defense ratings |
| `--color-on-tertiary` | `#003640` | Text/icon color on tertiary fill |
| `--color-tertiary-container` | `#009EB9` | Technical status chips, data pill backgrounds |
| `--color-on-tertiary-container` | `#002F38` | Text on tertiary container |

### 2.6 Elemental Accents & Semantics
| Element / State | Color Hex | Gradients / Glows | Application |
| :--- | :--- | :--- | :--- |
| **Fire (Attack)** | `#F97316` / `#EF4444` | `linear-gradient(135deg, #EF4444, #F97316)` | Attack power, active burn status, combat trigger |
| **Electric (Energy)** | `#FACC15` | `0 0 16px rgba(250, 204, 21, 0.4)` | Stamina gauges, critical alerts, electrical typing |
| **Water / Ice (Defense)** | `#06B6D4` | `0 0 16px rgba(6, 182, 212, 0.35)` | PP reserves, shields, tactical encyclopedia data |
| **Grass / Nature (Life)** | `#10B981` | `0 0 16px rgba(16, 185, 129, 0.35)` | Healthy HP, healing consumable, affirmative states |
| **Critical HP / Error** | `#EE1515` | `0 0 20px rgba(238, 21, 21, 0.6)` | Flashing HP danger warning, battle critical state |

---

## 3. Typography System

The typographic hierarchy combines three distinct font families to serve specific cognitive and aesthetic roles:

1. **Sora (Headings, Creature Names, Badges & Display Titles):**  
   Geometric, futuristic, and robust. Delivers mechanical confidence and high-tech flair without sacrificing legibility at compact scales.
2. **Plus Jakarta Sans (Body, Descriptions, Stats & Narrative Text):**  
   Approachable, humanist, and clean. Engineered with wide apertures to guarantee effortless scanning during rapid match play.
3. **JetBrains Mono (Stats, Combat Clocks, Numeric Precision & Values):**  
   Monospaced numeric precision prevents layout shifts as HP, PP, and timer values tick dynamically.

### 3.1 Typeface Sources
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
```

### 3.2 Typography Scale
| Token | Font Family | Size | Weight | Line Height | Tracking | Primary Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Sora | 40px | 800 (Extrabold) | 48px | -0.03em | Screen titles, master hero headlines |
| `display-lg-mobile` | Sora | 32px | 800 (Extrabold) | 40px | -0.02em | Mobile screen titles & victories |
| `headline-lg` | Sora | 28px | 700 (Bold) | 36px | -0.02em | Section titles, creature names |
| `headline-sm` | Sora | 20px | 600 (Semibold) | 28px | -0.01em | Card headers, sub-sections |
| `body-lg` | Plus Jakarta Sans | 16px | 500 (Medium) | 24px | 0.0em | Featured descriptions, summaries |
| `body-md` | Plus Jakarta Sans | 14px | 400 (Regular) | 20px | 0.0em | Standard body copy, lore, dialog |
| `label-numeric` | JetBrains Mono | 16px | 700 (Bold) | 20px | -0.02em | HP/PP values, damage digits, timers |
| `label-badge` | Sora | 11px | 800 (Extrabold) | 14px | +0.08em | Elemental pills, rarity tags (UPPERCASE) |
| `label-sm` | Plus Jakarta Sans | 12px | 600 (Semibold) | 16px | +0.02em | Micro tags, captions, timestamps |

---

## 4. Spacing, Shapes & Layout

### 4.1 Spacing Scale
Built upon a strict **4px/8px modular base scale**:
- **`space-xs` (4px / 0.25rem):** Micro gaps between icon and text, tight badge padding.
- **`space-sm` (8px / 0.5rem):** Internal element spacing within cards and lists.
- **`space-md` (16px / 1.0rem):** Standard padding for cards, modals, and container margins.
- **`space-lg` (24px / 1.5rem):** Generous section separation and grid gap.
- **`space-xl` (36px / 2.25rem):** Major screen block spacing and action isolation.
- **`gutter` (12px / 0.75rem):** Compact grid gutters for high mobile density.
- **`margin` (16px / 1.0rem):** Screen edge safety margin.

### 4.2 Corner Radii (Roundness)
The shape system employs rounded capsules and pill contours inspired by physical gaming cartridges, tournament badges, and PokéBall mechanics:
- **`rounded-sm` (8px / 0.5rem):** Tooltips, nested meter bars, small buttons.
- **`rounded-DEFAULT` (16px / 1.0rem):** Standard HUD cards, move matrix slots.
- **`rounded-md` (24px / 1.5rem):** Modal trays, floating battle menus.
- **`rounded-lg` (32px / 2.0rem):** Large bottom sheets, sheet drawers.
- **`rounded-xl` (48px / 3.0rem):** Featured hero frames.
- **`rounded-full` (9999px):** Pills, elemental badges, HP tracks, Pokédex category tags.

---

## 5. Elevation, Depth & Glassmorphism

Visual hierarchy is maintained through tactical glassmorphism layered over stepped tonal bases, illuminated by directional rim lights and elemental glows.

```
+-----------------------------------------------------------+
| Level 3: Modal Battle Trays & Overlays (Blur 24px, 85%)   |
|   +-----------------------------------------------------+ |
|   | Level 2: Tactile Cards & Triggers (Dual-tier shadow)| |
|   |   +-----------------------------------------------+ | |
|   |   | Level 1: Sub-Panels & Inset HUDs (Blur 16px)  | | |
|   |   |   [ Ground Floor Canvas: #0B0F19 ]            | | |
|   |   +-----------------------------------------------+ | |
|   +-----------------------------------------------------+ |
+-----------------------------------------------------------+
```

### Elevation Hierarchy
1. **Ground Floor (Canvas - `#0B0F19`):**  
   Deep base canvas with subtle radial illumination centered behind featured combatants.
2. **Level 1 (Sub-Panels & Inset HUDs - `#131B2E`):**  
   70% opacity, `backdrop-filter: blur(16px)`, with a 1px top highlight border (`rgba(255, 255, 255, 0.08)`).
3. **Level 2 (Tactile Cards & Triggers - `#1E293B`):**  
   Elevated with dual-tier shadows: an ambient drop shadow (`0 8px 24px rgba(0, 0, 0, 0.5)`) and a 1px solid micro-border (`rgba(255, 255, 255, 0.12)`).
4. **Level 3 (Modal Battle Trays & Overlays - `#0F172A`):**  
   85% opacity, `backdrop-filter: blur(24px)`, framed with an inner glow matching the active creature’s primary element.

### Tactile Feedback & Micro-Interactions
- **Down-Shift on Active:** Pressing an interactive trigger applies `transform: translateY(2px)` paired with an inner bevel shadow (`inset 0 2px 4px rgba(0, 0, 0, 0.4)`).
- **Elemental Bloom:** Focused combat actions emit an exterior bloom: `box-shadow: 0 0 20px [element-glow-color]`.

---

## 6. Core Component Guidelines

### 6.1 Buttons & Combat Triggers
- **Primary Battle Command / PokéBall Throw:**  
  Solid `#EE1515` background with a subtle top edge highlight (`rgba(255, 255, 255, 0.25)`), crisp 1.5px semi-translucent stroke, bold uppercase `Sora` typography, and high tactile compression on active state.
- **Move Matrix Buttons (Elemental Slots):**  
  Dual-layered cards styled according to move typing (Fire, Water, Grass, Electric). Includes a 1px micro-border tinted to match the element, a subtle background radial gradient matching the type color, and top-right monospaced PP indicators (`JetBrains Mono`).

### 6.2 Elemental Chips & Badges
- Pill-shaped hulls (`rounded-full`) featuring high-contrast typography (`label-badge`, uppercase, `letter-spacing: 0.08em`).
- Type icons sit within an inset circular badge at the leading edge.
- Background uses high-opacity element colors overlaid with glass shine highlights.

### 6.3 HP & Dynamic Gauge Displays
- Slanted or capsule track designs with a high-contrast dark channel (`#0F172A`).
- Filled with gradient bars that shift dynamically:
  - **High HP (>50%):** Bio-luminescent Emerald (`#10B981`)
  - **Warning HP (20% - 50%):** Electric Yellow (`#FACC15`)
  - **Critical HP (<20%):** PokéBall Vermilion (`#EE1515`) with a pulsing ambient glow (`animation: pulse 1.5s infinite`)
- Exact numeric readouts displayed in `JetBrains Mono` (`label-numeric`) positioned above the track.

### 6.4 Monster Profile Cards & Stat Displays
- Framed in frosted glass (`Level 2` elevation) with an elemental rim highlight reflecting the active creature's nature.
- Backing layers contain subtle holographic grid watermarks.

### 6.5 Input Fields & Search Bars
- Inset pill-shaped containers with `#131B2E` background, 1px border (`rgba(255, 255, 255, 0.1)`), glowing cyan ring (`#06B6D4`) on focus, accompanied by monospaced placeholder text.

---

## 7. CSS Custom Properties Reference

```css
:root {
  /* Brand Primitives */
  --brand-neutral: #0b0f19;
  --brand-primary: #ee1515;
  --brand-secondary: #facc15;
  --brand-tertiary: #06b6d4;

  /* Surfaces */
  --surface-bg: #0f131d;
  --surface-dim: #0f131d;
  --surface-bright: #353944;
  --surface-container-lowest: #0a0e18;
  --surface-container-low: #171b26;
  --surface-container: #1c1f2a;
  --surface-container-high: #262a35;
  --surface-container-highest: #313540;

  /* Text & Outlines */
  --on-surface: #dfe2f1;
  --on-surface-variant: #e9bcb6;
  --outline: #af8782;
  --outline-variant: #5e3f3a;

  /* Accent Roles */
  --primary: #ffb4a9;
  --on-primary: #690002;
  --primary-container: #ff5544;
  --secondary: #ffe083;
  --on-secondary: #3c2f00;
  --secondary-container: #eec200;
  --tertiary: #4cd7f6;
  --on-tertiary: #003640;
  --tertiary-container: #009eb9;

  /* Elemental Semantics */
  --element-fire: #ef4444;
  --element-grass: #10b981;
  --element-electric: #facc15;
  --element-water: #06b6d4;

  /* Fonts */
  --font-display: 'Sora', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radii */
  --radius-sm: 0.5rem;
  --radius-md: 1.0rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2.0rem;
  --radius-pill: 9999px;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1.0rem;
  --space-lg: 1.5rem;
  --space-xl: 2.25rem;
}
```
