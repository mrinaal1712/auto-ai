import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // The match engine
import LandingPage from "./LandingPage.jsx"; // You'll create this next
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/match" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
