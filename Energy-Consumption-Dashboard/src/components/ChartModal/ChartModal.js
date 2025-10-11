import React, { useEffect, useRef } from 'react';
import useEChart from '../../charts/useEChart';
import './ChartModal.css';

export default function ChartModal({ isOpen, onClose, chartConfig, title, subtitle }) {
  if (!isOpen || !chartConfig) return null;
  return <ChartModalContent onClose={onClose} chartConfig={chartConfig} title={title} subtitle={subtitle} />;
}

function ChartModalContent({ onClose, chartConfig, title, subtitle }) {
  const ref = useEChart(chartConfig.options, chartConfig.deps);

  // Refs for focus and size observation
  const containerRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Ensure ECharts measures correct size after mount and transitions
  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event('resize'));
    const id1 = requestAnimationFrame(() => {
      fire();
      const id2 = requestAnimationFrame(fire); // second pass after layout settles
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
  }, []);

  // Watch the modal/content size and reflow chart whenever it changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Orientation + visibility fixes (common on mobile)
  useEffect(() => {
    const onOrient = () => window.dispatchEvent(new Event('resize'));
    const onVis = () => { if (document.visibilityState === 'visible') window.dispatchEvent(new Event('resize')); };
    window.addEventListener('orientationchange', onOrient);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('orientationchange', onOrient);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') window.dispatchEvent(new Event('resize'));
      if (e.key === 'Tab') {
        const focusable = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [onClose]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="chart-modal-overlay" onClick={onBackdropClick} role="dialog" aria-modal="true" aria-labelledby="chart-modal-title">
      <div className="chart-modal-content" ref={containerRef} onClick={(e) => e.stopPropagation()}>
        <div className="chart-modal-header">
          <div>
            <h2 id="chart-modal-title" className="chart-modal-title">{title}</h2>
            {subtitle && <p className="chart-modal-subtitle">{subtitle}</p>}
          </div>
          <button
            className="chart-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
            ref={closeBtnRef}
          >
            ✕
          </button>
        </div>
        <div className="chart-modal-body" style={{ minHeight: '50vh' /* guarantees height on mobile */ }}>
          <div ref={ref} className="chart-modal-chart" />
        </div>
      </div>
    </div>
  );
}
