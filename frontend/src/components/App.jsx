/* eslint-disable no-unused-vars */
import LandingPage from './LandingPage';
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
import AddItem from "./AddItem";
import OutfitSuggestions from "./OutfitSuggestions";
import DailyTrends from "./DailyTrends";
import SeasonalRecommendations from "./SeasonalRecommendations";
import CustomizableCombinations from "./CustomizableCombinations";
import SearchWardrobe from "./SearchWardrobe";
import Notifications from "./Notifications";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <div style={{ marginTop: "-3.5rem" }}>
      <BrowserRouter>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage />} /> {/* Default landing page */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/DeleteItem" element={<DeleteItem />} />
          <Route path="/UpdateItem" element={<UpdateItem />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/search-wardrobe" element={<SearchWardrobe/>} />
          <Route path="/outfit-suggestions" element={<OutfitSuggestions />} />
          <Route path="/daily-trends" element={<DailyTrends />} />
          <Route path="/seasonal-recommendations" element={<SeasonalRecommendations />} />
          <Route path="/customizable-combinations" element={<CustomizableCombinations />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
