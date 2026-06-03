// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// Animations, Scroll Effects, and Interactions
// ============================================

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animations to elements with scroll-animate class
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// ============================================
// SKILL BARS ANIMATION
// ============================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');

    skillBars.forEach(bar => {
        const percentage = bar.parentElement.dataset.percentage || 80;
        bar.style.animationPlayState = 'running';
        bar.style.setProperty('--bar-width', percentage + '%');
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 100);
    });
}

// Trigger skill bar animation when education section is visible
const educationSection = document.querySelector('#education');
if (educationSection) {
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                educationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    educationObserver.observe(educationSection);
}

// ============================================
// STAT COUNTERS
// ============================================

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(element => {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        let current = 0;
        const increment = target / 30;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.textContent.replace(/\d+/, target);
                clearInterval(counter);
            } else {
                const suffix = element.textContent.match(/[a-zA-Z+]/g) ? element.textContent.match(/[a-zA-Z+]/g)[0] : '';
                element.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message, 'success');
                contactForm.reset();
            } else {
                showMessage(result.message || 'Something went wrong', 'error');
            }
        } catch (error) {
            showMessage('Failed to send message. Please try again.', 'error');
            console.error('Error:', error);
        }
    });
}

function showMessage(message, type) {
    // Create a toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#e85d87' : '#d63a5a'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(232, 93, 135, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// MOBILE NAVIGATION
// ============================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e85d87 0%, #d63a5a 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(232, 93, 135, 0.3);
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTopBtn.addEventListener('mouseover', () => {
        backToTopBtn.style.transform = 'scale(1.1)';
    });

    backToTopBtn.addEventListener('mouseout', () => {
        backToTopBtn.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ============================================
// ACTIVE NAV LINK
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ============================================
// TYPING EFFECT
// ============================================

function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing effect to hero tagline
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const text = tagline.textContent;
    setTimeout(() => {
        typeEffect(tagline, text, 30);
    }, 500);
}

// ============================================
// PAGE TRANSITIONS
// ============================================

// Fade in effect for page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Smooth page transitions
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-out';

        setTimeout(() => {
            window.location.href = e.target.getAttribute('href');
        }, 300);
    }
});

// ============================================
// CARD HOVER EFFECTS
// ============================================

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// ============================================
// LAZY LOADING
// ============================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get current year for footer
function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', updateYear);

// Ripple effect on button click
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Portfolio website loaded successfully!');