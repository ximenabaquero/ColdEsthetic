// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Schedule Form - Send to WhatsApp
const scheduleForm = document.getElementById('scheduleForm');

scheduleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Get service name in Spanish
    const serviceNames = {
        'lipolisis': 'Lipólisis',
        'criolipolisis': 'Criolipólisis',
        'rejuvenecimiento': 'Rejuvenecimiento Facial',
        'moldeo': 'Moldeo Corporal'
    };
    
    const serviceName = serviceNames[service] || service;
    
    // Create WhatsApp message
    let whatsappMessage = `Hola, quiero agendar una cita\n\n`;
    whatsappMessage += `Nombre: ${name}\n`;
    whatsappMessage += `Teléfono: ${phone}\n`;
    whatsappMessage += `Email: ${email}\n`;
    whatsappMessage += `Servicio: ${serviceName}\n`;
    
    if (message) {
        whatsappMessage += `Mensaje: ${message}`;
    }
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp number (update with real number)
    const whatsappNumber = '573001234567';
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset form
    scheduleForm.reset();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
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

// Observe all service cards, testimonial cards, and steps
document.querySelectorAll('.service-card, .testimonial-card, .step, .result-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});
