import React, { useState } from 'react';
import Background from '../../Components/Itinerary/background';
import CountdownClock from '../../Components/Itinerary/CountdownClock';
import EventTable from '../../Components/Itinerary/table';
import './Itinerary.css';
import Navbar from '../../Components/Navbar/Navbar';

// MUST use JavaScript import for Vite to bundle the asset correctly in production
import fallbackBgImage from '../../assets/velvet.webp'; 

export default function ItineraryPage() {
  const [currentView, setCurrentView] = useState('clock');

  return (
    <div className="itinerary-page-container">
      {/* Dark Veil props configured for a deep purple/magenta look. 
        Adjust hueShift (0-360) to change the primary color!
      */}
      <Background 
        hueShift={346} 
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.7}
        scanlineFrequency={1.4}
        warpAmount={0}
        fallbackImage={fallbackBgImage} 
      />

      <Navbar isVisible={true} />

      <div className={`view-wrapper ${currentView === 'clock' ? 'view-visible' : 'view-hidden'}`}>
        <CountdownClock />
      </div>

      <div className={`view-wrapper ${currentView === 'table' ? 'view-visible' : 'view-hidden'}`}>
        <EventTable onReturnToClock={() => setCurrentView('clock')} />
      </div>

      <button 
        className="itinerary-toggle-btn" 
        onClick={() => setCurrentView(prev => prev === 'clock' ? 'table' : 'clock')}
      >
        {currentView === 'clock' ? 'VIEW ITINERARY' : 'BACK TO CLOCK'}
      </button>
    </div>
  );
}