# ToysinBulk - Wholesale Toy Distributor Website

## Overview
A React + TypeScript frontend application for ToysinBulk, America's wholesale toy distributor. The site showcases wholesale toy products with category browsing, product pages, collection views, and a full cart system. All data is dynamically fetched from a Supabase PostgreSQL database. Public-facing ecommerce website without authentication flows.

## Project Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Backend**: Supabase (PostgreSQL with Row Level Security)
- **Styling**: Tailwind CSS (via CDN)
- **Font**: Montserrat (Google Fonts)
- **Navigation**: React state-based view switching (home, collection, product) with slug-based category/product routing
- **State Management**: React Context (CartContext) for cart state

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
│   └── images/          # Generated placeholder images + brand logos
├── src/
│   ├── App.tsx          # Main application component with view routing, cart provider
│   ├── index.tsx        # React entry point
│   ├── types.ts         # TypeScript type definitions
│   ├── context/
│   │   └── CartContext.tsx # Cart state management (add/remove/update/clear)
│   ├── lib/
│   │   └── supabase.ts  # Supabase client initialization
│   ├── services/
│   │   └── dataService.ts # Data fetch functions for all tables
│   ├── hooks/
│   │   └── useSupabaseData.ts # Custom React hook for data fetching
│   └── components/
│       ├── BrandGrid.tsx
│       ├── CartDrawer.tsx       # Sliding cart sidebar with quantity controls
│       ├── CategoryGrid.tsx
│       ├── CharacterShopBanner.tsx
│       ├── CollectionPage.tsx   # Product listing with category filtering
│       ├── Footer.tsx           # Includes NC office addresses
│       ├── Header.tsx           # Nav bar with cart count badge
│       ├── Hero.tsx
│       ├── IndustryGrid.tsx
│       ├── PriceBanners.tsx
│       ├── ProductCarousel.tsx
│       ├── ProductPage.tsx      # Product detail with add to cart
│       └── TrustBar.tsx
└── package.json
```

## Key Features
- **Cart System**: CartContext provides global cart state. CartDrawer is a right-sliding panel with quantity controls, item removal, subtotal calculation, and free shipping threshold ($250).
- **Category Navigation**: Nav items pass category slugs to CollectionPage for filtered product views. Categories in CategoryGrid also link with slugs.
- **Product Navigation**: Products link via slug to ProductPage for detail view.
- **Brand Logos**: Local PNG images in /images/brand-*.png (database stores paths)
- **Promo Banners**: Database-seeded price point banners (Under $1, $5, $10, BULK)

## Data Flow
1. Components use `useSupabaseData` hook to fetch data on mount
2. Hook calls functions from `dataService.ts` which query Supabase
3. Loading states show skeleton placeholders while data loads
4. Error states are handled gracefully with fallback content
5. Cart state managed via React Context (CartContext)

## Recent Changes (Feb 2026)
- Built full cart system with CartContext and CartDrawer component
- Fixed navigation to pass category slugs and filter CollectionPage by category
- Integrated Add to Cart functionality across all product displays
- Updated scroll behavior to instant for better UX
- Connected nav items (Deals, Christmas, etc.) to category-filtered collection pages
- Added cart count badge to Header with real-time updates
- Added 2 NC office addresses to Footer (Charlotte HQ, Fayetteville distribution center)
- Removed "Contact Procurement" section from BrandGrid
- Replaced Wikipedia SVG brand logos with local PNG images
- Seeded promo banners in database for PriceBanners component
- Optimized Hero text sizing for responsive display
- Added onError fallback for brand logo images

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
