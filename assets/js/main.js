/**
 * HECHTER PRINTING SHOWCASE — MAIN JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    initHeaderScroll();
    initMegaMenu();
    initProductMarquee();
    initScrollReveal();
    initCountUpStats();
    initActiveNavLinks();
    initPortfolioFilter();
    initContactForm();
});

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const checkScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
            document.body.classList.add('top-bar-hidden');
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('top-bar-hidden');
        }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

function initFooterYear() {
    const el = document.getElementById('year');
    if (!el) return;
    el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initFooterYear);

/**
 * 2. Mega Menu Navigation
 */
function initMegaMenu() {
    const openBtn = document.getElementById('mega-menu-btn');
    const closeBtn = document.getElementById('mega-menu-close');
    const megaMenu = document.getElementById('mega-menu');

    if (!openBtn || !closeBtn || !megaMenu) return;

    const toggleMenu = (forceState) => {
        const isActive = typeof forceState === 'boolean' ? forceState : !megaMenu.classList.contains('active');
        
        if (isActive) {
            megaMenu.classList.add('active');
            document.body.classList.add('mega-menu-open');
            document.body.style.overflow = 'hidden';
            megaMenu.setAttribute('aria-hidden', 'false');
            openBtn.setAttribute('aria-expanded', 'true');
            closeBtn.focus();
        } else {
            megaMenu.classList.remove('active');
            document.body.classList.remove('mega-menu-open');
            document.body.style.overflow = '';
            megaMenu.setAttribute('aria-hidden', 'true');
            openBtn.setAttribute('aria-expanded', 'false');
            openBtn.focus();
        }
    };

    openBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));

    megaMenu.addEventListener('click', (event) => {
        if (event.target === megaMenu) {
            toggleMenu(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && megaMenu.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    // Also close menu when clicking on any links inside the menu (useful for anchor links)
    const menuLinks = megaMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });
}

/**
 * 3. Intersection Observer Scroll Reveal Animation
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null, // use viewport
        threshold: 0.15, // trigger when 15% is visible
        rootMargin: '0px 0px -50px 0px' // offset bottom trigger slightly
    });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * 4. Slow count-up animation for reassurance statistics
 */
function initCountUpStats() {
    const counters = document.querySelectorAll('.count-up[data-count]');
    if (counters.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const formatValue = (value, suffix) => `${Math.round(value)}${suffix || ''}`;

    const animateCounter = (counter) => {
        if (counter.dataset.counted === 'true') return;

        const target = Number(counter.dataset.count);
        if (!Number.isFinite(target)) return;

        const suffix = counter.dataset.suffix || '';
        counter.dataset.counted = 'true';

        if (prefersReducedMotion) {
            counter.textContent = formatValue(target, suffix);
            return;
        }

        const duration = 1800;
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = formatValue(target * eased, suffix);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.45
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * 5. Auto-moving product cards carousel
 */
function initProductMarquee() {
    const viewport = document.querySelector('.home-products-grid');
    if (!viewport || viewport.dataset.marqueeReady === 'true') return;

    const cards = Array.from(viewport.children);
    if (cards.length === 0) return;

    const track = document.createElement('div');
    track.className = 'home-products-track';

    cards.forEach(card => track.appendChild(card));

    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.tabIndex = -1;
        clone.classList.remove('reveal', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3');
        clone.style.opacity = '1';
        clone.style.transform = 'none';
        track.appendChild(clone);
    });

    viewport.appendChild(track);
    viewport.dataset.marqueeReady = 'true';

    const updateDistance = () => {
        const firstClone = track.children[cards.length];
        if (!firstClone) return;

        const distance = firstClone.offsetLeft - track.children[0].offsetLeft;
        viewport.style.setProperty('--product-marquee-distance', `-${distance}px`);
    };

    updateDistance();
    requestAnimationFrame(() => viewport.classList.add('is-animated'));
    window.addEventListener('resize', updateDistance);
}

/**
 * 6. Automatic Nav Link Active Highlight Detection
 */
function initActiveNavLinks() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    const desktopLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const setActive = (links) => {
        links.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentFile) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    setActive(desktopLinks);
    setActive(mobileLinks);
}

/**
 * 7. Interactive Portfolio Filters
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length === 0 || portfolioItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all filters and set on this one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(' ');

                if (category === 'all' || itemCategories.includes(category)) {
                    item.classList.remove('hidden');
                    // Small visual fade-in animation trigger
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                        item.style.transition = 'all 0.4s ease';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * 8. Contact Form Simulation & Label Animation
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input');

    // Float label adjustments (fallback trigger checking on load)
    inputs.forEach(input => {
        const checkContent = () => {
            if (input.value.trim() !== "") {
                input.setAttribute('placeholder-shown', 'false');
            } else {
                input.removeAttribute('placeholder-shown');
            }
        };

        input.addEventListener('blur', checkContent);
        input.addEventListener('input', checkContent);
        checkContent(); // Run immediately in case browser autofills
    });

    // Handle form submit simulation
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform basic mock checks
        let isValid = true;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && input.value.trim() === '') {
                isValid = false;
                input.style.borderBottomColor = '#E6007E'; // CMYK Magenta color for error
            }
        });

        if (!isValid) return;

        // If form valid, display a premium feedback message
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        setTimeout(() => {
            // Success alert / feedback message injection
            const feedbackEl = document.createElement('div');
            feedbackEl.className = 'form-success-feedback';
            feedbackEl.style.cssText = `
                background-color: #1179B8;
                color: #FFFFFF;
                padding: 1.25rem;
                margin-top: 1.5rem;
                border-radius: 4px;
                font-family: var(--font-body);
                font-weight: 600;
                text-align: center;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.4s ease;
            `;
            feedbackEl.textContent = 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.';

            form.appendChild(feedbackEl);
            form.reset();

            // Reset labels layout
            inputs.forEach(input => input.removeAttribute('placeholder-shown'));

            // Fade feedback in
            setTimeout(() => {
                feedbackEl.style.opacity = '1';
                feedbackEl.style.transform = 'translateY(0)';
            }, 100);

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Remove success box after 6 seconds
            setTimeout(() => {
                feedbackEl.style.opacity = '0';
                feedbackEl.style.transform = 'translateY(-10px)';
                setTimeout(() => feedbackEl.remove(), 400);
            }, 6000);

        }, 1500);
    });
}
