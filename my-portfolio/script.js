/**
 * Community Discord Server Website
 * Modern, aesthetic JavaScript functionality
 * 
 * Features:
 * - Smooth scroll navigation
 * - Mobile menu toggle
 * - Scroll-based animations
 * - Particle background animation
 * - Active nav link highlighting
 */

// ========================================
// DOM Elements
// ========================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const particlesContainer = document.getElementById('particles');

// ========================================
// Mobile Menu Toggle
// ========================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Close menu when clicking a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for mobile menu
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;

function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for background change
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleNavbarScroll);

// ========================================
// Active Navigation Link on Scroll
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Reveal Animation
// ========================================
function initScrollReveal() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.about-card, .team-card, .feature-card, .section-header, .cta-content'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('about-grid') || 
                               parent.classList.contains('features-grid') || 
                               parent.classList.contains('team-grid'))) {
                    const siblings = parent.children;
                    Array.from(siblings).forEach((sibling, index) => {
                        sibling.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// Particle Background Animation
// ========================================
function createParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration and delay
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// ========================================
// Button Ripple Effect
// ========================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect to primary buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// Typing Effect for Hero (Optional)
// ========================================
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // The typing effect is optional - uncomment to enable
    // const text = heroTitle.innerHTML;
    // heroTitle.innerHTML = '';
    // let i = 0;
    // 
    // function type() {
    //     if (i < text.length) {
    //         heroTitle.innerHTML += text.charAt(i);
    //         i++;
    //         setTimeout(type, 50);
    //     }
    // }
    // type();
}

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observe stats for counter animation
function initStatsAnimation() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(entry.target, number);
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => observer.observe(stat));
}

// ========================================
// Parallax Effect for Hero
// ========================================
function initParallax() {
    const heroGlow = document.querySelector('.hero-glow');
    
    window.addEventListener('mousemove', (e) => {
        if (!heroGlow || window.innerWidth < 768) return;
        
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        
        heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

// ========================================
// Card Tilt Effect
// ========================================
function initCardTilt() {
    const cards = document.querySelectorAll('.team-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========================================
// Preloader (Optional)
// ========================================
function initPreloader() {
    // Add preloader HTML if needed
    // const preloader = document.createElement('div');
    // preloader.className = 'preloader';
    // preloader.innerHTML = '<div class="loader"></div>';
    // document.body.prepend(preloader);
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        // if (preloader) preloader.style.display = 'none';
    });
}

// ========================================
// Initialize All Functions
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Community Discord Website Loaded');
    
    // Initialize all features
    createParticles();
    initScrollReveal();
    initParallax();
    initCardTilt();
    initStatsAnimation();
    initPreloader();
    
    // Set initial active link
    updateActiveNavLink();
});

// ========================================
// Console Branding
// ========================================
console.log(
    '%c✦ Community Discord Server %c Made with 💜',
    'background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 10px 20px; border-radius: 5px 0 0 5px; font-weight: bold;',
    'background: #1a0f2e; color: #a78bfa; padding: 10px 20px; border-radius: 0 5px 5px 0;'
);
