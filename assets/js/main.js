// Main JavaScript for denx.me Portfolio

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeThreeDElements();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Animation and scroll effects
function initializeAnimations() {
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate cards with staggered delay
    const cards = document.querySelectorAll('.card, .project-card, .pipeline-column');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Three.js 3D elements initialization
function initializeThreeDElements() {
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        // Initialize DENVIL monogram
        const denvilCanvas = document.getElementById('denvil-monogram');
        if (denvilCanvas && window.initDenvilMonogram) {
            window.initDenvilMonogram(denvilCanvas);
        }

        // Initialize HARSH monogram
        const harshCanvas = document.getElementById('harsh-monogram');
        if (harshCanvas && window.initHarshMonogram) {
            window.initHarshMonogram(harshCanvas);
        }
    } else {
        console.warn('Three.js not loaded, 3D elements will be disabled');
        // Fallback: Add static styling to monogram containers
        const monogramContainers = document.querySelectorAll('.monogram-canvas');
        monogramContainers.forEach(container => {
            container.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.fontSize = '2rem';
            container.style.fontWeight = 'bold';
            container.style.color = 'white';
            
            if (container.id === 'denvil-monogram') {
                container.textContent = 'DENVIL';
            } else if (container.id === 'harsh-monogram') {
                container.textContent = 'HARSH';
            }
        });
    }
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Initialize performance monitoring
    if ('performance' in window) {
        console.log(`Page loaded in ${Math.round(performance.now())}ms`);
    }
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('paused');
    }
});

// Error handling for 3D elements
window.addEventListener('error', function(e) {
    if (e.message.includes('THREE') || e.message.includes('WebGL')) {
        console.warn('3D rendering error detected, falling back to 2D mode');
        // Implement fallback for 3D elements
        const monogramContainers = document.querySelectorAll('.monogram-canvas');
        monogramContainers.forEach(container => {
            if (!container.hasChildNodes()) {
                const fallbackDiv = document.createElement('div');
                fallbackDiv.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    font-weight: bold;
                    color: white;
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                `;
                
                if (container.id === 'denvil-monogram') {
                    fallbackDiv.textContent = 'DENVIL';
                } else if (container.id === 'harsh-monogram') {
                    fallbackDiv.textContent = 'HARSH';
                }
                
                container.appendChild(fallbackDiv);
            }
        });
    }
});

// Export functions for external use
window.portfolioApp = {
    initializeNavigation,
    initializeAnimations,
    initializeScrollEffects,
    initializeThreeDElements,
    debounce,
    throttle
};