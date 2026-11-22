import React, { useState, useEffect } from 'react';
import '../styles/LiveSensorDashboard.css';

export default function LiveSensorDashboard() {
  const [liveData, setLiveData] = useState({
    N: 0, P: 0, K: 0, moisture: 0, prediction: null, confidence: 0, top_5: [], last_updated: 0
  });
  const [status, setStatus] = useState("Waiting for hardware connection...");

  useEffect(() => {
    // Poll the Python backend every 3 seconds
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:5000/latest')
        .then(res => res.json())
        .then(data => {
          // Check for data.N instead of prediction, since prediction can be null in free air
          if (data && data.N !== undefined) {
             setLiveData(data);
             
             // --- HEARTBEAT LOGIC ---
             const currentUnixTime = Date.now() / 1000;
             
             // If hardware hasn't sent data in the last 15 seconds, mark as offline
             if (data.last_updated > 0 && (currentUnixTime - data.last_updated < 15)) {
               setStatus("🟢 Connected: Receiving Live Data");
             } else {
               setStatus("🔴 Hardware Offline: Waiting for ESP32...");
             }
          }
        })
        .catch(err => {
          setStatus("🔴 Disconnected: Python Server Offline");
        });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sensor-dashboard" aria-labelledby="sensor-dashboard-title">
      <div className="sensor-dashboard__header">
        <div>
          <span className="sensor-dashboard__eyebrow">Agricultural IoT</span>
          <h2 id="sensor-dashboard-title">📡 Field Node Monitor</h2>
          <p className="sensor-dashboard__subtitle">Live soil intelligence from your connected sensor.</p>
        </div>
        <div className={`sensor-status ${status.includes('🔴') ? 'sensor-status--offline' : 'sensor-status--active'}`}>
          <span className="sensor-status__dot" aria-hidden="true" />
          <span>{status.replace('🟢 ', '').replace('🔴 ', '')}</span>
        </div>
      </div>

      <div className="sensor-metrics" aria-label="Live sensor readings">
        <div className="sensor-metric sensor-metric--nitrogen">
          <span className="sensor-metric__icon">🌱</span>
          <span className="sensor-metric__label">Nitrogen (N)</span>
          <strong>{liveData.N}<small> mg/kg</small></strong>
        </div>
        <div className="sensor-metric sensor-metric--phosphorus">
          <span className="sensor-metric__icon">🌱</span>
          <span className="sensor-metric__label">Phosphorus (P)</span>
          <strong>{liveData.P}<small> mg/kg</small></strong>
        </div>
        <div className="sensor-metric sensor-metric--potassium">
          <span className="sensor-metric__icon">🌱</span>
          <span className="sensor-metric__label">Potassium (K)</span>
          <strong>{liveData.K}<small> mg/kg</small></strong>
        </div>
        <div className="sensor-metric sensor-metric--moisture">
          <span className="sensor-metric__icon">💧</span>
          <span className="sensor-metric__label">Soil Moisture</span>
          <strong>{liveData.moisture}<small>%</small></strong>
        </div>
      </div>

      <div className="sensor-recommendations">
        <div className="sensor-recommendations__heading">
          <div>
            <span className="sensor-dashboard__eyebrow">Decision support</span>
            <h3>🤖 AI Crop Recommendations</h3>
          </div>
          <span className="sensor-recommendations__badge">Top 5</span>
        </div>

      {liveData.N === 0 && liveData.P === 0 && liveData.K === 0 ? (
        <p className="sensor-warning">
          ⚠️ Sensor in free air. Please insert into soil for AI analysis.
        </p>
      ) : liveData.top_5 && liveData.top_5.length > 0 ? (
        <ol className="crop-list">
          {liveData.top_5.map((item, index) => (
            <li key={index} className={`crop-list__item ${index === 0 ? 'crop-list__item--top' : ''}`}>
              <span className="crop-list__rank">{index + 1}</span>
              <span className="crop-list__name">{item.crop}</span>
              <span className="crop-list__confidence">
                ({(item.confidence * 100).toFixed(1)}% match)
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="sensor-empty">Waiting for initial sensor reading...</p>
      )}
      </div>
  </section>
  );
}