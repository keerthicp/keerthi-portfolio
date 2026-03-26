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

// ===== Navbar Background on Scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
