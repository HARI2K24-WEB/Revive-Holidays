// ==================== Carousel Manual Scrolling ====================
const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
let isCarouselDragging = false;
let carouselStartX = 0;
let carouselScrollLeft = 0;

carouselWrappers.forEach(wrapper => {
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
        wrapper.style.cursor = 'grabbing';
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll multiplier
        wrapper.scrollLeft = scrollLeft - walk;
    });
});

// ==================== Gallery Modal Functionality ====================
function openGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Gallery tab switching //
document.addEventListener('DOMContentLoaded', function() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryDestinations = document.querySelectorAll('.gallery-destination');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            
            // Remove active class from all tabs and destinations
            galleryTabs.forEach(t => t.classList.remove('active'));
            galleryDestinations.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding destination
            this.classList.add('active');
            document.querySelector(`[data-destination="${destination}"].gallery-destination`).classList.add('active');
        });
    });

    // Close modal when clicking overlay
    const modal = document.getElementById('galleryModal');
    const overlay = modal.querySelector('.gallery-overlay');
    overlay.addEventListener('click', closeGalleryModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeGalleryModal();
        }
    });
});

// ==================== Booking Modal Functionality ====================
function openBookingModal(packageName) {
    const modal = document.getElementById('bookingModal');
    const packageInput = document.getElementById('booking-package');
    packageInput.value = packageName || 'Package';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add click event to all Book Now buttons
document.addEventListener('DOMContentLoaded', function() {
    const bookNowButtons = document.querySelectorAll('.btn-price');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Get the package name from the closest package card
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('.package-name').textContent;
            openBookingModal(packageName);
        });
    });

    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const packageName = document.getElementById('booking-package').value;
        const name = document.getElementById('booking-name').value;
        const email = document.getElementById('booking-email').value;
        const phone = document.getElementById('booking-phone').value;
        const travelers = document.getElementById('booking-travelers').value;
        const date = document.getElementById('booking-date').value;
        const accommodation = document.getElementById('booking-accommodation').value;
        
        // Show success message
        alert(`Thank you for your booking request, ${name}!\n\nPackage: ${packageName}\nTravelers: ${travelers}\nTravel Date: ${date}\nAccommodation: ${accommodation}\n\nWe will contact you at ${email} soon with confirmation details.`);
        
        // Reset form and close modal
        bookingForm.reset();
        closeBookingModal();
    });

    // Close modal when clicking overlay
    const modal = document.getElementById('bookingModal');
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', closeBookingModal);
});

// ==================== Destination Tabs (Packages) ====================
const destinationTabs = document.querySelectorAll('.destination-tab');
const packageDestinations = document.querySelectorAll('.package-destination');

destinationTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const destination = this.getAttribute('data-destination');
        
        // Remove active class from all tabs and packages
        destinationTabs.forEach(t => t.classList.remove('active'));
        packageDestinations.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding package destination
        this.classList.add('active');
        document.querySelector(`[data-destination="${destination}"].package-destination`).classList.add('active');
    });
});

// ==================== Counter-up Animation ====================
function counterUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.textContent = Math.floor(current) + '+';
            return;
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Intersection Observer for counter animation
const bannerNumbers = document.querySelectorAll('.banner-number');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            counterUp(entry.target, target);
            entry.target.setAttribute('data-counted', 'true');
        }
    });
}, observerOptions);

bannerNumbers.forEach(num => observer.observe(num));

// ==================== Scroll to Top ====================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide floating button
window.addEventListener('scroll', () => {
    const floatingBtn = document.getElementById('floatingBtn');
    if (window.scrollY > 300) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.visibility = 'visible';
    } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.visibility = 'hidden';
    }
});

// ==================== Form Submission ====================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Show confirmation
    alert(`Thank you, ${name}! We've received your message and will contact you at ${email} soon.`);
    
    // Reset form
    this.reset();
});

// ==================== Smooth Scroll Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Navbar Background on Scroll ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== Initialize Floating Button ====================
const floatingBtn = document.getElementById('floatingBtn');
floatingBtn.style.opacity = '0';
floatingBtn.style.visibility = 'hidden';
floatingBtn.style.transition = 'all 0.3s ease';
