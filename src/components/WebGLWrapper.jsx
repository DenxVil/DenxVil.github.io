import React, { useState, useEffect } from 'react';
import { isWebGLAvailable, getDeviceCapabilities } from '../utils/webglCheck';
import ErrorBoundary from './ErrorBoundary';

const WebGLWrapper = ({ children, fallback = null }) => {
  const [webglSupported, setWebglSupported] = useState(null);
  const [deviceCapabilities, setDeviceCapabilities] = useState({});

  useEffect(() => {
    const checkSupport = () => {
      try {
        const supported = isWebGLAvailable();
        const capabilities = getDeviceCapabilities();
        
        setWebglSupported(supported);
        setDeviceCapabilities(capabilities);
        
        // Log capabilities for debugging
        console.log('WebGL Support:', supported);
        console.log('Device Capabilities:', capabilities);
        
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

  // If WebGL is not supported or it's a low-end device, show fallback
  if (!webglSupported || deviceCapabilities.isLowEndDevice) {
    return fallback || (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>
    );
  }

  // Render 3D components with error boundary
  return (
    <ErrorBoundary fallbackType="3D">
      {children}
    </ErrorBoundary>
  );
};

export default WebGLWrapper;