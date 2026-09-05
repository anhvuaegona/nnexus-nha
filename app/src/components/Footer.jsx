import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Award, Truck, Flame, Loader2 } from 'lucide-react';
import logoUrl from '../../docs/images/logo.jpeg';

export default function Footer({ companyData, categories, setCurrentTab, openCategory }) {
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const recipientEmail = companyData?.email || 'annychau@ctnnexus.com';
    const requesterEmail = email.trim();

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `B2B Catalog Request - ${requesterEmail}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: requesterEmail,
          _autoresponse: 'Thank you for requesting the CTN Nexus B2B catalog. Our export team will send the latest catalog, stock list, and trade information to you shortly.',
          email: requesterEmail,
          request_type: 'B2B catalog, stock list, and trade price guide'
        })
      });

      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'The catalog request could not be sent.');
      }

      setSubscribed(true);
      setEmail('');
    } catch (error) {
      setSubmitError(`Unable to send your catalog request right now. Please try again or contact us at ${recipientEmail}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#1F1C1B] text-[#E5DFD5] pt-16 pb-12 border-t border-[#3A3532]">
      {/* Brand Value Pillars Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-12 mb-12 border-b border-[#322E2B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#2B2725]">
          <Flame className="w-8 h-8 text-[#C85A32] shrink-0 mt-1" />
          <div>
            <h4 className="font-serif font-bold text-white text-base">1100°C High Fired</h4>
            <p className="text-xs text-[#A89F91] mt-1">Exceptional structural density, frost-proof & weather-resistant.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#2B2725]">
          <Award className="w-8 h-8 text-[#C59B27] shrink-0 mt-1" />
          <div>
            <h4 className="font-serif font-bold text-white text-base">Master Artisanal Quality</h4>
            <p className="text-xs text-[#A89F91] mt-1">Hand-sculpted & hand-glazed by generational craftsmen in Vietnam.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#2B2725]">
          <Truck className="w-8 h-8 text-[#5C6B57] shrink-0 mt-1" />
          <div>
            <h4 className="font-serif font-bold text-white text-base">Global B2B Logistics</h4>
            <p className="text-xs text-[#A89F91] mt-1">Export-ready palletizing & container shipments worldwide.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[#2B2725]">
          <CheckCircle2 className="w-8 h-8 text-[#C85A32] shrink-0 mt-1" />
          <div>
            <h4 className="font-serif font-bold text-white text-base">Custom OEM/ODM Orders</h4>
            <p className="text-xs text-[#A89F91] mt-1">Tailored dimensions, colors, and glazes for luxury partners.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Company Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="CTN Nexus logo" className="h-16 w-auto object-contain rounded-sm" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-white tracking-tight">CTN NEXUS</h3>
              <p className="text-[10px] text-[#C85A32] tracking-widest font-semibold uppercase">Company Limited</p>
            </div>
          </div>
          <p className="text-xs text-[#A89F91] leading-relaxed">
            As a reliable Vietnamese pottery source, we take pride in delivering premium glazed stoneware, terracotta, giant amphorae, and composite outdoor pottery to global garden centres and landscape architects.
          </p>
          <div className="pt-2 text-xs text-[#C59B27] font-medium">
            © {new Date().getFullYear()} CTN NEXUS CO., LTD. All rights reserved.
          </div>
        </div>

        {/* Column 2: Collections */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-lg text-white">Collections</h4>
          <ul className="space-y-2 text-xs text-[#A89F91]">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => openCategory(cat.id)}
                  className="hover:text-[#C85A32] transition-colors text-left"
                >
                  {cat.title}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setCurrentTab('stock-list')}
                className="hover:text-[#C85A32] transition-colors font-medium text-white text-left"
              >
                → View In-Stock Catalog
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Headquarters & Contact */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-lg text-white">Contact & Showroom</h4>
          <div className="space-y-3 text-xs text-[#A89F91]">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
              <span>{companyData?.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C85A32] shrink-0" />
              <a href={`tel:${companyData?.tel}`} className="hover:text-white">{companyData?.tel}</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C85A32] shrink-0" />
              <a href={`mailto:${companyData?.email}`} className="hover:text-white">{companyData?.email}</a>
            </p>
          </div>
        </div>

        {/* Column 4: B2B Catalog Newsletter */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-lg text-white">Request B2B Catalog</h4>
          <p className="text-xs text-[#A89F91]">
            Subscribe to receive our latest seasonal export catalogs, stock lists, and trade price guides.
          </p>
          {subscribed ? (
            <div className="p-3 bg-[#2B3528] border border-[#5C6B57] text-[#A8D59D] rounded text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Thank you! Your catalog request has been sent. Our team will email you shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter business email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#2B2725] border border-[#4A4440] text-xs text-white rounded px-3 py-2.5 pr-10 focus:outline-none focus:border-[#C85A32]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Send B2B catalog request"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#C85A32] hover:bg-[#A34828] disabled:bg-[#766C64] disabled:cursor-wait text-white rounded transition-colors"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {submitError && (
                <p role="alert" className="rounded border border-red-900/60 bg-red-950/40 p-2 text-[10px] leading-relaxed text-red-200">
                  {submitError}
                </p>
              )}
              <p className="text-[10px] text-[#7A7268]">Strictly for wholesale & trade inquiries.</p>
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}
