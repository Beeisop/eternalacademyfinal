// ============================================
// ETERNAL ACADEMY - MAIN SCRIPT
// Loaded with `defer` — DOM is ready on execute
// ============================================

// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

(function () {
    'use strict';

    const hamburger    = document.getElementById('hamburger');
    const navbarMenu   = document.getElementById('navbarMenu');

    if (hamburger && navbarMenu) {
        // Toggle mobile menu + ARIA state
        hamburger.addEventListener('click', () => {
            const isOpen = navbarMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when any nav link is clicked
        navbarMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside navbar
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navbarMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            hamburger && hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // ============================================
    // ANCHOR LINK SMOOTH SCROLL
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href   = this.getAttribute('href');
            const target = href !== '#' && document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });

    // ============================================
    // ANIMATED HERO COUNTERS
    // ============================================

    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;

        document.querySelectorAll('[data-target]').forEach(el => {
            const target    = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;
            const increment = target / 50;
            let current     = 0;

            const tick = () => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                } else {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(tick);
                }
            };
            tick();
        });
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { animateCounters(); obs.disconnect(); }
            });
        }, { threshold: 0.5 }).observe(heroSection);
    }

    // ============================================
    // ACHIEVEMENT NUMBER ANIMATION
    // ============================================

    let numbersAnimated = false;
    const achievementsSection = document.querySelector('.achievements');

    if (achievementsSection) {
        new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || numbersAnimated) return;
                numbersAnimated = true;
                obs.disconnect();

                document.querySelectorAll('.achievement-number').forEach(el => {
                    const text       = el.textContent;
                    const digits     = text.replace(/[^0-9]/g, '');
                    if (!digits) return;
                    const finalValue = parseInt(digits, 10);
                    const increment  = Math.ceil(finalValue / 40);
                    let current      = 0;
                    const suffix     = text.includes('%') ? '%' : '';

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= finalValue) {
                            el.textContent = text;   // restore original (e.g. "12.5%")
                            clearInterval(counter);
                        } else {
                            el.textContent = current + suffix;
                        }
                    }, 30);
                });
            });
        }, { threshold: 0.5 }).observe(achievementsSection);
    }

    // ============================================
    // SCROLL REVEAL — CARDS
    // ============================================

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(
        '.achievement-card, .result-card, .batch-card, .testimonial-card, .contact-card, .social-card'
    ).forEach(el => scrollObserver.observe(el));

    // ============================================
    // RESULT CARDS STAGGER
    // ============================================

    const resultObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '0';
                entry.target.style.animation  = `fadeInUp 0.6s ease ${i * 0.1}s forwards`;
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.result-card').forEach(card => resultObserver.observe(card));

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background  = 'rgba(15,15,15,0.98)';
                navbar.style.boxShadow   = '0 5px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background  = '';
                navbar.style.boxShadow   = '';
            }
        }, { passive: true });
    }

    // ============================================
    // CARD HOVER EFFECTS
    // ============================================

    document.querySelectorAll(
        '.stat-card, .achievement-card, .result-card, .batch-card, .testimonial-card, .contact-card, .social-card'
    ).forEach(card => {
        card.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-10px)'; });
        card.addEventListener('mouseleave', function () { this.style.transform = ''; });
    });

    // ============================================
    // BUTTON HOVER EFFECTS
    // ============================================

    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-3px)'; });
        btn.addEventListener('mouseleave', function () { this.style.transform = ''; });
    });

    // ============================================
    // FORM INPUT FOCUS GLOW
    // ============================================

    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', function () {
            this.style.boxShadow = '0 0 20px rgba(255,215,0,0.3)';
        });
        input.addEventListener('blur', function () {
            this.style.boxShadow = '';
        });
    });

    // ============================================
    // FORM VALIDATION & SUBMISSION
    // ============================================

    const registrationForm    = document.getElementById('registrationForm');
    const notificationElement = document.getElementById('successNotification');

    if (registrationForm && notificationElement) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName   = document.getElementById('fullName').value.trim();
            const phone      = document.getElementById('phone').value.trim();
            const email      = document.getElementById('email').value.trim();
            const experience = document.getElementById('experience').value;
            const batch      = document.getElementById('batch').value;
            const message    = document.getElementById('message').value.trim();

            if (!fullName || !phone || !email || !experience || !batch) {
                showNotification('Please fill all required fields', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            if (!/^[\d\s\-+()]{10,}$/.test(phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }

            handleFormSubmit({ fullName, phone, email, experience, batch, message, timestamp: new Date().toISOString() });
        });
    }

    function handleFormSubmit(formData) {
        try {
            const key         = 'eternalsRegistrations';
            const submissions = JSON.parse(localStorage.getItem(key) || '[]');
            submissions.push(formData);
            localStorage.setItem(key, JSON.stringify(submissions));
        } catch (_) { /* localStorage may be unavailable */ }

        registrationForm.reset();
        showSuccessNotification();

        setTimeout(() => {
            notificationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    function showSuccessNotification() {
        notificationElement.classList.add('show');
        setTimeout(() => notificationElement.classList.remove('show'), 5000);

        const close = notificationElement.querySelector('.notification-close');
        if (close) {
            close.onclick = () => notificationElement.classList.remove('show');
        }
    }

    function showNotification(message, type = 'success') {
        const icon    = type === 'error' ? '⚠️' : '✓';
        const heading = type === 'error' ? 'Validation Error' : 'Success';
        const content = notificationElement.querySelector('.notification-content');

        if (content) {
            // Sanitise message before inserting
            const safeMsg = document.createTextNode(message);
            const p       = document.createElement('p');
            p.appendChild(safeMsg);

            content.innerHTML = '';
            const iconSpan    = document.createElement('span');
            iconSpan.className = 'notification-icon';
            iconSpan.setAttribute('aria-hidden', 'true');
            iconSpan.textContent = icon;

            const textDiv   = document.createElement('div');
            const h4        = document.createElement('h4');
            h4.textContent  = heading;
            textDiv.appendChild(h4);
            textDiv.appendChild(p);

            const closeBtn  = document.createElement('button');
            closeBtn.className   = 'notification-close';
            closeBtn.setAttribute('aria-label', 'Close notification');
            closeBtn.textContent = '×';
            closeBtn.onclick     = () => notificationElement.classList.remove('show');

            content.appendChild(iconSpan);
            content.appendChild(textDiv);
            content.appendChild(closeBtn);
        }

        notificationElement.classList.add('show');
        setTimeout(() => notificationElement.classList.remove('show'), 4000);
    }

    // ============================================
    // SOCIAL LINK TRACKING
    // ============================================

    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('click', function () {
            const h3 = this.querySelector('h3');
            if (h3) trackEvent('social_click', { platform: h3.textContent.trim() });
        });
    });

    // ============================================
    // CTA TRACKING
    // ============================================

    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function () {
            trackEvent('cta_click', { button: this.textContent.trim() });
        });
    });

    // ============================================
    // ACCESSIBILITY: tabindex for interactive elements
    // ============================================

    document.querySelectorAll('.btn, .nav-link, .social-card').forEach(el => {
        // Only add tabindex if not already present and element is not natively focusable
        if (!el.hasAttribute('tabindex') && el.tagName !== 'A' && el.tagName !== 'BUTTON') {
            el.setAttribute('tabindex', '0');
        }
    });

    // ============================================
    // PERFORMANCE — RESIZE DEBOUNCE
    // ============================================

    function debounce(fn, delay) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
    }

    window.addEventListener('resize', debounce(() => {}, 250), { passive: true });

    // ============================================
    // LOCAL STORAGE CLEANUP (>30 days old)
    // ============================================

    try {
        const key           = 'eternalsRegistrations';
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const filtered      = (JSON.parse(localStorage.getItem(key) || '[]'))
            .filter(s => new Date(s.timestamp).getTime() > thirtyDaysAgo);
        localStorage.setItem(key, JSON.stringify(filtered));
    } catch (_) {}

    // ============================================
    // ANALYTICS HELPER
    // ============================================

    function trackEvent(name, data = {}) {
        // In production: send to analytics endpoint
        console.log('Event:', name, data);
    }

    trackEvent('page_view', { page: 'eternal_academy_homepage', referrer: document.referrer });

    // ============================================
    // PARALLAX (glow orbs, passive listener)
    // ============================================

    const glowLeft  = document.querySelector('.glow-left');
    const glowRight = document.querySelector('.glow-right');

    if (glowLeft || glowRight) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    if (glowLeft)  glowLeft.style.transform  = `translateY(${y * 0.15}px)`;
                    if (glowRight) glowRight.style.transform = `translateY(${-y * 0.1}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

}()); // end IIFE
