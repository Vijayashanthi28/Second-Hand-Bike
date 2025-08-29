//Login Page
  // Form submission handler
        document.getElementById('authenticationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const usernameField = document.getElementById('username');
            const passwordField = document.getElementById('password');
            
            // Basic validation
            if (usernameField.value.trim() === '' || passwordField.value.trim() === '') {
                alert('Please fill in both username and password fields.');
                return;
            }
            
            // Show success notification
            displayLoginSuccess();
        });

        function displayLoginSuccess() {
            document.getElementById('loginNotification').style.display = 'flex';
        }

        function closeNotification() {
            document.getElementById('loginNotification').style.display = 'none';
            
            // Reset form fields
            document.getElementById('authenticationForm').reset();
            
            // Simulate redirect (in a real app, you would redirect to dashboard)
            setTimeout(() => {
                console.log('Redirecting to dashboard...');
                // window.location.href = '/dashboard';
            }, 500);
        }

        // Close notification when clicking outside
        document.getElementById('loginNotification').addEventListener('click', function(event) {
            if (event.target === this) {
                closeNotification();
            }
        });

        // Handle forgot password link
        document.querySelector('.password-reset').addEventListener('click', function(event) {
            event.preventDefault();
            alert('Password reset functionality would be implemented here.');
        });


        //Contact Form

        // Dropdown functionality
        function initializeSelector(buttonId, menuId) {
            const button = document.getElementById(buttonId);
            const menu = document.getElementById(menuId);
            const options = menu.querySelectorAll('.option-item');
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.classList.toggle('opened');
                menu.classList.toggle('visible');
                
                // Close other dropdowns
                document.querySelectorAll('.select-trigger').forEach(btn => {
                    if (btn !== button) {
                        btn.classList.remove('opened');
                    }
                });
                document.querySelectorAll('.options-list').forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('visible');
                    }
                });
            });
            
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const value = option.getAttribute('data-value');
                    const text = option.textContent;
                    button.querySelector('span').textContent = text;
                    button.classList.remove('opened');
                    menu.classList.remove('visible');
                });
            });
        }

        // Setup both selectors
        initializeSelector('purposeSelector', 'purposeOptions');
        initializeSelector('referralSelector', 'referralOptions');

        // Close selectors when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.select-wrapper')) {
                document.querySelectorAll('.select-trigger').forEach(btn => {
                    btn.classList.remove('opened');
                });
                document.querySelectorAll('.options-list').forEach(menu => {
                    menu.classList.remove('visible');
                });
            }
        });

        // Map zoom functionality
        let currentZoom = 1;
        const mapCanvas = document.getElementById('interactiveMap');

        document.getElementById('zoomInBtn').addEventListener('click', () => {
            if (currentZoom < 3) {
                currentZoom += 0.2;
                mapCanvas.style.transform = `scale(${currentZoom})`;
            }
        });

        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            if (currentZoom > 0.5) {
                currentZoom -= 0.2;
                mapCanvas.style.transform = `scale(${currentZoom})`;
            }
        });

        // Form submission
        document.getElementById('enquiryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            displaySuccessModal();
        });

        function displaySuccessModal() {
            document.getElementById('successModal').style.display = 'flex';
        }

        function hideSuccessModal() {
            document.getElementById('successModal').style.display = 'none';
            // Reset form
            document.getElementById('enquiryForm').reset();
            // Reset selector texts
            document.getElementById('purposeSelector').querySelector('span').textContent = 'Reason to Contact';
            document.getElementById('referralSelector').querySelector('span').textContent = 'How did you find out about us ?';
        }

        //Buy Bike Filter
          // Toggle filter sections
        function toggleFilter(filterName) {
            const content = document.getElementById(filterName + '-content');
            const arrow = document.getElementById(filterName + '-arrow');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                arrow.classList.remove('active');
            } else {
                content.classList.add('active');
                arrow.classList.add('active');
            }
        }

        // Toggle sort dropdown
        function toggleSortDropdown() {
            const sortOptions = document.getElementById('sort-options');
            sortOptions.classList.toggle('active');
        }

        // Select sort option
        function selectSort(option) {
            document.getElementById('selected-sort').textContent = option;
            document.getElementById('sort-options').classList.remove('active');
        }

        // Close sort dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const sortDropdown = document.querySelector('.sort-dropdown');
            if (!sortDropdown.contains(event.target)) {
                document.getElementById('sort-options').classList.remove('active');
            }
        });

        // Initialize some filters as open
        document.addEventListener('DOMContentLoaded', function() {
            // Open Budget filter by default
            toggleFilter('budget');
            // Open Categories filter by default
            toggleFilter('categories');
        });


        //Payment Page
         let currentSelectedMethod = 'paytm';

        // Select payment method function
        function selectPaymentMethod(method) {
            // Remove selected class from all radio buttons
            document.querySelectorAll('.payment-radio-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selected class to clicked radio button
            document.getElementById(method + '-radio').classList.add('selected');
            currentSelectedMethod = method;
        }

        // Show success modal function
        function showSuccessModal() {
            const modal = document.getElementById('successModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        // Hide success modal function
        function hideSuccessModal() {
            const modal = document.getElementById('successModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        // Close modal when clicking outside
        document.getElementById('successModal').addEventListener('click', function(e) {
            if (e.target === this) {
                hideSuccessModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideSuccessModal();
            }
        });


        //Sell Bike
         class DriveRPForm {
            constructor() {
                this.selectedValues = {
                    brand: '',
                    model: '',
                    variant: '',
                    year: '',
                    kms: '',
                    owner: ''
                };
                
                this.initializeEventListeners();
            }

            initializeEventListeners() {
                // Add click listeners for dropdown buttons
                document.querySelectorAll('.drp-field-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const field = button.getAttribute('data-field');
                        if (field && field !== 'price') {
                            this.toggleDropdown(field);
                        }
                    });
                });

                // Add click listeners for dropdown options
                document.querySelectorAll('.drp-option-item').forEach(option => {
                    option.addEventListener('click', (e) => {
                        const dropdown = e.target.closest('.drp-dropdown-menu');
                        const field = dropdown.getAttribute('data-dropdown');
                        const value = e.target.getAttribute('data-value');
                        const text = e.target.textContent;
                        
                        this.selectOption(field, value, text);
                    });
                });

                // Close dropdowns when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.drp-select-field')) {
                        this.closeAllDropdowns();
                    }
                });

                // Search functionality
                document.querySelectorAll('.drp-search-input').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const dropdown = e.target.closest('.drp-dropdown-menu');
                        const searchTerm = e.target.value.toLowerCase();
                        
                        dropdown.querySelectorAll('.drp-option-item').forEach(option => {
                            const text = option.textContent.toLowerCase();
                            option.style.display = text.includes(searchTerm) ? 'block' : 'none';
                        });
                    });
                });
            }

            toggleDropdown(field) {
                const dropdown = document.querySelector(`[data-dropdown="${field}"]`);
                const isActive = dropdown.classList.contains('drp-active');
                
                // Close all dropdowns first
                this.closeAllDropdowns();
                
                // Open the selected dropdown if it wasn't active
                if (!isActive) {
                    dropdown.classList.add('drp-active');
                    
                    // Clear and focus search input if it exists
                    const searchInput = dropdown.querySelector('.drp-search-input');
                    if (searchInput) {
                        searchInput.value = '';
                        searchInput.focus();
                        
                        // Reset all options visibility
                        dropdown.querySelectorAll('.drp-option-item').forEach(option => {
                            option.style.display = 'block';
                        });
                    }
                }
            }

            closeAllDropdowns() {
                document.querySelectorAll('.drp-dropdown-menu').forEach(dropdown => {
                    dropdown.classList.remove('drp-active');
                });
            }

            selectOption(field, value, text) {
                this.selectedValues[field] = value;
                
                // Update button text
                const button = document.querySelector(`[data-field="${field}"]`);
                button.textContent = text;
                button.style.color = '#2E8B57';
                
                // Close dropdown
                this.closeAllDropdowns();
                
                console.log('Selected:', field, value);
            }
        }

        // Initialize the form
        const drpForm = new DriveRPForm();

        // Get Price function
        function drpGetPrice() {
            const values = drpForm.selectedValues;
            
            // Check if all required fields are selected
            const requiredFields = ['brand', 'model', 'variant', 'year', 'kms', 'owner'];
            const missingFields = requiredFields.filter(field => !values[field]);
            
            if (missingFields.length > 0) {
                alert(`Please select: ${missingFields.join(', ')}`);
                return;
            }
            
            // Simulate price calculation
            alert(`Getting price for your ${values.brand} ${values.model} ${values.variant} (${values.year})...`);
            
            console.log('Selected bike details:', values);
        }


        //index Bike Carousel
          let currentSlideIndex = 1;
        const totalSlides = 5;
        let autoSlideInterval;

        function showSlide(slideNumber) {
            // Hide all slides
            const slides = document.querySelectorAll('.bike-slide');
            const dots = document.querySelectorAll('.dot-indicator');
            
            slides.forEach(slide => slide.classList.remove('active-slide'));
            dots.forEach(dot => dot.classList.remove('active-dot'));
            
            // Show current slide
            slides[slideNumber - 1].classList.add('active-slide');
            dots[slideNumber - 1].classList.add('active-dot');
            
            // Update counter
            document.getElementById('current-slide').textContent = slideNumber;
            
            currentSlideIndex = slideNumber;
        }

        function nextSlide() {
            let next = currentSlideIndex + 1;
            if (next > totalSlides) {
                next = 1;
            }
            showSlide(next);
        }

        function currentSlide(slideNumber) {
            showSlide(slideNumber);
            
            // Reset auto-slide timer when user manually navigates
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        }

        

        // Initialize carousel
        document.addEventListener('DOMContentLoaded', function() {
            showSlide(1);
            startAutoSlide();
            
            // Pause auto-slide on hover
            const carouselContainer = document.querySelector('.bike-carousel-container');
            carouselContainer.addEventListener('mouseenter', function() {
                clearInterval(autoSlideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', function() {
                startAutoSlide();
            });
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        document.querySelector('.bike-carousel-container').addEventListener('touchstart', function(e) {
            startX = e.changedTouches[0].screenX;
        });

        document.querySelector('.bike-carousel-container').addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const threshold = 50; // Minimum swipe distance
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    let prev = currentSlideIndex - 1;
                    if (prev < 1) {
                        prev = totalSlides;
                    }
                    currentSlide(prev);
                }
                
                // Reset auto-slide after swipe
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
        }