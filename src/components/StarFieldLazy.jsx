import React, { Suspense, lazy } from 'react';

// Lazy load the StarField component
const StarField = lazy(() => import('./StarField'));

// Simple loading/fallback component
const LoadingStars = () => (
  <div className="w-full h-full absolute inset-0 z-[-1] bg-gradient-to-br from-dark-900/80 via-dark-800/60 to-dark-900/80">
    {/* Simple CSS stars fallback */}
    <div className="stars"></div>
  </div>
);

export default function StarFieldLazy() {
  return (
    <Suspense fallback={<LoadingStars />}>
      <StarField />
    </Suspense>
  );
}