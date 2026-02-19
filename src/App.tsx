import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceBanners } from './components/PriceBanners';
import { CategoryGrid } from './components/CategoryGrid';
import { IndustryGrid } from './components/IndustryGrid';
import { TrustBar } from './components/TrustBar';
import { BrandGrid } from './components/BrandGrid';
import { CharacterShopBanner } from './components/CharacterShopBanner';
import { ProductCarousel } from './components/ProductCarousel';
import { CollectionPage } from './components/CollectionPage';
import { ProductPage } from './components/ProductPage';
import { Footer } from './components/Footer';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';

const AppContent: React.FC = () => {
  const [view, setView] = useState<'home' | 'collection' | 'product'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | undefined>();
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  const navigateTo = useCallback((target: 'home' | 'collection' | 'product', slug?: string) => {
    if (target === 'collection') {
      setSelectedCategory(slug);
    } else if (target === 'product') {
      setSelectedProductSlug(slug);
    }
    setView(target);
    window.scrollTo(0, 0);
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Header onNavigate={navigateTo} onCartClick={() => setCartOpen(true)} cartCount={cartCount} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onNavigate={navigateTo} />

      <main className="flex-1 w-full">
        {view === 'home' ? (
          <>
            <Hero onNavigate={navigateTo} />
            <TrustBar />
            <PriceBanners onNavigate={navigateTo} />
            <IndustryGrid onNavigate={navigateTo} />
            <CategoryGrid onNavigate={navigateTo} />
            <CharacterShopBanner onNavigate={navigateTo} />
            <ProductCarousel onNavigate={navigateTo} />
            <BrandGrid onNavigate={navigateTo} />
          </>
        ) : view === 'collection' ? (
          <CollectionPage onNavigate={navigateTo} categorySlug={selectedCategory} />
        ) : (
          <ProductPage onNavigate={navigateTo} productSlug={selectedProductSlug} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
