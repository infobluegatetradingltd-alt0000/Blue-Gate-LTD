import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setError('Please confirm that you agree to receive email notifications.');
      return;
    }

    // Process subscription
    setIsSubmitted(true);
  };

  return (
    <section aria-label="Email newsletter" className="py-16 bg-[#F8F9FA] border-b border-[#E3E5E7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E3E5E7] shadow-apple-md space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] text-[#1769D2] flex items-center justify-center mx-auto">
            <Mail size={24} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202329] tracking-tight">
              Get Smart Finds in Your Inbox
            </h2>
            <p className="text-xs sm:text-sm text-[#656A70] max-w-md mx-auto">
              Be the first to hear about curated tech arrivals, seasonal promotional codes, and engineering insights.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-2 animate-fade-in">
              <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold">You're on the list!</h3>
              <p className="text-xs text-emerald-700">
                A confirmation link and your 10% welcome voucher code have been sent to <strong>{email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 bg-[#F8F9FA] border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-[#1769D2]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl shadow-sm transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </div>

              {/* Explicit Consent Checkbox (Unticked by default per UK GDPR) */}
              <label className="flex items-start gap-2.5 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#1769D2] focus:ring-[#1769D2]"
                />
                <span className="text-[11px] text-[#656A70] leading-snug">
                  I consent to BLUEGATE TRADING LTD storing my email address and sending product updates in accordance with the <a href="#" className="underline text-slate-800 font-semibold">Privacy Policy</a>. (Unsubscribe anytime).
                </span>
              </label>

              {error && (
                <p className="text-xs text-rose-600 font-medium text-left">{error}</p>
              )}

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck size={13} className="text-[#1769D2]" />
                <span>Zero spam • Stored securely under UK Data Protection Act 2018</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
