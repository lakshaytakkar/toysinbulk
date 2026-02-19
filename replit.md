# ToysinBulk - Wholesale Toy Distributor Website

## Overview
A React + TypeScript frontend application for ToysinBulk, America's wholesale toy distributor. The site showcases wholesale toy products with category browsing, product pages, and collection views. Production-ready ecommerce frontend with generated placeholder images and clean navigation.

## Project Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **Font**: Montserrat (Google Fonts)
- **Navigation**: React state-based view switching (home, collection, product)

## Project Structure
```
/
├── App.tsx              # Main application component with view routing
├── index.tsx            # React entry point
├── index.html           # HTML template with Tailwind CDN
├── constants.ts         # Product data and constants
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration (port 5000)
├── public/
│   └── images/          # Generated placeholder images (14 total)
├── components/
│   ├── BrandGrid.tsx
│   ├── CategoryGrid.tsx
│   ├── CharacterShopBanner.tsx
│   ├── CollectionPage.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── IndustryGrid.tsx
│   ├── PriceBanners.tsx
│   ├── ProductCarousel.tsx
│   ├── ProductPage.tsx
│   └── TrustBar.tsx
└── package.json
```

## Recent Changes (Feb 2026)
- Removed all dev tools: AI Image Generator, View Switcher demo bar, Wand2 edit buttons, Marketing Tools button
- Removed Google GenAI dependency and import map conflicts
- Removed all shine/sweep hover animations
- Fixed navigation: converted from broken # anchors to React state-based routing
- Generated 14 placeholder images for hero, categories, industries, mega menu, and character shop
- Fixed bugs: "$25$" typo, copyright year to 2026
- Improved TrustBar with icon-based trust indicators
- Cleaned up CharacterShopBanner to use generated image

## Development
- **Dev server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Deployment**: Static site deployment from `dist/` directory

## User Preferences
- No decorative animations (shine/sweep effects)
- No development tools visible to end users
- Clean, production-ready ecommerce UI
