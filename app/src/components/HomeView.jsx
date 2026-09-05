import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Quote, Box } from 'lucide-react';

export default function HomeView({ data, setCurrentTab, setSelectedProduct, openCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliders = data?.home_sliders || [];
  const categories = data?.categories || [];

  // Auto slide banner every 5 seconds
  useEffect(() => {
    if (sliders.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliders.length]);

  const stockProducts = data?.stock_list || [];
  const featuredProducts = stockProducts.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Banner Slider Section */}
      <section className="relative aspect-[1024/572] min-h-[400px] max-h-[600px] w-full overflow-hidden bg-[#1F1C1B]">
        {sliders.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            {/* A soft cover layer fills wide screens while the foreground keeps the whole pot visible. */}
            <img
              src={slide}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-90 blur-lg brightness-90 saturate-100"
            />
            <img
              src={slide}
              alt={`CTN Nexus Banner ${idx + 1}`}
              className="relative h-full w-full object-contain object-center"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
            {/* Banner Caption Content */}
            <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 flex flex-col justify-center text-white space-y-4">
              <p className="text-base sm:text-xl text-[#F3EEE7] max-w-2xl font-light leading-relaxed drop-shadow-lg">
                Rooted in years of ceramic expertise, dedicated to delivering quality and value to customers worldwide
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentTab('collection')}
                  className="px-6 py-3 bg-[#C85A32] hover:bg-[#A34828] text-white font-medium text-sm rounded shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentTab('stock-list')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-medium text-sm rounded transition-all"
                >
                  View In-Stock List
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % sliders.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {sliders.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-[#C85A32]' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Brand Craftsmanship Quote Section (From Website.xlsx) */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-[#FAF7F2] border border-[#EBE5DB] rounded-2xl p-8 sm:p-12 relative shadow-sm">
          <Quote className="w-12 h-12 text-[#C85A32]/20 mx-auto mb-4" />
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#2A2624] italic leading-relaxed max-w-4xl mx-auto">
            “{data?.company?.brand_quote}”
          </p>
        </div>
      </section>

      {/* 3. 6 Collection Categories Grid (Directly matching Website.xlsx & potsandpithoi reference) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C85A32]">Pottery Collections</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2624]">Explore Our Signature Collections</h2>
          <p className="text-sm text-[#6B6460]">
            Handcrafted with precision for gardens, estates, and commercial architectural landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => openCategory(cat.id)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#EBE5DB] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white">
                {cat.cover_image ? (
                  <img
                    src={cat.cover_image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#8C827A]">
                    <Box className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F3D7C6] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#E5DFD5] line-clamp-2 font-light">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between text-xs font-semibold text-[#A34828] group-hover:bg-[#FAF7F2] transition-colors border-t border-[#F5F0E8]">
                <span>View {cat.products?.length || 0}+ Models</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Stock Showcase */}
      <section className="bg-[#F1ECE4] border-y border-[#E2D9CD] py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#5C6B57]">Ready For Shipment</span>
              <h2 className="font-serif text-3xl font-bold text-[#2A2624] mt-1">Featured In-Stock Products</h2>
            </div>
            <button
              onClick={() => setCurrentTab('stock-list')}
              className="text-xs font-bold text-[#A34828] hover:underline flex items-center gap-1"
            >
              See All Stock Items ({stockProducts.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-[#EBE5DB] hover:border-[#C85A32] shadow-sm hover:shadow-md transition-all p-3 space-y-3"
              >
                <div className="relative aspect-square rounded bg-white overflow-hidden">
                  <img
                    src={prod.images?.[0] || '/images/home_banner_1.jpg'}
                    alt={prod.name}
                    className="w-full h-full object-contain object-center p-2 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                    {prod.code}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2A2624] break-words group-hover:text-[#A34828]">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-[#8C827A] mt-0.5">{prod.dimensions}</p>
                  <div className="mt-2 pt-2 border-t border-[#F5F0E8] flex items-center justify-between text-xs">
                    <span className="text-[#C85A32] font-semibold">{prod.category_title}</span>
                    <span className="text-xs text-[#8C827A] font-medium group-hover:underline">Details & Quote →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Visit Us / Showroom Teaser */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#1F1C1B] rounded-2xl text-white p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C59B27]">About Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
              About CTN Nexus
            </h2>
            <p className="text-sm text-[#D6CEC0] leading-relaxed">
              {"At CTN NEXUS, we’ve spent years getting our hands dirty in the world of ceramics. We truly care about crafting pieces that bring real value and warmth to your spaces. More than just standard designs, we love rolling up our sleeves to bring your creative ideas to life—customizing unique shapes, sizes, and colors just as you expect. We aren't just making pots; we're crafting what you envision."}
            </p>
            <button
              onClick={() => setCurrentTab('visit')}
              className="px-6 py-3 bg-[#C85A32] hover:bg-[#A34828] text-white text-sm font-semibold rounded shadow transition-all flex items-center gap-2"
            >
              Plan Your Visit <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#3A3532] shadow-2xl h-72 sm:h-96 relative">
            <img
              src="/images/home_about_factory.png"
              alt="CTN Nexus pottery workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
