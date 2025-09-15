import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import WebGLWrapper from "./components/WebGLWrapper";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Ensure fonts and critical resources are loaded
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      <BrowserRouter>
        <div className={`bg-primary relative z-0 ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
          <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <WebGLWrapper>
              <StarsCanvas />
            </WebGLWrapper>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
