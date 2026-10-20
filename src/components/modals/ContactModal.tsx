import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/policies';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [topic, setTopic] = useState('general');
  const [message, setMessage] = useState('');
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid UK email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Please provide details for your inquiry (min 10 characters).');
      return;
    }

    const generatedTicket = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(generatedTicket);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setOrderRef('');
    setMessage('');
    setTicketId(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Contact BlueGate Customer Support"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-[#F8F9FA] flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#202329]">
              Contact BlueGate Support
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct assistance from our UK-based customer care team
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact dialog"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {ticketId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Support Ticket Created</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. Your inquiry has been routed to our logistics &amp; support desk under ticket reference:
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-base font-bold text-[#1769D2] inline-block">
                {ticketId}
              </div>
              <p className="text-xs text-slate-500">
                A member of our team will respond to <strong>{email}</strong> within 1 business day.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-[#1769D2] text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Direct Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#EBF3FC] border border-[#1769D2]/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#1769D2] flex items-center justify-center shrink-0 shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase text-[#1769D2]">Direct Telephone</p>
                    <a
                      href={`tel:${COMPANY_DETAILS.phone}`}
                      className="text-sm font-bold text-slate-900 hover:underline"
                    >
                      {COMPANY_DETAILS.phone}
                    </a>
                    <p className="text-[10px] text-slate-500">Mon–Fri, 9am–5pm GMT</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F2] border border-[#E3E5E7] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">Registered Office</p>
                    <p className="text-slate-500 leading-snug">Dunstall Hill, Wolverhampton, WV6 0SR</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. David Clarke"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1769D2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="david.clarke@example.co.uk"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1769D2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Topic</label>
                    <select
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1769D2]"
                    >
                      <option value="general">General Product Question</option>
                      <option value="order_tracking">Order Tracking &amp; Delivery</option>
                      <option value="returns">Returns &amp; RMA Request</option>
                      <option value="warranty">Warranty &amp; Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Order Reference (Optional)</label>
                    <input
                      type="text"
                      value={orderRef}
                      onChange={e => setOrderRef(e.target.value)}
                      placeholder="e.g. BGT-2026-9284"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono focus:bg-white focus:border-[#1769D2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How can we assist you today? Please include any relevant SKU codes or details."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1769D2]"
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-600 font-semibold">{error}</p>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck size={14} className="text-[#1769D2]" />
                    <span>Your data is protected under UK GDPR</span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
