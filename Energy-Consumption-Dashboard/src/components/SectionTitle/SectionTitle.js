// src/components/SectionTitle/SectionTitle.js
import React from 'react';
import './SectionTitle.css';

export default function SectionTitle({
  text,
  unit = 'MWh',
  units = ['MWh', 'MWh/SFT'],
  activeUnit,
  onUnitChange,
}) {
  const selected = activeUnit || unit;
  return (
    <div className="section-title">
      <div className="left">{text}</div>
      <div className="right">
        {units.map((u) => (
          <button
            key={u}
            className={`chip ${selected === u ? 'active' : ''}`}
            onClick={() => onUnitChange && onUnitChange(u)}
            aria-pressed={selected === u}
          >
            {u}
          </button>
        ))}
      </div>
    </div>
  );
}
