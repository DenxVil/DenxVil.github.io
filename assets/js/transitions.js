// Page Transition Effects
// Smooth fade/slide animations between pages

(function() {
    'use strict';

    // Check for reduced motion preference
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function initPageTransitions() {
        if (prefersReducedMotion()) return;

        // Create transition overlay
        createTransitionOverlay();

        // Add transition class to body
        document.body.classList.add('page-loaded');

        // Handle link clicks for internal navigation
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip external links, anchors, and special links
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('http') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                link.getAttribute('target') === '_blank') {
                return;
            }

            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Trigger exit animation
                document.body.classList.add('page-exiting');
                const overlay = document.querySelector('.page-transition-overlay');
                if (overlay) overlay.classList.add('active');

                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }

    function createTransitionOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageTransitions);
    } else {
        initPageTransitions();
    }
})();
