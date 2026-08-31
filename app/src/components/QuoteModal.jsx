import { useState } from 'react';
import { X, Trash2, Send, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function QuoteModal({ quoteItems, removeFromQuote, clearQuote, onClose, onAddInquiry }) {
  const [submitted, setSubmitted] = useState(false);
  const [customer, setCustomer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    destinationPort: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInquiry = {
      id: 'INQ-' + Date.now(),
      date: new Date().toLocaleDateString(),
      customer,
      items: quoteItems
    };
    onAddInquiry(newInquiry);
    setSubmitted(true);
    clearQuote();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EBE5DB] relative my-auto p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EBE5DB] pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#A34828]" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2A2624]">
                B2B Quote Basket ({quoteItems.length})
              </h2>
              <p className="text-xs text-[#8C827A]">Request official FOB/CIF container pricing & catalog specs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#8C827A] hover:text-[#2A2624]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#5C6B57] mx-auto animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-[#2A2624]">Quote Request Submitted!</h3>
            <p className="text-xs text-[#6B6460] max-w-md mx-auto leading-relaxed">
              Your inquiry has been successfully sent to CTN Nexus Export Sales (annychau@ctnnexus.com). We will prepare formal trade pricing and container loading estimates for your review.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#A34828] text-white text-xs font-semibold rounded shadow"
            >
              Done & Return To Store
            </button>
          </div>
        ) : quoteItems.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-[#D8D0C5] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#2A2624]">Your Quote Basket Is Empty</h3>
            <p className="text-xs text-[#8C827A]">Browse our collections and click “Add To Quote” on desired pot models.</p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#A34828] text-white text-xs font-semibold rounded"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* List of Selected Items */}
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 border border-[#EBE5DB] rounded-lg p-3 bg-[#FAF7F2]">
              {quoteItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-[#EBE5DB] text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.images?.[0]} alt="" className="w-12 h-12 object-contain rounded bg-[#F3EFE6]" />
                    <div>
                      <h4 className="font-serif font-bold text-[#2A2624]">{item.name}</h4>
                      <p className="text-[11px] text-[#8C827A]">Code: {item.code} | {item.dimensions}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromQuote(idx)}
                    className="p-1.5 text-[#C85A32] hover:bg-[#FAF7F2] rounded"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* B2B Customer Info Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif font-bold text-[#2A2624] text-sm border-b border-[#EBE5DB] pb-2">
                Business Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Company / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Company name"
                    value={customer.company}
                    onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@company.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-0192"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Port of Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Rotterdam, L.A., Hamburg"
                    value={customer.destinationPort}
                    onChange={(e) => setCustomer({ ...customer, destinationPort: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2624]">Additional Requirements / Container Size</label>
                <textarea
                  rows={3}
                  placeholder="Target quantities per code, custom color glazes, packing preferences..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#A34828] hover:bg-[#8C3B1F] text-white font-semibold rounded shadow transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Official B2B Quote Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
