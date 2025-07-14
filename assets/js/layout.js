    // Professional navbar scroll effect
        let lastScrollTop = 0;
        let ticking = false;

        function updateNavbar() {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });

        // Professional active link management
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links with smooth transition
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section if needed
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Enhanced professional hover effects
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-1px)';
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });

        // Smooth brand animation
        const brand = document.querySelector('.navbar-brand');
        brand.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        brand.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Professional mobile menu handling
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        navbarToggler.addEventListener('click', function() {
            // Add smooth transition for mobile menu
            navbarCollapse.style.transition = 'all 0.3s ease';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });

        // Performance optimization: Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateNavbar, 10);
        });
