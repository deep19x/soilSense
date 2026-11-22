import React from 'react';

export default function About() {
  const containerStyle = {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    minHeight: '60vh',
    lineHeight: '1.6',
    color: '#333'
  };

  const sectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #ddd'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#2c7a7b' }}>About SoilSense</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '40px' }}>
        An AI-powered agricultural IoT platform designed for real-time soil health monitoring and crop recommendation.
      </p>

      <div style={sectionStyle}>
        <h2>🔌 Hardware Setup</h2>
        <p>
          SoilSense utilizes an <strong>ESP32 microcontroller</strong> connected to NPK and moisture sensors. 
          The hardware node continuously reads soil nutrient data in the field and transmits it wirelessly to our backend system.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>🧠 AI & Software Architecture</h2>
        <ul>
          <li><strong>Backend:</strong> A Python Flask server processes incoming sensor data.</li>
          <li><strong>Machine Learning:</strong> A trained classification model analyzes the NPK and moisture levels to predict the top 5 most suitable crops.</li>
          <li><strong>Database:</strong> Data is throttled and safely logged to a MongoDB Atlas cluster for historical tracking and analysis.</li>
          <li><strong>Frontend:</strong> A responsive React application utilizing React Router for seamless navigation and real-time dashboard updates.</li>
        </ul>
      </div>
    </div>
  );
}