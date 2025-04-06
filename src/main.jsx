import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import App from "./App.jsx";
import LandingPage from "./LandingPage.jsx";
import "./index.css";

const PUBLISHABLE_KEY = "pk_test_aW1tdW5lLWthbmdhcm9vLTk0LmNsZXJrLmFjY291bnRzLmRldiQ";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/match" element={<App />} />
          <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);
