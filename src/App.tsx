import React, { useState, useMemo, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CookieProvider } from './context/CookieContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { PredictiveSearch } from './components/layout/PredictiveSearch';
import { MotionHero } from './components/hero/MotionHero';
import { CategoryRail } from './components/home/CategoryRail';
import { FeaturedSection } from './components/home/FeaturedSection';
import { EditorialFeature } from './components/home/EditorialFeature';
import { ToysSpotlight } from './components/home/ToysSpotlight';
import { DealsSection } from './components/home/DealsSection';
import { BenefitsRow } from './components/home/BenefitsRow';
import { ShoppingGuides } from './components/home/ShoppingGuides';
import { NewsletterSection } from './components/home/NewsletterSection';
import { ProductCard } from './components/product/ProductCard';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { PolicyModal, PolicyType } from './components/modals/PolicyModal';
import { ContactModal } from './components/modals/ContactModal';
import { OrderTrackingModal } from './components/modals/OrderTrackingModal';
import { CookieConsentBanner } from './components/modals/CookieConsentBanner';
import { Toast } from './components/ui/Toast';
import { ProductFilters, FilterState } from './components/product/ProductFilters';
import { PRODUCTS_DATA, CATEGORIES_DATA } from './data/products';
import { Product, ProductCategory } from './types/product';
import { ArrowLeft, SlidersHorizontal, PackageX, Sparkles, Check } from 'lucide-react';

export function App() {
  // Navigation & View State
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all' | 'deals' | 'bestsellers'>('all');
  const [isBrowsingCatalogue, setIsBrowsingCatalogue] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isFilterSidebarOpenMobile, setIsFilterSidebarOpenMobile] = useState(false);

  // Filter & Sort State
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minPrice: 0,
    maxPrice: 120,
    inStockOnly: false,
    minRating: 0,
    selectedBrand: 'all',
    sortBy: 'featured'
  });

  // Extract all unique brands
  const availableBrands = useMemo(() => {
    const brands = new Set(PRODUCTS_DATA.map(p => p.brand));
    return Array.from(brands).sort();
  }, []);

  // When activeCategory changes from Header, update filters
  const handleSelectCategory = (cat: ProductCategory | 'all' | 'deals' | 'bestsellers') => {
    setActiveCategory(cat);
    setFilters(prev => ({ ...prev, category: cat }));
    if (cat !== 'all') {
      setIsBrowsingCatalogue(true);
    } else {
      setIsBrowsingCatalogue(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setIsBrowsingCatalogue(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilters({
      category: activeCategory,
      minPrice: 0,
      maxPrice: 120,
      inStockOnly: false,
      minRating: 0,
      selectedBrand: 'all',
      sortBy: 'featured'
    });
    setSearchQuery('');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(p => {
      // Category filter
      if (filters.category === 'deals') {
        if (!p.compareAtPrice) return false;
      } else if (filters.category === 'bestsellers') {
        if (!p.isBestSeller) return false;
      } else if (filters.category !== 'all') {
        if (p.category !== filters.category) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (p.price > filters.maxPrice) return false;

      // In stock filter
      if (filters.inStockOnly && !p.inStock) return false;

      // Rating filter
      if (filters.minRating > 0 && p.rating < filters.minRating) return false;

      // Brand filter
      if (filters.selectedBrand !== 'all' && p.brand !== filters.selectedBrand) return false;

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filters, searchQuery]);

  const flagshipProduct = PRODUCTS_DATA.find(p => p.id === 'bgt-anc-900') || PRODUCTS_DATA[0];
  const toyProducts = PRODUCTS_DATA.filter(p => p.category === 'toys');
  const dealProducts = PRODUCTS_DATA.filter(p => p.compareAtPrice !== null);

  // Active category meta
  const currentCategoryMeta = CATEGORIES_DATA.find(c => c.id === activeCategory);

  return (
    <CartProvider>
      <WishlistProvider>
        <CookieProvider>
          <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#202329]">
            {/* 1. Announcement Strip */}
            <AnnouncementBar />

            {/* 2. Sticky Header */}
            <Header
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* Main Content Area */}
            <main className="flex-1">
              {!isBrowsingCatalogue ? (
                /* ================= FULL HOMEPAGE FLOW ================= */
                <>
                  {/* 3. Outstanding Motion-Led Hero */}
                  <MotionHero
                    onShopBestSellers={() => {
                      setFilters(prev => ({ ...prev, category: 'bestsellers' }));
                      setActiveCategory('bestsellers');
                      setIsBrowsingCatalogue(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onExploreCategories={() => {
                      const el = document.getElementById('departments-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onSelectProduct={p => setSelectedProduct(p)}
                  />

                  {/* 4. Category Discovery Rail */}
                  <div id="departments-section">
                    <CategoryRail
                      onSelectCategory={cat => handleSelectCategory(cat)}
                    />
                  </div>

                  {/* 5. Featured Products & Top Picks */}
                  <FeaturedSection
                    products={PRODUCTS_DATA}
                    onSelectProduct={p => setSelectedProduct(p)}
                    onViewAll={() => {
                      setIsBrowsingCatalogue(true);
                      setActiveCategory('all');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />

                  {/* 6. Wide Editorial Category Feature */}
                  <EditorialFeature
                    flagshipProduct={flagshipProduct}
                    onSelectProduct={p => setSelectedProduct(p)}
                  />

                  {/* 7. Toys & Games Spotlight */}
                  <ToysSpotlight
                    toyProducts={toyProducts}
                    onSelectProduct={p => setSelectedProduct(p)}
                    onExploreToys={() => handleSelectCategory('toys')}
                  />

                  {/* 8. Genuine Deals & Voucher Section */}
                  <DealsSection
                    dealProducts={dealProducts}
                    onSelectProduct={p => setSelectedProduct(p)}
                    onExploreAllDeals={() => handleSelectCategory('deals')}
                  />

                  {/* 9. Verified Customer Benefits */}
                  <BenefitsRow />

                  {/* 10. Technical Buying Guides */}
                  <ShoppingGuides />

                  {/* 11. UK GDPR Email Newsletter */}
                  <NewsletterSection />
                </>
              ) : (
                /* ================= CATEGORY CATALOGUE & SEARCH PAGE ================= */
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                  {/* Catalogue Header & Breadcrumbs */}
                  <div className="mb-8 space-y-3">
                    <button
                      onClick={() => {
                        setIsBrowsingCatalogue(false);
                        setActiveCategory('all');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1769D2] transition-colors"
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Home</span>
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2] bg-[#EBF3FC] px-2.5 py-1 rounded-full">
                          {searchQuery ? `Search Results` : currentCategoryMeta?.name || 'Complete Store Catalogue'}
                        </span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202329] tracking-tight mt-2">
                          {searchQuery
                            ? `Results for "${searchQuery}"`
                            : activeCategory === 'deals'
                            ? 'Special Deals & Active Offers'
                            : activeCategory === 'bestsellers'
                            ? 'Best Selling Essentials'
                            : currentCategoryMeta?.name || 'All Products'}
                        </h1>
                        <p className="text-xs sm:text-sm text-[#656A70] mt-1 max-w-xl">
                          {currentCategoryMeta?.description ||
                            'Explore our curated collection of verified electronics, toys, and lifestyle accessories.'}
                        </p>
                      </div>

                      {/* Sort Dropdown */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <label htmlFor="sort-select" className="text-xs font-bold text-slate-600 whitespace-nowrap">
                          Sort by:
                        </label>
                        <select
                          id="sort-select"
                          value={filters.sortBy}
                          onChange={e => setFilters({ ...filters, sortBy: e.target.value as any })}
                          className="px-3.5 py-2 text-xs font-semibold bg-white border border-[#E3E5E7] rounded-xl outline-none shadow-sm focus:border-[#1769D2]"
                        >
                          <option value="featured">Featured Picks</option>
                          <option value="price-asc">Price: Low to High</option>
                          <option value="price-desc">Price: High to Low</option>
                          <option value="rating">Highest Rated</option>
                          <option value="newest">Newest Arrivals</option>
                        </select>

                        {/* Mobile Filter Trigger */}
                        <button
                          onClick={() => setIsFilterSidebarOpenMobile(true)}
                          className="lg:hidden p-2 bg-white border border-slate-200 rounded-xl text-slate-700 flex items-center gap-1.5 text-xs font-bold"
                        >
                          <SlidersHorizontal size={15} />
                          <span>Filters</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Layout Grid: Sidebar Filters + Products Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Desktop Sidebar Filters */}
                    <div className="hidden lg:block lg:col-span-1 sticky top-28">
                      <ProductFilters
                        filters={filters}
                        onChangeFilters={newF => setFilters(newF)}
                        onResetFilters={handleResetFilters}
                        availableBrands={availableBrands}
                        totalMatches={filteredProducts.length}
                      />
                    </div>

                    {/* Products Grid / Empty State (3 cols) */}
                    <div className="lg:col-span-3">
                      {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                          {filteredProducts.map(product => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              onSelect={p => setSelectedProduct(p)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                          <PackageX size={44} className="text-slate-300 mx-auto" />
                          <h3 className="text-lg font-bold text-slate-800">
                            No products match your criteria
                          </h3>
                          <p className="text-xs text-slate-500 max-w-sm mx-auto">
                            We couldn't find any items matching your active filter settings. Try adjusting the price slider or resetting your filters.
                          </p>
                          <button
                            onClick={handleResetFilters}
                            className="px-5 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                          >
                            Reset All Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </main>

            {/* 12. Full Comprehensive Footer */}
            <Footer
              onSelectCategory={cat => handleSelectCategory(cat)}
              onOpenPolicy={type => setActivePolicy(type)}
              onOpenContact={() => setIsContactOpen(true)}
              onOpenTracking={() => setIsTrackingOpen(true)}
            />

            {/* Slide-out Cart Drawer */}
            <CartDrawer
              onProceedToCheckout={() => setIsCheckoutOpen(true)}
              onExploreProducts={() => {
                setIsBrowsingCatalogue(true);
                setActiveCategory('all');
              }}
            />

            {/* Product Detail Modal */}
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onSelectRelated={p => setSelectedProduct(p)}
              allProducts={PRODUCTS_DATA}
            />

            {/* Predictive Search Modal */}
            <PredictiveSearch
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSelectProduct={p => setSelectedProduct(p)}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Mobile Navigation Drawer */}
            <MobileNav
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              activeCategory={activeCategory}
              onSelectCategory={cat => handleSelectCategory(cat)}
              onOpenPolicy={type => setActivePolicy(type)}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* Multi-Step Checkout Modal */}
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
            />

            {/* Policies Modal */}
            <PolicyModal
              policyType={activePolicy}
              onClose={() => setActivePolicy(null)}
            />

            {/* Contact Inquiry Modal */}
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />

            {/* Order Tracking Modal */}
            <OrderTrackingModal
              isOpen={isTrackingOpen}
              onClose={() => setIsTrackingOpen(false)}
            />

            {/* Mobile Filters Slide-in */}
            {isFilterSidebarOpenMobile && (
              <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex justify-end animate-fade-in"
                onClick={() => setIsFilterSidebarOpenMobile(false)}
              >
                <div
                  onClick={e => e.stopPropagation()}
                  className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto animate-slide-up flex flex-col justify-between"
                >
                  <ProductFilters
                    filters={filters}
                    onChangeFilters={newF => setFilters(newF)}
                    onResetFilters={handleResetFilters}
                    availableBrands={availableBrands}
                    totalMatches={filteredProducts.length}
                  />
                  <button
                    onClick={() => setIsFilterSidebarOpenMobile(false)}
                    className="w-full mt-4 py-2.5 bg-[#1769D2] text-white text-xs font-bold rounded-xl"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Cookie Consent Banner */}
            <CookieConsentBanner />

            {/* Global Cart Toast */}
            <Toast />
          </div>
        </CookieProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
