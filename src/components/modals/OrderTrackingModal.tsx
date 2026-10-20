import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle2, Clock } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [searchVal, setSearchVal] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchVal.trim().toUpperCase();
    if (!clean) return;

    // Simulate lookup of real format
    if (clean.startsWith('BGT-') || clean.startsWith('GB') || clean.length >= 6) {
      setNotFound(false);
      setTrackedOrder({
        orderId: clean.startsWith('BGT-') ? clean : `BGT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        carrier: 'Royal Mail 48 Tracked',
        trackingNumber: clean.startsWith('GB') ? clean : `GB${Math.floor(100000000 + Math.random() * 900000000)}RM`,
        status: 'In Transit',
        estimatedDelivery: 'Tomorrow by 1:00 PM',
        currentLocation: 'Midlands Mail Centre (Wolverhampton Depot)',
        steps: [
          { title: 'Order Verified & Packed', time: 'Yesterday, 14:35', done: true },
          { title: 'Scanned at National Hub', time: 'Yesterday, 21:10', done: true },
          { title: 'In Transit to Local Delivery Office', time: 'Today, 06:45', done: true },
          { title: 'Out for Delivery with Postie', time: 'Pending next scan', done: false }
        ]
      });
    } else {
      setNotFound(true);
      setTrackedOrder(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Track Your Order"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[88vh]"
      >
        <div className="px-6 py-5 border-b border-slate-100 bg-[#F8F9FA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Package size={20} className="text-[#1769D2]" />
            <h2 className="text-base font-bold text-[#202329]">
              Track Your UK Delivery
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tracking"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Enter Order ID (BGT-2026-...) or Royal Mail Ref"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs font-mono font-medium bg-[#F8F9FA] border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#1769D2]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Track
            </button>
          </form>

          {notFound && (
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-700">
              <p className="font-bold">Order Reference Not Found</p>
              <p className="mt-1">
                Please double-check your order number from your confirmation email (e.g. BGT-2026-10492) or contact our customer team at +44 7476 623907.
              </p>
            </div>
          )}

          {trackedOrder && (
            <div className="space-y-5 animate-fade-in">
              {/* Order Info Card */}
              <div className="p-4 rounded-2xl bg-[#EBF3FC] border border-[#1769D2]/20 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#1769D2] text-sm">{trackedOrder.orderId}</p>
                  <p className="text-slate-600 font-mono mt-0.5">{trackedOrder.trackingNumber}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    {trackedOrder.status}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Est: {trackedOrder.estimatedDelivery}</p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4 pl-2">
                {trackedOrder.steps.map((st: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3.5 relative">
                    {idx < trackedOrder.steps.length - 1 && (
                      <div className={`absolute left-3.5 top-6 bottom-0 w-0.5 ${st.done ? 'bg-[#1769D2]' : 'bg-slate-200'}`} />
                    )}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      st.done ? 'bg-[#1769D2] text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {st.done ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                    </div>
                    <div className="text-xs">
                      <p className={`font-bold ${st.done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {st.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{st.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                <span>Current Scan Depot: </span>
                <strong className="text-slate-700">{trackedOrder.currentLocation}</strong>
              </div>
            </div>
          )}

          {!trackedOrder && !notFound && (
            <div className="text-center py-6 text-slate-400 text-xs">
              <Truck size={32} className="mx-auto mb-2 text-slate-300" />
              <p>Enter your 10-digit order reference to check real-time courier dispatch status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
