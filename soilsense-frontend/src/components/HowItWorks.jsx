import React from 'react';
import '../styles/HowItWorks.css';

function HowItWorks() {
  const steps = [
    { 
      num: '01', 
      title: 'Deploy Hardware', 
      desc: 'Insert the ESP32 sensor node into the soil to begin actively reading Nitrogen (N), Phosphorus (P), Potassium (K), and moisture levels.' 
    },
    { 
      num: '02', 
      title: 'Live Telemetry', 
      desc: 'The microcontroller streams telemetry to the Flask backend, which monitors the live feed and prevents false logging during free-air exposure.' 
    },
    { 
      num: '03', 
      title: 'AI Crop Analysis', 
      desc: 'Our trained machine learning model processes the incoming NPK signatures to instantly calculate the Top 5 most suitable crops for that soil profile.' 
    },
    { 
      num: '04', 
      title: 'Cloud Dashboard', 
      desc: 'Telemetry and AI predictions are securely throttled and logged into a MongoDB Atlas database, allowing you to track historical trends on the dashboard.' 
    },
  ];

  return (
    <div className="how-section container">
      <h2 className="section-title">How It Works</h2>
      <p className="section-sub">Four automated steps from raw soil to intelligent crop predictions.</p>
      
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