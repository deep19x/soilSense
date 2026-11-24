
import React from 'react';

const features = [
  {
    icon: '🌱',
    title: 'Soil Health Monitoring',
    description:
      'Monitor essential soil parameters, including Nitrogen (N), Phosphorus (P), Potassium (K), and moisture levels.'
  },
  {
    icon: '🧠',
    title: 'AI Crop Recommendation',
    description:
      'A machine learning model analyzes soil conditions and recommends the five most suitable crops.'
  },
  {
    icon: '📡',
    title: 'IoT Integration',
    description:
      'ESP32 connects with soil sensors to collect field data and transmit readings wirelessly.'
  },
  {
    icon: '📊',
    title: 'Data Tracking',
    description:
      'MongoDB stores sensor readings and prediction history for monitoring and future analysis.'
  }
];

const technologies = [
  'React.js',
  'Python',
  'Flask',
  'Machine Learning',
  'ESP32',
  'MongoDB',
  'NPK Sensors',
  'Moisture Sensor'
];

export default function About() {
  return (
    <div className="about-page">
      <style>{`
        .about-page {
          min-height: 100vh;
          padding: 60px 24px;
          background: #f7faf7;
          color: #24352b;
        }

        .about-container {
          max-width: 1050px;
          margin: auto;
        }

        .about-hero {
          text-align: center;
          padding: 55px 25px;
          margin-bottom: 45px;
          border-radius: 22px;
          background: linear-gradient(135deg, #e1f5e8, #f3f9ed);
        }

        .about-tag {
          display: inline-block;
          padding: 7px 16px;
          border-radius: 30px;
          background: #d1ead7;
          color: #267447;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 18px;
        }

        .about-hero h1 {
          font-size: clamp(32px, 5vw, 48px);
          margin: 0 0 18px;
          color: #205c38;
        }

        .about-hero p {
          max-width: 700px;
          margin: auto;
          color: #587061;
          font-size: 17px;
          line-height: 1.8;
        }

        .about-section {
          margin-bottom: 48px;
        }

        .about-section h2 {
          font-size: 27px;
          color: #245b3a;
          margin-bottom: 12px;
        }

        .section-description {
          color: #68796e;
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          border: 1px solid #e1eae3;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(32, 92, 56, 0.09);
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 15px;
        }

        .feature-card h3 {
          color: #285b3b;
          font-size: 18px;
          margin: 0 0 10px;
        }

        .feature-card p {
          color: #718077;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }

        .architecture-card {
          background: white;
          border: 1px solid #e1eae3;
          border-radius: 16px;
          padding: 28px;
        }

        .architecture-list {
          padding-left: 22px;
          margin: 0;
        }

        .architecture-list li {
          padding: 9px 0;
          color: #637269;
          line-height: 1.7;
        }

        .architecture-list strong {
          color: #285b3b;
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }

        .tech-item {
          background: #e5f3e9;
          color: #28623e;
          border: 1px solid #d1e8d8;
          border-radius: 30px;
          padding: 9px 16px;
          font-size: 14px;
          font-weight: 600;
        }

        .about-footer {
          text-align: center;
          padding: 30px 20px;
          border-radius: 16px;
          background: #245b3a;
          color: white;
        }

        .about-footer h2 {
          color: white;
          margin: 0 0 10px;
        }

        .about-footer p {
          color: #d9eadf;
          margin: 0;
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .about-page {
            padding: 30px 15px;
          }

          .about-hero {
            padding: 40px 18px;
          }

          .about-section h2 {
            font-size: 23px;
          }

          .architecture-card {
            padding: 20px;
          }
        }
      `}</style>

      <div className="about-container">

        {/* Hero Section */}
        <section className="about-hero">
          <span className="about-tag">SMART AGRICULTURE</span>
          <h1>About SoilSync 🌿</h1>
          <p>
            Making agriculture smarter through IoT and machine learning.
            SoilSync monitors important soil parameters and provides
            data-driven crop recommendations to support better farming
            decisions.
          </p>
        </section>

        {/* Introduction */}
        <section className="about-section">
          <h2>What is SoilSync?</h2>
          <p className="section-description">
            SoilSync is an AI-powered agricultural monitoring and crop
            recommendation platform. It combines IoT hardware, sensor
            technology, and machine learning to analyze soil conditions
            and help identify suitable crops based on available soil data.
          </p>
        </section>

        {/* Features */}
        <section className="about-section">
          <h2>What We Offer</h2>
          <p className="section-description">
            Our platform brings soil monitoring and intelligent
            recommendations together in one place.
          </p>

          <div className="feature-grid">
            {features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="about-section">
          <h2>How SoilSync Works</h2>

          <div className="architecture-card">
            <ol className="architecture-list">
              <li>
                <strong>Data Collection:</strong> NPK and moisture sensors
                collect soil readings through an ESP32 microcontroller.
              </li>
              <li>
                <strong>Data Transmission:</strong> ESP32 sends the collected
                readings wirelessly to the backend.
              </li>
              <li>
                <strong>Data Processing:</strong> A Python Flask backend
                processes the incoming sensor values.
              </li>
              <li>
                <strong>Crop Prediction:</strong> The trained machine learning
                model analyzes the readings and generates crop recommendations.
              </li>
              <li>
                <strong>Storage:</strong> MongoDB stores sensor readings and
                prediction history.
              </li>
              <li>
                <strong>Visualization:</strong> The React frontend displays
                soil information and crop recommendations through a dashboard.
              </li>
            </ol>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="about-section">
          <h2>Technology Stack</h2>
          <p className="section-description">
            SoilSync combines modern web technologies, IoT hardware,
            and machine learning.
          </p>

          <div className="tech-list">
            {technologies.map((tech) => (
              <span className="tech-item" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="about-footer">
          <h2>Building a Smarter Agricultural Future 🌱</h2>
          <p>
            Our goal is to make soil information more useful and accessible,
            helping farmers make informed decisions through technology.
          </p>
        </section>

      </div>
    </div>
  );
}
