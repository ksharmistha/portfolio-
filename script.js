// Remove Loader when window loads
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
    }
});

// Dynamic Typing Effect
const roles = ["AI Enthusiast", "ML Learner", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 2000;

function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// Start typing effect on load
setTimeout(typeEffect, 1000);

// GSAP Animations with ScrollTrigger
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    const tlHero = gsap.timeline();
    tlHero.from(".greeting", { opacity: 0, y: 20, duration: 0.8, delay: 0.5 })
        .from(".display-2", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".roles-container", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .from(".lead", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".btn", { opacity: 0, y: 20, duration: 0.8, stagger: 0.2 }, "-=0.6")
        .from(".profile-card", { opacity: 0, x: 50, duration: 1, ease: "back.out(1.7)" }, "-=1")
        .from(".scroll-indicator", { opacity: 0, y: -20, duration: 1 }, "-=0.5");

    // Common scroll reveal utility
    const revealElements = (selector, yOffset = 50, staggerTime = 0) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0],
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: yOffset,
                duration: 1,
                stagger: staggerTime,
                ease: "power3.out"
            });
        }
    };

    // Apply reveals
    revealElements(".about-text", 50);
    revealElements(".about-cards .glass-card", 50, 0.2);
    revealElements(".timeline-item", 50, 0.2);
    revealElements(".skills-category", 40, 0.2);
    revealElements(".project-card-anim", 50, 0.15);
    revealElements(".achievements-anim", 50, 0.15);
    revealElements(".social-card", 30, 0.1);
    revealElements("#contactForm", 50);

    // Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    if (counters.length > 0) {
        ScrollTrigger.create({
            trigger: "#statistics",
            start: "top 85%",
            onEnter: () => {
                if (!hasCounted) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const obj = { val: 0 };

                        gsap.to(obj, {
                            val: target,
                            duration: 2.5,
                            ease: "power2.out",
                            onUpdate: function () {
                                counter.textContent = Math.round(obj.val) + "+";
                            }
                        });
                    });
                    hasCounted = true;
                }
            }
        });
    }
}

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }

        // Close mobile navbar if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// Navbar background styling on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 8, 22, 0.9)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'rgba(5, 8, 22, 0.7)';
        nav.style.boxShadow = 'none';
    }
});

// Contact Form → Formspree (delivers email directly to Gmail inbox)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn        = document.getElementById('contactSubmitBtn');
        const name       = document.getElementById('contactName').value.trim();
        const existingBanner = document.getElementById('formBanner');
        if (existingBanner) existingBanner.remove();

        // Loading state
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending…';

        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjyaebr';

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });

            const banner = document.createElement('div');
            banner.id = 'formBanner';
            banner.style.cssText = `
                margin-top: 16px;
                border-radius: 12px;
                padding: 14px;
                text-align: center;
                font-size: 0.95rem;
            `;

            if (response.ok) {
                banner.style.cssText += `
                    background: rgba(0,229,255,0.12);
                    border: 1px solid rgba(0,229,255,0.4);
                    color: #00e5ff;
                `;
                banner.innerHTML = `<i class="fas fa-check-circle" style="margin-right:8px;"></i>Message sent! I'll get back to you soon, ${name}.`;
                contactForm.reset();
            } else {
                const data = await response.json();
                const errMsg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.';
                banner.style.cssText += `
                    background: rgba(255,80,80,0.12);
                    border: 1px solid rgba(255,80,80,0.4);
                    color: #ff6b6b;
                `;
                banner.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right:8px;"></i>${errMsg}`;
            }

            contactForm.appendChild(banner);
            setTimeout(() => banner.remove(), 6000);

        } catch (err) {
            console.error('Form submission error:', err);
        } finally {
            btn.disabled = false;
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
        }
    });
}
