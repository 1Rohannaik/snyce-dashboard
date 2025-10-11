import React from 'react';
import './SummaryCards.css';
import { Zap, TrendingUp, BatteryCharging, Plug, Sun, ArrowUp, ArrowDown, LineChart, BarChart } from "lucide-react";

export default function SummaryCards({ data }) {
const getMainIcon = (type, size = 40) => {
  switch (type) {
    case 'Total Consumption':
      return <Zap size={size} color="#6366f1" />;
    case 'Peak Demand':
      return <TrendingUp size={size} color="#f59e0b" />;
    case 'Energy Efficiency':
      return <BatteryCharging size={size} color="#10b981" />;
    case 'Grid Import':
      return <Plug size={size} color="#ef4444" />;
    case 'Solar Generation':
      return <Sun size={size} color="#fbbf24" />;
    default:
      return <LineChart size={size} color="#9ca3af" />; 
  }
};


  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUp size={20} color="#22c55e" />; 
      case 'down':
        return <ArrowDown size={20} color="#ef4444" />; 
      case 'trending-up':
        return <LineChart size={20} color="#facc15" />;
      case 'trending-down':
        return <BarChart size={20} color="#f97316" />; 
      default:
        return null;
    }
  };

  return (
    <div className="summary">
      {data.map((card, idx) => (
        <div className={`item trend-${card.trend}-card`} key={idx}>
          <div className="card-header">
            <div className="caption">{card.caption}</div>
            <div className="trend-icon">{getTrendIcon(card.trend)}</div>
          </div>

          <div className="value-with-icon-right">
            <div className="value">{card.value}</div>
            <div className="main-icon">{getMainIcon(card.caption, 50)}</div>
          </div>

          <div className={`note trend-${card.trend}`}>{card.note}</div>
        </div>
      ))}
    </div>
  );
}
