
import React from 'react';
import '../styles/StatsStrip.css';

function StatsStrip() {
  const stats = [
    { num: '4', label: 'Soil Parameters' },
    { num: '5', label: 'Crop Recommendations' },
    { num: '97%', label: 'Model Test Accuracy' },
    { num: 'IoT', label: 'Live Soil Monitoring' },
  ];

  return (
    <div className="stats-strip">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item">
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsStrip;
