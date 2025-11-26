// Form Submission Handler
document.getElementById('consultation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        capital: document.getElementById('capital').value,
        experience: document.getElementById('experience').value,
        callTime: document.getElementById('call-time').value
    };
    
    // Here you would typically send this data to your backend
    // For now, we'll show an alert and log to console
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your interest! We will contact you shortly at ' + formData.whatsapp + ' or ' + formData.email);
    
    // Reset form
    this.reset();
    
    // In production, you would send this to your server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert('Thank you! We will contact you shortly.');
    //     form.reset();
    // })
    // .catch(error => {
    //     alert('There was an error. Please try again.');
    // });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for sticky navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Update quick stats bar with all clients' combined data
function updateQuickStats() {
    // Get all clients from client-manager
    if (typeof clients === 'undefined' || !clients || clients.length === 0) {
        return;
    }
    
    // Calculate total capital from all clients
    const totalCapital = clients.reduce((sum, client) => sum + (client.capital || 0), 0);
    
    // Calculate total return from all clients
    let totalPnl = 0;
    let totalReturnPercent = 0;
    
    // Try to get combined data from current pnlData if available
    if (typeof pnlData !== 'undefined' && pnlData.summary && pnlData.summary.total) {
        totalPnl = pnlData.summary.total.pnl || 0;
        totalReturnPercent = pnlData.summary.total.percent || 0;
    } else {
        // Calculate from all clients' cached data
        clients.forEach(client => {
            const cacheKey = `fifto_pnl_data_${client.id}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                try {
                    const data = JSON.parse(cached);
                    if (data.summary && data.summary.total) {
                        totalPnl += data.summary.total.pnl || 0;
                    }
                } catch (e) {
                    // Ignore parse errors
                }
            }
        });
        
        // Calculate percentage based on total capital
        if (totalCapital > 0) {
            totalReturnPercent = (totalPnl / totalCapital) * 100;
        }
    }
    
    // Update quick stats display
    const capitalEl = document.getElementById('quick-capital');
    const returnEl = document.getElementById('quick-return');
    const clientsEl = document.getElementById('quick-clients');
    
    if (capitalEl && totalCapital > 0) {
        if (totalCapital >= 10000000) {
            capitalEl.textContent = `₹${(totalCapital / 10000000).toFixed(1)}Cr`;
        } else {
            capitalEl.textContent = `₹${(totalCapital / 100000).toFixed(1)}L`;
        }
    }
    
    if (returnEl) {
        const sign = totalReturnPercent >= 0 ? '+' : '';
        returnEl.textContent = `${sign}${totalReturnPercent.toFixed(2)}%`;
        returnEl.className = totalReturnPercent >= 0 ? 'quick-stat-value positive' : 'quick-stat-value negative';
    }
    
    if (clientsEl) {
        clientsEl.textContent = clients.length || 0;
    }
    
    // Update hero stats
    const heroAumEl = document.getElementById('hero-aum');
    const heroReturnEl = document.getElementById('hero-return');
    const heroClientsEl = document.getElementById('hero-clients');
    
    if (heroAumEl && totalCapital > 0) {
        if (totalCapital >= 10000000) {
            heroAumEl.textContent = `₹${(totalCapital / 10000000).toFixed(1)}Cr`;
        } else {
            heroAumEl.textContent = `₹${(totalCapital / 100000).toFixed(1)}L`;
        }
    }
    
    if (heroReturnEl) {
        const sign = totalReturnPercent >= 0 ? '+' : '';
        heroReturnEl.textContent = `${sign}${totalReturnPercent.toFixed(0)}%`;
    }
    
    if (heroClientsEl) {
        heroClientsEl.textContent = clients.length || 0;
    }
}

// Update quick stats on page load
document.addEventListener('DOMContentLoaded', function() {
    // Try to load and display cached data immediately for instant access
    if (typeof loadStoredData === 'function') {
        const hasData = loadStoredData();
        if (hasData && typeof updateUI === 'function') {
            updateUI();
            updateQuickStats();
        }
    }
    
    // Update quick stats after a short delay to ensure all data is loaded
    setTimeout(() => {
        updateQuickStats();
    }, 500);
    
    // Update quick stats whenever client selection changes
    if (typeof loadSelectedClientsData === 'function') {
        const originalLoadSelectedClientsData = loadSelectedClientsData;
        window.loadSelectedClientsData = function() {
            return originalLoadSelectedClientsData().then(() => {
                setTimeout(() => updateQuickStats(), 300);
            });
        };
    }
});

// Add scroll animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.perf-card, .client-card, .workflow-step, .testimonial-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Show logo text if image doesn't exist
document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.querySelector('.logo');
    const logoText = document.querySelector('.logo-text');
    
    if (logoImg && logoText) {
        // Check if image loaded
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
            if (logoText) {
                logoText.style.display = 'flex';
            }
        });
        
        // If image doesn't exist, show text immediately
        if (!logoImg.complete || logoImg.naturalHeight === 0) {
            logoImg.style.display = 'none';
            logoText.style.display = 'flex';
        }
    }
});

// Format phone number input
const whatsappInput = document.getElementById('whatsapp');
if (whatsappInput) {
    whatsappInput.addEventListener('input', function(e) {
        // Remove any non-digit characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as Indian phone number if it starts with country code or is 10 digits
        if (value.length > 10 && value.startsWith('91')) {
            value = value.substring(2);
        }
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        e.target.value = value;
    });
}

// Format capital amount input
const capitalInput = document.getElementById('capital');
if (capitalInput) {
    capitalInput.addEventListener('input', function(e) {
        // Allow only numbers, commas, and currency symbols
        let value = e.target.value.replace(/[^\d,₹CrLakhcrores]/gi, '');
        e.target.value = value;
    });
}

// Font Loading Detection - Fallback to normal text if custom font doesn't load
document.fonts.ready.then(function() {
    // Check if Bebas Neue loaded
    if (document.fonts.check('1em "Bebas Neue"')) {
        console.log('Bebas Neue font loaded successfully');
    } else {
        // If Bebas Neue didn't load, use normal system fonts
        const logoElements = document.querySelectorAll('.fifto-logo-3d');
        logoElements.forEach(function(el) {
            el.style.fontFamily = 'Arial Black, Arial, Helvetica, sans-serif';
            el.style.fontWeight = '900';
        });
        console.log('Using fallback font');
    }
}).catch(function() {
    // If font loading fails, use normal text
    const logoElements = document.querySelectorAll('.fifto-logo-3d');
    logoElements.forEach(function(el) {
        el.style.fontFamily = 'Arial Black, Arial, Helvetica, sans-serif';
        el.style.fontWeight = '900';
    });
    console.log('Font loading failed, using fallback');
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

