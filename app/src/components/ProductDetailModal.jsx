import { useState } from 'react';
import { X, Flame, Shield, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, addToQuote }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  if (!product) return null;

  const images = product.images?.length ? product.images : ['/images/home_banner_1.jpg'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EBE5DB] relative flex flex-col md:flex-row my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#2A2624] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Gallery Section */}
        <div className="w-full md:w-1/2 p-6 bg-white flex flex-col justify-between space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-[#EEEEEE]">
            <img
              src={images[activeImgIdx]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIdx((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-[#2A2624] shadow hover:bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImgIdx((prev) => (prev + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-[#2A2624] shadow hover:bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    idx === activeImgIdx ? 'border-[#A34828] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-center bg-white" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Details & Specs Table Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C85A32]">
                {product.category_title}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#2A2624] mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#8C827A] mt-0.5">
                Model Code: <strong className="text-[#2A2624]">{product.code}</strong>
              </p>
            </div>

            {/* Specifications Table */}
            <div className="bg-[#FAF7F2] border border-[#EBE5DB] rounded-lg p-4 space-y-2 text-xs">
              <h4 className="font-serif font-bold text-[#2A2624] text-sm border-b border-[#EBE5DB] pb-2">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-2 gap-y-2 pt-1 text-[#4A4542]">
                <span className="text-[#8C827A]">Dimensions:</span>
                <span className="font-semibold">{product.dimensions}</span>

                <span className="text-[#8C827A]">Material:</span>
                <span className="font-semibold">{product.material || 'Stoneware Clay'}</span>

                {product.firing_temp && (
                  <>
                    <span className="text-[#8C827A]">Firing Temperature:</span>
                    <span className="font-semibold text-[#A34828]">{product.firing_temp}</span>
                  </>
                )}

                <span className="text-[#8C827A]">Packaging:</span>
                <span className="font-semibold">{product.packaging || 'Contact us for packing dimensions'}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#6B6460]">
              <p className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C85A32]" /> Frost-resistant & frost-proof for extreme outdoor weather.
              </p>
              <p className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#5C6B57]" /> Handcrafted in Vietnam with custom glaze matching options.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F5F0E8] flex items-center gap-3">
            <button
              onClick={() => {
                addToQuote(product);
                onClose();
              }}
              className="flex-1 py-3 bg-[#A34828] hover:bg-[#8C3B1F] text-white font-semibold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add To B2B Quote
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-[#FAF7F2] hover:bg-[#EBE5DB] text-[#4A4542] font-semibold text-xs rounded-lg border border-[#EBE5DB]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
