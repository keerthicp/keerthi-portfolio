// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');

    if (navMenu.classList.contains('active')) {
        icon.classList.remove('ri-menu-line');
        icon.classList.add('ri-close-line');
    } else {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
    }
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
    });
});

// ===== Navbar Background & Scroll Up =====
const navbar = document.getElementById('navbar');
const scrollUp = document.getElementById('scrollUp');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll up button visibility
    if (scrollUp) {
        if (window.scrollY >= 350) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
});

// ===== Active Section Highlighting =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Smooth Scrolling =====
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

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.service-card, .portfolio-card, .testimonial-card, .about-content, .contact-content'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Contact Form Validation & AJAX Submission =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Always prevent default to avoid redirect

    const formInputs = contactForm.querySelectorAll('.form-input');
    let isValid = true;

    // Validate inputs
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'hsl(0, 100%, 60%)';

            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });

    // If validation fails, stop here
    if (!isValid) {
        return false;
    }

    // Get form data
    const formData = new FormData(contactForm);

    try {
        // Submit to Formspree using AJAX
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            successMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #6c63ff, #5a52e8);
                color: white;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;

            document.body.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
        } else {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
            errorMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #dc3545, #c82333);
                color: white;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;

            document.body.appendChild(errorMessage);

            setTimeout(() => {
                errorMessage.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    errorMessage.remove();
                }, 300);
            }, 3000);
        }
    } catch (error) {
        // Show error message for network issues
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Network error! Please check your connection and try again.';
        errorMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #dc3545, #c82333);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(errorMessage);

        setTimeout(() => {
            errorMessage.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                errorMessage.remove();
            }, 300);
        }, 3000);
    }
});

// Add animation keyframes for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Typing Effect for Hero Subtitle (Optional Enhancement) =====
const heroSubtitle = document.querySelector('.hero-subtitle');
const subtitleText = heroSubtitle.textContent;
heroSubtitle.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < subtitleText.length) {
        heroSubtitle.textContent += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ===== Portfolio Card Click Effect =====
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add a pulse animation
        card.style.animation = 'pulse 0.5s ease';

        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    scrollActive();

    // Add entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.style.opacity = '0';
        heroImage.style.opacity = '0';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroImage.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
            heroImage.style.opacity = '1';
        }, 100);
    }
});

// ===== Neural Network Background Animation =====
(function () {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ---- Config ----
    const NODE_COUNT = 55;
    const CONNECTION_DISTANCE = 160;
    const NODE_RADIUS_MIN = 1.5;
    const NODE_RADIUS_MAX = 4;
    const SPEED = 0.45;
    const MOUSE_ATTRACT_DIST = 200;
    const MOUSE_ATTRACT_FORCE = 0.04;
    const HUB_COUNT = 6; // larger "intelligence" hub nodes

    let mouse = { x: -9999, y: -9999 };
    let isDark = document.body.classList.contains('dark-theme');
    let nodes = [];
    let pulses = []; // ripple pulse animations on hubs
    let animId;

    // ---- Colour helpers ----
    function getPrimaryRGB() {
        // Always use the brand purple
        return { r: 108, g: 99, b: 255 };
    }

    function getColors() {
        const c = getPrimaryRGB();
        const nodeAlpha    = isDark ? 0.75 : 0.55;
        const lineAlpha    = isDark ? 0.18 : 0.13;
        const pulseAlpha   = isDark ? 0.30 : 0.18;
        const hubAlpha     = isDark ? 0.90 : 0.70;
        return { c, nodeAlpha, lineAlpha, pulseAlpha, hubAlpha };
    }

    // ---- Build nodes ----
    function createNodes() {
        nodes = [];
        pulses = [];
        const w = canvas.width;
        const h = canvas.height;

        for (let i = 0; i < NODE_COUNT; i++) {
            const isHub = i < HUB_COUNT;
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r: isHub
                    ? NODE_RADIUS_MAX * 1.8 + Math.random() * 2
                    : NODE_RADIUS_MIN + Math.random() * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
                isHub,
                pulseTimer: isHub ? Math.random() * 120 : 0,
            });
        }
    }

    // ---- Resize canvas to match hero section ----
    function resize() {
        const hero = document.getElementById('home');
        canvas.width = hero ? hero.offsetWidth : window.innerWidth;
        canvas.height = hero ? hero.offsetHeight : window.innerHeight;
        createNodes();
    }

    // ---- Draw a single frame ----
    function draw() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const colors = getColors();
        const { c } = colors;

        // --- Update nodes ---
        nodes.forEach(node => {
            // Mouse attraction
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_ATTRACT_DIST && dist > 0) {
                node.vx += (dx / dist) * MOUSE_ATTRACT_FORCE;
                node.vy += (dy / dist) * MOUSE_ATTRACT_FORCE;
            }

            // Dampen velocity (keep it from accelerating infinitely)
            node.vx *= 0.995;
            node.vy *= 0.995;
            // Clamp speed
            const speed = Math.sqrt(node.vx ** 2 + node.vy ** 2);
            if (speed > SPEED * 2) {
                node.vx = (node.vx / speed) * SPEED * 2;
                node.vy = (node.vy / speed) * SPEED * 2;
            }

            node.x += node.vx;
            node.y += node.vy;

            // Bounce off walls
            if (node.x < node.r)     { node.x = node.r;     node.vx *= -1; }
            if (node.x > w - node.r) { node.x = w - node.r; node.vx *= -1; }
            if (node.y < node.r)     { node.y = node.r;     node.vy *= -1; }
            if (node.y > h - node.r) { node.y = h - node.r; node.vy *= -1; }

            // Hub pulse trigger
            if (node.isHub) {
                node.pulseTimer--;
                if (node.pulseTimer <= 0) {
                    pulses.push({ x: node.x, y: node.y, r: node.r, maxR: 60 + Math.random() * 40, life: 1 });
                    node.pulseTimer = 90 + Math.random() * 90;
                }
            }
        });

        // --- Draw connections ---
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DISTANCE) {
                    const fade = 1 - dist / CONNECTION_DISTANCE;
                    const alpha = colors.lineAlpha * fade * (a.isHub || b.isHub ? 2.5 : 1);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${Math.min(alpha, 0.55)})`;
                    ctx.lineWidth = a.isHub || b.isHub ? 1.2 : 0.7;
                    ctx.stroke();
                }
            }
        }

        // --- Draw pulses (ripple rings from hubs) ---
        pulses = pulses.filter(p => p.life > 0);
        pulses.forEach(p => {
            p.r += 1.5;
            p.life -= 0.016;
            const alpha = colors.pulseAlpha * p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // --- Draw nodes ---
        nodes.forEach(node => {
            const alpha = node.isHub ? colors.hubAlpha : colors.nodeAlpha;

            // Outer glow for hubs
            if (node.isHub) {
                const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 4);
                grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha * 0.4})`);
                grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r * 4, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // Node dot
            const grad2 = ctx.createRadialGradient(node.x - node.r * 0.3, node.y - node.r * 0.3, 0, node.x, node.y, node.r);
            grad2.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha})`);
            grad2.addColorStop(1, `rgba(${c.r},${c.g},${c.b},${alpha * 0.6})`);
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            ctx.fillStyle = grad2;
            ctx.fill();
        });

        animId = requestAnimationFrame(draw);
    }

    // ---- Mouse tracking (relative to hero) ----
    document.getElementById('home').addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    document.getElementById('home').addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    // ---- React to dark/light mode toggle ----
    const themeObserver = new MutationObserver(() => {
        isDark = document.body.classList.contains('dark-theme');
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // ---- Init ----
    resize();
    window.addEventListener('resize', resize);
    draw();
})();

// ===== Dark Theme Toggle =====
const themeButton = document.getElementById('theme-button');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check if user previously saved a theme preference
const currentTheme = localStorage.getItem('portfolio-theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('ri-moon-line');
            themeIcon.classList.add('ri-sun-line');
        }
    }
}

// Toggle theme on button click
if (themeButton) {
    themeButton.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        let theme = 'light';

        if (body.classList.contains('dark-theme')) {
            theme = 'dark';
            themeIcon.classList.remove('ri-moon-line');
            themeIcon.classList.add('ri-sun-line');
        } else {
            themeIcon.classList.remove('ri-sun-line');
            themeIcon.classList.add('ri-moon-line');
        }

        // Save preference to localStorage
        localStorage.setItem('portfolio-theme', theme);
    });
}
