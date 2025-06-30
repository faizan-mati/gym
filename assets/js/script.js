
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



 let currentSlide = 0;
        const cards = document.querySelectorAll('.program-card');
        const totalCards = cards.length;
        const track = document.getElementById('carouselTrack');
        const indicators = document.querySelectorAll('.indicator');
        
        function updateCarousel() {
            const containerWidth = track.parentElement.offsetWidth;
            const offset = -currentSlide * containerWidth;
            track.style.transform = `translateX(${offset}px)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === Math.floor(currentSlide / 2));
            });
        }
        
        function moveCarousel(direction) {
            const maxSlide = Math.ceil(totalCards / 2) - 1;
            
            if (direction > 0) {
                currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
            } else {
                currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
            }
            
            updateCarousel();
        }
        
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }
        
        // Auto-scroll functionality (optional)
        setInterval(() => {
            moveCarousel(1);
        }, 5000);
        
        // Handle window resize
        window.addEventListener('resize', updateCarousel);