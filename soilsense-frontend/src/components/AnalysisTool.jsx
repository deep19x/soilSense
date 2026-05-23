import React, { useState, useEffect } from 'react';
import InputGrid from './InputGrid.jsx';
import ResultsCard from './ResultsCard.jsx';
import '../styles/AnalysisTool.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AnalysisTool() {
  const [formData, setFormData] = useState({
  n: '',
  p: '',
  k: '',
  temp: '',
  humidity: '',
  ph: '',
});

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const handleLoadDemo = () => {
  setFormData({
    n: '148',
    p: '22',
    k: '210',
    temp: '22',
    humidity: '70',
    ph: '6.5',
  });
};

    window.addEventListener('loadDemo', handleLoadDemo);
    return () => window.removeEventListener('loadDemo', handleLoadDemo);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleAnalyze = async () => {
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      if (data.success) {
        setResults(data);
        setTimeout(() => {
          const resultsElement = document.getElementById('results-container');
          resultsElement?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze soil. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-container" id="analysis-tool">
      <div className="container">
        <h2 className="section-title">Analyze Your Soil</h2>
        <p className="section-sub">
          Enter sensor readings or upload a CSV data file from your field sensor device.
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

        {/* ANALYZE BUTTON */}
        <div className="analyze-row">
          <button 
            className="btn-analyze" 
            onClick={handleAnalyze}
            disabled={loading}
          >
            <span>🔬</span> {loading ? 'Analyzing…' : 'Analyze Soil Fertility'}
          </button>
        </div>

        {/* LOADER */}
        {loading && (
          <div className="loader">
            <div className="loader-spinner"></div>
            <p>Running fertility analysis…</p>
          </div>
        )}

        {/* RESULTS */}
        {results && !loading && (
          <div id="results-container" className="fadeUp">
            <ResultsCard results={results} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalysisTool;