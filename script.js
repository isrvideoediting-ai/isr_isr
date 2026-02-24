// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar Color Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.padding = '15px 5%';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.padding = '20px 5%';
    }

    // show/hide scroll top button
    const scrollBtn = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const closeBtn = document.querySelector('.close-menu');
if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

if (closeBtn && navMenu) {
    closeBtn.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// contact form placeholder handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Nous reviendrons vers vous rapidement.');
        contactForm.reset();
    });
}