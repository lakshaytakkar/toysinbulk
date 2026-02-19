# ToysinBulk - Wholesale Toy Distributor Website

## Overview
A React + TypeScript frontend application for ToysinBulk, America's wholesale toy distributor. The site showcases wholesale toy products with category browsing, product pages, and collection views. All data is dynamically fetched from a Supabase PostgreSQL database. Public-facing ecommerce website without authentication flows.

## Project Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Backend**: Supabase (PostgreSQL with Row Level Security)
- **Styling**: Tailwind CSS (via CDN)
- **Font**: Montserrat (Google Fonts)
- **Navigation**: React state-based view switching (home, collection, product)

## Supabase Database
- **Project**: aejmkvfbqfshvzbphmql
- **Tables**: categories, products, product_images, product_specifications, brands, industries, banners, nav_items, mega_menu_items, site_settings
- **RLS**: All tables have public read access policies enabled
- **Images**: Served from local `/images/` directory (paths stored in database)

## Project Structure
```
/
├── index.html           # HTML template with Tailwind CDN
├── vite.config.ts       # Vite configuration (port 5000)
├── .env                 # Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
├── public/
│   └── images/          # Generated placeholder images (14 total)
├── src/
│   ├── App.tsx          # Main application component with view routing
│   ├── index.tsx        # React entry point
│   ├── types.ts         # TypeScript type definitions
│   ├── lib/
│   │   └── supabase.ts  # Supabase client initialization
│   ├── services/
│   │   └── dataService.ts # Data fetch functions for all tables
│   ├── hooks/
│   │   └── useSupabaseData.ts # Custom React hook for data fetching
│   └── components/
│       ├── BrandGrid.tsx
│       ├── CategoryGrid.tsx
│       ├── CharacterShopBanner.tsx
│       ├── CollectionPage.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── IndustryGrid.tsx
│       ├── PriceBanners.tsx
│       ├── ProductCarousel.tsx
│       ├── ProductPage.tsx
│       └── TrustBar.tsx
└── package.json
```

## Data Flow
1. Components use `useSupabaseData` hook to fetch data on mount
2. Hook calls functions from `dataService.ts` which query Supabase
3. Loading states show skeleton placeholders while data loads
4. Error states are handled gracefully with fallback content

## Recent Changes (Feb 2026)
- Migrated all data from hardcoded constants to Supabase PostgreSQL database
- Created 10 database tables with proper relationships and RLS policies
- Seeded database with categories, products, brands, industries, nav items, banners, mega menu items, site settings
- Installed @supabase/supabase-js client library
- Created data service layer (supabase.ts, dataService.ts, useSupabaseData.ts)
- Refactored all 13 components to fetch data dynamically from Supabase
- Reorganized project into proper src/ directory structure
- Removed old root-level source files and constants.ts

## Development
- **Dev server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Deployment**: Static site deployment from `dist/` directory
- **Environment**: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY required

## User Preferences
- No decorative animations (shine/sweep effects)
- No development tools visible to end users
- No authentication/login flows - public website only
- Clean, production-ready ecommerce UI
