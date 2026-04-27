// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typing Animation
const words = ["Mafunzo", "Semina", "Warsha", "Mikutano", "Sherehe"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedTextElement = document.getElementById('typedText');

function typeEffect() {
    if (!typedTextElement) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
        return;
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
if (slides.length) {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => hamburger.classList.toggle('active'));
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link, .btn-book-nav').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const observerOptions = { threshold: 0.3, rootMargin: '0px' };
const startCounter = (el, target) => {
    let current = 0;
    const increment = target / 50;
    const update = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else el.textContent = target;
    };
    update();
};
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            if (!isNaN(target)) startCounter(el, target);
            counterObserver.unobserve(el);
        }
    });
}, observerOptions);
counters.forEach(c => counterObserver.observe(c));

// Featured Menu Data
const featuredMenu = [
    { name: "Pilau ya Nyama", desc: "Wali wa pilau na nyama laini", price: "TSh 5,000", img: "https://images.unsplash.com/photo-1563379091339-03b21f4a5e5b?w=300" },
    { name: "Kuku Choma", desc: "Kuku aliyechomwa kwa viungo", price: "TSh 6,000", img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300" },
    { name: "Samaki wa Kukaanga", desc: "Samaki mkavu wa kukaanga", price: "TSh 7,000", img: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=300" },
    { name: "Mandazi na Chai", desc: "Mandazi tamu na chai moto", price: "TSh 1,500", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300" }
];

function loadFeaturedMenu() {
    const container = document.getElementById('featuredMenuGrid');
    if (container) {
        container.innerHTML = featuredMenu.map(item => `
            <div class="menu-card">
                <div class="menu-image"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
                <div class="menu-content"><h3>${item.name}</h3><p>${item.desc}</p><div class="menu-price">${item.price}</div></div>
            </div>
        `).join('');
    }
}

// Testimonials Data
const testimonialsData = [
    { text: "Aden Catering walitoa chakula bora kwa mafunzo yetu. Walifika kwa wakati na chakula kilikuwa kitamu sana!", name: "John Mwita", role: "Mratibu wa Mafunzo" },
    { text: "Tulikuwa na wageni 300 kwenye mkutano wetu. Chakula kilikuwa kizuri na timu ilikuwa ya kitaalamu!", name: "Sarah Hassan", role: "Mratibu wa Mkutano" },
    { text: "Bei nafuu na huduma nzuri. Pilau na kuku vilikuwa vyema! Nitarudi tena.", name: "Peter Lema", role: "Mwenyeji wa Semina" }
];

function loadTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (container) {
        container.innerHTML = testimonialsData.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author"><h4>${t.name}</h4><p>${t.role}</p></div>
            </div>
        `).join('');
    }
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName')?.value || '';
            const phone = document.getElementById('contactPhone')?.value || '';
            const message = document.getElementById('contactMessage')?.value || '';
            const subject = `Swali la Huduma kutoka ${name}`;
            const body = `Jina: ${name}%0ANamba: ${phone}%0AUjumbe: ${message}`;
            window.location.href = `mailto:nopaynoga@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            const msgDiv = document.getElementById('formMessage');
            if (msgDiv) {
                msgDiv.innerHTML = '<div style="background:#d4edda; color:#155724; padding:10px; border-radius:10px; margin-top:15px;">✓ Ujumbe umetumwa! Tutawasiliana nawe ndani ya masaa 2.</div>';
                form.reset();
                setTimeout(() => msgDiv.innerHTML = '', 5000);
            }
        });
    }
}

// Booking Form Handler
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bookingName')?.value || '';
            const phone = document.getElementById('bookingPhone')?.value || '';
            const guests = document.getElementById('bookingGuests')?.value || '';
            const date = document.getElementById('bookingDate')?.value || '';
            const subject = `Ombi la Nukuu ya Bei kutoka ${name}`;
            const body = `Jina: ${name}%0ANamba: ${phone}%0aWageni: ${guests}%0ATarehe: ${date}`;
            window.location.href = `mailto:nopaynoga@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            const msgDiv = document.getElementById('bookingMessage');
            if (msgDiv) {
                msgDiv.innerHTML = '<div style="background:#d4edda; color:#155724; padding:10px; border-radius:10px; margin-top:15px;">✓ Ombi limepokelewa! Tutawasiliana nawe ndani ya masaa 2.</div>';
                form.reset();
                setTimeout(() => msgDiv.innerHTML = '', 5000);
            }
        });
    }
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => backToTop.style.display = window.scrollY > 500 ? 'flex' : 'none');
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedMenu();
    loadTestimonials();
    initContactForm();
    initBookingForm();
});

// Update Copyright Year
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', new Date().getFullYear());
}