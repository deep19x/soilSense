import React from 'react';
import './styles/Global.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import AnalysisTool from './components/AnalysisTool';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <StatsStrip />
      <AnalysisTool />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;