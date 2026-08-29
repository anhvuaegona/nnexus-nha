import React, { useState } from 'react';
import { Phone, Mail, MapPin, Search, ShoppingBag, Settings, Menu, X, Globe, ShieldCheck } from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  quoteCount, 
  setOpenQuoteModal, 
  isAdminMode, 
  setIsAdminMode,
  searchQuery,
  setSearchQuery
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'collection', label: 'COLLECTION' },
    { id: 'stock-list', label: 'STOCK LIST' },
    { id: 'visit', label: 'VISIT US' },
  ];

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE5DB] shadow-sm">
      {/* Top Notification Bar */}
      <div className="bg-[#1F1C1B] text-[#E5DFD5] text-xs py-2 px-4 border-b border-[#3A3532]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#C85A32]" />
              <a href="tel:+84976856365" className="hover:underline">+84(0)976856365</a>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#C85A32]" />
              <a href="mailto:Anny.ctnnexus@gmail.com" className="hover:underline">Anny.ctnnexus@gmail.com</a>
            </span>
            <span className="hidden lg:flex items-center gap-1 text-[#B8AF9F]">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              No. 17, 192 Pham Duc Son, Ward 16, Dist 8, HCMC
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="flex items-center gap-1 text-[11px] bg-[#322E2B] px-2 py-0.5 rounded text-[#D6CEC0]">
              <ShieldCheck className="w-3 h-3 text-[#5C6B57]" /> B2B Global Supplier
            </span>
            
            {/* WordPress CMS Mode Switcher Button */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded transition-all ${
                isAdminMode 
                  ? 'bg-[#C85A32] text-white shadow-sm hover:bg-[#A34828]' 
                  : 'bg-[#3A3532] text-[#E5DFD5] hover:bg-[#4A4542]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              {isAdminMode ? 'Exit WP Admin Mode' : 'WP Admin CMS Panel'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          className="cursor-pointer flex flex-col group"
          onClick={() => { setCurrentTab('home'); setIsAdminMode(false); }}
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2A2624] group-hover:text-[#A34828] transition-colors">
            CTN NEXUS
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#8C827A] uppercase font-semibold">
            Artisanal Pots & Planters
          </span>
        </div>

        {/* Desktop Navigation Menu */}
        {!isAdminMode && (
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`text-sm font-semibold tracking-wider transition-colors py-1 relative ${
                  currentTab === item.id 
                    ? 'text-[#A34828] font-bold' 
                    : 'text-[#4A4542] hover:text-[#A34828]'
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#A34828] rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </nav>
        )}

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Search Toggle */}
          {!isAdminMode && (
            <div className="relative flex items-center">
              {showSearchInput ? (
                <div className="flex items-center bg-[#FAF7F2] border border-[#D8D0C5] rounded-full px-3 py-1 animate-fade-in">
                  <Search className="w-4 h-4 text-[#8C827A] mr-2" />
                  <input
                    type="text"
                    placeholder="Search pots or code (e.g. NGC0005)..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (currentTab !== 'collection') setCurrentTab('collection');
                    }}
                    className="bg-transparent text-xs text-[#2A2624] focus:outline-none w-36 sm:w-48"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setShowSearchInput(false); setSearchQuery(''); }}
                    className="text-[#8C827A] hover:text-[#2A2624] ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#4A4542] transition-colors"
                  title="Search Pots"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Quote Basket Badge */}
          {!isAdminMode && (
            <button
              onClick={() => setOpenQuoteModal(true)}
              className="relative p-2 rounded-full hover:bg-[#FAF7F2] text-[#4A4542] transition-colors flex items-center gap-1"
              title="View B2B Quote Basket"
            >
              <ShoppingBag className="w-5 h-5 text-[#A34828]" />
              <span className="hidden sm:inline text-xs font-semibold text-[#4A4542]">Quote</span>
              {quoteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A34828] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {quoteCount}
                </span>
              )}
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A4542]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && !isAdminMode && (
        <div className="md:hidden bg-white border-b border-[#EBE5DB] px-6 py-4 space-y-3 animate-fade-in shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-base font-medium border-b border-[#F5F0E8] ${
                currentTab === item.id ? 'text-[#A34828] font-bold' : 'text-[#4A4542]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 text-xs text-[#8C827A] space-y-1">
            <p>Hotline: +84(0)976856365</p>
            <p>Email: Anny.ctnnexus@gmail.com</p>
          </div>
        </div>
      )}
    </header>
  );
}
