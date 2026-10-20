import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';

interface Guide {
  id: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  summary: string;
  fullContent: string[];
}

export const ShoppingGuides: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const guides: Guide[] = [
    {
      id: 'anc-guide',
      category: 'Audio Architecture',
      title: 'Active Noise Cancellation vs Passive Isolation: What You Need to Know',
      readTime: '4 min read',
      date: 'October 2026',
      summary: 'How dual-microphone inverse phase algorithms eliminate low-frequency jet and train rumble while preserving acoustic voice clarity.',
      fullContent: [
        'Passive noise isolation relies purely on physical barriers—such as high-density acoustic memory foam and protein leather—to block high-frequency noise like keyboard clatter and human chatter.',
        'Active Noise Cancellation (ANC), by contrast, uses dedicated external feedforward and internal feedback microphones to listen to incoming ambient sounds. An onboard DSP (Digital Signal Processor) inverts the sound wave 180 degrees out of phase, canceling it out before it reaches your eardrum.',
        'At BlueGate Trading, our AcousticPro headphones combine both: an airtight acoustic seal plus hybrid 38dB ANC depth, making them optimal for both the London Underground and quiet focus work in open-plan offices.'
      ]
    },
    {
      id: 'hall-effect-guide',
      category: 'Gaming Hardware',
      title: 'Why Hall Effect Triggers & Joysticks Never Develop Stick Drift',
      readTime: '3 min read',
      date: 'October 2026',
      summary: 'The physics behind electromagnetic contactless potentiometers and why they outperform standard carbon film components.',
      fullContent: [
        'Traditional game controllers use carbon-film resistive potentiometers where physical wiper contacts rub continuously against electrical tracks. Over months of gameplay, friction wears the carbon away, generating microscopic debris and causing the dreaded "stick drift".',
        'Hall Effect technology completely removes physical friction contacts. It uses permanent neodymium magnets and micro-sensors that measure changes in magnetic field voltage as the stick moves.',
        'Because no physical surfaces touch, Hall Effect sensors experience zero mechanical wear, retaining sub-millimeter precision and perfect centering across millions of actuation cycles.'
      ]
    },
    {
      id: 'stem-robotics-guide',
      category: 'Educational STEM',
      title: 'How Programmable Robotics Kits Prepare Children for Modern Engineering',
      readTime: '5 min read',
      date: 'October 2026',
      summary: 'Bridging the gap between screen time and physical computing using Scratch 3.0 and Python robotics kits.',
      fullContent: [
        'Research across UK educational curricula shows that tactile computing—where written code produces immediate physical action, like a robot avoiding an obstacle or following a line—reinforces algorithmic logic far more effectively than purely abstract coding apps.',
        'Starting with visual Scratch blocks allows children as young as 8 to master loops, conditional if/then logic, and sensor calibration.',
        'As their confidence develops, kits like the RoboMaster allow one-click transition into Python syntax, equipping teenagers with industry-standard programming skills while building mechanical problem-solving resilience.'
      ]
    }
  ];

  return (
    <section aria-label="Shopping and buying guides" className="py-16 bg-white border-b border-[#E3E5E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FC] text-[#1769D2] text-xs font-bold mb-2">
              <BookOpen size={13} />
              <span>Consumer Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202329] tracking-tight">
              BlueGate Shopping &amp; Technical Guides
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#656A70] max-w-md">
            Unbiased technical breakdowns to help you select the exact gear for your daily requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map(guide => (
            <article
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="bg-[#F8F9FA] rounded-2xl p-6 border border-[#E3E5E7] hover:border-[#1769D2]/40 shadow-apple-sm hover:shadow-apple-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-bold text-[#1769D2]">{guide.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{guide.readTime}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#202329] group-hover:text-[#1769D2] transition-colors leading-snug mb-3">
                  {guide.title}
                </h3>
                <p className="text-xs text-[#656A70] leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 mt-4 flex items-center justify-between text-xs font-bold text-[#1769D2]">
                <span>Read Full Article</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedGuide(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedGuide.title}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[85vh] animate-slide-up space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-[#1769D2] bg-[#EBF3FC] px-2.5 py-1 rounded-full">
                {selectedGuide.category}
              </span>
              <button
                onClick={() => setSelectedGuide(null)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#202329] leading-tight">
              {selectedGuide.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-slate-400 pb-2 border-b border-slate-100">
              <span>{selectedGuide.readTime}</span>
              <span>•</span>
              <span>Published {selectedGuide.date}</span>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
              {selectedGuide.fullContent.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-5 py-2 bg-[#1769D2] text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
