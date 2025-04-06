import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn, SignUp, RedirectToSignIn } from "@clerk/clerk-react";
import App from "./App.jsx";
import LandingPage from "./LandingPage.jsx";
import "./index.css";


const clerkFrontendApi = "pk_test_aW1tdW5lLWthbmdhcm9vLTk0LmNsZXJrLmFjY291bnRzLmRldiQ"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/match" element={<App />} />
          <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
<Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
          {/* Login & Sign Up routes will go here soon */}
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);
