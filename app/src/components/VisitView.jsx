import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send, Building2, Loader2 } from 'lucide-react';

const EMPTY_FORM_DATA = {
  name: '',
  company: '',
  email: '',
  phone: '',
  visitDate: '',
  message: ''
};

export default function VisitView({ companyData }) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minimumVisitDate = today.toISOString().split('T')[0];

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM_DATA);

  const resetForm = () => {
    setFormData({ ...EMPTY_FORM_DATA });
    setSubmitError('');
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const recipientEmail = companyData?.email || 'annychau@ctnnexus.com';

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `Showroom Tour Request - ${formData.company}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: formData.email,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          preferred_visit_date: formData.visitDate || 'Not specified',
          message: formData.message || 'No additional message'
        })
      });

      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'The appointment request could not be sent.');
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(`Unable to send your request right now. Please try again or contact us directly at ${recipientEmail}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-fade-in">
      {/* Page Header */}
      <div className="bg-[#FAF7F2] border border-[#EBE5DB] rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C85A32]">
          B2B Showroom & Kiln Visits
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2A2624]">
          A Visit To CTN Nexus
        </h1>
        <p className="text-sm sm:text-base text-[#6B6460] max-w-3xl mx-auto leading-relaxed font-light">
          A visit to CTN Nexus is well worth the journey, offering an inspiring space to explore our extensive collection of handcrafted ceramic pots. Take your time browsing our diverse designs tailored for global partners, and discover exquisite artisan pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column: Showroom Details & Contact Info */}
        <div className="space-y-8">
          <div className="bg-white border border-[#EBE5DB] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#2A2624] border-b border-[#EBE5DB] pb-3">
              Where To Reach Us
            </h3>

            <div className="space-y-4 text-sm text-[#4A4542]">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#2A2624]">{companyData?.name}</h4>
                  <p className="text-xs text-[#6B6460]">Trusted Global Pottery B2B Partner</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#2A2624]">Showroom & Headquarters</h4>
                  <p className="text-xs text-[#6B6460] mt-0.5">{companyData?.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C85A32] shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#2A2624]">Telephone / WhatsApp</h4>
                  <a href={`tel:${companyData?.tel}`} className="text-xs text-[#A34828] hover:underline">
                    {companyData?.tel}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C85A32] shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#2A2624]">Direct Trade Email</h4>
                  <a href={`mailto:${companyData?.email}`} className="text-xs text-[#A34828] hover:underline">
                    {companyData?.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F5F0E8]">
                <Clock className="w-5 h-5 text-[#5C6B57] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-semibold text-[#2A2624]">Visiting Hours</h4>
                  <p className="text-[#6B6460]">Monday – Saturday: 8:00 AM – 5:30 PM (ICT)</p>
                  <p className="text-[#8C827A] italic">Private appointments available on request.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Mockup */}
          <div className="bg-[#1F1C1B] rounded-xl overflow-hidden text-white p-6 space-y-4 border border-[#3A3532] shadow-md">
            <h4 className="font-serif text-lg font-bold">Interactive Location Map</h4>
            <div className="w-full h-56 bg-[#2B2725] rounded-lg relative flex items-center justify-center border border-[#3A3532] overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C85A32_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center p-4 space-y-2">
                <MapPin className="w-8 h-8 text-[#C85A32] mx-auto animate-bounce" />
                <p className="font-serif font-bold text-sm text-white">CTN NEXUS COMPANY LIMITED</p>
                <p className="text-[11px] text-[#A89F91]">No. 17, 192 Pham Duc Son, Ward 16, Dist 8, HCMC</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(companyData?.address || '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-3 py-1.5 bg-[#C85A32] hover:bg-[#A34828] text-white text-xs font-semibold rounded"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Appointment & Inquiry Form */}
        <div className="bg-white border border-[#EBE5DB] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2A2624]">Schedule A Meeting / Showroom Tour</h3>
            <p className="text-xs text-[#6B6460] mt-1">
              At CTN Nexus, we bring the essence of craftsmanship to elevate living spaces worldwide. As a trusted B2B partner, we are committed to delivering exceptional value to our clients.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#FAF7F2] border border-[#5C6B57] rounded-xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#5C6B57] mx-auto" />
              <h4 className="font-serif text-xl font-bold text-[#2A2624]">Appointment Request Received!</h4>
              <p className="text-xs text-[#6B6460] max-w-md mx-auto">
                Thank you for contacting CTN Nexus. Our export management team will confirm your visit details via email within 24 hours.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-[#A34828] text-white text-xs font-semibold rounded"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Company Name / Business *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pacific Landscape Design"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#2A2624]">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2624]">Preferred Visit Date</label>
                <input
                  type="date"
                  min={minimumVisitDate}
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#2A2624]">Message / Specific Pot Lines Interested In</label>
                <textarea
                  rows={4}
                  placeholder="Describe your inquiry or order specifications (e.g. Glazed Ceramic planters 20ft container)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EBE5DB] rounded focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#A34828] hover:bg-[#8C3B1F] disabled:bg-[#B8AF9F] disabled:cursor-wait text-white font-semibold rounded shadow transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Appointment Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Appointment Request
                  </>
                )}
              </button>
              {submitError && (
                <p role="alert" className="text-center text-xs text-red-700 bg-red-50 border border-red-200 rounded p-3">
                  {submitError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
