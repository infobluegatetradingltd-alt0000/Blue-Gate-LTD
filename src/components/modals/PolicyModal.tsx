import React, { useEffect } from 'react';
import { X, ShieldCheck, MapPin, Phone, FileText } from 'lucide-react';
import { POLICY_DOCS, COMPANY_DETAILS } from '../../data/policies';

export type PolicyType = 'about' | 'delivery' | 'returns' | 'privacy' | 'terms' | 'safety';

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && policyType) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [policyType, onClose]);

  if (!policyType) return null;

  const doc = POLICY_DOCS[policyType];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-[#F8F9FA] flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#202329]">
              {doc.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{doc.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Statutory Verification Box on About page */}
          {policyType === 'about' && (
            <div className="p-4 rounded-2xl bg-[#EBF3FC] border border-[#1769D2]/20 text-slate-700 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#1769D2]">
                <ShieldCheck size={16} />
                <span>Companies House Verified Business Profile</span>
              </div>
              <p><strong>Legal Entity:</strong> {COMPANY_DETAILS.legalName}</p>
              <p><strong>Companies House Number:</strong> {COMPANY_DETAILS.companiesHouseNumber} (Active)</p>
              <p><strong>Incorporation Date:</strong> {COMPANY_DETAILS.incorporationDate}</p>
              <p><strong>Registered Office:</strong> {COMPANY_DETAILS.registeredOffice}</p>
              <p><strong>Phone:</strong> {COMPANY_DETAILS.phone}</p>
              <p><strong>SIC Codes:</strong> 47190 (Non-specialised retail), 47910 (Mail order / Internet retail), 73110 (Advertising)</p>
            </div>
          )}

          {doc.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {sec.heading}
              </h3>
              {'content' in sec && sec.content && (
                <p>{sec.content}</p>
              )}
              {'points' in sec && sec.points && (
                <ul className="space-y-1.5 pl-4 list-disc marker:text-[#1769D2]">
                  {sec.points.map((pt, pidx) => (
                    <li key={pidx}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-[#F8F9FA] flex items-center justify-between text-xs text-slate-500">
          <span>BLUEGATE TRADING LTD • Dunstall Hill, Wolverhampton</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#202329] text-white font-bold rounded-xl hover:bg-[#1769D2] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
