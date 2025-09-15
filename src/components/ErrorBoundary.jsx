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
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-gradient mb-4">
              DENVIL
            </div>
            <p className="text-dark-400 text-sm">3D mode unavailable</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;