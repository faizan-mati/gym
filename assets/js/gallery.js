  class GalleryLightbox {
            constructor() {
                this.galleryItems = document.querySelectorAll('.gallery-card');
                this.lightbox = document.getElementById('lightbox');
                this.lightboxImg = document.getElementById('lightbox-img');
                this.lightboxClose = document.getElementById('lightbox-close');
                this.lightboxPrev = document.getElementById('lightbox-prev');
                this.lightboxNext = document.getElementById('lightbox-next');
                this.lightboxCounter = document.getElementById('lightbox-counter');
                this.currentIndex = 0;
                this.images = [];
                
                this.init();
            }
            
            init() {
                // Collect all images
                this.galleryItems.forEach((item, index) => {
                    const img = item.querySelector('img');
                    this.images.push({
                        src: img.src,
                        alt: img.alt
                    });
                    
                    // Add click event to each gallery item
                    item.addEventListener('click', () => {
                        this.openLightbox(index);
                    });
                });
                
                // Add event listeners
                this.lightboxClose.addEventListener('click', () => this.closeLightbox());
                this.lightboxPrev.addEventListener('click', () => this.prevImage());
                this.lightboxNext.addEventListener('click', () => this.nextImage());
                
                // Close on background click
                this.lightbox.addEventListener('click', (e) => {
                    if (e.target === this.lightbox) {
                        this.closeLightbox();
                    }
                });
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (this.lightbox.classList.contains('active')) {
                        switch(e.key) {
                            case 'Escape':
                                this.closeLightbox();
                                break;
                            case 'ArrowLeft':
                                this.prevImage();
                                break;
                            case 'ArrowRight':
                                this.nextImage();
                                break;
                        }
                    }
                });
            }
            
            openLightbox(index) {
                this.currentIndex = index;
                this.updateLightboxContent();
                this.lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            closeLightbox() {
                this.lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            nextImage() {
                this.currentIndex = (this.currentIndex + 1) % this.images.length;
                this.updateLightboxContent();
            }
            
            prevImage() {
                this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
                this.updateLightboxContent();
            }
            
            updateLightboxContent() {
                const currentImage = this.images[this.currentIndex];
                this.lightboxImg.src = currentImage.src;
                this.lightboxImg.alt = currentImage.alt;
                this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
                
                // Add loading animation
                this.lightboxImg.style.opacity = '0';
                this.lightboxImg.onload = () => {
                    this.lightboxImg.style.opacity = '1';
                };
            }
        }
        
        // Intersection Observer for scroll animations
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
        
        // Observe all gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            observer.observe(item);
        });
        
        // Initialize lightbox when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new GalleryLightbox();
        });
        
        // Add some interactive effects
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.animationName = 'pulse';
                this.style.animationDuration = '2s';
                this.style.animationIterationCount = 'infinite';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.animationName = '';
            });
        });