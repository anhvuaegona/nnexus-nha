import { useState } from 'react';
import { Search, Plus, Eye, Box, ArrowRight } from 'lucide-react';

export default function CollectionView({ 
  categories, 
  setSelectedProduct, 
  addToQuote, 
  searchQuery, 
  setSearchQuery,
  selectedCatId,
  setSelectedCatId
}) {
  const [stockOnly, setStockOnly] = useState(false);

  // Flatten all products or filter by category
  const allProducts = categories.flatMap(cat => cat.products || []);
  
  const filteredProducts = allProducts.filter(prod => {
    const matchesCat = selectedCatId === 'all' || prod.category_id === selectedCatId;
    const matchesSearch = !searchQuery || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prod.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.dimensions.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !stockOnly || prod.in_stock;

    return matchesCat && matchesSearch && matchesStock;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      {/* Header Banner (Inspired by potsandpithoi.com/pages/the-pots) */}
      <div className="bg-[#FAF7F2] border border-[#EBE5DB] rounded-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#C85A32]">
          Master Collection Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2A2624]">
          Artisanal Pots & Architectural Planters
        </h1>
        <p className="text-sm sm:text-base text-[#6B6460] max-w-3xl mx-auto leading-relaxed">
          Browse our 6 master pottery categories. Hand-sculpted in Vietnam, fired above 1100°C for exceptional durability and rich weather-resistant glazes.
        </p>
      </div>

      {/* Category Pills Navigation (Matching 6 Categories from Website.xlsx) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#2A2624]">Select Category</h3>
          <span className="text-xs text-[#8C827A] font-medium">{filteredProducts.length} Items Found</span>
        </div>

        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
              selectedCatId === 'all'
                ? 'bg-[#A34828] text-white shadow-md'
                : 'bg-white text-[#4A4542] border border-[#EBE5DB] hover:border-[#A34828]'
            }`}
          >
            ALL COLLECTIONS ({allProducts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                selectedCatId === cat.id
                  ? 'bg-[#A34828] text-white shadow-md'
                  : 'bg-white text-[#4A4542] border border-[#EBE5DB] hover:border-[#A34828]'
              }`}
            >
              <span>{cat.title}</span>
              <span className="text-[10px] opacity-75">({cat.products?.length || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-[#EBE5DB] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name, code (e.g. NGC0005)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#EBE5DB] rounded-lg text-xs focus:outline-none focus:border-[#C85A32]"
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#4A4542]">
            <input
              type="checkbox"
              checked={stockOnly}
              onChange={(e) => setStockOnly(e.target.checked)}
              className="accent-[#C85A32] w-4 h-4 rounded"
            />
            <span>Show In-Stock Only</span>
          </label>
        </div>
      </div>

      {/* Category Overview Cards (If 'all' selected) */}
      {selectedCatId === 'all' && !searchQuery && !stockOnly && (
        <div className="space-y-6 pt-4">
          <h2 className="font-serif text-2xl font-bold text-[#2A2624]">Browse 6 Signature Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#EBE5DB] hover:border-[#C85A32] shadow-sm hover:shadow-lg transition-all p-4 space-y-3 flex flex-col"
              >
                <div className="relative h-48 rounded-lg overflow-hidden bg-[#F3EFE6]">
                  {cat.cover_image ? (
                    <img
                      src={cat.cover_image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8C827A]">
                      <Box className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                    {cat.products?.length || 0} Models
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2A2624] group-hover:text-[#A34828]">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#6B6460] line-clamp-2 mt-1 font-light">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-auto pt-2 flex items-center justify-between text-xs font-semibold text-[#A34828]">
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid Listing */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-[#EBE5DB] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#2A2624]">
            {selectedCatId === 'all' 
              ? 'All Product Models' 
              : categories.find(c => c.id === selectedCatId)?.title}
          </h2>
          <span className="text-xs text-[#8C827A]">Showing {filteredProducts.length} pots</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#EBE5DB] rounded-xl p-12 text-center space-y-3">
            <Box className="w-12 h-12 text-[#8C827A] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#2A2624]">No Products Found</h3>
            <p className="text-xs text-[#6B6460]">Try adjusting your search filter or selecting another category.</p>
            <button
              onClick={() => { setSelectedCatId('all'); setSearchQuery(''); setStockOnly(false); }}
              className="px-4 py-2 bg-[#A34828] text-white text-xs font-semibold rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-xl overflow-hidden border border-[#EBE5DB] hover:border-[#C85A32] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Product Image Container */}
                <div 
                  onClick={() => setSelectedProduct(prod)}
                  className="relative aspect-square bg-[#F3EFE6] overflow-hidden cursor-pointer"
                >
                  <img
                    src={prod.images?.[0] || '/images/home_banner_1.jpg'}
                    alt={prod.name}
                    className="w-full h-full object-contain object-center p-3 group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                    {prod.code}
                  </span>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-3 py-1.5 bg-white text-[#2A2624] text-xs font-semibold rounded-full shadow flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View Specs
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C85A32]">
                      {prod.category_title}
                    </span>
                    <h3 
                      onClick={() => setSelectedProduct(prod)}
                      className="font-serif text-base font-bold text-[#2A2624] line-clamp-1 cursor-pointer hover:text-[#A34828] transition-colors"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#8C827A] mt-1">
                      <strong>Dimensions:</strong> {prod.dimensions}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F5F0E8] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="text-xs font-semibold text-[#4A4542] hover:text-[#A34828]"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => addToQuote(prod)}
                      className="px-3 py-1.5 bg-[#A34828] hover:bg-[#8C3B1F] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
