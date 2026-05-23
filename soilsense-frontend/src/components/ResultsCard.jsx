import React from 'react';
import NutrientBars from './NutrientBars';
import CropRecommendations from './CropRecommendations';
import '../styles/ResultsCard.css';

function ResultsCard({ results }) {
  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'HIGH':
        return 'badge-high';
      case 'MODERATE':
        return 'badge-med';
      case 'LOW':
        return 'badge-low';
      default:
        return 'badge-high';
    }
  };

  const getScoreCircleColor = (badge) => {
    switch (badge) {
      case 'HIGH':
        return { border: '#3B6D11', bg: '#EAF3DE', text: '#3B6D11' };
      case 'MODERATE':
        return { border: '#BA7517', bg: '#FAEEDA', text: '#BA7517' };
      case 'LOW':
        return { border: '#A32D2D', bg: '#FCEBEB', text: '#A32D2D' };
      default:
        return { border: '#3B6D11', bg: '#EAF3DE', text: '#3B6D11' };
    }
  };

  const colors = getScoreCircleColor(results.badge);

  return (
    <div className="results-section">
      <div className="result-header">
        <h2>Analysis Results</h2>
        <span className={`fertility-badge ${getBadgeClass(results.badge)}`}>
          {results.badge} FERTILITY
        </span>
      </div>

      <div className="results-body">
        {/* SCORE SECTION */}
        <div className="score-row">
          <div 
            className="score-circle" 
            style={{ 
              borderColor: colors.border, 
              backgroundColor: colors.bg 
            }}
          >
            <div className="score-number" style={{ color: colors.text }}>
              {results.score}
            </div>
            <div className="score-label" style={{ color: colors.text }}>
              Score
            </div>
          </div>

          <div className="score-desc">
            <h3>{results.title}</h3>
            <p>{results.description}</p>
          </div>
        </div>

        {/* NUTRIENT BARS */}
        <NutrientBars nutrients={results.nutrients} />

        {/* RECOMMENDATIONS */}
        <div className="reco-section">
          <div className="reco-title">Recommendations</div>
          <ul className="reco-list">
            {results.recommendations.map((reco, idx) => (
              <li key={idx} className="reco-item">
                <div className="reco-dot">{idx + 1}</div>
                <span>{reco}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CROP RECOMMENDATIONS */}
        {results.crops && results.crops.length > 0 && (
          <CropRecommendations crops={results.crops} />
        )}
      </div>
    </div>
  );
}

export default ResultsCard;