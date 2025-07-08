  // Form state
        let selectedProduct = null;
        let selectedQuantity = 1;
        let productPrice = 0;

        // DOM elements
        const productDropdown = document.getElementById('productDropdown');
        const productOptions = document.getElementById('productOptions');
        const quantityDropdown = document.getElementById('quantityDropdown');
        const quantityOptions = document.getElementById('quantityOptions');
        const totalPrice = document.getElementById('totalPrice');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        const form = document.getElementById('quoteForm');

        // Product dropdown functionality
        productDropdown.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            closeAllDropdowns();
            if (!isActive) {
                this.classList.add('active');
                productOptions.classList.add('show');
            }
        });

        // Quantity dropdown functionality
        quantityDropdown.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            closeAllDropdowns();
            if (!isActive) {
                this.classList.add('active');
                quantityOptions.classList.add('show');
            }
        });

        // Product option selection
        productOptions.addEventListener('click', function(e) {
            if (e.target.closest('.dropdown-option')) {
                const option = e.target.closest('.dropdown-option');
                const value = option.getAttribute('data-value');
                const price = parseInt(option.getAttribute('data-price'));
                const name = option.querySelector('.option-name').textContent;
                
                // Update selected product
                selectedProduct = value;
                productPrice = price;
                
                // Update UI
                productDropdown.querySelector('span').textContent = name;
                productDropdown.classList.remove('placeholder');
                
                // Update selected state
                document.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Update total price
                updateTotalPrice();
                
                // Close dropdown
                closeAllDropdowns();
                
                // Clear validation
                clearValidation('productValidation');
            }
        });

        // Quantity option selection
        quantityOptions.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-option')) {
                const option = e.target;
                const value = option.getAttribute('data-value');
                
                // Update selected quantity
                selectedQuantity = value === '10+' ? 10 : parseInt(value);
                
                // Update UI
                quantityDropdown.querySelector('span').textContent = value;
                
                // Update selected state
                document.querySelectorAll('.quantity-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Update total price
                updateTotalPrice();
                
                // Close dropdown
                closeAllDropdowns();
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.custom-dropdown') && !e.target.closest('.quantity-dropdown')) {
                closeAllDropdowns();
            }
        });

        // Close all dropdowns
        function closeAllDropdowns() {
            document.querySelectorAll('.dropdown-selected, .quantity-selected').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-options, .quantity-options').forEach(options => {
                options.classList.remove('show');
            });
        }

        // Update total price display
        function updateTotalPrice() {
            if (selectedProduct && productPrice > 0) {
                const total = productPrice * selectedQuantity;
                totalPrice.innerHTML = `<i class="fas fa-tag" style="margin-right: 8px;"></i>PKR ${total.toLocaleString()}`;
                totalPrice.classList.add('updated');
                setTimeout(() => totalPrice.classList.remove('updated'), 600);
            }
        }

        // Form validation
        function validateField(fieldId, validationId, validator) {
            const field = document.getElementById(fieldId);
            const validation = document.getElementById(validationId);
            const value = field.value.trim();
            
            if (validator(value)) {
                showValidation(validation, '', 'success');
                field.classList.remove('error');
                return true;
            } else {
                return false;
            }
        }

        function showValidation(element, message, type) {
            element.textContent = message;
            element.className = `form-validation show ${type}`;
        }

        function clearValidation(validationId) {
            const validation = document.getElementById(validationId);
            validation.className = 'form-validation';
            validation.textContent = '';
        }

        // Validators
        const validators = {
            name: (value) => value.length >= 2,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value)
        };

        // Real-time validation
        document.getElementById('fullName').addEventListener('input', function() {
            const value = this.value.trim();
            const validation = document.getElementById('nameValidation');
            
            if (value.length === 0) {
                clearValidation('nameValidation');
            } else if (value.length < 2) {
                showValidation(validation, 'Name must be at least 2 characters long', 'error');
            } else {
                showValidation(validation, 'Looks good!', 'success');
            }
        });

        document.getElementById('email').addEventListener('input', function() {
            const value = this.value.trim();
            const validation = document.getElementById('emailValidation');
            
            if (value.length === 0) {
                clearValidation('emailValidation');
            } else if (!validators.email(value)) {
                showValidation(validation, 'Please enter a valid email address', 'error');
            } else {
                showValidation(validation, 'Looks good!', 'success');
            }
        });

        document.getElementById('phone').addEventListener('input', function() {
            const value = this.value.trim();
            const validation = document.getElementById('phoneValidation');
            
            if (value.length === 0) {
                clearValidation('phoneValidation');
            } else if (!validators.phone(value)) {
                showValidation(validation, 'Please enter a valid phone number', 'error');
            } else {
                showValidation(validation, 'Looks good!', 'success');
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all fields
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!validators.name(name)) {
                showValidation(document.getElementById('nameValidation'), 'Please enter your full name', 'error');
                isValid = false;
            }
            
            if (!validators.email(email)) {
                showValidation(document.getElementById('emailValidation'), 'Please enter a valid email address', 'error');
                isValid = false;
            }
            
            if (!validators.phone(phone)) {
                showValidation(document.getElementById('phoneValidation'), 'Please enter a valid phone number', 'error');
                isValid = false;
            }
            
            if (!selectedProduct) {
                showValidation(document.getElementById('productValidation'), 'Please select a product', 'error');
                isValid = false;
            }
            
            if (!isValid) {
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = 'Submitting...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i>Quote Submitted!';
                
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    selectedProduct = null;
                    selectedQuantity = 1;
                    productPrice = 0;
                    
                    // Reset dropdowns
                    productDropdown.querySelector('span').textContent = 'Choose a product...';
                    productDropdown.classList.add('placeholder');
                    quantityDropdown.querySelector('span').textContent = '1';
                    totalPrice.innerHTML = '<i class="fas fa-calculator" style="margin-right: 8px;"></i>Select a product';
                    
                    // Reset button
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right: 8px;"></i>Request Quote';
                    
                    // Hide success message
                    successMessage.classList.remove('show');
                    
                    // Clear all validations
                    document.querySelectorAll('.form-validation').forEach(validation => {
                        validation.className = 'form-validation';
                        validation.textContent = '';
                    });
                    
                    // Reset selected states
                    document.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                    document.querySelectorAll('.quantity-option').forEach(opt => opt.classList.remove('selected'));
                    document.querySelector('.quantity-option[data-value="1"]').classList.add('selected');
                    
                }, 3000);
            }, 2000);
        });

        // Add smooth scrolling and enhanced interactions
        document.addEventListener('DOMContentLoaded', function() {
            // Add loading animation to page
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
            
            // Add hover effects to form controls
            const formControls = document.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                control.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            });
            
            // Add intersection observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            document.querySelectorAll('.mvv-item, .review-card, .form-section').forEach(el => {
                observer.observe(el);
            });
        });

        // Keyboard navigation for dropdowns
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllDropdowns();
            }
        });

        // Add ripple effect to buttons
        function createRipple(event) {
            const button = event.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
            circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
            circle.classList.add('ripple');
            
            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }
            
            button.appendChild(circle);
        }

        // Add ripple to submit button
        submitBtn.addEventListener('click', createRipple);
        
        // Add ripple CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 600ms linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);