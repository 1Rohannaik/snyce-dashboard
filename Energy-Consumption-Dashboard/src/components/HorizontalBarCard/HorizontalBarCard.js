import React from 'react';
import useEChart from '../../charts/useEChart';
import horizontalBarOptions from '../../charts/horizontalBarOptions';
import { useChartModal } from '../../context/ChartModalContext';
import './HorizontalBarCard.css';

export default function HorizontalBarCard({ title, subtitle, loss, data }) {
  const { openModal } = useChartModal();
  const chartConfig = {
    options: horizontalBarOptions({
      categories: data.categories,
      values: data.values,
      colors: ['#4c83ff'],
      loss
    }),
    deps: [data, loss]
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
        {loss && <span className="chip">▼ Loss: {loss}</span>}
      </div>
      <div ref={ref} className="chart" onClick={handleChartClick} />
    </div>
  );
}
