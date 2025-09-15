import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';

// Lazy load the 3D component for better performance
const DenvilLogo3D = lazy(() => import('./DenvilLogo3D'));

// Simple loading component
const LoadingLogo = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-gradient animate-pulse">
      DENVIL
    </div>
  </div>
);

export default function DenvilLogo3DLazy({ className = "" }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingLogo />}>
        <DenvilLogo3D className={className} />
      </Suspense>
    </ErrorBoundary>
  );
}