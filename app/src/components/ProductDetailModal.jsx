import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Package,
  Plus,
  Shield,
  X
} from 'lucide-react';

export default function ProductDetailModal({ product, onClose, addToQuote }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    setActiveImgIdx(0);
  }, [product?.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!product) return null;

  const images = product.images?.length ? product.images : ['/images/home_banner_1.jpg'];
  const showPreviousImage = () => {
    setActiveImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };
  const showNextImage = () => {
    setActiveImgIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/70 p-0 backdrop-blur-sm animate-fade-in sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-full w-full flex-col overflow-y-auto bg-white shadow-2xl sm:h-[min(92dvh,900px)] sm:max-w-[1400px] sm:rounded-2xl sm:border sm:border-[#EBE5DB] lg:flex-row lg:overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 rounded-full bg-white/90 p-2.5 text-[#2A2624] shadow-md ring-1 ring-black/10 transition-colors hover:bg-[#F1ECE4] sm:right-4 sm:top-4"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Full product gallery: object-contain keeps every edge of the photo visible. */}
        <section className="flex w-full shrink-0 flex-col border-b border-[#EBE5DB] bg-[#FAF7F2] p-3 sm:p-5 lg:h-full lg:w-[58%] lg:min-w-0 lg:border-b-0 lg:border-r lg:p-6">
          <div className="relative flex h-[52dvh] min-h-[300px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-[#EBE5DB] bg-white lg:h-auto lg:min-h-0">
            <img
              src={images[activeImgIdx]}
              alt={`${product.name} - image ${activeImgIdx + 1} of ${images.length}`}
              className="h-full w-full object-contain object-center p-2 sm:p-4"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#2A2624] shadow-md ring-1 ring-black/10 hover:bg-white"
                  aria-label="Previous product image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#2A2624] shadow-md ring-1 ring-black/10 hover:bg-white"
                  aria-label="Next product image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white">
                  {activeImgIdx + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex shrink-0 items-center gap-2 overflow-x-auto p-1 sm:mt-4">
              {images.map((img, idx) => (
                <button
                  type="button"
                  key={`${img}-${idx}`}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white transition-all sm:h-20 sm:w-20 ${
                    idx === activeImgIdx
                      ? 'ring-2 ring-[#A34828] ring-offset-2'
                      : 'opacity-70 ring-1 ring-[#D8D0C5] hover:opacity-100'
                  }`}
                  aria-label={`View product image ${idx + 1}`}
                  aria-current={idx === activeImgIdx ? 'true' : undefined}
                >
                  <img src={img} alt="" className="h-full w-full bg-white object-contain object-center p-1" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Product information */}
        <section className="flex w-full flex-1 flex-col bg-white lg:h-full lg:min-h-0 lg:w-[42%]">
          <div className="flex-1 space-y-6 p-5 pr-14 sm:p-8 sm:pr-16 lg:min-h-0 lg:overflow-y-auto lg:p-10 lg:pr-16">
            <header>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">
                {product.category_title}
              </span>
              <h2 id="product-detail-title" className="mt-2 break-words font-serif text-2xl font-bold text-[#2A2624] sm:text-3xl">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-[#8C827A]">
                Model Code: <strong className="text-[#2A2624]">{product.code}</strong>
              </p>
            </header>

            <div className="space-y-3 rounded-xl border border-[#EBE5DB] bg-[#FAF7F2] p-4 text-sm sm:p-5">
              <h3 className="border-b border-[#EBE5DB] pb-3 font-serif text-base font-bold text-[#2A2624]">
                Technical Specifications
              </h3>
              <dl className="grid grid-cols-[minmax(110px,0.8fr)_minmax(0,1.2fr)] gap-x-4 gap-y-3 pt-1 text-[#4A4542]">
                <dt className="text-[#8C827A]">Dimensions</dt>
                <dd className="break-words font-semibold">{product.dimensions || 'Contact us for dimensions'}</dd>

                <dt className="text-[#8C827A]">Material</dt>
                <dd className="break-words font-semibold">{product.material || 'Stoneware Clay'}</dd>

                {product.finish && (
                  <>
                    <dt className="text-[#8C827A]">Finish</dt>
                    <dd className="break-words font-semibold">{product.finish}</dd>
                  </>
                )}

                {product.firing_temp && (
                  <>
                    <dt className="text-[#8C827A]">Firing Temperature</dt>
                    <dd className="break-words font-semibold text-[#A34828]">{product.firing_temp}</dd>
                  </>
                )}

                <dt className="text-[#8C827A]">Packaging</dt>
                <dd className="break-words font-semibold">{product.packaging || 'Contact us for packing dimensions'}</dd>

                {typeof product.in_stock === 'boolean' && (
                  <>
                    <dt className="text-[#8C827A]">Availability</dt>
                    <dd className={`font-semibold ${product.in_stock ? 'text-[#5C6B57]' : 'text-[#8C827A]'}`}>
                      {product.in_stock ? 'In stock' : 'Made to order'}
                    </dd>
                  </>
                )}
              </dl>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-[#6B6460]">
              <p className="flex items-start gap-3">
                <Flame className="mt-0.5 h-5 w-5 shrink-0 text-[#C85A32]" />
                <span>Frost-resistant & frost-proof for extreme outdoor weather.</span>
              </p>
              <p className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#5C6B57]" />
                <span>Handcrafted in Vietnam with custom glaze matching options.</span>
              </p>
              <p className="flex items-start gap-3">
                <Package className="mt-0.5 h-5 w-5 shrink-0 text-[#C59B27]" />
                <span>Export-ready packaging for pallet and container shipments.</span>
              </p>
            </div>

            {product.in_stock && (
              <div className="flex items-center gap-2 rounded-lg border border-[#CBD5C7] bg-[#F2F6F0] px-4 py-3 text-sm font-semibold text-[#4F604A]">
                <CheckCircle2 className="h-5 w-5 shrink-0" /> Ready for shipment
              </div>
            )}
          </div>

          <footer className="sticky bottom-0 flex shrink-0 flex-col gap-3 border-t border-[#EBE5DB] bg-white/95 p-4 backdrop-blur-sm sm:flex-row sm:p-6 lg:static lg:px-10">
            <button
              type="button"
              onClick={() => {
                addToQuote(product);
                onClose();
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#A34828] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#8C3B1F]"
            >
              <Plus className="h-4 w-4" /> Add To B2B Quote
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#EBE5DB] bg-[#FAF7F2] px-5 py-3.5 text-sm font-semibold text-[#4A4542] hover:bg-[#EBE5DB]"
            >
              Close
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
