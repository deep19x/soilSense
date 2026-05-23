import React, { useEffect, useState } from 'react';
import '../styles/NutrientBars.css';

function NutrientBars({ nutrients }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  const getBarClass = (val) => {
    if (val >= 70) return 'good';
    if (val >= 40) return 'warn';
    return 'bad';
  };

  return (
    <div className="nutrient-grid">
      {nutrients.map((nutrient, idx) => (
        <div key={idx} className="nutrient-bar-card">
          <div className="nutrient-top">
            <span className="nutrient-name">{nutrient.name}</span>
            <span className="nutrient-val">{nutrient.display}</span>
          </div>
          <div className="bar-track">
            <div
              className={`bar-fill ${getBarClass(nutrient.val)} ${animated ? 'animate' : ''}`}
              style={{
                width: animated ? `${nutrient.val}%` : '0%',
              }}
            ></div>
          </div>
          <div className="nutrient-status">{nutrient.status}</div>
        </div>
      ))}
    </div>
  );
}

export default NutrientBars;