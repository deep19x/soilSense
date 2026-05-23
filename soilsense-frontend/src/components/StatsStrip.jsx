import React from 'react';
import '../styles/StatsStrip.css';

function StatsStrip() {
  const stats = [
    { num: '12K+', label: 'Tests Completed' },
    { num: '98%', label: 'Accuracy Rate' },
    { num: '4.2s', label: 'Avg. Analysis Time' },
    { num: '8', label: 'Nutrients Tracked' },
  ];

  return (
    <div className="stats-strip">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-item">
          <div className="stat-num">{stat.num}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsStrip;