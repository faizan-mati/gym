//  =========================== About us Section ==================================

// Image slider functionality
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 3 seconds
setInterval(nextSlide, 3000);

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.about-header, .about-text, .about-image, .cta-section').forEach(el => {
    observer.observe(el);
});

// Text reveal animation
const textElements = document.querySelectorAll('.about-text p');
textElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.animation = `fadeInUp 0.8s ease forwards ${0.5 + index * 0.2}s`;
});


// ==================================== Card Section ====================================
   const observerOptions2 = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions2);

        document.querySelectorAll('.credential-card').forEach(card => {
            observer2.observe(card);
        });

        // Add click handlers for certificate buttons
        document.querySelectorAll('.view-cert-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cardTitle = this.closest('.credential-card').querySelector('.cert-title').textContent;
                alert(`Opening certificate: ${cardTitle}`);
            });
        });
