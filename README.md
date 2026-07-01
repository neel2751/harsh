# Samvedna — DPSW Trust (Static Site)

India's inclusive digital ecosystem landing page. Plain **HTML + CSS + vanilla JS** — no build step, no dependencies.

## Project structure

```
samvedna/
├── index.html                 # Single-page site (all sections)
├── README.md
└── assets/
    ├── css/
    │   └── style.css          # Design tokens + all section styles + responsive + a11y
    ├── js/
    │   └── main.js            # Nav, scroll-reveal, counters, bars, testimonials, scrollspy
    └── images/                # Drop optional photos here (see below)
```

## Run it

No server needed — just open `index.html` in a browser.
For live reload during dev (optional):

```powershell
# from the samvedna/ folder
npx serve .
# or
python -m http.server 5500
```

## Sections (in order)

Header · Hero · Stats strip · About (ecosystem orbit) · Four Pillars · Why · Impact · Samarth CSR · Success Stories + Testimonials · Accessibility · Partners · Get Involved · Footer

## Design system

| Token | Value | Use |
|-------|-------|-----|
| `--orange` | `#E8651A` | Primary (headings, buttons, icons, accents) |
| `--ink` | `#1A1A1A` | Dark sections, text, some circles |
| `--cream` / `--peach` | `#FAEDE5` / `#FDF6F0` | Hero / Why / Get-Involved backgrounds |
| `--off` | `#F5F5F5` | Stats / Impact backgrounds |
| Font | **Plus Jakarta Sans** | 800 uppercase for display, 400–600 body |

Font loads from Google Fonts (see `<head>`). Colours are all CSS custom properties in `:root` — change them in one place.

## Accessibility built in

- Skip-to-content link, semantic landmarks, ARIA on nav/carousel
- Visible keyboard focus (`:focus-visible`)
- `prefers-reduced-motion` fully respected (marquee, orbit, counters, reveals all stop)
- Responsive from 360 px up

## Images (optional)

The current build uses **no `<img>` tags** — the ecosystem diagram is pure CSS, so nothing is broken out of the box. If you want the original photos back, add them to `assets/images/` and drop `<img>` tags into the About / Pillars / Samarth sections. Suggested filenames:

- `about-ecosystem.jpg`
- `pillar-workability.jpg`, `pillar-entrepreneur.jpg`, `pillar-marketplace.jpg`, `pillar-matrimony.jpg`
- `samarth-csr.jpg`

## Notes

- All CTA links currently point to in-page anchors (`#get-involved`) or `#`. Wire them to real portal URLs when ready.
- Counter values, impact bar percentages, and testimonials are in the HTML — edit inline.