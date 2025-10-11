import React from 'react';
import useEChart from '../../charts/useEChart';
import stackedColumnOptions from '../../charts/stackedColumnOptions';
import { useChartModal } from '../../context/ChartModalContext';
import './StackedColumnCard.css';

export default function StackedColumnCard({ title, page, data }) {
  const { openModal } = useChartModal();
  const chartConfig = {
    options: stackedColumnOptions({
      categories: data.categories,
      stacks: data.stacks
    }),
    deps: [data]
  };
  const ref = useEChart(chartConfig.options, chartConfig.deps);

  const handleChartClick = () => {
    openModal({
      chartConfig,
      title,
      subtitle: page
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{title}</div>
        <div className="small">{page}</div>
      </div>
      <div ref={ref} className="chart" onClick={handleChartClick} />
    </div>
  );
}
