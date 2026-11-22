import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/Global.css';

// Import all your components
import Nav from './components/Nav';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import AnalysisTool from './components/AnalysisTool';
import LiveSensorDashboard from './components/LiveSensorDashboard';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import About from './components/About'; // <-- Import the new About component
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        
        <Routes>
          {/* Main Landing Page (Home) */}
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <StatsStrip />
                <AnalysisTool />
                <LiveSensorDashboard />
                <HowItWorks />
              </>
            } 
          />

          {/* Dashboard (History Database Page) */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* About Page */}
          <Route path="/about" element={<About />} /> {/* <-- Use the component here */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;