import React from 'react';
import useEChart from '../../charts/useEChart';
import lineOptions from '../../charts/lineOptions';
import { useChartModal } from '../../context/ChartModalContext';
import './LineCard.css';

export default function LineCard({ data, color, soft, title, unit = 'MWh' }) {
  const { openModal } = useChartModal();
  const chartConfig = {
    options: lineOptions({
      x: data.x,
      y: data.y,
      color,
      soft,
      unit
    }),
    deps: [data, color, soft, unit]
  };
  const ref = useEChart(chartConfig.options, chartConfig.deps);

  const handleChartClick = () => {
    openModal({
      chartConfig,
      title: title || 'Line Chart'
    });
  };

  return (
    <div className="card">
      <div ref={ref} className="chart chart--line" onClick={handleChartClick} />
    </div>
  );
}
