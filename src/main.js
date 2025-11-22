/**
 * Main entry point for the application
 * Initializes the Three.js scene and manages HMR cleanup
 */

// Import styles
import './styles.css';

// Import scene initialization
import { initScene } from './scene.js';

// Update copyright year in footer
const updateYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

// Initialize application
let cleanup = null;

const init = async () => {
  try {
    // Update footer year
    updateYear();

    // Initialize Three.js scene
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
      cleanup = await initScene(canvas);
      console.log('✨ Scene initialized successfully');
    } else {
      console.warn('Canvas element not found');
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
};

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// HMR cleanup - dispose of WebGL contexts and event listeners
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    console.log('🔄 HMR: Cleaning up scene...');
    if (cleanup && typeof cleanup === 'function') {
      cleanup();
      cleanup = null;
    }
  });

  import.meta.hot.accept(() => {
    console.log('🔥 HMR: Module updated');
  });
}
