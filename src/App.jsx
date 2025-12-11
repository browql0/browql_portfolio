// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Particles from "./components/Particles";
import CustomCursor from "./components/CustomCursor";
import Admin from "./pages/admin/admin";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import "./css/SplashScreen.css";
import "./index.css";
import { useEffect } from "react";


function LayoutWithParticles({ children }) {
  // Splash screen
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSplashEnd = () => {
    setFadeOut(true);
    setTimeout(() => setShowSplash(false), 1000);
  };





  return (
    <>
      {!showSplash && (
        <>
          <div className="global-particles-background">
            <Particles
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>
          <CustomCursor />
        </>
      )}

      {showSplash ? (
        <SplashScreen onClickContinue={handleSplashEnd} fadeOut={fadeOut} />
      ) : (
        // Ici on applique un vrai layout en flex
        <div className="app-layout">
          <Header />
          <main className="app-main">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages publiques avec splash + particules + cursor */}
        <Route
          path="/"
          element={
            <LayoutWithParticles>
              <Home />
            </LayoutWithParticles>
          }
        />
        <Route
          path="/pricing"
          element={
            <LayoutWithParticles>
              <Pricing />
            </LayoutWithParticles>
          }
        />

        {/* 🔥 Page Admin (indépendante du layout public) */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
