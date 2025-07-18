
// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// CTA Button function
function startTraining() {

    alert('Welcome to SM Gym! Ready to start your fitness journey?');

}

// Add active class to current nav item
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-element');
    const speed = 0.3;

    parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});





class FitnessCarousel {
    constructor() {
        this.grid = document.getElementById('programsGrid');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.getElementById('indicators');
        this.cards = document.querySelectorAll('.program-card');
        this.currentIndex = 0;
        this.cardsToShow = this.getCardsToShow();
        this.totalSlides = Math.max(0, this.cards.length - this.cardsToShow + 1);

        this.init();
        this.setupEventListeners();
        this.startAutoSlide();
    }

    getCardsToShow() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }

    init() {
        this.createIndicators();
        this.updateCarousel();
        this.setupCardAnimations();
    }

    createIndicators() {
        this.indicators.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(indicator);
        }
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Touch/swipe support
        let startX = 0;
        let isDragging = false;

        this.grid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.grid.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        this.grid.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.cardsToShow = this.getCardsToShow();
            this.totalSlides = Math.max(0, this.cards.length - this.cardsToShow + 1);
            this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
            this.createIndicators();
            this.updateCarousel();
        });
    }

    setupCardAnimations() {
        this.cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', () => {
                card.style.zIndex = '1';
            });

            // Add stagger animation on load
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fadeInUp');
        });

        // Book button animations
        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                            position: absolute;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.5);
                            transform: scale(0);
                            animation: ripple 0.6s linear;
                            width: ${size}px;
                            height: ${size}px;
                            left: ${x}px;
                            top: ${y}px;
                        `;

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

                // Scale animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    updateCarousel() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 40;
        const offset = -(this.currentIndex * (cardWidth + gap));

        this.grid.style.transform = `translateX(${offset}px)`;

        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.totalSlides - 1;

        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        // Add entrance animations to visible cards
        this.animateVisibleCards();
    }

    animateVisibleCards() {
        this.cards.forEach((card, index) => {
            const isVisible = index >= this.currentIndex && index < this.currentIndex + this.cardsToShow;

            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';

                // Animate list items
                const listItems = card.querySelectorAll('.features-list li');
                listItems.forEach((item, itemIndex) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, itemIndex * 100);
                });
            }
        });
    }

    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
            this.updateCarousel();
            this.resetAutoSlide();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
            this.resetAutoSlide();
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoSlide();
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (this.currentIndex >= this.totalSlides - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateCarousel();
        }, 5000);
    }

    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .fadeInUp {
                opacity: 0;
                transform: translateY(50px);
                animation: fadeInUp 0.8s ease-out forwards;
            }
        `;
document.head.appendChild(style);

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const carousel = new FitnessCarousel();

    // Pause auto-slide on hover
    const section = document.querySelector('.programs-section');
    section.addEventListener('mouseenter', () => carousel.stopAutoSlide());
    section.addEventListener('mouseleave', () => carousel.startAutoSlide());

    // Enhanced card interactions
    const cards = document.querySelectorAll('.program-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.program-card, .header').forEach(el => {
        observer.observe(el);
    });

    // Add particle effect on button click
    function createParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                        position: fixed;
                        width: 4px;
                        height: 4px;
                        background: var(--primary-orange);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 1000;
                        left: ${x}px;
                        top: ${y}px;
                    `;

            document.body.appendChild(particle);

            const angle = (i / 8) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let opacity = 1;
            let scale = 1;

            const animate = () => {
                const currentX = parseFloat(particle.style.left);
                const currentY = parseFloat(particle.style.top);

                particle.style.left = (currentX + vx * 0.02) + 'px';
                particle.style.top = (currentY + vy * 0.02) + 'px';

                opacity *= 0.95;
                scale *= 0.98;
                particle.style.opacity = opacity;
                particle.style.transform = `scale(${scale})`;

                if (opacity > 0.1) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };

            requestAnimationFrame(animate);
        }
    }

    // Add particle effect to book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createParticles(x, y);
        });
    });

    // Add floating animation to cards
    cards.forEach((card, index) => {
        const delay = index * 200;
        setTimeout(() => {
            card.style.animation = `float 6s ease-in-out infinite`;
            card.style.animationDelay = `${index * 0.5}s`;
        }, delay);
    });

    // Add floating keyframes
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `;
    document.head.appendChild(floatStyle);
});








let currentSlide = 0;
const totalSlides = 4;
const track = document.getElementById('carouselTrack');
const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Auto-play functionality
setInterval(() => {
    changeSlide(1);
}, 5000);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

// Smooth scroll animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out';
        }
    });
}, observerOptions);

document.querySelectorAll('.program-card').forEach(card => {
    observer.observe(card);
});

// Add hover effects and performance optimizations
const cards = document.querySelectorAll('.program-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});








// Testimonial Carousel with Progress Line
class TestimonialCarousel {
    constructor() {
        this.track = document.getElementById('tcCarouselTrack');
        this.progressBar = document.getElementById('tcProgressBar');
        this.prevBtn = document.getElementById('tcPrevBtn');
        this.nextBtn = document.getElementById('tcNextBtn');
        this.navDots = document.querySelectorAll('.tc-nav-dot');
        this.cards = document.querySelectorAll('.tc-testimonial-card');
        this.currentIndex = 0;
        this.totalSlides = this.cards.length;
        this.slideDuration = 5000; // 5 seconds per slide
        this.progressInterval = null;
        this.autoSlideTimeout = null;
        this.progressWidth = 0;
        this.isTransitioning = false;
        this.startTime = 0;

        this.init();
        this.setupEventListeners();
        this.startProgressLine();
    }

    init() {
        this.updateCarousel();
        this.resetProgressBar();
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.goToSlide(index);
                }
            });
        });

        // Pause progress on hover
        const section = document.querySelector('.tc-testimonial-section');
        section.addEventListener('mouseenter', () => this.pauseProgress());
        section.addEventListener('mouseleave', () => this.resumeProgress());
    }

    updateCarousel() {
        this.isTransitioning = true;
        
        // Update card positions
        this.cards.forEach((card, index) => {
            card.classList.remove('tc-active');
            if (index === this.currentIndex) {
                card.classList.add('tc-active');
            }
        });

        // Move track
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update navigation dots
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('tc-active', index === this.currentIndex);
        });

        // Allow transitions after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    startProgressLine() {
        this.resetProgressBar();
        this.startTime = Date.now();
        
        // Use requestAnimationFrame for smooth animation
        const animate = () => {
            const elapsed = Date.now() - this.startTime;
            this.progressWidth = (elapsed / this.slideDuration) * 100;
            
            // Smooth progress bar update
            this.progressBar.style.width = `${Math.min(this.progressWidth, 100)}%`;
            
            // When progress reaches 100%, move to next slide
            if (this.progressWidth >= 100) {
                this.nextSlide();
                return;
            }
            
            // Continue animation
            this.progressInterval = requestAnimationFrame(animate);
        };
        
        this.progressInterval = requestAnimationFrame(animate);
    }

    resetProgressBar() {
        this.progressWidth = 0;
        this.progressBar.style.width = '0%';
        if (this.progressInterval) {
            cancelAnimationFrame(this.progressInterval);
        }
    }

    pauseProgress() {
        if (this.progressInterval) {
            cancelAnimationFrame(this.progressInterval);
        }
    }

    resumeProgress() {
        // Continue from where we left off
        this.startTime = Date.now() - (this.progressWidth / 100) * this.slideDuration;
        
        const animate = () => {
            const elapsed = Date.now() - this.startTime;
            this.progressWidth = (elapsed / this.slideDuration) * 100;
            
            this.progressBar.style.width = `${Math.min(this.progressWidth, 100)}%`;
            
            if (this.progressWidth >= 100) {
                this.nextSlide();
                return;
            }
            
            this.progressInterval = requestAnimationFrame(animate);
        };
        
        this.progressInterval = requestAnimationFrame(animate);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
        this.startProgressLine(); // Restart progress line
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.startProgressLine(); // Restart progress line
    }

    goToSlide(index) {
        if (index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateCarousel();
        this.startProgressLine(); // Restart progress line
    }
}

// Initialize testimonial carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCarousel = new TestimonialCarousel();
});

// Add CSS for smooth transitions
const testimonialStyle = document.createElement('style');
testimonialStyle.textContent = `
    .tc-carousel-track {
        transition: transform 0.5s ease-in-out;
    }
    
    .tc-testimonial-card {
        transition: all 0.3s ease;
        opacity: 0.7;
    }
    
    .tc-testimonial-card.tc-active {
        opacity: 1;
    }
    
    .tc-progress-bar {
        transition: none !important;
        background: linear-gradient(90deg, #ff6b35, #f7931e);
        height: 4px;
        border-radius: 2px;
    }
    
    .tc-carousel-wrapper {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(testimonialStyle);