// ============================================
// ETERNALS ACADEMY - MAIN SCRIPT
// ============================================

// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) {
            navbarMenu.classList.remove('active');
        }
    });
});

// ============================================
// ANIMATED COUNTERS
// ============================================

let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;

    const counterElements = document.querySelectorAll('[data-target]');

    counterElements.forEach(element => {
        const targetValue = parseInt(element.getAttribute('data-target'));
        const increment = targetValue / 50;
        let currentValue = 0;

        const updateCounter = () => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                element.textContent = targetValue;
                countersStarted = true;
            } else {
                element.textContent = Math.floor(currentValue);
                requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    });
}

// Trigger counters on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observerScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.achievement-card, .result-card, .batch-card, .testimonial-card, .contact-card, .social-card').forEach(element => {
    observerScroll.observe(element);
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================

const registrationForm = document.getElementById('registrationForm');
const notificationElement = document.getElementById('successNotification');

if (registrationForm) {
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const experience = document.getElementById('experience').value;
        const batch = document.getElementById('batch').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!fullName || !phone || !email || !experience || !batch) {
            showNotification('Please fill all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // If all validation passes
        handleFormSubmit({
            fullName,
            phone,
            email,
            experience,
            batch,
            message,
            timestamp: new Date().toISOString()
        });
    });
}

function handleFormSubmit(formData) {
    // Log form data (in production, this would be sent to a backend)
    console.log('Registration submitted:', formData);

    // Store in localStorage for demonstration
    const submissions = JSON.parse(localStorage.getItem('eternalsRegistrations')) || [];
    submissions.push(formData);
    localStorage.setItem('eternalsRegistrations', JSON.stringify(submissions));

    // Reset form
    registrationForm.reset();

    // Show success notification
    showSuccessNotification();

    // Scroll to notification
    setTimeout(() => {
        notificationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function showSuccessNotification() {
    const notification = document.getElementById('successNotification');
    notification.classList.add('show');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    const content = notification.querySelector('.notification-content');

    if (type === 'error') {
        content.innerHTML = `
            <span class="notification-icon">⚠️</span>
            <div>
                <h4>Validation Error</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;
    } else {
        content.innerHTML = `
            <span class="notification-icon">✓</span>
            <div>
                <h4>Success</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;
    }

    notification.classList.add('show');

    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
    });

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// ============================================
// ANCHOR LINK SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        
        // Only prevent default for valid anchor links
        if (href !== '#' && document.querySelector(href)) {
            event.preventDefault();
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealElements = document.querySelectorAll(
    '.section-header, .about-text, .achievement-list, .batch-details, .footer'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
            entry.target.style.opacity = '0';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

let ticking = false;

function updateParallax() {
    const scrollPosition = window.scrollY;
    const glowLeft = document.querySelector('.glow-left');
    const glowRight = document.querySelector('.glow-right');

    if (glowLeft) {
        glowLeft.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    if (glowRight) {
        glowRight.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// ============================================
// HOVER EFFECTS FOR CARDS
// ============================================

document.querySelectorAll('.stat-card, .achievement-card, .result-card, .batch-card, .testimonial-card, .contact-card, .social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// ============================================
// ACHIEVEMENT CARD NUMBER ANIMATION
// ============================================

const achievementNumbers = document.querySelectorAll('.achievement-number');
let numbersAnimated = false;

const numbersObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !numbersAnimated) {
            achievementNumbers.forEach(number => {
                const text = number.textContent;
                const finalValue = text.replace(/[^0-9]/g, '');
                let currentValue = 0;

                if (finalValue) {
                    const increment = Math.ceil(parseInt(finalValue) / 40);

                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= parseInt(finalValue)) {
                            number.textContent = text;
                            clearInterval(counter);
                        } else {
                            number.textContent = currentValue + (text.includes('%') ? '%' : text.includes('$') ? '$' : '');
                        }
                    }, 30);
                }
            });

            numbersAnimated = true;
            numbersObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const achievementsSection = document.querySelector('.achievements');
if (achievementsSection) {
    numbersObserver.observe(achievementsSection);
}

// ============================================
// RESULT CARDS STAGGER ANIMATION
// ============================================

const resultCards = document.querySelectorAll('.result-card');
const resultObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            entry.target.style.opacity = '0';
        }
    });
}, { threshold: 0.2 });

resultCards.forEach(card => {
    resultObserver.observe(card);
});

// ============================================
// SOCIAL MEDIA LINKS TRACKING
// ============================================

document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const platform = this.querySelector('h3').textContent;
        console.log(`Social link clicked: ${platform}`);
    });
});

// ============================================
// CTA BUTTON EFFECTS
// ============================================

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// FORM INPUT FOCUS EFFECTS
// ============================================

document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
    });

    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for resize events
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
}, 250), { passive: true });

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================

// Clear old registrations (older than 30 days)
function cleanupRegistrations() {
    const submissions = JSON.parse(localStorage.getItem('eternalsRegistrations')) || [];
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    const filtered = submissions.filter(submission => {
        return new Date(submission.timestamp).getTime() > thirtyDaysAgo;
    });

    localStorage.setItem('eternalsRegistrations', JSON.stringify(filtered));
}

// Run cleanup on page load
cleanupRegistrations();

// ============================================
// INTERSECTION OBSERVER FOR LAZY LOADING
// ============================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Lazy load logic here if needed
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.image-placeholder, .batch-image-placeholder, .result-image-placeholder').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// ANALYTICS HELPER
// ============================================

function trackEvent(eventName, eventData = {}) {
    const event = {
        name: eventName,
        data: eventData,
        timestamp: new Date().toISOString()
    };
    console.log('Event tracked:', event);
    // In production, send to analytics service
}

// Track page view
trackEvent('page_view', { 
    page: 'eternals_academy_homepage',
    referrer: document.referrer 
});

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent;
        trackEvent('cta_click', { button: buttonText });
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (event) => {
    // Close mobile menu on Escape
    if (event.key === 'Escape') {
        const navbarMenu = document.getElementById('navbarMenu');
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
        }
    }
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Ensure all interactive elements are keyboard accessible
document.querySelectorAll('.btn, .nav-link, .social-card').forEach(element => {
    element.setAttribute('tabindex', '0');
});

// ============================================
// INITIALIZATION
// ============================================

console.log('Eternals Academy website loaded successfully');
console.log('Premium trading mentorship platform by Harsh Sharma');
console.log('8+ years of trading experience | 240+ students mentored | 5+ funded accounts');
