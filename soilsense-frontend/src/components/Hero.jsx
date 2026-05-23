import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&fit=crop';
    img.onload = () => setImageLoaded(true);
  }, []);

  const scrollToAnalysis = () => {
    const element = document.getElementById('analysis-tool');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadDemo = () => {
    const event = new CustomEvent('loadDemo');
    window.dispatchEvent(event);
    scrollToAnalysis();
  };

  return (
    <section className="hero">
      <div className={`hero-bg ${imageLoaded ? 'loaded' : ''}`}></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-tag">🛰 AI-Powered Soil Analysis</div>
        <h1>
          Know your soil,<br />
          <span>grow better crops</span>
        </h1>
        <p>
          Upload sensor data or enter readings manually. Our AI analyzes nutrient levels, pH, and moisture 
          to give you precise fertility scores and actionable crop recommendations.
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToAnalysis}>
            Start Analysis
          </button>
          <button className="btn-outline" onClick={loadDemo}>
            View Demo ↗
          </button>
        </div>
      </div>

      <div className="hero-badge">
        <div className="hero-badge-label">Avg. Fertility Score</div>
        <div className="hero-badge-val">74 / 100</div>
        <div className="hero-badge-sub">Across 12,400+ tests</div>
      </div>
    </section>
  );
}

export default Hero;