import { useEffect, useRef } from 'react';
import './CurrentNews.css';

export default function CurrentNews() {
  const bodyRef = useRef(null);
  const trackRef = useRef(null);

  // Auto duration based on content width for consistent speed
  useEffect(() => {
    const body = bodyRef.current;
    const track = trackRef.current;
    if (!body || !track) return;

    // distance is half of scrollWidth because content is duplicated
    const distance = track.scrollWidth / 2;
    const pxPerSecond = 80; // tune globally
    const duration = Math.max(12, distance / pxPerSecond);
    track.style.animationDuration = `${duration}s`;

    // Resize observer to retune when font/width changes
    const ro = new ResizeObserver(() => {
      const d = track.scrollWidth / 2;
      track.style.animationDuration = `${Math.max(12, d / pxPerSecond)}s`;
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const text = 'Total Consumption: 6,407 MWh (+2.5%) | Energy Efficiency: 87.3% (+1.2%) | Peak Demand: 83.3% (+1.2%)';

  return (
    <div className="currentnews-body" ref={bodyRef} aria-live="polite" role="region" aria-label="Current energy news">
      <div className="currentnews-track" ref={trackRef}>
        <span className="currentnews-text">{text}</span>
        <span className="currentnews-text" aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}
