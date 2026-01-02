// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.product-favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#e74c3c';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });

    // Add to cart button functionality
    const addButtons = document.querySelectorAll('.add-btn');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Navigate to product detail page
            window.location.href = 'product.html';
        });
    });

    // Add to cart button functionality for red buttons (similar products)
    const addButtonsRed = document.querySelectorAll('.add-btn-red');
    
    addButtonsRed.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Navigate to product detail page
            window.location.href = 'product.html';
        });
    });

    // Checkout button functionality
    const checkoutButtons = document.querySelectorAll('.checkout-btn');
    
    checkoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Navigate to checkout page
            window.location.href = 'checkout.html';
        });
    });

    // Proceed to Payment button functionality
    const proceedPaymentBtn = document.querySelector('.proceed-payment-btn');
    if (proceedPaymentBtn) {
        proceedPaymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to payment page
            window.location.href = 'payment.html';
        });
    }

    // Choose Payment dropdown functionality
    const choosePaymentHeaders = document.querySelectorAll('.payment-header');
    
    choosePaymentHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const choosePayment = this.closest('.choose-payment, .choose-payment-checkout');
            choosePayment.classList.toggle('active');
        });
    });

    // Payment option selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            const parent = this.closest('.payment-options');
            if (parent) {
                parent.querySelectorAll('.payment-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Add active class to selected option
                this.classList.add('selected');
                
                // Navigate to payment details page after selection
                setTimeout(() => {
                    window.location.href = 'payment-details.html';
                }, 500);
            }
        });
    });

    // Payment logo clicks on payment-details page
    const paymentLogoLarge = document.querySelectorAll('.payment-logo-large');
    paymentLogoLarge.forEach(logo => {
        logo.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 100);
        });
    });

    // Enter Details button functionality
    const enterDetailsBtn = document.getElementById('enterDetailsBtn');
    if (enterDetailsBtn) {
        enterDetailsBtn.addEventListener('click', function() {
            // Show success animation
            const successOverlay = document.getElementById('successOverlay');
            if (successOverlay) {
                successOverlay.classList.add('show');
                
                // After 2 seconds, navigate to order confirmation
                setTimeout(() => {
                    window.location.href = 'order-confirmation.html';
                }, 2000);
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchIcon = document.querySelector('.search-bar i');
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // Add your search functionality here
            alert(`Searching for: ${query}`);
        }
    }
    
    searchIcon.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Register button functionality
    const registerBtn = document.querySelector('.register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            alert('Registration form will open here');
            // Add your registration modal or redirect here
        });
    }

    // Shop now buttons functionality
    const shopNowButtons = document.querySelectorAll('.shop-now-btn');
    shopNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Navigate to shopping page
            if (window.location.pathname.includes('shopping.html')) {
                // Already on shopping page, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Navigate to shopping page
                window.location.href = 'shopping.html';
            }
        });
    });

    // Mobile menu toggle (if needed for smaller screens)
    // You can add a hamburger menu for mobile if needed

    // Shopping page filter functionality
    const submitFilterBtn = document.querySelector('.submit-filter-btn');
    const productCards = document.querySelectorAll('.product-card-shopping');
    
    if (submitFilterBtn) {
        submitFilterBtn.addEventListener('click', function() {
            filterProducts();
        });
    }

    // Filter products based on selected options
    function filterProducts() {
        const selectedTypes = Array.from(document.querySelectorAll('input[name="product-type"]:checked')).map(cb => cb.value);
        const selectedOffer = document.querySelector('input[name="special-offer"]:checked')?.value;
        const selectedPrice = document.querySelector('input[name="price"]:checked')?.value;
        const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;

        productCards.forEach(card => {
            let show = true;
            const category = card.getAttribute('data-category');

            // Filter by product type
            if (selectedTypes.length > 0) {
                const categoryMap = {
                    'groceries': 'groceries',
                    'fresh-fruits': 'fresh-fruits',
                    'milk-egg': 'milk-egg',
                    'bakery': 'bakery',
                    'vegetables': 'vegetables',
                    'dry-fruits': 'dry-fruits'
                };
                
                if (!selectedTypes.some(type => categoryMap[type] === category)) {
                    show = false;
                }
            }

            // Apply filters
            if (show) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Sort by price if selected
        if (selectedPrice) {
            const container = document.querySelector('.products-grid-shopping');
            const cards = Array.from(container.querySelectorAll('.product-card-shopping'));
            
            cards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                
                if (selectedPrice === 'low-high') {
                    return priceA - priceB;
                } else if (selectedPrice === 'high-low') {
                    return priceB - priceA;
                } else if (selectedPrice === 'below-2500') {
                    return priceA <= 2500 ? -1 : 1;
                }
                return 0;
            });
            
            cards.forEach(card => container.appendChild(card));
        }
    }

    // Real-time filtering on checkbox/radio change
    const filterInputs = document.querySelectorAll('.filter-options input');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Auto-filter when options change (optional)
            // filterProducts();
        });
    });
});

