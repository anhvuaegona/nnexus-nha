import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CollectionView from './components/CollectionView';
import StockListView from './components/StockListView';
import VisitView from './components/VisitView';
import ProductDetailModal from './components/ProductDetailModal';
import QuoteModal from './components/QuoteModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active view tab: 'home' | 'collection' | 'stock-list' | 'visit'
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Selected product for popup details modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Quote cart items
  const [quoteItems, setQuoteItems] = useState([]);
  const [openQuoteModal, setOpenQuoteModal] = useState(false);

  // Submitted B2B inquiries inbox
  const [inquiries, setInquiries] = useState([]);

  // WordPress CMS Admin Mode Toggle
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Load initial data from data.json
  useEffect(() => {
    const savedCatalog = localStorage.getItem('ctn-nexus-catalog-v1');
    if (savedCatalog) {
      try {
        setData(JSON.parse(savedCatalog));
        setLoading(false);
        return;
      } catch (error) {
        console.warn('Could not restore saved catalog:', error);
        localStorage.removeItem('ctn-nexus-catalog-v1');
      }
    }

    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading catalog data:', err);
        setLoading(false);
      });
  }, []);

  const updateData = (nextData) => {
    setData((previousData) => {
      const resolvedData = typeof nextData === 'function' ? nextData(previousData) : nextData;
      try {
        localStorage.setItem('ctn-nexus-catalog-v1', JSON.stringify(resolvedData));
      } catch (error) {
        console.warn('Catalog updated for this session, but browser storage is full:', error);
      }
      return resolvedData;
    });
  };

  const addToQuote = (product) => {
    setQuoteItems((prev) => [...prev, product]);
    setOpenQuoteModal(true);
  };

  const removeFromQuote = (index) => {
    setQuoteItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const handleAddInquiry = (inquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const openCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentTab('collection');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#C85A32] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif text-[#2A2624] font-bold text-lg">Loading CTN NEXUS Pottery Catalog...</p>
      </div>
    );
  }

  // If WordPress CMS Admin Mode is active, render Admin Dashboard
  if (isAdminMode) {
    return (
      <AdminDashboard
        data={data}
        setData={updateData}
        setIsAdminMode={setIsAdminMode}
        inquiries={inquiries}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2624] flex flex-col font-sans selection:bg-[#C85A32] selection:text-white">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        quoteCount={quoteItems.length}
        setOpenQuoteModal={setOpenQuoteModal}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        companyData={data?.company}
      />

      {/* Main View Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            data={data}
            setCurrentTab={setCurrentTab}
            setSelectedProduct={setSelectedProduct}
            openCategory={openCategory}
          />
        )}

        {currentTab === 'collection' && (
          <CollectionView
            categories={data?.categories || []}
            setSelectedProduct={setSelectedProduct}
            addToQuote={addToQuote}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCatId={selectedCategoryId}
            setSelectedCatId={setSelectedCategoryId}
          />
        )}

        {currentTab === 'stock-list' && (
          <StockListView
            categories={data?.categories || []}
            setSelectedProduct={setSelectedProduct}
            addToQuote={addToQuote}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'visit' && (
          <VisitView
            companyData={data?.company}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        companyData={data?.company}
        categories={data?.categories || []}
        setCurrentTab={setCurrentTab}
        openCategory={openCategory}
      />

      {/* Product Detail Popup Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToQuote={addToQuote}
        />
      )}

      {/* B2B Quote Basket Modal */}
      {openQuoteModal && (
        <QuoteModal
          quoteItems={quoteItems}
          removeFromQuote={removeFromQuote}
          clearQuote={clearQuote}
          onClose={() => setOpenQuoteModal(false)}
          onAddInquiry={handleAddInquiry}
        />
      )}
    </div>
  );
}
