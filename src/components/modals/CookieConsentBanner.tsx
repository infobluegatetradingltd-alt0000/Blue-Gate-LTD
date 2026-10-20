import React, { useState } from 'react';
import { ShieldCheck, X, Check, Cookie } from 'lucide-react';
import { useCookie } from '../../context/CookieContext';

export const CookieConsentBanner: React.FC = () => {
  const {
    isBannerOpen,
    isPrefsModalOpen,
    openPrefsModal,
    closePrefsModal,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    preferences
  } = useCookie();

  const [analytics, setAnalytics] = useState(preferences?.analytics ?? false);
  const [marketing, setMarketing] = useState(preferences?.marketing ?? false);

  if (!isBannerOpen && !isPrefsModalOpen) return null;

  return (
    <>
      {/* Bottom Floating Banner */}
      {isBannerOpen && !isPrefsModalOpen && (
        <aside
          role="region"
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 lg:max-w-4xl lg:mx-auto z-50 bg-[#202329] text-white p-5 rounded-2xl shadow-2xl border border-white/10 animate-slide-up"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5">
                <Cookie size={20} />
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-white text-sm mb-0.5">
                  Your Privacy &amp; Cookie Preferences
                </p>
                <p>
                  We use essential cookies to power your shopping cart and secure checkout. With your consent, we also use analytical cookies to understand how you explore our store. Read our{' '}
                  <span className="text-[#38BDF8] underline cursor-pointer">Privacy &amp; Cookie Policy</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={openPrefsModal}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                Customise
              </button>
              <button
                onClick={rejectNonEssential}
                className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1769D2] hover:bg-[#1256B0] rounded-xl transition-colors shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Modal */}
      {isPrefsModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Manage Cookie Preferences"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-slide-up space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#1769D2]" />
                <h3 className="text-base font-bold text-[#202329]">
                  Cookie Settings
                </h3>
              </div>
              <button
                onClick={closePrefsModal}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              {/* Essential */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">Strictly Necessary Cookies</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Required for basic site navigation, shopping cart sessions, security tokens, and checkout processing. Cannot be disabled.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                  Always Active
                </span>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">Performance &amp; Analytics</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Anonymized telemetry that helps us measure page load speeds and optimize product categorization.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                  className="mt-1 rounded border-slate-300 text-[#1769D2] focus:ring-[#1769D2] w-4 h-4 cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">Marketing &amp; Targeting</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Used to remember promotional campaign referrals and discount vouchers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={e => setMarketing(e.target.checked)}
                  className="mt-1 rounded border-slate-300 text-[#1769D2] focus:ring-[#1769D2] w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={closePrefsModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => savePreferences(analytics, marketing)}
                className="px-5 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
