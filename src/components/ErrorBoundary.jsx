import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Component Error:', error, errorInfo);
    
    // Track the error for debugging
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Check if this is a canvas/3D error by looking at the parent component
      const is3DComponent = this.props.fallbackType === '3D' || 
        (this.props.children && this.props.children.type && 
         this.props.children.type.name && 
         this.props.children.type.name.includes('Canvas'));

      if (is3DComponent) {
        // Minimal fallback for 3D components - just a subtle background effect
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          </div>
        );
      }

      // Fallback for other components
      return (
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <div className="text-center">
            <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-gradient mb-4">
              DENVIL
            </div>
            <p className="text-gray-400 text-sm">Loading content...</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;