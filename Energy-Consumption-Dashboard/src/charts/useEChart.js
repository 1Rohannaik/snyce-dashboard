import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function useEChart(option, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chart = echarts.init(el, null, { renderer: 'canvas' });
    chart.setOption(option, true);

    let frame = 0;
    const safeResize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) chart.resize();
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        safeResize();
      });
    };

    const onWinResize = () => schedule();
    window.addEventListener('resize', onWinResize);
    window.addEventListener('orientationchange', onWinResize);
    const onVis = () => { if (document.visibilityState === 'visible') schedule(); };
    document.addEventListener('visibilitychange', onVis);

    // ResizeObserver with re-entrancy guard
    let observing = true;
    const ro = new ResizeObserver(() => {
      if (!observing) return;
      schedule();
    });
    ro.observe(el);

    return () => {
      observing = false;
      ro.disconnect();
      window.removeEventListener('resize', onWinResize);
      window.removeEventListener('orientationchange', onWinResize);
      document.removeEventListener('visibilitychange', onVis);
      if (frame) cancelAnimationFrame(frame);
      chart.dispose();
    };
  }, deps);

  return ref;
}
