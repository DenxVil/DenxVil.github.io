import React, { useState, useEffect } from 'react';
import { isWebGLAvailable, getDeviceCapabilities, checkWebGLSupport } from '../utils/webglCheck';
import ErrorBoundary from './ErrorBoundary';

const WebGLWrapper = ({ children, fallback = null }) => {
  const [webglSupported, setWebglSupported] = useState(null);
  const [deviceCapabilities, setDeviceCapabilities] = useState({});
  const [webglDetails, setWebglDetails] = useState({});

  useEffect(() => {
    const checkSupport = () => {
      try {
        const supported = isWebGLAvailable();
        const capabilities = getDeviceCapabilities();
        const details = checkWebGLSupport();
        
        setWebglSupported(supported);
        setDeviceCapabilities(capabilities);
        setWebglDetails(details);
        
        // Enhanced logging for debugging Safari issues
        console.log('WebGL Support:', supported);
        console.log('Device Capabilities:', capabilities);
        console.log('WebGL Details:', details);
        
        // Special handling for Safari
        if (capabilities.isSafari) {
          console.log('Safari detected - using enhanced compatibility mode');
          
          // If Safari has issues, we might want to disable 3D even if WebGL is "supported"
          if (capabilities.isOldSafari || !details.supported) {
            console.warn('Safari WebGL issues detected, disabling 3D content');
            setWebglSupported(false);
          }
        }
        
      } catch (error) {
        console.warn('Error checking WebGL support:', error);
        setWebglSupported(false);
      }
    };

    checkSupport();
  }, []);

  // Show loading state while checking
  if (webglSupported === null) {
    return null; // Silent loading
  }

  // If WebGL is not supported or it's a problematic Safari version, show fallback
  if (!webglSupported || deviceCapabilities.isLowEndDevice || 
      (deviceCapabilities.isSafari && !webglDetails.supported)) {
    
    // Enhanced fallback with better visual appeal for Safari users
    const fallbackContent = fallback || (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.08),transparent_50%)]"></div>
        {/* Additional CSS-based visual effects for Safari */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    );
    
    return fallbackContent;
  }

  // Render 3D components with error boundary
  return (
    <ErrorBoundary fallbackType="3D">
      {children}
    </ErrorBoundary>
  );
};

export default WebGLWrapper;