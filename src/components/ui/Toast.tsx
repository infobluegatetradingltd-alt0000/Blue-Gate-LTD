import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, dismissToast } = useCart();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dismissToast]);

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#202329] text-white rounded-xl shadow-2xl border border-white/10 animate-slide-up max-w-md"
    >
      <CheckCircle2 size={18} className="text-[#38BDF8] shrink-0" />
      <span className="text-sm font-medium leading-snug">{toastMessage}</span>
      <button
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="p-1 text-slate-400 hover:text-white transition-colors shrink-0 rounded-lg hover:bg-white/10"
      >
        <X size={15} />
      </button>
    </div>
  );
};
