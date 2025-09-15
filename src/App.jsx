import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";

// Import components gradually - start with working ones
import Navbar from "./components/Navbar";
import About from "./components/About";

// Import sections that don't depend on complex 3D
import Contact from "./components/sections/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure fonts and critical resources are loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
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
            {/* Simple Hero Section without complex 3D for now */}
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gradient mb-8">
                  Hi, I'm
                </h1>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gradient mb-8">
                  DENVIL
                </h2>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gradient mb-8">
                  CODER 👨‍💻
                </h3>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Crafting digital experiences and competing at the highest level
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors"
                  >
                    Explore My Work
                  </button>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                    className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg transition-colors"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
          <About />
          <Contact />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
