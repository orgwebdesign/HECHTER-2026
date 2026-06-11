// GSAP scroll animations for About page timeline
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate timeline items from left
    gsap.utils.toArray('.about-timeline-item').forEach(function(el, i) {
        gsap.from(el, {
            x: -60,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate timeline image from right
    var img = document.querySelector('.about-timeline-image');
    if (img) {
        gsap.from(img, {
            x: 80,
            autoAlpha: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about-timeline-grid',
                start: 'top 80%'
            }
        });
    }

    // Small stagger for section labels when they enter
    gsap.utils.toArray('.about-section-label').forEach(function(label) {
        gsap.from(label, {
            y: 16,
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: label,
                start: 'top 92%'
            }
        });
    });
}
