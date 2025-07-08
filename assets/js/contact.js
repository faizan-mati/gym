  // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Animation for form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.style.pointerEvents = 'none';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.pointerEvents = '';
                }, 2000);
            }, 2000);
        });

        // Animate elements on scroll
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
        document.querySelectorAll('.section-title, .contact-info, .contact-form, .map-section, .social-section').forEach(el => {
            observer.observe(el);
        });

        // Add floating animation to form inputs
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });

        // Particle effect for background
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'var(--primary-orange)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.opacity = '0.7';
            
            document.querySelector('.contact-section').appendChild(particle);
            
            const duration = Math.random() * 3000 + 2000;
            const animation = particle.animate([
                { transform: 'translateY(0px)', opacity: 0.7 },
                { transform: 'translateY(-100vh)', opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear'
            });
            
            animation.onfinish = () => particle.remove();
        }

        // Create particles periodically
        setInterval(createParticle, 300);

        // Map interaction enhancement
        const mapFrame = document.querySelector('.map-frame');
        const mapWrapper = document.querySelector('.map-wrapper');
        
        mapWrapper.addEventListener('mouseenter', function() {
            mapFrame.style.transform = 'scale(1.02)';
            mapFrame.style.transition = 'transform 0.3s ease';
        });
        
        mapWrapper.addEventListener('mouseleave', function() {
            mapFrame.style.transform = 'scale(1)';
        });

        // Responsive map height adjustment
        function adjustMapHeight() {
            const mapFrame = document.querySelector('.map-frame');
            if (window.innerWidth <= 768) {
                mapFrame.style.height = '300px';
            } else if (window.innerWidth <= 480) {
                mapFrame.style.height = '250px';
            } else {
                mapFrame.style.height = '400px';
            }
        }

        window.addEventListener('resize', adjustMapHeight);
        adjustMapHeight(); // Initial call

        // Add touch feedback for mobile
        if ('ontouchstart' in window) {
            document.querySelectorAll('.social-link, .info-item, .submit-btn').forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                element.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
        }

        // Smooth scroll for anchor links
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

        // Enhanced form validation
        const formInputs = document.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });

        function validateInput(input) {
            const value = input.value.trim();
            const parent = input.parentElement;
            
            // Remove existing error styling
            parent.classList.remove('error');
            
            if (input.hasAttribute('required') && !value) {
                parent.classList.add('error');
                return false;
            }
            
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    parent.classList.add('error');
                    return false;
                }
            }
            
            if (input.type === 'tel' && value) {
                const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    parent.classList.add('error');
                    return false;
                }
            }
            
            return true;
        }

        // Add error styling to CSS
        const style = document.createElement('style');
        style.textContent = `
            .form-group.error .form-control {
                border-color: #ff4757 !important;
                box-shadow: 0 0 20px rgba(255, 71, 87, 0.3) !important;
            }
            
            .form-group.error .form-label {
                color: #ff4757 !important;
            }
        `;
        document.head.appendChild(style);

        // Intersection Observer for staggered animations
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        // Apply staggered animation to info items
        document.querySelectorAll('.info-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            staggerObserver.observe(item);
        });