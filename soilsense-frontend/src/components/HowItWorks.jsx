import React from 'react';
import '../styles/HowItWorks.css';

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Input Data', desc: 'Enter readings manually from any sensor or upload a CSV/JSON file directly from your device.' },
    { num: '02', title: 'AI Analysis', desc: 'Our model evaluates nutrient ratios, pH balance, moisture, and electrical conductivity together.' },
    { num: '03', title: 'Get Insights', desc: 'Receive a fertility score, nutrient breakdown, crop recommendations, and specific soil amendments.' },
    { num: '04', title: 'Track Over Time', desc: 'Save results to your history and monitor soil health trends across seasons and fields.' },
  ];

  return (
    <div className="how-section container">
      <h2 className="section-title">How It Works</h2>
      <p className="section-sub">Three simple steps to understand your soil's health.</p>
      
      <div className="how-grid">
        {steps.map((step, idx) => (
          <div key={idx} className="how-card">
            <div className="how-num">{step.num}</div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;