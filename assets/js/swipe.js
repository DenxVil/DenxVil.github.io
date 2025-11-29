// Touch Swipe Navigation for Projects
// Enables horizontal swipe between project cards on mobile/touch devices

(function() {
    'use strict';

    let touchStartX = 0;
    let touchEndX = 0;
    let currentIndex = 0;

    function initSwipeNavigation() {
        const swipeContainer = document.querySelector('.swipe-container');
        if (!swipeContainer) return;

        const cards = swipeContainer.querySelectorAll('.swipe-card');
        if (cards.length === 0) return;

        // Add swipe indicators
        createSwipeIndicators(swipeContainer, cards.length);

        // Touch event listeners
        swipeContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        swipeContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
        swipeContainer.addEventListener('touchend', handleTouchEnd);

        // Initial position
        updateCardPositions(cards, currentIndex);
    }

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchMove(e) {
        touchEndX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd() {
        const swipeContainer = document.querySelector('.swipe-container');
        const cards = swipeContainer.querySelectorAll('.swipe-card');
        const threshold = 50; // Minimum swipe distance
        
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < cards.length - 1) {
                // Swipe left - next card
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous card
                currentIndex--;
            }
            
            updateCardPositions(cards, currentIndex);
            updateSwipeIndicators(currentIndex);
        }
    }

    function updateCardPositions(cards, index) {
        cards.forEach((card, i) => {
            const offset = (i - index) * 100;
            card.style.transform = `translateX(${offset}%)`;
            card.style.opacity = i === index ? '1' : '0.5';
            card.style.scale = i === index ? '1' : '0.9';
        });
    }

    function createSwipeIndicators(container, count) {
        const indicatorsDiv = document.createElement('div');
        indicatorsDiv.className = 'swipe-indicators';
        indicatorsDiv.setAttribute('aria-label', 'Slide indicators');
        
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = 'swipe-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                const cards = container.querySelectorAll('.swipe-card');
                currentIndex = i;
                updateCardPositions(cards, currentIndex);
                updateSwipeIndicators(currentIndex);
            });
            indicatorsDiv.appendChild(dot);
        }
        
        container.appendChild(indicatorsDiv);
    }

    function updateSwipeIndicators(index) {
        const dots = document.querySelectorAll('.swipe-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwipeNavigation);
    } else {
        initSwipeNavigation();
    }
})();
