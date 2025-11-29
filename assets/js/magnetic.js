// Magnetic Button Effect
// Creates a subtle attraction effect toward cursor on hover

(function() {
    'use strict';

    // Check for reduced motion preference
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Check if device is touch-only
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    function initMagneticButtons() {
        if (prefersReducedMotion() || isTouchDevice()) return;

        const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .magnetic-btn');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Apply magnetic pull effect (subtle movement toward cursor)
                const magnetStrength = 0.3;
                this.style.transform = `translate(${x * magnetStrength}px, ${y * magnetStrength}px)`;
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });

            // Add transition for smooth effect
            element.style.transition = 'transform 0.2s ease-out';
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMagneticButtons);
    } else {
        initMagneticButtons();
    }
})();
