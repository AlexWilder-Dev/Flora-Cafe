# Flora SW17 · concept site

A speculative redesign for [Flora](https://florasw17.com), the brunch café and tapas bar inside Tooting Market, London. It's a front-end demo with no backend: the menu, hours and bottomless packages are typed data, and the booking form only shows a confirmation on screen.

The idea comes from Flora's own positioning: the place changes with the time of day. A **Day / Evening** switch in the header re-lights the whole page ("Golden Daylight" and "Evening Spark"), and the default follows London time: Evening on Thursday to Saturday from 16:00, Day otherwise.

## Stack

- Vite + React + TypeScript
- Framer Motion for spring-based transitions (respects `prefers-reduced-motion`)
- Self-hosted Cormorant Garamond and Montserrat, the fonts used on florasw17.com
- Static build that works under any path (`base: './'`), ready for GitHub Pages

## Scripts

```bash
npm install
npm run dev          # local dev server
npm run build        # type-check and build to dist/
npm run preview      # serve the production build
npm run fetch-assets # download Flora's logo and photos from florasw17.com into public/images
npm run images       # make responsive image sizes and regenerate src/data/images.ts
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/menu.ts` | Full menu, add-ons, V/VG tags |
| `src/data/bottomless.ts` | Bottomless packages and rules |
| `src/data/hours.ts` | Opening hours (London time) |
| `src/data/contact.ts` | Address, contact, delivery links, small print |
| `src/data/gallery.ts`, `src/data/photos.ts` | Which photo goes where, with alt text |
| `src/styles/global.css` | Design tokens (from Flora's Elementor kit) and all styles |
| `src/lib/time.ts` | Open-now status, default mode, booking slots |

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to the default branch (or run it by hand). In the repo settings, set Pages → Source to "GitHub Actions". Relative asset paths mean it works at `user.github.io/repo/` without extra configuration.

## Look and feel

- **Golden Daylight** uses Flora's own site kit: cream `#F6F2EC`, linen `#EEEAE2`, forest ink `#141D13`, fern green `#465D40` for buttons and sage `#556B4F` for italic accents, with a rattan brown `#905D3B` sampled from their lamp photos for labels.
- **Evening Spark** is sampled from their night photos: navy `#0D2044` and indigo `#1D2343` from the walls, blossom pink `#D395BB` from the canopy and lamp amber `#E6AD6B` for buttons.
- Type is Cormorant Garamond (display) and Montserrat (text), as on florasw17.com.

## Photos

All photography is Flora's own, from florasw17.com, stored in `public/images/`. `src/data/photos.ts` decides which photo appears in each section, with alt text written from what each photo shows; `src/data/gallery.ts` sets the gallery order. `npm run fetch-assets` re-downloads the originals and `npm run images` regenerates the smaller responsive copies.

## What's real and what's mock

- **Real:** menu items and prices, hours, address, contact details, bottomless packages, photos, logos and partner badges (all from Flora's site), and the Deliveroo, Uber Eats, Instagram and Google Maps links.
- **Mock:** the booking form. It checks the input and shows a confirmation, but nothing is sent anywhere.
