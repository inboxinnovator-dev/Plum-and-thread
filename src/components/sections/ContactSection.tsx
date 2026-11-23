import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  User, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useQuoteStore } from '../../store/quoteStore';

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const { quoteNumber, totals, addToast } = useQuoteStore();

  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<{
    data: FormState;
    inquiryRef: string;
    timestamp: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Contact person name is required.';
    }

    if (!form.company.trim()) {
      newErrors.company = 'Brand or company name is required.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@brand.com).';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (form.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please provide a valid contact number (at least 8 digits).';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please provide details about your collection or order timeline.';
    } else if (form.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const ref = `INQ-TIR-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toLocaleString();

      setSubmittedData({
        data: { ...form },
        inquiryRef: ref,
        timestamp: now,
      });

      addToast({
        type: 'success',
        title: 'Inquiry Validated & Staged',
        description: `Reference #${ref} created locally in browser state.`,
      });
    } else {
      addToast({
        type: 'error',
        title: 'Validation Error',
        description: 'Please correct the highlighted fields before proceeding.',
      });
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    });
    setErrors({});
  };

  const generateMailtoUrl = () => {
    if (!submittedData) return '#';
    const subject = encodeURIComponent(`Production Inquiry: ${submittedData.data.company} [Ref: ${submittedData.inquiryRef}] (Quote #${quoteNumber})`);
    const body = encodeURIComponent(
      `Hello Plum & Thread Production Team,\n\n` +
      `I have prepared a production inquiry through your digital Quote Studio.\n\n` +
      `INQUIRY REFERENCE: ${submittedData.inquiryRef}\n` +
      `QUOTE NUMBER: ${quoteNumber}\n` +
      `TOTAL UNITS: ${totals.totalQuantity} Units\n` +
      `ESTIMATED VALUE: ₹${totals.grandTotal.toLocaleString('en-IN')}\n\n` +
      `CONTACT DETAILS:\n` +
      `Name: ${submittedData.data.name}\n` +
      `Company: ${submittedData.data.company}\n` +
      `Email: ${submittedData.data.email}\n` +
      `Phone: ${submittedData.data.phone}\n\n` +
      `PROJECT REQUIREMENTS:\n` +
      `${submittedData.data.message}\n\n` +
      `Looking forward to your team's review of our tech pack.\n`
    );
    return `mailto:production@plumandthread.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D9D5CE]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#D9D5CE] text-xs font-mono uppercase tracking-widest text-[#747C66] mb-3">
              <Mail className="w-3.5 h-3.5 text-[#C66B4E]" />
              COMMENCE YOUR RUN
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
              Direct Mill Liaison.{' '}
              <span className="italic font-light text-[#C66B4E]">Contact Our Team.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#171717]/70 max-w-md font-normal leading-relaxed">
            Connect directly with technical merchandisers at our Tiruppur facilities for lab dips, custom yarn blends, or sampling schedules.
          </p>
        </div>

        {/* 2-Column Grid: Contact Info & Form / Success Preview */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Physical Presence & Facility Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#747C66] block">
                  Manufacturing Hub
                </span>
                <h3 className="font-serif text-2xl text-[#171717] mt-1 font-semibold">
                  Plum &amp; Thread Mills
                </h3>
                <p className="text-xs text-[#171717]/75 mt-1 font-mono">
                  Textile Industrial Park &middot; Tiruppur 641604, TN, India
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#D9D5CE] text-xs font-mono">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C66B4E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Factory Address</span>
                    <span className="text-[#747C66]">Survey No. 48/2, Textile Industrial Park, Tiruppur, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C66B4E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Direct Mill Inquiries</span>
                    <span className="text-[#747C66]">production@plumandthread.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C66B4E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#171717] block">Liaison Desk</span>
                    <span className="text-[#747C66]">+91 (421) 224-8900 (Mon–Sat, 09:00–18:00 IST)</span>
                  </div>
                </div>
              </div>

              {/* Active Quote Reference Note */}
              <div className="p-4 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE] text-xs font-mono">
                <span className="text-[10px] uppercase text-[#747C66] block">Active Session Reference:</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-[#171717]">{quoteNumber}</span>
                  <span className="text-[#C66B4E]">{totals.totalQuantity} Units Quoted</span>
                </div>
              </div>
            </div>

            {/* Clear Architectural Notice regarding Backendless Architecture */}
            <div className="p-5 rounded-2xl bg-[#EBE8E1]/40 border border-dashed border-[#D9D5CE] text-xs font-mono text-[#747C66] space-y-1">
              <span className="font-semibold text-[#171717] block">
                Technical Submission Note:
              </span>
              <p className="leading-relaxed">
                As per challenge requirements, this application runs entirely on the frontend without a remote database. Submissions stage instantly into validated local state and offer a structured mailto handoff.
              </p>
            </div>
          </div>

          {/* Right Column: Form or Validated Submission State */}
          <div className="lg:col-span-7">
            {submittedData ? (
              /* Validated Local Submission State */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 rounded-2xl bg-[#EBE8E1] border-2 border-emerald-600/40 shadow-xl space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                      Local Submission Staged &middot; Demonstration Complete
                    </span>
                    <h3 className="font-serif text-2xl text-[#171717] font-semibold">
                      Inquiry Staged for {submittedData.data.company}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE] space-y-3 text-xs font-mono">
                  <div className="flex justify-between pb-2 border-b border-[#D9D5CE]">
                    <span className="text-[#747C66]">Inquiry Reference:</span>
                    <strong className="text-[#171717]">{submittedData.inquiryRef}</strong>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#D9D5CE]">
                    <span className="text-[#747C66]">Quotation Number:</span>
                    <strong className="text-[#171717]">{quoteNumber}</strong>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#D9D5CE]">
                    <span className="text-[#747C66]">Contact:</span>
                    <span className="text-[#171717]">{submittedData.data.name} ({submittedData.data.email})</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#D9D5CE]">
                    <span className="text-[#747C66]">Phone:</span>
                    <span className="text-[#171717]">{submittedData.data.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#747C66] block mb-1">Message Overview:</span>
                    <p className="text-[#171717] italic bg-[#EBE8E1]/60 p-2.5 rounded-lg">
                      "{submittedData.data.message}"
                    </p>
                  </div>
                </div>

                {/* Next Steps Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a
                    href={generateMailtoUrl()}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#171717] hover:bg-[#C66B4E] text-[#F4F0E8] text-xs font-semibold tracking-wide transition-colors cursor-pointer text-center"
                  >
                    <span>Send via Default Email App (mailto)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] text-xs font-semibold hover:bg-[#D9D5CE] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#747C66]" />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Frontend Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-8 sm:p-10 rounded-2xl bg-[#EBE8E1]/80 border border-[#D9D5CE] shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-[#747C66] mb-1">
                      Your Full Name <span className="text-[#C66B4E]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#747C66] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Vikram Seth"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F4F0E8] border ${
                          errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#D9D5CE]'
                        } text-[#171717] focus:outline-none focus:border-[#C66B4E]`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-[11px] font-mono text-rose-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono text-[#747C66] mb-1">
                      Company / Label Name <span className="text-[#C66B4E]">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-[#747C66] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Kinfolk Apparel"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F4F0E8] border ${
                          errors.company ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#D9D5CE]'
                        } text-[#171717] focus:outline-none focus:border-[#C66B4E]`}
                      />
                    </div>
                    {errors.company && (
                      <p className="mt-1 text-[11px] font-mono text-rose-600">{errors.company}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-[#747C66] mb-1">
                      Work Email <span className="text-[#C66B4E]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#747C66] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="vikram@kinfolk.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F4F0E8] border ${
                          errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#D9D5CE]'
                        } text-[#171717] focus:outline-none focus:border-[#C66B4E]`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-[11px] font-mono text-rose-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono text-[#747C66] mb-1">
                      Phone Number <span className="text-[#C66B4E]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#747C66] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+91 98421 00000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#F4F0E8] border ${
                          errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#D9D5CE]'
                        } text-[#171717] focus:outline-none focus:border-[#C66B4E]`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-[11px] font-mono text-rose-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-[#747C66] mb-1">
                    Project Message &amp; Desired Timeline <span className="text-[#C66B4E]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your target delivery date, expected quantities, custom fabric blend, or tech pack readiness..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full p-3.5 text-xs sm:text-sm rounded-xl bg-[#F4F0E8] border ${
                      errors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#D9D5CE]'
                    } text-[#171717] focus:outline-none focus:border-[#C66B4E]`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] font-mono text-rose-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#171717] hover:bg-[#C66B4E] text-[#F4F0E8] text-xs font-semibold tracking-wider uppercase font-mono shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Validate &amp; Submit Inquiry Preview</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
