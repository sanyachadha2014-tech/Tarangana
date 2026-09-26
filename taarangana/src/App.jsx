import React from 'react';
// 1. Change BrowserRouter to HashRouter here:
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
import ItineraryPage from './Pages/Itinerary/Itinerary';
import TeamPage from './Pages/Team/team';
import Events from './Pages/Events/Events';
import Sponsi from './Pages/Sponsi/Sponsi';

import './index.css';

function App() {
  return (
    // 2. Change the wrapper components to HashRouter here:
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<ItineraryPage />} />
          <Route path="/sponsi" element={<Sponsi />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
