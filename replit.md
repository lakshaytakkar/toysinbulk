# ToysinBulk - Wholesale Toy Distributor Website

## Overview
A React + TypeScript frontend application for ToysinBulk, America's wholesale toy distributor. The site showcases wholesale toy products with category browsing, product pages, and collection views.

## Project Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **Font**: Montserrat (Google Fonts)
- **AI Integration**: Google Gemini API (optional, for image generation)

## Project Structure
```
/
├── App.tsx              # Main application component with routing
├── index.tsx            # React entry point
├── index.html           # HTML template with Tailwind CDN
├── constants.ts         # Product data and constants
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration (port 5000)
├── components/
│   ├── BrandGrid.tsx
│   ├── CategoryGrid.tsx
│   ├── CharacterShopBanner.tsx
│   ├── CollectionPage.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ImageGenerator.tsx
│   ├── IndustryGrid.tsx
│   ├── PriceBanners.tsx
│   ├── ProductCarousel.tsx
│   ├── ProductPage.tsx
│   └── TrustBar.tsx
└── package.json
```

## Development
- **Dev server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Deployment**: Static site deployment from `dist/` directory

## Environment Variables
- `GEMINI_API_KEY` - Optional Google Gemini API key for AI image generation features
