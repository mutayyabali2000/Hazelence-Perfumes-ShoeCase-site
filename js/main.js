/**
 * HAZELENCE | Premium Perfume Showcase
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove to let them animate out and back in
                entry.target.classList.remove('visible');
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 3. Hero Carousel & Dynamic Theming ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
        // Handle boundaries
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active to current
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Extract Theme from slide and apply to Body
        const newTheme = slides[index].getAttribute('data-theme');
        document.body.className = newTheme; // Replaces existing theme classes

        currentSlide = index;
    }

    // Event Listeners for Controls
    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }

    // Event Listeners for Pagination Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Optional: Auto-play the slider
    // let slideInterval = setInterval(() => { goToSlide(currentSlide + 1); }, 6000);
    // Pause on hover
    // const sliderContainer = document.querySelector('.hero-slider');
    // sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    // sliderContainer.addEventListener('mouseleave', () => {
    // --- 4. Particle Generation (Perfume Aura Effect) ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            let particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            let left = Math.random() * 100 + 'vw';
            let duration = (Math.random() * 15 + 10) + 's';
            let delay = Math.random() * 15 + 's';
            let size = Math.random() * 5 + 2 + 'px';
            
            particle.style.left = left;
            particle.style.width = size;
            particle.style.height = size;
            particle.style.setProperty('--duration', duration);
            particle.style.animationDelay = delay;
            
            particlesContainer.appendChild(particle);
        }
    }

    // --- 5. 3D Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card, .collection-card, .test-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        });
    });
});
