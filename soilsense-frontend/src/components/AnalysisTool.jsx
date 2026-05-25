import React, { useState, useEffect } from 'react';
import InputGrid from './InputGrid.jsx';
import ResultsCard from './ResultsCard.jsx';
import '../styles/AnalysisTool.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AnalysisTool() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    moisture: '',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const handleLoadDemo = () => {
      setFormData({
        N: '90',
        P: '42',
        K: '43',
        moisture: '82',
      });
    };

    window.addEventListener('loadDemo', handleLoadDemo);
    return () => window.removeEventListener('loadDemo', handleLoadDemo);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const label = e.target.previousElementSibling;
      if (label) {
        label.textContent = `✓ ${uploadedFile.name} ready`;
      }
    }
  };

  const handlePredict = async () => {
    // Validate inputs
    if (!formData.N || !formData.P || !formData.K || !formData.moisture) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          N: parseFloat(formData.N),
          P: parseFloat(formData.P),
          K: parseFloat(formData.K),
          moisture: parseFloat(formData.moisture),
        }),
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      
      if (data.success) {
        setResults({
          crop: data.crop,
          confidence: data.confidence,
          top_5: data.top_5,
          input: formData,
        });
        setTimeout(() => {
          const resultsElement = document.getElementById('results-container');
          resultsElement?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to backend. Make sure server is running on http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-container" id="analysis-tool">
      <div className="container">
        <h2 className="section-title">Get Crop Recommendation</h2>
        <p className="section-sub">
          Enter soil sensor readings (N, P, K, Moisture) to get crop recommendations.
        </p>

        {/* UPLOAD SECTION */}
        <div className="upload-section" onClick={() => document.getElementById('fileInput')?.click()}>
          <div className="upload-icon">📁</div>
          <div className="upload-title">Drop sensor data file here</div>
          <div className="upload-sub">Supports CSV, JSON, or Excel from compatible soil sensor devices</div>
          <div className="upload-btn">Browse File</div>
          <input
            type="file"
            id="fileInput"
            accept=".csv,.json,.xlsx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <p className="divider-text">— or enter values manually below —</p>

        {/* INPUT GRID */}
        <InputGrid formData={formData} onInputChange={handleInputChange} />

        {/* ERROR MESSAGE */}
        {error && (
          <div className="error-message" style={{
            padding: '12px 16px',
            backgroundColor: '#ffe0e0',
            color: '#d32f2f',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* PREDICT BUTTON */}
        <div className="analyze-row">
          <button 
            className="btn-analyze" 
            onClick={handlePredict}
            disabled={loading}
          >
            <span>🌾</span> {loading ? 'Predicting…' : 'Get Crop Recommendation'}
          </button>
        </div>

        {/* LOADER */}
        {loading && (
          <div className="loader">
            <div className="loader-spinner"></div>
            <p>Analyzing soil conditions…</p>
          </div>
        )}

        {/* RESULTS */}
        {results && !loading && (
          <div id="results-container" className="fadeUp">
            <div className="results-wrapper">
              <h3>✅ Recommended Crop</h3>
              <div className="crop-card" style={{
                padding: '20px',
                backgroundColor: '#f0f9ff',
                border: '2px solid #3B6D11',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                <h2 style={{ color: '#3B6D11', fontSize: '32px', margin: '0 0 10px 0' }}>
                  {results.crop.toUpperCase()}
                </h2>
                <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                  Confidence: <strong>{results.confidence}%</strong>
                </p>
              </div>

              <h3>Top 5 Recommendations</h3>
              <div className="top-5-list">
                {results.top_5.map((rec) => (
                  <div key={rec.rank} className="top-5-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    gap: '12px',
                  }}>
                    <span style={{
                      backgroundColor: '#3B6D11',
                      color: 'white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}>
                      {rec.rank}
                    </span>
                    <span style={{ flex: 1, fontWeight: '500' }}>{rec.crop}</span>
                    <div style={{
                      width: '120px',
                      height: '6px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${rec.confidence}%`,
                        backgroundColor: '#3B6D11',
                      }}></div>
                    </div>
                    <span style={{ width: '50px', textAlign: 'right', color: '#666' }}>
                      {rec.confidence.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '20px',
                padding: '12px 16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#666',
              }}>
                <strong>Input Values:</strong> N: {results.input.N} | P: {results.input.P} | K: {results.input.K} | Moisture: {results.input.moisture}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalysisTool;