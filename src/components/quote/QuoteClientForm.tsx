import React from 'react';
import { User, Building, Mail, Phone, MapPin, FileText } from 'lucide-react';
import type { ClientDetails } from '../../types/quote';

interface QuoteClientFormProps {
  client: ClientDetails;
  onChange: (details: Partial<ClientDetails>) => void;
}

export const QuoteClientForm: React.FC<QuoteClientFormProps> = ({ client, onChange }) => {
  return (
    <div className="p-5 rounded-2xl bg-[#EBE8E1]/60 border border-[#D9D5CE] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#D9D5CE]">
        <h4 className="font-serif text-lg text-[#171717] font-semibold">
          Client &amp; Quotation Metadata
        </h4>
        <span className="text-[10px] font-mono text-[#747C66] uppercase">
          Included on PDF Export
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
        {/* Company Name */}
        <div>
          <label className="block text-[11px] text-[#747C66] mb-1">Company / Brand Name</label>
          <div className="relative">
            <Building className="w-3.5 h-3.5 text-[#747C66] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Acme Apparel Corp"
              value={client.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] placeholder:text-[#747C66]/60 focus:outline-none focus:border-[#C66B4E]"
            />
          </div>
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-[11px] text-[#747C66] mb-1">Contact Person</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-[#747C66] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Sarah Jenkins"
              value={client.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] placeholder:text-[#747C66]/60 focus:outline-none focus:border-[#C66B4E]"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] text-[#747C66] mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-[#747C66] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="sarah@acme.com"
              value={client.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] placeholder:text-[#747C66]/60 focus:outline-none focus:border-[#C66B4E]"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] text-[#747C66] mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-[#747C66] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={client.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#F4F0E8] border border-[#D9D5CE] text-[#171717] placeholder:text-[#747C66]/60 focus:outline-none focus:border-[#C66B4E]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
