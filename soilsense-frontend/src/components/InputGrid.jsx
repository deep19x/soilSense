import React from 'react';
import '../styles/InputGrid.css';

function InputGrid({ formData, onInputChange }) {
  const inputs = [
    { name: 'n', label: 'Nitrogen (N)', placeholder: 'e.g. 140', type: 'number', min: '0', unit: 'mg/kg', dot: '#3B6D11' },
    { name: 'p', label: 'Phosphorus (P)', placeholder: 'e.g. 30', type: 'number', min: '0', unit: 'mg/kg', dot: '#BA7517' },
    { name: 'k', label: 'Potassium (K)', placeholder: 'e.g. 200', type: 'number', min: '0', unit: 'mg/kg', dot: '#185FA5' },
    { name: 'temp', label: 'Temperature', placeholder: 'e.g. 22', type: 'number', min: '0', max: '60', unit: '°C', dot: '#FF6B6B' },
    { name: 'humidity', label: 'Humidity', placeholder: 'e.g. 70', type: 'number', min: '0', max: '100', unit: '%', dot: '#5DCAA5' },
    { name: 'ph', label: 'pH Level', placeholder: 'e.g. 6.5', type: 'number', min: '0', max: '14', step: '0.1', unit: 'Scale 0–14', dot: '#E24B4A' },
  ];

  return (
    <div className="input-grid">
      {inputs.map(input => (
        <div key={input.name} className="input-card">
          <div className="input-label">
            <span className="dot" style={{ backgroundColor: input.dot }}></span>
            {input.label}
          </div>
          <input
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={formData[input.name]}
            onChange={onInputChange}
            min={input.min}
            max={input.max}
            step={input.step}
          />
          <div className="unit">{input.unit}</div>
        </div>
      ))}
    </div>
  );
}

export default InputGrid;