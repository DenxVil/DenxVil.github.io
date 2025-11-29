// Main JavaScript for 3D Portfolio
// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle utility function
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check for reduced motion preference
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Check if device is touch-only (mobile)
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Update year in footer
document.addEventListener('DOMContentLoaded', () => {
    try {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        // Initialize all interactions
        initScrollProgress();
        initMobileMenu();
        initThemeToggle();
        initHeaderScroll();
        initMouseParallax();
        initSkillBars();
        initSmoothScroll();
        initScrollAnimations();
        initTypingEffect();
        initCustomCursor();
        initCopyToClipboard();
        initTiltEffect();
        initInteractiveParticles();
    } catch (error) {
        console.error('Error initializing interactions:', error);
    }
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    const updateProgress = throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, 16);

    window.addEventListener('scroll', updateProgress, { passive: true });
}

// Mobile Hamburger Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburger || !mobileNav) return;

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// Theme Toggle (Dark/Light)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to dark
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeToggle, currentTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeToggle, newTheme);
    });
}

function updateThemeIcon(button, theme) {
    button.innerHTML = theme === 'dark' ? '🌙' : '☀️';
    button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

// Header Hide/Show on Scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    const handleScroll = throttle(() => {
        const currentScroll = window.scrollY;
        
        // Add scrolled class for glassmorphism effect
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Mouse-follow parallax for HARSH tower
function initMouseParallax() {
    const tower = document.querySelector('.harsh-tower');
    if (!tower || prefersReducedMotion()) return;

    const handleMouseMove = throttle((e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate rotation based on mouse position (-10deg to +10deg)
        const rotateY = ((clientX / innerWidth) - 0.5) * 20;
        const rotateX = ((clientY / innerHeight) - 0.5) * -20;
        
        tower.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, 16);

    document.addEventListener('mousemove', handleMouseMove);

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        tower.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
                observer.unobserve(fill);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                });
            }
        });
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    if (prefersReducedMotion()) return;

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Typing Effect for Hero Subtitle
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement || prefersReducedMotion()) return;

    const words = ['Developer', 'Designer', 'Esports Gamer', 'Website Creator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// Custom Cursor with Trail
function initCustomCursor() {
    if (isTouchDevice() || prefersReducedMotion()) return;

    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        if (trail) {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .contact-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// Copy to Clipboard for Email
function initCopyToClipboard() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                btn.classList.add('copied');
                
                const tooltip = btn.querySelector('.copy-tooltip');
                if (tooltip) {
                    tooltip.textContent = 'Copied!';
                    tooltip.classList.add('visible');
                }

                setTimeout(() => {
                    btn.classList.remove('copied');
                    if (tooltip) {
                        tooltip.classList.remove('visible');
                        tooltip.textContent = 'Copy';
                    }
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// Tilt Effect for Project Cards (Vanilla Tilt Implementation)
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    if (prefersReducedMotion() || isTouchDevice()) return;

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.willChange = 'auto';
        });
    });
}

// Interactive Particles that follow mouse
function initInteractiveParticles() {
    if (prefersReducedMotion() || isTouchDevice()) return;

    const particles = document.querySelectorAll('.particle');
    if (particles.length === 0) return;

    const handleMouseMove = throttle((e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.02;
            const x = (clientX / innerWidth - 0.5) * 30 * speed;
            const y = (clientY / innerHeight - 0.5) * 30 * speed;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, 16);

    document.addEventListener('mousemove', handleMouseMove);
}

// Project Filtering with Animation
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const searchInput = document.querySelector('.search-input');

    if (filterBtns.length === 0) return;

    function filterProjects(filter, searchTerm = '') {
        projectItems.forEach(item => {
            const status = item.getAttribute('data-status') || '';
            const title = item.querySelector('.project-title')?.textContent.toLowerCase() || '';
            const desc = item.querySelector('.project-desc')?.textContent.toLowerCase() || '';
            
            const matchesFilter = filter === 'all' || status === filter;
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm.toLowerCase()) || 
                desc.includes(searchTerm.toLowerCase());

            if (matchesFilter && matchesSearch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            const searchTerm = searchInput?.value || '';
            filterProjects(filter, searchTerm);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter?.getAttribute('data-filter') || 'all';
            filterProjects(filter, e.target.value);
        }, 300));
    }
}

// Initialize project filtering if on projects page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.project-filters')) {
        initProjectFiltering();
    }
});
