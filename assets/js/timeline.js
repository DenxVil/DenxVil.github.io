// Timeline Scroll Animations
// Animated timeline progression on scroll

(function() {
    'use strict';

    // Check for reduced motion preference
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function initTimelineAnimations() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        const timelineItems = timeline.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) return;

        if (prefersReducedMotion()) {
            // Show all items immediately for reduced motion
            timelineItems.forEach(item => {
                item.classList.add('visible');
            });
            return;
        }

        // Create intersection observer for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Animate timeline line
        animateTimelineLine(timeline);
    }

    function animateTimelineLine(timeline) {
        const line = timeline.querySelector('.timeline-line');
        if (!line) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    line.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(timeline);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimelineAnimations);
    } else {
        initTimelineAnimations();
    }
})();
