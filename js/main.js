// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initNavbar();
    initPropertyCarousel();
    initAnimations();
    initBahrainTime();
    initFormValidation();
});

// Navbar functionality (mobile toggle and scroll effect)
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Scroll effect for navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('glass', 'shadow-md');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('glass', 'shadow-md');
                navbar.classList.add('bg-transparent');
            }
        });
    }
}

// Property carousel functionality
function initPropertyCarousel() {
    const carousel = document.getElementById('property-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
}

// Enhanced animation system
function initAnimations() {
    // Animation options - consistent across all animations
    const animationOptions = {
        threshold: 0.15,
        rootMargin: '0px',
        triggerOnce: true
    };

    // Define animation types with consistent timing and easing
    const animations = {
        fadeIn: {
            start: { opacity: 0 },
            end: { opacity: 1 },
            timing: { duration: 800, easing: 'cubic-bezier(0.5, 0, 0, 1)' }
        },
        slideUp: {
            start: { opacity: 0, transform: 'translateY(50px)' },
            end: { opacity: 1, transform: 'translateY(0)' },
            timing: { duration: 800, easing: 'cubic-bezier(0.5, 0, 0, 1)' }
        },
        slideRight: {
            start: { opacity: 0, transform: 'translateX(-50px)' },
            end: { opacity: 1, transform: 'translateX(0)' },
            timing: { duration: 800, easing: 'cubic-bezier(0.5, 0, 0, 1)' }
        },
        slideLeft: {
            start: { opacity: 0, transform: 'translateX(50px)' },
            end: { opacity: 1, transform: 'translateX(0)' },
            timing: { duration: 800, easing: 'cubic-bezier(0.5, 0, 0, 1)' }
        },
        scale: {
            start: { opacity: 0, transform: 'scale(0.9)' },
            end: { opacity: 1, transform: 'scale(1)' },
            timing: { duration: 800, easing: 'cubic-bezier(0.5, 0, 0, 1)' }
        }
    };
    
    // Apply initial styles to prevent FOUC (Flash of Unstyled Content)
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        const animationType = element.dataset.animation || 'fadeIn';
        const delay = parseInt(element.dataset.delay || 0);
        
        if (animations[animationType]) {
            Object.entries(animations[animationType].start).forEach(([property, value]) => {
                element.style[property] = value;
            });
            element.style.transition = `all ${animations[animationType].timing.duration}ms ${animations[animationType].timing.easing} ${delay}ms`;
        }
    });
    
    // Create and configure the intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeIn';
                
                if (animations[animationType]) {
                    // Apply the end state styles when element is in view
                    Object.entries(animations[animationType].end).forEach(([property, value]) => {
                        element.style[property] = value;
                    });
                }
                
                // Unobserve after animation is triggered
                observer.unobserve(element);
            }
        });
    }, animationOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Handle float animations separately (continuous animations)
    document.querySelectorAll('.float-animation').forEach(element => {
        // Get custom animation delay or use a calculated one for variety
        const delay = element.style.animationDelay ? 
            parseFloat(element.style.animationDelay) * 1000 : 
            Math.random() * 2000;
            
        // Apply consistent animation properties
        element.style.animation = `float 6s cubic-bezier(0.43, 0.05, 0.17, 1) infinite`;
        element.style.animationDelay = `${delay}ms`;
    });
}

// Live Bahrain time
function initBahrainTime() {
    const timeElement = document.getElementById('bahrain-time');
    if (!timeElement) return;
    
    function updateTime() {
        const options = { 
            timeZone: 'Asia/Bahrain',
            hour: 'numeric', 
            minute: 'numeric',
            hour12: true
        };
        const bahrainTime = new Date().toLocaleTimeString('en-US', options);
        timeElement.textContent = bahrainTime;
    }
    
    // Update immediately and then every minute
    updateTime();
    setInterval(updateTime, 60000);
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (nameInput && nameInput.value.trim() === '') {
            valid = false;
            nameInput.classList.add('border-red-500');
        } else if (nameInput) {
            nameInput.classList.remove('border-red-500');
        }
        
        if (emailInput) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                valid = false;
                emailInput.classList.add('border-red-500');
            } else {
                emailInput.classList.remove('border-red-500');
            }
        }
        
        if (messageInput && messageInput.value.trim() === '') {
            valid = false;
            messageInput.classList.add('border-red-500');
        } else if (messageInput) {
            messageInput.classList.remove('border-red-500');
        }
        
        if (valid) {
            // In a real application, this would send the form data to a server
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Message Sent!';
                submitBtn.classList.add('bg-green-500');
                submitBtn.classList.remove('bg-accent');
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('bg-green-500');
                    submitBtn.classList.add('bg-accent');
                }, 3000);
            }
        }
    });
} 