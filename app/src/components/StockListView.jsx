import React from 'react';
import { Box, CheckCircle, Truck, Eye, Plus, ArrowRight } from 'lucide-react';

export default function StockListView({ categories, setSelectedProduct, addToQuote, setCurrentTab }) {
  // Collect all in-stock products
  const stockProducts = categories
    .flatMap(c => c.products || [])
    .filter(p => p.in_stock);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#1F1C1B] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-[#3A3532]">
        <div className="max-w-3xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#C59B27] bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Truck className="w-3.5 h-3.5 text-[#5C6B57]" /> Ready For Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            In-Stock Wholesale Catalog
          </h1>
          <p className="text-sm sm:text-base text-[#D6CEC0] leading-relaxed">
            These handcrafted items are currently available in our warehouses for immediate packing and container shipment. Ideal for fast B2B order turnarounds.
          </p>
        </div>
      </div>

      {/* Grid of 10-12+ Stock Items (As requested in Website.xlsx sheet 'stock list') */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#EBE5DB] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#2A2624]">
            Available Stock Items ({stockProducts.length})
          </h2>
          <span className="text-xs text-[#5C6B57] font-semibold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Ready to Ship
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stockProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-white rounded-xl overflow-hidden border border-[#EBE5DB] hover:border-[#5C6B57] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div 
                onClick={() => setSelectedProduct(prod)}
                className="relative aspect-square bg-[#F3EFE6] overflow-hidden cursor-pointer"
              >
                <img
                  src={prod.images?.[0] || '/images/home_banner_1.jpg'}
                  alt={prod.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <span className="absolute top-2 left-2 bg-[#5C6B57] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  IN STOCK
                </span>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                  {prod.code}
                </span>

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-white text-[#2A2624] text-xs font-semibold rounded-full shadow flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5C6B57]">
                    {prod.category_title}
                  </span>
                  <h3 
                    onClick={() => setSelectedProduct(prod)}
                    className="font-serif text-base font-bold text-[#2A2624] line-clamp-1 cursor-pointer hover:text-[#5C6B57]"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#8C827A] mt-1">
                    <strong>Dim:</strong> {prod.dimensions}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F5F0E8] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="text-xs font-semibold text-[#4A4542] hover:text-[#5C6B57]"
                  >
                    Specs
                  </button>
                  <button
                    onClick={() => addToQuote(prod)}
                    className="px-3 py-1.5 bg-[#5C6B57] hover:bg-[#495545] text-white text-xs font-semibold rounded flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* B2B Logistics Note */}
      <div className="bg-[#FAF7F2] border border-[#EBE5DB] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-serif text-lg font-bold text-[#2A2624]">Need Custom Mixed Containers?</h4>
          <p className="text-xs text-[#6B6460]">We accommodate mixed pallet loads across all 6 collections for our wholesale partners.</p>
        </div>
        <button
          onClick={() => setCurrentTab('visit')}
          className="px-5 py-2.5 bg-[#A34828] hover:bg-[#8C3B1F] text-white text-xs font-semibold rounded flex items-center gap-1.5 shrink-0"
        >
          Contact Export Manager <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
