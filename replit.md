# ToysinBulk - Wholesale Toy Distributor Website

## Overview
A React + TypeScript frontend application for ToysinBulk, America's wholesale toy distributor. The site uses a hybrid architecture: UI elements (navigation, categories, brands, banners, settings) are hardcoded as static data for fast loading, while product data (collections, product details, featured items) is dynamically fetched from Supabase PostgreSQL. Public-facing ecommerce website without authentication flows.

## Project Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Backend**: Supabase (PostgreSQL with Row Level Security) - used for product data only
- **Styling**: Tailwind CSS (via CDN)
- **Font**: Montserrat (Google Fonts)
- **Navigation**: React state-based view switching (home, collection, product) with slug-based category/product routing
- **State Management**: React Context (CartContext) for cart state
- **Data Architecture**: Hybrid static + dynamic
  - **Static** (src/data/staticData.ts): nav items, mega menu, categories, brands, industries, banners, site settings
  - **Dynamic** (Supabase): products, product images, product specifications, collections

## Supabase Database
- **Project**: aejmkvfbqfshvzbphmql
- **Tables used dynamically**: products, product_images, product_specifications, categories (for product filtering)
- **Tables with static copies**: nav_items, mega_menu_items, categories, brands, industries, banners, site_settings
- **RLS**: All tables have public read access policies enabled
- **Images**: Served from local `/images/` directory (paths stored in database and static data)

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
│   ├── data/
│   │   └── staticData.ts # Hardcoded UI data (nav, categories, brands, banners, settings)
│   ├── context/
│   │   └── CartContext.tsx # Cart state management (add/remove/update/clear)
│   ├── lib/
│   │   └── supabase.ts  # Supabase client initialization
│   ├── services/
│   │   └── dataService.ts # Data fetch functions for products (Supabase)
│   ├── hooks/
│   │   └── useSupabaseData.ts # Custom React hook for data fetching
│   └── components/
│       ├── BrandGrid.tsx          # Static - uses BRANDS from staticData
│       ├── CartDrawer.tsx         # Sliding cart sidebar with quantity controls
│       ├── CategoryGrid.tsx       # Static - uses CATEGORIES from staticData
│       ├── CharacterShopBanner.tsx # Static - uses CHARACTER_SHOP_BANNER from staticData
│       ├── CollectionPage.tsx     # Dynamic - fetches products from Supabase
│       ├── Footer.tsx             # Static - hardcoded content with NC addresses
│       ├── Header.tsx             # Static - uses NAV_ITEMS, MEGA_MENU_ITEMS, SITE_SETTINGS
│       ├── Hero.tsx               # Static - uses HERO_BANNER from staticData
│       ├── IndustryGrid.tsx       # Static - uses INDUSTRIES from staticData
│       ├── PriceBanners.tsx       # Static - uses PRICE_BANNERS from staticData
│       ├── ProductCarousel.tsx    # Dynamic - fetches featured products from Supabase
│       ├── ProductPage.tsx        # Dynamic - fetches product details from Supabase
│       └── TrustBar.tsx           # Static - hardcoded trust items
└── package.json
```

## Key Features
- **Cart System**: CartContext provides global cart state. CartDrawer is a right-sliding panel with quantity controls, item removal, subtotal calculation, and free shipping threshold ($250).
- **Category Navigation**: Nav items pass category slugs to CollectionPage for filtered product views. Categories in CategoryGrid also link with slugs.
- **Product Navigation**: Products link via slug to ProductPage for detail view.
- **Brand Logos**: Local PNG images in /images/brand-*.png
- **Promo Banners**: Static price point banners (Under $1, $5, $10, BULK)

## Data Flow
1. **Static components** import data directly from `src/data/staticData.ts` - no loading states needed
2. **Dynamic components** (CollectionPage, ProductPage, ProductCarousel) use `useSupabaseData` hook
3. Hook calls functions from `dataService.ts` which query Supabase for product data
4. Loading states show skeleton placeholders while product data loads
5. Cart state managed via React Context (CartContext)

## Recent Changes (Feb 2026)
- Converted to hybrid architecture: static UI data + dynamic product data
- Created src/data/staticData.ts with all hardcoded UI content
- Updated 8 components to use static data: Header, Hero, CategoryGrid, BrandGrid, IndustryGrid, PriceBanners, CharacterShopBanner, TrustBar
- Kept CollectionPage, ProductPage, ProductCarousel dynamic for team product updates
- Removed loading skeletons from static components (instant render)
- Built full cart system with CartContext and CartDrawer component
- Added 2 NC office addresses to Footer (Charlotte HQ, Fayetteville distribution center)
- Replaced Wikipedia SVG brand logos with local PNG images
- Synced all 13 static categories with real DB data (Other Toys, Fidget Toys, Plush Toys, Bath Toys, Puzzles, Seasonal Toys, Dolls & Figures, Party Supplies, Arts & Crafts, Bulk Candy, Winter Decor, Wrapped Candy, Novelty Items)
- Fixed dataService.ts: proper server-side category filtering via category_id lookups (fetchCategoryBySlug helper)
- CollectionPage: server-side pagination (24 items/page) with Load More, accurate totalCount from Supabase
- ProductPage: expandable/collapsible accordion sections, specs in table format, ROI calculator with real data, dynamic breadcrumbs
- Updated nav items and mega menu to map to real DB category slugs
- Added search functionality in Header with query handling
- Fixed broken Disney/Marvel brand logos (now SVG), added stock photo category images for new categories
- Database: 563 total products, 13 categories, 7 categories with products

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
- Keep products/collections dynamic for team updates
- Make all other UI content static/hardcoded
