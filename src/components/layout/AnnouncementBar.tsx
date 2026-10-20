import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, X, ShieldCheck } from 'lucide-react';
import { ANNOUNCEMENT_MESSAGES } from '../../data/promotions';

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Store announcement"
      className="bg-[#202329] text-white py-2 px-3 sm:px-6 relative text-xs font-medium border-b border-white/10 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* UK Badge */}
        <div className="hidden md:flex items-center gap-1.5 text-slate-300 shrink-0">
          <ShieldCheck size={14} className="text-[#38BDF8]" />
          <span>UK Registered Retailer</span>
        </div>

        {/* Carousel Content */}
        <div className="flex-1 flex items-center justify-center text-center px-2 min-w-0">
          <p className="truncate transition-opacity duration-300">
            {ANNOUNCEMENT_MESSAGES[currentIndex]}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0 text-slate-400">
          <button
            onClick={() => setCurrentIndex(prev => (prev - 1 + ANNOUNCEMENT_MESSAGES.length) % ANNOUNCEMENT_MESSAGES.length)}
            aria-label="Previous announcement"
            className="p-1 hover:text-white transition-colors rounded hover:bg-white/10"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause announcements' : 'Play announcements'}
            className="p-1 hover:text-white transition-colors rounded hover:bg-white/10"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <button
            onClick={() => setCurrentIndex(prev => (prev + 1) % ANNOUNCEMENT_MESSAGES.length)}
            aria-label="Next announcement"
            className="p-1 hover:text-white transition-colors rounded hover:bg-white/10"
          >
            <ChevronRight size={13} />
          </button>
          <div className="w-[1px] h-3 bg-white/20 mx-1 hidden sm:block" />
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss announcement bar"
            className="p-1 hover:text-white transition-colors rounded hover:bg-white/10 hidden sm:block"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
};
