// components/ads/AdSlot.jsx
import { useEffect, useRef, useState } from 'react';

/**
 * AdSlot — wraps Google AdSense units with lazy loading.
 * Replace data-ad-client and data-ad-slot with your real values.
 * 
 * HOW TO ACTIVATE:
 * 1. Add your AdSense script to pages/_document.jsx (see instructions)
 * 2. Replace 'ca-pub-XXXXXXXXXXXXXXXXX' with your publisher ID
 * 3. Replace the slot numbers with your actual ad unit IDs
 */

const AD_CONFIGS = {
  leaderboard: { width: '100%', height: '90px', slot: '1234567890', format: 'auto' },
  rectangle: { width: '300px', height: '250px', slot: '0987654321', format: 'rectangle' },
  sidebar: { width: '160px', height: '600px', slot: '1122334455', format: 'vertical' },
  inline: { width: '100%', height: '90px', slot: '5544332211', format: 'auto' },
  footer: { width: '100%', height: '90px', slot: '9988776655', format: 'auto' },
};

export default function AdSlot({ type = 'rectangle', className = '', label = true }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const config = AD_CONFIGS[type] || AD_CONFIGS.rectangle;

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      // Push ad after lazy load
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense not loaded yet
    }
  }, [loaded]);

  return (
    <div ref={ref} className={`ad-container ${className}`} style={{ minWidth: config.width, minHeight: config.height }}>
      {label && (
        <p className="text-center text-xs text-slate-400 mb-1 no-print">Advertisement</p>
      )}
      <div
        className="ad-slot flex items-center justify-center"
        style={{ width: config.width, minHeight: config.height }}
        aria-label="Advertisement"
      >
        {loaded ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: config.width, height: config.height }}
            data-ad-client="ca-pub-3628048404116197"  // ← Replace with your Publisher ID
            data-ad-slot={config.slot}                   // ← Replace with your Ad Slot ID
            data-ad-format={config.format}
            data-full-width-responsive="true"
          />
        ) : (
          <div
            className="w-full h-full bg-slate-100 border border-dashed border-slate-300 
                       rounded-lg flex flex-col items-center justify-center gap-1"
            style={{ minHeight: config.height }}
          >
            <span className="text-slate-300 text-xs">Ad</span>
          </div>
        )}
      </div>
    </div>
  );
}
