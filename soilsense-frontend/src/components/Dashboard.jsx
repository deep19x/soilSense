import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/history')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch history:", err);
        setError("Could not connect to the backend server.");
        setLoading(false);
      });
  }, []);

  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '60vh',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const tableContainer = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    marginTop: '30px'
  };

  const thStyle = {
    backgroundColor: '#f3f4f6',
    padding: '16px 24px',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e5e7eb'
  };

  const tdStyle = {
    padding: '16px 24px',
    fontSize: '0.95rem',
    color: '#1f2937',
    borderBottom: '1px solid #e5e7eb',
    verticalAlign: 'middle'
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', color: '#111827', margin: '0 0 10px 0' }}>📊 Historical Soil Readings</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Review past telemetry and AI crop recommendations securely stored in MongoDB.</p>
      </div>
      
      <div style={tableContainer}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading database records...</div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>{error}</div>
        ) : history.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            No historical data found. Ensure your ESP32 is transmitting and MongoDB is connected.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Timestamp</th>
                <th style={thStyle}>N</th>
                <th style={thStyle}>P</th>
                <th style={thStyle}>K</th>
                <th style={thStyle}>Moisture</th>
                <th style={thStyle}>Top 5 AI Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                  <td style={{...tdStyle, whiteSpace: 'nowrap'}}>{new Date(record.timestamp * 1000).toLocaleString()}</td>
                  <td style={{...tdStyle, fontWeight: '500', color: '#047857'}}>{record.N}</td>
                  <td style={{...tdStyle, fontWeight: '500', color: '#4338ca'}}>{record.P}</td>
                  <td style={{...tdStyle, fontWeight: '500', color: '#b91c1c'}}>{record.K}</td>
                  <td style={{...tdStyle, color: '#0284c7'}}>{record.moisture}%</td>
                  <td style={tdStyle}>
                    {record.top_5 && record.top_5.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {record.top_5.map((pred, i) => (
                          <span key={i} style={{
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            backgroundColor: i === 0 ? '#def7ec' : '#f3f4f6',
                            color: i === 0 ? '#03543f' : '#4b5563',
                            border: '1px solid',
                            borderColor: i === 0 ? '#84e1bc' : '#e5e7eb',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}>
                            {i === 0 && <span style={{marginRight: '4px'}}>🌱</span>}
                            <span style={{ textTransform: 'capitalize' }}>{pred.crop || pred.name}</span> 
                            <span style={{ marginLeft: '4px', opacity: 0.8 }}>({Math.round(pred.confidence * 100)}%)</span>
                          </span>
                        ))}
                      </div>
                    ) : record.predicted_crop ? (
                      <span style={{ padding: '6px 12px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '500', backgroundColor: '#def7ec', color: '#03543f' }}>
                        🌱 <span style={{ textTransform: 'capitalize' }}>{record.predicted_crop}</span> ({Math.round(record.confidence * 100)}%)
                      </span>
                    ) : (
                      <span style={{ padding: '6px 12px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '500', backgroundColor: '#fef3c7', color: '#92400e' }}>
                        ⚠️ Free Air
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}