// =================================
// SMOOTH SCROLLING & ANIMATIONS
// =================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSmoothScrolling();
    initParallaxEffects();
    initInteractiveElements();
    initScrollSnapping();
    createFloatingParticles();
});

// =================================
// SCROLL SNAPPING ENHANCEMENT
// =================================
function initScrollSnapping() {
    const sections = document.querySelectorAll('.section');
    let isScrolling = false;
    
    // Enhanced scroll snap behavior
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        e.preventDefault();
        isScrolling = true;
        
        const currentSection = getCurrentSection();
        const nextSection = e.deltaY > 0 ? getNextSection(currentSection) : getPrevSection(currentSection);
        
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }, { passive: false });
    
    function getCurrentSection() {
        let current = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                current = section;
            }
        });
        return current;
    }
    
    function getNextSection(current) {
        const sections = [...document.querySelectorAll('.section')];
        const currentIndex = sections.indexOf(current);
        return sections[currentIndex + 1] || null;
    }
    
    function getPrevSection(current) {
        const sections = [...document.querySelectorAll('.section')];
        const currentIndex = sections.indexOf(current);
        return sections[currentIndex - 1] || null;
    }
}

// =================================
// SCROLL ANIMATIONS
// =================================
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    // Use Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add staggered animation to grid items
                const gridItems = entry.target.querySelectorAll('.role-card, .tip-card, .industry-card, .trend-badge');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// =================================
// SMOOTH SCROLLING
// =================================
function initSmoothScrolling() {
    // Handle CTA button scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const nextSection = document.querySelector('#why-here');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Handle back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// =================================
// PARALLAX EFFECTS
// =================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-section');
    const heroBackground = document.querySelector('.hero-bg');
    
    if (window.innerWidth > 768) { // Only apply parallax on desktop
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Hero background parallax
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            // Parallax sections - simplified to avoid conflicts
            parallaxElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.1; // Much slower speed
                    const yPos = -(scrolled * speed);
                    
                    // Only apply to background elements, not interactive cards
                    const bgElements = element.querySelectorAll('.section-title, .section-text');
                    bgElements.forEach((bg) => {
                        bg.style.transform = `translateY(${yPos}px)`;
                    });
                }
            });
        });
    }
}

// =================================
// INTERACTIVE ELEMENTS
// =================================
function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.role-card, .tip-card, .industry-card, .bridge-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to trend badges
    const trendBadges = document.querySelectorAll('.trend-badge');
    trendBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Add typing effect to hero title
    typeWriterEffect();
}

// =================================
// TYPEWRITER EFFECT
// =================================
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// =================================
// SCROLL PROGRESS INDICATOR
// =================================
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    const progressFill = document.querySelector('.progress-fill');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = scrollPercent + '%';
    });
}

// =================================
// UTILITY FUNCTIONS
// =================================

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// =================================
// RESPONSIVE HANDLER
// =================================
function handleResize() {
    // Disable parallax on mobile devices
    if (window.innerWidth <= 768) {
        const parallaxElements = document.querySelectorAll('.parallax-section');
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
    }
}

// Add resize event listener
window.addEventListener('resize', debounce(handleResize, 250));

// =================================
// ACCESSIBILITY IMPROVEMENTS
// =================================
function initAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, .cta-button, .back-to-top');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// =================================
// ANIMATION PRELOADER
// =================================
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Start initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.3}s`;
        });
    }, 100);
});

// =================================
// SCROLL TO SECTION NAVIGATION
// =================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Make scroll function globally available
window.scrollToSection = scrollToSection;

// =================================
// PERFORMANCE OPTIMIZATION
// =================================
let ticking = false;

function updateScrollEffects() {
    // Update parallax and other scroll effects here
    initParallaxEffects();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// Use requestAnimationFrame for smooth animations
window.addEventListener('scroll', requestTick);

// =================================
// FLOATING PARTICLES EFFECT
// =================================
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.4) 100%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float ${duration}s infinite linear;
        box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle when animation ends
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}

// =================================
// CONSOLE WELCOME MESSAGE
// =================================
console.log('%c🚀 Welcome to Understanding the Tech Industry!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with modern web technologies for an amazing user experience.', 'color: #2c3e50; font-size: 14px;');
console.log('%cInterested in tech careers? This presentation is for you!', 'color: #00b894; font-size: 14px;'); 