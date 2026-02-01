# Product Specification Document (PRD)
## ShamanTek - Portal Digital Interactivo

**Version:** 1.0
**Date:** January 31, 2026
**Author:** lalop
**Status:** Production

---

## 1. Executive Summary

**ShamanTek** is an interactive digital portal exploring the convergence of technology, spirituality, and art. It's a sophisticated, visually-driven blog/content platform with a mystical, cyberpunk aesthetic.

**Tagline:** *"Recuerda que hemos venido a explorar"* (Remember that we came to explore)

**Core Philosophy:**
- Technology without wisdom is dangerous
- Spirituality without rigor is illusion
- Art without depth is decoration

---

## 2. Product Overview

### 2.1 Product Type
Static website / Interactive content portal

### 2.2 Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Icons:** Lucide Icons (SVG)
- **Fonts:** Cormorant Garamond, JetBrains Mono, Outfit
- **Video Generation:** Remotion (React-based)
- **No Backend:** All content is static (JSON-based)

### 2.3 Target Audience
- Philosophers and technologists interested in digital sovereignty
- Spiritual seekers exploring consciousness technologies
- Art enthusiasts interested in AI-generated surrealism
- Cypherpunks and privacy advocates

---

## 3. Core Features & Functionality

### 3.1 Portal Landing Page (index.html)

**Purpose:** Main entry point for exploring the three worlds

**Features:**
| Feature | Description | Expected Behavior |
|---------|-------------|-------------------|
| Hero Section | Animated title with "tunnel reveal" effect | Text animates in from zoomed-out, blurred state on page load |
| Interactive Subtitle | Hover effect with text scramble animation | Text glitches with random characters before stabilizing on hover |
| Bento Grid Layout | 4 navigable worlds + 1 newsletter card + 1 quote card | Cards are clickable and trigger world transitions |
| Canvas Background | Animated starfield with parallax | Stars slowly drift, creating depth perception |
| Spotlight Effect | Cursor-following radial gradient | Light follows mouse cursor movement |
| Scanlines Overlay | CRT monitor aesthetic | Semi-transparent horizontal lines overlay |
| Card Tilt Animation | 3D-like perspective shift on hover | Cards rotate slightly based on mouse position |

**World Cards (3 Primary):**
1. **IA & Futuro** - Cyan/Neon Blue theme
2. **Espiritualidad** - Golden Yellow theme
3. **Arte Surrealista** - Hot Pink/Magenta theme

### 3.2 Newsletter Subscription

**Location:** Portal landing page

**Features:**
| Feature | Description | Expected Behavior |
|---------|-------------|-------------------|
| Email Input | Text field for email address | Validates email format |
| Magnetic Button | Submit button with hover effect | Button "attracts" cursor magnetically |
| Confirmation | Alert message on submit | Shows success message (currently static) |

### 3.3 World: IA & Futuro (AI & Future)

**URL:** `/mundos/ia-futuro/index.html`

**Visual Theme:** Terminal/hacker aesthetic with cyan accents

**Features:**
| Feature | Description | Expected Behavior |
|---------|-------------|-------------------|
| Cyberpunk Grid Background | Technical grid pattern | Static decorative background |
| Status Indicators | "SISTEMA ACTIVO", "NODE::IA_FUTURO" | Pulsing/animated status badges |
| World Icon | Central icon with pulsing rings | Animated concentric circles |
| Article List | Cards for each article | Click navigates to full article |
| Tags Display | Tag badges per article | Visual categorization |
| Date & Excerpt | Metadata for each article | Published date and preview text |

**Available Articles:**
1. La Llave y la Jaula (Bitcoin, privacy, cypherpunk)
2. Moléculas & Máquinas (LSD, psychedelics, Silicon Valley)
3. Tu Cuerpo No Es Tuyo (Sovereignty, biopolitics)
4. El Default Mode Network (Neuroscience, ego, meditation)

### 3.4 World: Espiritualidad (Spirituality)

**URL:** `/mundos/espiritualidad/index.html`

**Visual Theme:** Mystical aesthetic with golden accents

**Features:**
| Feature | Description | Expected Behavior |
|---------|-------------|-------------------|
| Spirit Grid Background | Ethereal grid pattern | Subtle animated glow |
| Glowing Orbs | Decorative energy points | Pulsing light effects |
| Mantra Messaging | Spiritual taglines | Rotating or static mantras |
| Article List | Cards for articles | Click navigates to full article |

**Available Articles:**
1. Hongos Mágicos: Tecnología de la Consciencia (Psicodélicos)

### 3.5 World: Arte Surrealista (Surrealist Art)

**URL:** `/mundos/arte-surrealista/index.html`

**Visual Theme:** Artistic, dreamlike aesthetic with hot pink accents

**Features:**
| Feature | Description | Expected Behavior |
|---------|-------------|-------------------|
| Particle Effects | Mouse movement traces | Subtle particles follow cursor |
| Gallery Cards | Interactive art experiences | Click navigates to gallery |
| Coming Soon Badges | Unavailable galleries | Visual indicator for future content |

**Available Galleries:**
1. **Laberinto Onírico** (Active) - Interactive dream maze
2. Bestiario Interior (Coming Soon)
3. Arquitecturas Imposibles (Coming Soon)

### 3.6 Laberinto Onírico (Dream Labyrinth)

**URL:** `/mundos/arte-surrealista/galeria laberinto/laberinto-final.html`

**Purpose:** Interactive game/art experience

**Features:**
| Feature | Description | Expected Behavior |
|---------|-------------|-------------------|
| Interactive Maze | Canvas-based navigation | User explores maze nodes |
| Hidden Nodes | 5 easter eggs to discover | Must visit in specific order |
| Progress Tracking | Visual feedback on discovery | Nodes light up when found |
| Completion Message | Final reveal on completion | Special message after finding all 5 |

### 3.7 Article Pages

**URL Pattern:** `/mundos/{world}/posts/{article-slug}.html`

**Common Features:**
| Feature | Description | Expected Behavior |
|---------|-------------|-------------------|
| Back Navigation | Return to world hub | Clickable link at top |
| Themed Background | World-specific grid | Cyan/Gold/Pink based on world |
| Progress Bar | Scroll position indicator | Bar fills as user scrolls down |
| Hamburger Menu | Table of contents sidebar | Opens navigation panel |
| Content Sections | Numbered chapters | Semantic HTML with headings |
| Blockquotes | Highlighted quotes | Visual callout styling |
| Related Articles | Recommendations at end | Links to other articles |
| Footer Mantra | Philosophical closing | Inspirational text |

---

## 4. User Journeys

### 4.1 Primary Journey: Content Discovery

```
Portal Landing → Select World → Browse Articles → Read Article → Related Articles
```

**Steps:**
1. User lands on `index.html`
2. Observes tunnel reveal animation
3. Hovers over world cards (sees tilt effect)
4. Clicks on a world card (IA/Spirit/Art)
5. Transition animation plays (zoom effect)
6. Lands on world hub page
7. Browses article cards
8. Clicks article to read
9. Scrolls through content (progress bar updates)
10. Clicks related article or returns to hub

### 4.2 Secondary Journey: Art Exploration

```
Portal → Arte Surrealista → Laberinto Onírico → Complete Maze
```

**Steps:**
1. User selects Arte Surrealista world
2. Clicks on Laberinto Onírico gallery
3. Navigates interactive maze
4. Discovers 5 hidden nodes in order
5. Receives completion message

### 4.3 Newsletter Signup

```
Portal → Newsletter Card → Enter Email → Submit → Confirmation
```

---

## 5. Design System

### 5.1 Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | #05050a | Deep void black (main background) |
| `--bg-secondary` | #0a0a12 | Slightly lighter void |
| `--text-primary` | #e0e0e0 | Light gray (main text) |
| `--text-secondary` | #888899 | Dim gray (secondary text) |
| `--accent-ia` | #00f0ff | Cyan (IA & Futuro world) |
| `--accent-spirit` | #ffd700 | Golden (Espiritualidad world) |
| `--accent-art` | #ff3366 | Hot pink (Arte world) |

### 5.2 Typography

| Font | Usage |
|------|-------|
| Cormorant Garamond | Display headings, elegant text |
| JetBrains Mono | Code, technical elements |
| Outfit | Body text, UI elements |

### 5.3 Animation Specifications

| Animation | Duration | Easing |
|-----------|----------|--------|
| Tunnel Reveal | 1.5s | ease-out |
| Text Scramble | 0.3s | linear |
| Card Tilt | 0.2s | ease |
| World Transition | 0.8s | cubic-bezier |
| Spotlight Follow | 0.1s | linear |

---

## 6. Technical Requirements

### 6.1 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 6.2 Responsive Breakpoints
| Breakpoint | Target |
|------------|--------|
| 375px | Mobile |
| 768px | Tablet |
| 1024px | Desktop |
| 1440px | Large Desktop |

### 6.3 Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 85

### 6.4 Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- `prefers-reduced-motion` respect
- Minimum 4.5:1 contrast ratio

---

## 7. Page Inventory

| Page | URL | Purpose |
|------|-----|---------|
| Portal | `/index.html` | Main landing page |
| About | `/acerca.html` | Project mission |
| Contact | `/contacto.html` | Communication |
| Promo | `/promo_reel.html` | Video showcase |
| IA World | `/mundos/ia-futuro/index.html` | Tech articles hub |
| Spirit World | `/mundos/espiritualidad/index.html` | Spiritual articles hub |
| Art World | `/mundos/arte-surrealista/index.html` | Art galleries hub |
| Labyrinth | `/mundos/arte-surrealista/galeria laberinto/laberinto-final.html` | Interactive maze |
| Articles (6+) | `/mundos/{world}/posts/{slug}.html` | Individual articles |

---

## 8. Content Structure

### 8.1 Article Metadata (articles.json)

```json
{
  "id": "unique-identifier",
  "title": "Article Title",
  "url": "/path/to/article.html",
  "world": "ia|spirit|art",
  "tags": ["tag1", "tag2"],
  "date": "YYYY-MM-DD",
  "excerpt": "Short description (max 200 chars)"
}
```

### 8.2 Current Articles

| ID | Title | World | Date |
|----|-------|-------|------|
| llave-jaula | La Llave y la Jaula | IA | 2026-01-21 |
| moleculas | Moléculas & Máquinas | IA | 2026-01-15 |
| cuerpo | Tu Cuerpo No Es Tuyo | IA | 2026-01-10 |
| dmn | El Default Mode Network | IA | 2026-01-25 |
| hongos | Hongos Mágicos | Spirit | 2026-01-20 |

---

## 9. Testing Checklist

### 9.1 Critical User Flows
- [ ] Portal loads with animations
- [ ] All three worlds are accessible
- [ ] World transitions work correctly
- [ ] Articles load and display properly
- [ ] Navigation between pages works
- [ ] Back buttons function correctly
- [ ] Progress bar updates on scroll
- [ ] Mobile responsive layout works

### 9.2 Interactive Elements
- [ ] Hover effects on cards work
- [ ] Text scramble animation triggers
- [ ] Spotlight follows cursor
- [ ] Newsletter form validates email
- [ ] Hamburger menu opens/closes
- [ ] Labyrinth nodes are interactive

### 9.3 Visual Regression
- [ ] Canvas starfield renders
- [ ] Scanlines overlay visible
- [ ] World-specific colors correct
- [ ] Typography renders correctly
- [ ] Icons load from Lucide

### 9.4 Performance
- [ ] Page loads under 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] Images/assets load correctly

---

## 10. Known Limitations

1. **Newsletter:** Currently displays alert only (no backend integration)
2. **Contact Form:** Submission behavior unclear
3. **Art Galleries:** 2 of 3 galleries marked "Coming Soon"
4. **Search:** No search functionality implemented
5. **User Accounts:** No authentication system
6. **Comments:** No discussion/commenting system

---

## 11. Future Roadmap (Not in Scope for Testing)

- Additional art galleries
- Backend for newsletter
- User comments/discussions
- Search functionality
- Multi-language support

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-31 | lalop | Initial PRD for TestSprite |

---

*This document describes the ShamanTek portal as it exists in production. Test against these specifications to ensure feature completeness and quality.*
