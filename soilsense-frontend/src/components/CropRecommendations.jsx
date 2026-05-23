import React from 'react';
import '../styles/CropRecommendations.css';

function CropRecommendations({ crops }) {
  return (
    <div className="crop-recommendations">
      <h3 className="crop-title">🌾 Recommended Crops for Your Soil</h3>
      <div className="crops-grid">
        {crops.map((crop, idx) => (
          <div key={idx} className="crop-card">
            <div className="crop-rank">#{idx + 1}</div>
            <div className="crop-name">{crop.crop}</div>
            <div className="crop-confidence">
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${crop.confidence}%` }}
                ></div>
              </div>
              <div className="confidence-text">{crop.confidence}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropRecommendations;