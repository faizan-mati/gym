
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
                    btn.addEventListener('click', function(e) {
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
        document.addEventListener('DOMContentLoaded', function() {
            const carousel = new FitnessCarousel();
            
            // Pause auto-slide on hover
            const section = document.querySelector('.programs-section');
            section.addEventListener('mouseenter', () => carousel.stopAutoSlide());
            section.addEventListener('mouseleave', () => carousel.startAutoSlide());
            
            // Enhanced card interactions
            const cards = document.querySelectorAll('.program-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
                });
                
                card.addEventListener('mouseleave', function() {
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
                btn.addEventListener('click', function(e) {
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





           function switchSchedule(section) {
            // Update tab buttons
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));

            // Update sections
            const sections = document.querySelectorAll('.timing-section');
            sections.forEach(sec => sec.classList.remove('section-active'));

            // Activate selected tab and section
            if (section === 'gents') {
                tabButtons[0].classList.add('active-tab');
                document.getElementById('gents-schedule').classList.add('section-active');
            } else {
                tabButtons[1].classList.add('active-tab');
                document.getElementById('ladies-schedule').classList.add('section-active');
            }

            // Reset animations for cards
            const cards = document.querySelectorAll('.daily-card');
            cards.forEach((card, index) => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `cardSlideUp 0.6s ease-out ${(index + 1) * 0.1}s forwards`;
                }, 50);
            });
        }






              // Enhanced interactions and animations
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth parallax effect on scroll
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const shapes = document.querySelectorAll('.shape');
                const bg = document.querySelector('.animated-bg');
                
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.1;
                    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                });
                
                bg.style.transform = `translateY(${scrolled * 0.05}px)`;
            });

            // Interactive card tilt effect
            const cards = document.querySelectorAll('.visual-card, .feature-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });

            // Button ripple effect
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple-effect');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                });
            });

            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);

            // Counter animation for stats
            const animateCounters = () => {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = counter.textContent;
                    const isPercentage = target.includes('%');
                    const isTime = target.includes('/');
                    const isNumber = target.includes('K+');
                    
                    let endValue = parseInt(target);
                    if (isNumber) endValue = 5;
                    if (isPercentage) endValue = 98;
                    if (isTime) endValue = 24;
                    
                    let current = 0;
                    const increment = endValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= endValue) {
                            current = endValue;
                            clearInterval(timer);
                        }
                        
                        if (isNumber) {
                            counter.textContent = Math.floor(current) + 'K+';
                        } else if (isPercentage) {
                            counter.textContent = Math.floor(current) + '%';
                        } else if (isTime) {
                            counter.textContent = Math.floor(current) + '/7';
                        }
                    }, 50);
                });
            };

            // Start counter animation when stats are visible
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            });

            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                statsObserver.observe(statsSection);
            }
        });

        // Add ripple effect styles
        const rippleStyles = document.createElement('style');
        rippleStyles.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);