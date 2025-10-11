import React from 'react';
import useEChart from '../../charts/useEChart';
import donutOptions from '../../charts/donutOptions';
import { useChartModal } from '../../context/ChartModalContext';
import './DonutCard.css';

export default function DonutCard({ title, subtitle, data }) {
  const { openModal } = useChartModal();
  const chartConfig = {
    options: donutOptions({
      series: data.series,
      colors: ['#64748b','#22c55e','#f2cf5b','#4c83ff']
    }),
    deps: [data]
  };
  const ref = useEChart(chartConfig.options, chartConfig.deps);

  const handleChartClick = () => {
    openModal({
      chartConfig,
      title,
      subtitle
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">{title}</div>
          <div className="card-subtitle">{subtitle}</div>
        </div>
      </div>
      <div ref={ref} className="chart" onClick={handleChartClick} />
    </div>
  );
}
