import { useState } from 'react';
import { Phone, Mail, MapPin, Search, ShoppingBag, Settings, Menu, X, ShieldCheck } from 'lucide-react';
import logoUrl from '../../docs/images/logo.jpeg';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  quoteCount, 
  setOpenQuoteModal, 
  isAdminMode, 
  setIsAdminMode,
  searchQuery,
  setSearchQuery,
  companyData
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
              <a href={`tel:${companyData?.tel || '+84976856365'}`} className="hover:underline">{companyData?.tel || '+84(0)976856365'}</a>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#C85A32]" />
              <a href={`mailto:${companyData?.email || 'annychau@ctnnexus.com'}`} className="hover:underline">{companyData?.email || 'annychau@ctnnexus.com'}</a>
            </span>
            <span className="hidden lg:flex items-center gap-1 text-[#B8AF9F]">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              {companyData?.address || 'No. 17, 192 Pham Duc Son, Phu Dinh Ward, HCMC'}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5 border-r border-[#4A4542] pr-3">
              <a
                href={companyData?.linkedin || 'https://www.linkedin.com/'}
                target="_blank"
                rel="noreferrer"
                aria-label="CTN Nexus on LinkedIn"
                title="LinkedIn"
                className="p-1.5 text-[#D6CEC0] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                  <path d="M5.3 3.8A2.3 2.3 0 1 1 5.3 8.4 2.3 2.3 0 0 1 5.3 3.8ZM3.3 9.8h4v10.9h-4V9.8Zm6.5 0h3.8v1.5h.1c.5-1 1.8-2 3.8-2 4.1 0 4.8 2.7 4.8 6.2v5.2h-4v-4.6c0-1.1 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v4.7h-4.1V9.8Z" />
                </svg>
              </a>
              <a
                href={companyData?.instagram || 'https://www.instagram.com/'}
                target="_blank"
                rel="noreferrer"
                aria-label="CTN Nexus on Instagram"
                title="Instagram"
                className="p-1.5 text-[#D6CEC0] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                  <path d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm0 2A3.3 3.3 0 0 0 4 7.3v9.4A3.3 3.3 0 0 0 7.3 20h9.4a3.3 3.3 0 0 0 3.3-3.3V7.3A3.3 3.3 0 0 0 16.7 4H7.3Zm9.9 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>
            </div>
            <span className="hidden sm:flex items-center gap-1 text-[11px] bg-[#322E2B] px-2 py-0.5 rounded text-[#D6CEC0]">
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
              <span className="hidden sm:inline">{isAdminMode ? 'Exit WP Admin Mode' : 'WP Admin CMS Panel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          className="cursor-pointer flex items-center gap-3 group min-w-0"
          onClick={() => { setCurrentTab('home'); setIsAdminMode(false); }}
        >
          <img src={logoUrl} alt="CTN Nexus logo" className="h-14 sm:h-16 w-auto object-contain" />
          <span className="hidden sm:flex flex-col">
            <span className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-[#2A2624] group-hover:text-[#A34828] transition-colors">CTN NEXUS</span>
            <span className="text-[9px] tracking-[0.2em] text-[#8C827A] uppercase font-semibold">Artisanal Pots & Planters</span>
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
            <p>Hotline: {companyData?.tel || '+84(0)976856365'}</p>
            <p>Email: {companyData?.email || 'annychau@ctnnexus.com'}</p>
          </div>
        </div>
      )}
    </header>
  );
}
