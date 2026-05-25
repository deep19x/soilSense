import React from 'react';
import '../styles/InputGrid.css';

function InputGrid({ formData, onInputChange }) {
  const inputs = [
    { name: 'N', label: 'Nitrogen (N)', placeholder: 'e.g. 90', type: 'number', min: '0', max: '140', unit: 'mg/kg', dot: '#3B6D11' },
    { name: 'P', label: 'Phosphorus (P)', placeholder: 'e.g. 42', type: 'number', min: '0', max: '145', unit: 'mg/kg', dot: '#BA7517' },
    { name: 'K', label: 'Potassium (K)', placeholder: 'e.g. 43', type: 'number', min: '0', max: '205', unit: 'mg/kg', dot: '#185FA5' },
    { name: 'moisture', label: 'Soil Moisture', placeholder: 'e.g. 82', type: 'number', min: '0', max: '100', unit: '%', dot: '#5DCAA5' },
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
            value={formData[input.name] || ''}
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