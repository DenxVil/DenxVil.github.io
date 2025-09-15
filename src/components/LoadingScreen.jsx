import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // More realistic loading simulation
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Shorter delay before completion
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadComplete) {
              onLoadComplete();
            }
          }, 200);
          return 100;
        }
        // Faster loading speed to avoid hanging
        return prev + Math.random() * 20 + 10;
      });
    }, 50); // Faster interval

    // Shorter maximum loading time
    const maxTimer = setTimeout(() => {
      setProgress(100);
    }, 1500); // Reduced from 3000ms

    return () => {
      clearInterval(timer);
      clearTimeout(maxTimer);
    };
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816] transition-opacity duration-300"
         style={{ opacity: progress >= 100 ? 0 : 1 }}>
      <div className="text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 animate-pulse">
            DENVIL
          </h1>
          <p className="text-gray-400 mt-2">Portfolio</p>
        </div>

        {/* Loading bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Loading... {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Loading animation */}
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Simplified message */}
        <div className="mt-8 text-gray-500 text-xs max-w-xs mx-auto">
          <p>Loading interactive content...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;