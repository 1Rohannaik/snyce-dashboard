import React from 'react';
import './Header.css';

export default function Header({ period }) {
  return (
    <div className="header card">
      <div className="left">
        <h2 className="title">Consumption Summary</h2>
        <span className="period">{period}</span>
      </div>
      <div className="right">
        <div className="toolbar">
          <button className="btn ghost">Date Selection ▾</button>
          <input type="text" placeholder="--/--/----" className="date-input" />
          <button className="btn primary">Apply Filter</button>
        </div>
      </div>
    </div>
  );
}
