    // Minimal JavaScript for enhanced interactions
        document.addEventListener('DOMContentLoaded', function() {
            // Add click handlers for buttons
            document.querySelectorAll('.sm-buy-button, .sm-wishlist-button, .sm-view-all-button').forEach(button => {
                button.addEventListener('click', function() {
                    console.log('Button clicked:', this.textContent.trim());
                });
            });

            // Add keyboard accessibility
            document.querySelectorAll('.sm-product-item').forEach(item => {
                item.setAttribute('tabindex', '0');
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        this.querySelector('.sm-buy-button').click();
                    }
                });
            });
        });