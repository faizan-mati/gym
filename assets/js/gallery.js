      // Sample gallery data with gym-focused content
        const galleryData = [
            {
                id: 1,
                title: "Strength Training Zone",
                description: "Professional-grade equipment for serious lifters",
                category: "equipment",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Our strength training zone features top-of-the-line equipment including Olympic barbells, power racks, and a full selection of free weights designed for serious strength training and muscle building."
            },
            {
                id: 2,
                title: "Cardio Paradise",
                description: "State-of-the-art cardio equipment with entertainment",
                category: "equipment",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Experience the future of cardio with our premium treadmills, ellipticals, and bikes featuring integrated entertainment systems, heart rate monitoring, and personalized workout programs."
            },
            {
                id: 3,
                title: "Functional Training Area",
                description: "Versatile space for functional movement patterns",
                category: "equipment",
                image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Our functional training area includes battle ropes, suspension trainers, medicine balls, and agility equipment perfect for functional fitness and athletic performance training."
            },
            {
                id: 4,
                title: "Group Fitness Studio",
                description: "Energizing group classes for all fitness levels",
                category: "classes",
                image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Join our high-energy group fitness classes including HIIT, Zumba, spin, and strength training classes led by certified instructors in our spacious mirrored studio."
            },
            {
                id: 5,
                title: "Personal Training Sessions",
                description: "One-on-one coaching with expert trainers",
                category: "members",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Work with our certified personal trainers to develop customized workout plans, learn proper form, and achieve your fitness goals faster with personalized attention and motivation."
            },
            {
                id: 6,
                title: "Yoga & Mindfulness Studio",
                description: "Peaceful space for yoga and meditation",
                category: "classes",
                image: "https://images.unsplash.com/photo-1506629905607-45c49ca4fda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Find your inner peace in our dedicated yoga studio featuring natural lighting, premium mats, and a variety of classes from beginner Hatha to advanced Vinyasa flow."
            },
            {
                id: 7,
                title: "Premium Locker Rooms",
                description: "Luxurious changing facilities with amenities",
                category: "facilities",
                image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Our premium locker rooms feature spacious lockers, private changing areas, luxury showers, steam rooms, and complimentary toiletries for your convenience."
            },
            {
                id: 8,
                title: "Aquatic Center",
                description: "Olympic-sized pool for swimming and water fitness",
                category: "facilities",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Dive into fitness with our Olympic-sized swimming pool featuring dedicated lanes for lap swimming, water aerobics classes, and recreational swimming areas."
            },
            {
                id: 9,
                title: "Nutrition Bar & Cafe",
                description: "Healthy fuel for your fitness journey",
                category: "facilities",
                image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Refuel with our selection of fresh smoothies, protein shakes, healthy snacks, and nutritious meals designed to complement your fitness goals and active lifestyle."
            },
            {
                id: 10,
                title: "Community & Events",
                description: "Building connections through fitness challenges",
                category: "members",
                image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                fullDescription: "Join our vibrant community through monthly fitness challenges, social events, member appreciation days, and group activities that make fitness fun and engaging."
            }
        ];

        // Initialize gallery
        function initGallery() {
            const galleryGrid = document.getElementById('galleryGrid');
            
            galleryData.forEach(item => {
                const galleryItem = createGalleryItem(item);
                galleryGrid.appendChild(galleryItem);
            });
        }

        // Create gallery item
        function createGalleryItem(item) {
            const div = document.createElement('div');
            div.className = `gallery-item ${item.category}`;
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">${item.title}</h3>
                    <p class="gallery-description">${item.description}</p>
                    <div class="gallery-icons">
                        <div class="gallery-icon" onclick="event.stopPropagation(); openModal(${item.id})">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="gallery-icon" onclick="event.stopPropagation(); openModal(${item.id})">
                            <i class="fas fa-expand"></i>
                        </div>
                    </div>
                </div>
            `;
            
            div.addEventListener('click', () => openModal(item.id));
            return div;
        }

        // Open modal with detailed view
        function openModal(itemId) {
            const item = galleryData.find(i => i.id === itemId);
            const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
            const modalTitle = document.getElementById('galleryModalLabel');
            const modalBody = document.getElementById('modalBody');
            
            modalTitle.textContent = item.title;
            modalBody.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p>${item.fullDescription}</p>
                <div class="gallery-stats">
                    <div class="stat-item">
                        <div class="stat-number">${Math.floor(Math.random() * 100) + 50}</div>
                        <div class="stat-label">Members Love This</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${Math.floor(Math.random() * 5) + 1}</div>
                        <div class="stat-label">Star Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${Math.floor(Math.random() * 20) + 5}</div>
                        <div class="stat-label">Daily Usage</div>
                    </div>
                </div>
            `;
            
            modal.show();
        }

        // Filter functionality
        function initFilters() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    const filter = btn.getAttribute('data-filter');
                    
                    galleryItems.forEach((item, index) => {
                        if (filter === 'all' || item.classList.contains(filter)) {
                            item.style.display = 'block';
                            item.style.animation = 'none';
                            setTimeout(() => {
                                item.style.animation = `slideInUp 0.6s ease forwards`;
                                item.style.animationDelay = `${index * 0.1}s`;
                            }, 10);
                        } else {
                            item.style.animation = 'slideOutDown 0.4s ease forwards';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 400);
                        }
                    });
                });
            });
        }

        // Add slideOutDown animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideOutDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(30px);
                }
            }
        `;
        document.head.appendChild(style);

        // Intersection Observer for scroll animations
        function initScrollAnimations() {
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

            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.style.animationPlayState = 'paused';
                observer.observe(item);
            });
        }

        // Parallax effect for gallery items
        function initParallaxEffect() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const galleryItems = document.querySelectorAll('.gallery-item');
                
                galleryItems.forEach((item, index) => {
                    const speed = 0.5 + (index % 3) * 0.1;
                    const yPos = -(scrolled * speed);
                    item.style.transform = `translateY(${yPos}px)`;
                });
            });
        }

        // Enhanced hover effects
        function initEnhancedHoverEffects() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    // Add glowing effect to nearby items
                    const siblings = Array.from(this.parentNode.children);
                    siblings.forEach(sibling => {
                        if (sibling !== this) {
                            sibling.style.filter = 'brightness(0.7) blur(1px)';
                        }
                    });
                });
                
                item.addEventListener('mouseleave', function() {
                    // Remove effects from all items
                    const siblings = Array.from(this.parentNode.children);
                    siblings.forEach(sibling => {
                        sibling.style.filter = 'none';
                    });
                });
            });
        }

        // Initialize all functionality
        document.addEventListener('DOMContentLoaded', () => {
            initGallery();
            initFilters();
            initScrollAnimations();
            initEnhancedHoverEffects();
            
            // Add loading animation
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Preload images for better performance
        function preloadImages() {
            galleryData.forEach(item => {
                const img = new Image();
                img.src = item.image;
            });
        }

        // Call preload after page load
        window.addEventListener('load', preloadImages);