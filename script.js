// Form Submission Handler (guarded – form was removed from UI)
const consultationForm = document.getElementById('consultation-form');
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
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
        
        console.log('Form submitted:', formData);
        alert('Thank you for your interest! We will contact you shortly at ' + formData.whatsapp + ' or ' + formData.email);
        this.reset();
    });
}

// Smooth scroll for anchor links and active state management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Handle home link (scroll to top)
        if (href === '#' || href === '#top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update active state for left nav panel
            const navLinksLeft = document.querySelectorAll('.nav-link-left');
            navLinksLeft.forEach(link => link.classList.remove('active'));
            if (this.classList.contains('nav-link-left')) {
                this.classList.add('active');
            }
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            const offset = 80; // Account for sticky navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active state for left nav panel
            const navLinksLeft = document.querySelectorAll('.nav-link-left');
            navLinksLeft.forEach(link => link.classList.remove('active'));
            if (this.classList.contains('nav-link-left')) {
                this.classList.add('active');
            }
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link-left');
    const scrollPos = window.scrollY + 150;
    const homeLink = document.querySelector('.nav-link-left[href="#"]');

    // If at the top of the page, activate home link
    if (window.scrollY < 200) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (homeLink) {
            homeLink.classList.add('active');
        }
        return;
    }

    // Otherwise, find the active section
    let activeSection = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            activeSection = sectionId;
        }
    });

    // Update active states
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (activeSection && link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

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
        }
    });
}, observerOptions);

// Observe all sections and cards - minimal animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.perf-card, .client-card, .workflow-step, .testimonial-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease';
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

// Chart Zoom Functionality
let zoomChartInstance = null;

function openChartZoom(chartType) {
    const modal = document.getElementById('chart-zoom-modal');
    const titleEl = document.getElementById('chart-zoom-title');
    const canvasEl = document.getElementById('chart-zoom-canvas');
    const closeBtn = document.getElementById('chart-zoom-close');
    
    if (!modal || !canvasEl) return;
    
    // Set title
    if (titleEl) {
        titleEl.textContent = chartType === 'daily' 
            ? 'Daily Cumulative P&L Performance' 
            : 'Monthly Performance Chart';
    }
    
    // Get original chart - check global scope
    const originalChart = (typeof dailyPnlChart !== 'undefined' && chartType === 'daily') 
        ? dailyPnlChart 
        : (typeof monthlyPnlChart !== 'undefined' && chartType === 'monthly')
        ? monthlyPnlChart
        : null;
    
    if (!originalChart) {
        alert('Chart data not available yet. Please wait for charts to load.');
        return;
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Destroy previous zoom chart if exists
    if (zoomChartInstance) {
        zoomChartInstance.destroy();
        zoomChartInstance = null;
    }
    
    // Wait for modal to fully render and get dimensions
    setTimeout(() => {
        // Get canvas and set proper dimensions
        const modalBody = canvasEl.parentElement;
        
        // Calculate proper dimensions
        const padding = 48; // Total padding (24px * 2)
        const headerHeight = 80; // Approximate header height
        const availableHeight = window.innerHeight - headerHeight - padding - 40; // Extra margin
        const availableWidth = Math.min(modalBody.clientWidth - padding, 1300);
        
        // Set canvas size explicitly - use aspect ratio for better display
        const aspectRatio = chartType === 'daily' ? 2 : 1.8;
        const containerWidth = availableWidth;
        const containerHeight = Math.min(availableHeight, containerWidth / aspectRatio);
        
        // Set canvas dimensions
        canvasEl.width = containerWidth;
        canvasEl.height = containerHeight;
        canvasEl.style.width = containerWidth + 'px';
        canvasEl.style.height = containerHeight + 'px';
        
        const ctx = canvasEl.getContext('2d');
        const originalData = originalChart.data;
        const originalConfig = originalChart.config;
        
        // Deep clone the options
        const zoomOptions = JSON.parse(JSON.stringify(originalChart.options));
        
        // Configure for zoom view
        zoomOptions.responsive = false; // We're setting explicit size
        zoomOptions.maintainAspectRatio = false;
        zoomOptions.plugins = zoomOptions.plugins || {};
        
        // Enhanced legend
        zoomOptions.plugins.legend = {
            display: true,
            position: 'top',
            labels: {
                font: { size: 14, weight: 'bold' },
                padding: 15,
                usePointStyle: true
            }
        };
        
        // Enhanced title if exists
        if (zoomOptions.plugins.title) {
            zoomOptions.plugins.title.font = {
                size: 18,
                weight: 'bold'
            };
            zoomOptions.plugins.title.padding = {
                top: 15,
                bottom: 25
            };
        }
        
        // Enhanced tooltip
        if (zoomOptions.plugins.tooltip) {
            zoomOptions.plugins.tooltip = {
                ...zoomOptions.plugins.tooltip,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                padding: 12,
                displayColors: true
            };
        }
        
        // Enhanced scales
        if (zoomOptions.scales) {
            if (zoomOptions.scales.x) {
                zoomOptions.scales.x.ticks = {
                    ...zoomOptions.scales.x.ticks,
                    font: { size: 12 },
                    maxRotation: 45,
                    minRotation: 45
                };
            }
            if (zoomOptions.scales.y) {
                zoomOptions.scales.y.ticks = {
                    ...zoomOptions.scales.y.ticks,
                    font: { size: 12 }
                };
            }
        }
        
        // Create enhanced datasets with better visibility
        const enhancedDatasets = originalData.datasets.map((dataset, index) => {
            const enhanced = JSON.parse(JSON.stringify(dataset));
            
            // Check if this is a mixed chart (bar + line)
            const isMixedChart = originalData.datasets.some(d => d.type && d.type !== originalConfig.type);
            const datasetType = enhanced.type || originalConfig.type;
            
            // For line charts, enhance points
            if (datasetType === 'line') {
                enhanced.pointRadius = 5;
                enhanced.pointHoverRadius = 8;
                enhanced.borderWidth = 3;
                enhanced.pointBorderWidth = 2;
                if (!enhanced.pointBackgroundColor) {
                    enhanced.pointBackgroundColor = enhanced.borderColor || 'rgba(13, 79, 60, 1)';
                }
            }
            
            // For bar charts, enhance bars
            if (datasetType === 'bar') {
                enhanced.borderWidth = 2;
                enhanced.borderRadius = 6;
            }
            
            return enhanced;
        });
        
        // Create new chart instance
        try {
            // For mixed charts, we need to handle each dataset type
            const chartConfig = {
                type: originalConfig.type,
                data: {
                    labels: originalData.labels,
                    datasets: enhancedDatasets
                },
                options: zoomOptions
            };
            
            zoomChartInstance = new Chart(ctx, chartConfig);
            
            // Force resize after creation to ensure proper rendering
            setTimeout(() => {
                if (zoomChartInstance) {
                    zoomChartInstance.resize();
                    // Update again after a short delay to ensure all elements render
                    setTimeout(() => {
                        if (zoomChartInstance) {
                            zoomChartInstance.update('none');
                        }
                    }, 100);
                }
            }, 100);
        } catch (error) {
            console.error('Error creating zoom chart:', error);
            alert('Error displaying chart. Please try again.');
            closeChartZoom();
        }
    }, 200);
    
    // Close handlers
    if (closeBtn) {
        closeBtn.onclick = () => closeChartZoom();
    }
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeChartZoom();
        }
    };
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeChartZoom();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // Handle window resize
    const resizeHandler = () => {
        if (zoomChartInstance && modal.classList.contains('active')) {
            const modalBody = canvasEl.parentElement;
            const containerWidth = modalBody.clientWidth - 48;
            const containerHeight = Math.min(600, window.innerHeight * 0.6);
            
            canvasEl.width = containerWidth;
            canvasEl.height = containerHeight;
            canvasEl.style.width = containerWidth + 'px';
            canvasEl.style.height = containerHeight + 'px';
            
            setTimeout(() => {
                if (zoomChartInstance) {
                    zoomChartInstance.resize();
                }
            }, 100);
        }
    };
    
    window.addEventListener('resize', resizeHandler);
    modal._resizeHandler = resizeHandler;
}

function closeChartZoom() {
    const modal = document.getElementById('chart-zoom-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove resize handler
        if (modal._resizeHandler) {
            window.removeEventListener('resize', modal._resizeHandler);
            modal._resizeHandler = null;
        }
    }
    
    if (zoomChartInstance) {
        zoomChartInstance.destroy();
        zoomChartInstance = null;
    }
}

// Initialize chart zoom on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to chart containers
    function attachChartZoomHandlers() {
        const chartContainers = document.querySelectorAll('.chart-zoomable');
        chartContainers.forEach(container => {
            // Remove existing handler if any
            const newHandler = function() {
                const chartType = this.getAttribute('data-chart');
                if (chartType && (typeof dailyPnlChart !== 'undefined' || typeof monthlyPnlChart !== 'undefined')) {
                    openChartZoom(chartType);
                }
            };
            container.removeEventListener('click', container._zoomHandler);
            container._zoomHandler = newHandler;
            container.addEventListener('click', container._zoomHandler);
        });
    }
    
    // Initial attachment
    attachChartZoomHandlers();
    
    // Re-attach after charts are updated (polling approach)
    let checkInterval = setInterval(() => {
        const chartContainers = document.querySelectorAll('.chart-zoomable');
        let needsAttach = false;
        chartContainers.forEach(container => {
            if (!container._zoomHandler) {
                needsAttach = true;
            }
        });
        if (needsAttach) {
            attachChartZoomHandlers();
        }
        // Stop checking after charts are loaded
        if (typeof dailyPnlChart !== 'undefined' && typeof monthlyPnlChart !== 'undefined') {
            if (dailyPnlChart && monthlyPnlChart) {
                clearInterval(checkInterval);
            }
        }
    }, 1000);
    
    // Also attach when window loads
    window.addEventListener('load', () => {
        setTimeout(attachChartZoomHandlers, 500);
    });
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

// ============================================
// INTERACTIVE ACTIONS & ANIMATIONS
// ============================================

// Scroll Animation Observer - Minimal
const scrollObserverOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
        }
    });
}, scrollObserverOptions);

// Add interactive actions on page load
document.addEventListener('DOMContentLoaded', function() {
    // Observe all cards for scroll animations - minimal
    const cards = document.querySelectorAll('.overview-card, .perf-card, .workflow-step, .p-l-stat-card');
    cards.forEach((card) => {
        scrollObserver.observe(card);
    });
    
    // Removed random animations for cleaner experience
    
    // Scroll spy for navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Enhanced navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Simplified navbar scroll - no transform animations
            
            lastScroll = currentScroll;
        });
    }
    
    // Removed random background pattern and card shuffle animations for cleaner experience
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 300,
            easing: 'ease-out',
            once: true,
            offset: 50,
            delay: 0,
            disable: 'mobile' // Disable on mobile for better performance
        });
    }
    
    // Initialize GSAP ScrollTrigger - Reduced animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Minimal animations - just fade in
        gsap.from('.hero-headline', {
            duration: 0.3,
            opacity: 0,
            ease: 'power1.out'
        });
        
        gsap.from('.hero-description', {
            duration: 0.3,
            opacity: 0,
            delay: 0.1,
            ease: 'power1.out'
        });
        
        gsap.from('.hero-cta', {
            duration: 0.3,
            opacity: 0,
            delay: 0.2,
            ease: 'power1.out'
        });
        
        // Disable parallax and card animations for cleaner look
    }
});

// ============================================
// DATA EXTRACTION & EXPORT FUNCTIONS
// ============================================

// Client verified links
const CLIENT_VERIFIED_LINKS = {
    'client-1': 'https://verified.flattrade.in/pnl/PO48d06e2272034b9e85d476c7fbd58057',
    'client-2': 'https://verified.flattrade.in/pnl/4a217d80d07d4c49af16c77db99946fd',
    'client-3': 'https://verified.flattrade.in/pnl/PO05ba52fb8bee4f85918dc48e4ac88c54'
};

// Open extraction guide with instructions
function openExtractionGuide() {
    // Get currently selected client(s)
    const selectedClients = getSelectedClients();
    
    if (selectedClients.length === 0) {
        alert('Please select at least one client first.');
        return;
    }
    
    // Get the first selected client's link
    const firstClient = selectedClients[0];
    const verifiedLink = CLIENT_VERIFIED_LINKS[firstClient.id] || CLIENT_VERIFIED_LINKS['client-1'];
    
    // Create instructions modal
    const instructions = `
📋 DATA EXTRACTION INSTRUCTIONS

1. The verified P&L link will open in a new tab
2. Wait for the page to fully load
3. Press F12 to open Developer Tools
4. Go to the Console tab
5. Copy and paste the extraction script (see below)
6. Press Enter and wait 5-10 minutes
7. Copy the JSON output from console
8. Return here and click "Import Data" to paste it

EXTRACTION SCRIPT:
(You can find the full script in extract-pnl-data.js file)

Click OK to open the verified link.
    `;
    
    if (confirm(instructions)) {
        // Open verified link in new tab
        window.open(verifiedLink, '_blank');
        
        // Show extraction script in console
        console.log('%c📋 EXTRACTION SCRIPT', 'color: #10b981; font-size: 16px; font-weight: bold;');
        console.log('%cCopy the extract-pnl-data.js file content and paste it in the verified link page console', 'color: #6b7280; font-size: 12px;');
    }
}

// Toggle import section visibility
function toggleImportSection() {
    const importSection = document.getElementById('import-section');
    if (importSection) {
        const isVisible = importSection.style.display !== 'none';
        importSection.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            // Focus on textarea
            const textarea = document.getElementById('import-json-textarea');
            if (textarea) {
                setTimeout(() => textarea.focus(), 100);
            }
        }
    }
}

// Export current data as JSON
function exportCurrentData() {
    // Get currently selected client(s)
    const selectedClients = getSelectedClients();
    
    if (selectedClients.length === 0) {
        alert('Please select at least one client first.');
        return;
    }
    
    // Get P&L data for selected clients
    if (typeof pnlData === 'undefined' || !pnlData || !pnlData.daily) {
        alert('No P&L data available to export. Please load data first.');
        return;
    }
    
    // Prepare export data
    const exportData = {
        clientName: pnlData.clientName || 'Combined Clients',
        capital: pnlData.capital || 10000000,
        daily: pnlData.daily || [],
        summary: pnlData.summary || {},
        exportedAt: new Date().toISOString(),
        exportedFrom: 'FiFTO Portfolio Management System'
    };
    
    // Create and download JSON file
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fifto_pnl_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('✅ Data exported successfully!');
}

// Import data from JSON
function importDataFromJSON() {
    const textarea = document.getElementById('import-json-textarea');
    if (!textarea) {
        alert('Import textarea not found.');
        return;
    }
    
    const jsonText = textarea.value.trim();
    if (!jsonText) {
        alert('Please paste JSON data first.');
        return;
    }
    
    try {
        const importedData = JSON.parse(jsonText);
        
        // Validate data structure
        if (!importedData.daily || !Array.isArray(importedData.daily)) {
            throw new Error('Invalid data format: missing "daily" array');
        }
        
        // Get currently selected client
        const selectedClients = getSelectedClients();
        if (selectedClients.length === 0) {
            alert('Please select a client first.');
            return;
        }
        
        const clientId = selectedClients[0].id;
        
        // Update hardcoded data for the client
        if (typeof window.HARDCODED_CLIENT_DATA !== 'undefined' && window.HARDCODED_CLIENT_DATA[clientId]) {
            // Update the client data
            window.HARDCODED_CLIENT_DATA[clientId].daily = importedData.daily;
            if (importedData.clientName) {
                window.HARDCODED_CLIENT_DATA[clientId].clientName = importedData.clientName;
            }
            
            // Store metadata from verified URL
            if (importedData.period) {
                window.HARDCODED_CLIENT_DATA[clientId].period = importedData.period;
            }
            if (importedData.lastUpdated) {
                window.HARDCODED_CLIENT_DATA[clientId].lastUpdated = importedData.lastUpdated;
            }
            if (importedData.verifiedUrl) {
                window.HARDCODED_CLIENT_DATA[clientId].verifiedUrl = importedData.verifiedUrl;
            }
            if (importedData.expectedPnl) {
                window.HARDCODED_CLIENT_DATA[clientId].expectedPnl = importedData.expectedPnl;
            }
            
            // Recalculate summary
            if (typeof calculateSummary === 'function') {
                const capital = window.HARDCODED_CLIENT_DATA[clientId].capital || 10000000;
                window.HARDCODED_CLIENT_DATA[clientId].summary = calculateSummary(importedData.daily, capital);
            }
            
            // Save to localStorage
            const cacheKey = `fifto_pnl_data_${clientId}`;
            const dataToCache = {
                clientName: window.HARDCODED_CLIENT_DATA[clientId].clientName,
                capital: capital,
                daily: importedData.daily,
                summary: window.HARDCODED_CLIENT_DATA[clientId].summary,
                period: window.HARDCODED_CLIENT_DATA[clientId].period,
                lastUpdated: window.HARDCODED_CLIENT_DATA[clientId].lastUpdated,
                verifiedUrl: window.HARDCODED_CLIENT_DATA[clientId].verifiedUrl,
                expectedPnl: window.HARDCODED_CLIENT_DATA[clientId].expectedPnl
            };
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
            
            // Reload P&L data
            if (typeof loadSelectedClientsData === 'function') {
                loadSelectedClientsData().then(() => {
                    if (typeof updateUI === 'function') {
                        updateUI();
                    }
                    alert('✅ Data imported successfully! The page will refresh to show updated data.');
                    // Clear textarea
                    textarea.value = '';
                    toggleImportSection();
                    // Reload page to ensure all data is refreshed
                    setTimeout(() => window.location.reload(), 1000);
                }).catch(err => {
                    console.error('Error reloading data:', err);
                    alert('Data imported but error reloading. Please refresh the page manually.');
                });
            } else {
                alert('✅ Data imported! Please refresh the page to see changes.');
                window.location.reload();
            }
        } else {
            alert('Error: Client data structure not found. Please refresh the page and try again.');
        }
    } catch (error) {
        console.error('Import error:', error);
        alert('❌ Error importing data: ' + error.message + '\n\nPlease check that the JSON is valid and try again.');
    }
}

// Helper function to get selected clients
function getSelectedClients() {
    if (typeof clients === 'undefined' || !clients) {
        return [];
    }
    
    // Get selected client IDs from checkboxes or cards
    const selectedIds = [];
    const clientCards = document.querySelectorAll('.client-card');
    
    clientCards.forEach(card => {
        if (card.classList.contains('selected')) {
            const clientId = card.getAttribute('data-client-id');
            if (clientId) {
                selectedIds.push(clientId);
            }
        }
    });
    
    // Return client objects
    return clients.filter(client => selectedIds.includes(client.id));
}

// ============================================
// FETCH DATA FROM VERIFIED URL
// ============================================

// Fetch P&L data directly from verified URL - Automatic extraction
// Handle manual data upload
function uploadPnlData() {
    const dataInput = document.getElementById('pnl-data-input');
    const uploadBtn = document.getElementById('upload-data-btn');
    const statusEl = document.getElementById('upload-status');
    
    if (!dataInput || !uploadBtn) return;
    
    const dataText = dataInput.value.trim();
    
    if (!dataText) {
        showUploadStatus('error', 'Please paste or upload P&L data');
        return;
    }
    
    // Parse JSON data
    let uploadedData;
    try {
        uploadedData = JSON.parse(dataText);
    } catch (error) {
        showUploadStatus('error', 'Invalid JSON format. Please check your data and try again.');
        console.error('JSON parse error:', error);
        return;
    }
    
    // Validate data structure
    if (!uploadedData.daily || !Array.isArray(uploadedData.daily)) {
        showUploadStatus('error', 'Invalid data format. Data must include a "daily" array.');
        return;
    }
    
    // Find selected client
    let clientId = null;
    if (typeof clients !== 'undefined' && clients.length > 0) {
        if (selectedClientIds && selectedClientIds.length > 0) {
            clientId = selectedClientIds[0];
        } else if (clients.length > 0) {
            clientId = clients[0].id;
        }
    }
    
    if (!clientId) {
        showUploadStatus('error', 'Please add and select a client first using "Add New Client" button');
        return;
    }
    
    // Disable button and show loading
    uploadBtn.disabled = true;
    const originalText = uploadBtn.textContent;
    uploadBtn.textContent = '⏳ Processing...';
    showUploadStatus('info', '⏳ Processing and saving data...');
    
    try {
        // Process and save the data
        processUploadedData(uploadedData, clientId);
        
        // Clear input after successful upload
        dataInput.value = '';
        showUploadStatus('success', '✅ Data uploaded and saved successfully! Reloading page...');
        
        // Reload data
        setTimeout(() => {
            if (typeof loadSelectedClientsData === 'function') {
                loadSelectedClientsData().then(() => {
                    if (typeof updateUI === 'function') {
                        updateUI();
                    }
                    setTimeout(() => window.location.reload(), 1000);
                });
            } else {
                setTimeout(() => window.location.reload(), 1000);
            }
        }, 500);
        
    } catch (error) {
        console.error('Upload error:', error);
        showUploadStatus('error', 'Error: ' + error.message);
        uploadBtn.disabled = false;
        uploadBtn.textContent = originalText;
    }
}

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const dataInput = document.getElementById('pnl-data-input');
    if (!dataInput) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            // Try to parse as JSON to validate
            JSON.parse(content);
            dataInput.value = content;
            showUploadStatus('success', '✅ File loaded successfully. Click "Upload Data" to process.');
        } catch (error) {
            showUploadStatus('error', 'Invalid JSON file. Please check the file format.');
            console.error('File parse error:', error);
        }
    };
    
    reader.onerror = function() {
        showUploadStatus('error', 'Error reading file. Please try again.');
    };
    
    reader.readAsText(file);
}

// Clear data input
function clearDataInput() {
    const dataInput = document.getElementById('pnl-data-input');
    if (dataInput) {
        dataInput.value = '';
        showUploadStatus('info', 'Input cleared');
        setTimeout(() => {
            const statusEl = document.getElementById('upload-status');
            if (statusEl) statusEl.style.display = 'none';
        }, 2000);
    }
}

// Process uploaded data and update the page
function processUploadedData(uploadedData, clientId) {
    try {
        if (!clientId) {
            showUploadStatus('error', 'Error: No client selected. Please select a client first.');
            return;
        }
        
        // Get client to get capital
        const client = clients.find(c => c.id === clientId);
        if (!client) {
            showUploadStatus('error', 'Error: Client not found');
            return;
        }
        
        // Use capital from uploaded data if provided, otherwise use client's capital
        const capital = uploadedData.capital || client.capital || 10000000;
        
        // Recalculate percentages if needed
        if (uploadedData.daily && uploadedData.daily.length > 0) {
            uploadedData.daily = uploadedData.daily.map(day => {
                if (day.percent === undefined || day.percent === null) {
                    day.percent = parseFloat(((day.pnl / capital) * 100).toFixed(2));
                }
                return day;
            });
        }
        
        // Recalculate summary
        let summary = {
            today: { pnl: 0, percent: 0 },
            mtd: { pnl: 0, percent: 0 },
            total: { pnl: 0, percent: 0 }
        };
        
        if (uploadedData.daily && uploadedData.daily.length > 0) {
            const today = uploadedData.daily[uploadedData.daily.length - 1];
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            const mtdDays = uploadedData.daily.filter(d => {
                const date = new Date(d.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            });
            
            const totalPnl = uploadedData.daily.reduce((sum, d) => sum + d.pnl, 0);
            const mtdPnl = mtdDays.reduce((sum, d) => sum + d.pnl, 0);
            
            summary = {
                today: {
                    pnl: today.pnl,
                    percent: parseFloat(((today.pnl / capital) * 100).toFixed(2))
                },
                mtd: {
                    pnl: mtdPnl,
                    percent: parseFloat(((mtdPnl / capital) * 100).toFixed(2))
                },
                total: {
                    pnl: totalPnl,
                    percent: parseFloat(((totalPnl / capital) * 100).toFixed(2))
                }
            };
        }
        
        // Save to localStorage
        const cacheKey = `fifto_pnl_data_${clientId}`;
        const dataToCache = {
            clientName: uploadedData.clientName || client.name,
            capital: capital,
            daily: uploadedData.daily || [],
            summary: summary,
            clientId: clientId,
            period: uploadedData.period || null,
            lastUpdated: uploadedData.lastUpdated || new Date().toISOString(),
            verifiedUrl: uploadedData.verifiedUrl || client.url || null,
            expectedPnl: uploadedData.expectedPnl || null,
            clientInfo: `Capital: ₹${capital >= 10000000 ? (capital / 10000000).toFixed(2) + 'Cr' : (capital / 100000).toFixed(2) + 'L'}`
        };
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
        
        console.log('✅ Data saved successfully:', {
            clientName: dataToCache.clientName,
            dailyEntries: dataToCache.daily.length,
            totalPnl: summary.total.pnl
        });
    } catch (error) {
        console.error('Error processing uploaded data:', error);
        showUploadStatus('error', 'Error processing data: ' + error.message);
        throw error;
    }
}

// Show upload status message
function showUploadStatus(type, message) {
    const statusEl = document.getElementById('upload-status');
    if (!statusEl) return;
    
    statusEl.style.display = 'block';
    statusEl.className = `upload-status upload-status-${type}`;
    statusEl.innerHTML = message;
    
    // Auto-hide after 10 seconds for info messages
    if (type === 'info') {
        setTimeout(() => {
            if (statusEl.className.includes('upload-status-info')) {
                statusEl.style.display = 'none';
            }
        }, 10000);
    }
}

// Google Sheets Sync Functionality
let autoSyncInterval = null;
let currentSheetUrl = null;

// Sync data from Google Sheets
async function syncFromGoogleSheet() {
    const sheetUrlInput = document.getElementById('google-sheet-url');
    const syncBtn = document.getElementById('sync-from-sheet-btn');
    const statusEl = document.getElementById('sync-status');
    
    if (!sheetUrlInput || !syncBtn) return;
    
    const sheetUrl = sheetUrlInput.value.trim();
    
    if (!sheetUrl) {
        showSyncStatus('error', 'Please enter a Google Sheets URL');
        return;
    }
    
    // Validate Google Sheets URL
    if (!sheetUrl.includes('docs.google.com/spreadsheets')) {
        showSyncStatus('error', 'Please enter a valid Google Sheets URL');
        return;
    }
    
    // Find selected client
    let clientId = null;
    if (typeof clients !== 'undefined' && clients.length > 0) {
        if (selectedClientIds && selectedClientIds.length > 0) {
            clientId = selectedClientIds[0];
        } else if (clients.length > 0) {
            clientId = clients[0].id;
        }
    }
    
    if (!clientId) {
        showSyncStatus('error', 'Please add and select a client first');
        return;
    }
    
    // Disable button and show loading
    syncBtn.disabled = true;
    const originalText = syncBtn.textContent;
    syncBtn.textContent = '⏳ Syncing...';
    showSyncStatus('info', '⏳ Fetching data from Google Sheets...');
    
    try {
        // Convert Google Sheets URL to CSV export URL
        const sheetId = extractSheetId(sheetUrl);
        if (!sheetId) {
            throw new Error('Invalid Google Sheets URL format');
        }
        
        // Use CSV export URL (public sheets only, or requires authentication)
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
        
        // Fetch CSV data
        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Make sure the sheet is publicly accessible or use a published CSV link.');
        }
        
        const csvText = await response.text();
        
        // Parse CSV to JSON
        const parsedData = parseCSVToPnlData(csvText);
        
        // Process and save the data
        processUploadedData(parsedData, clientId);
        
        // Store sheet URL for auto-sync
        currentSheetUrl = sheetUrl;
        localStorage.setItem('fifto_google_sheet_url', sheetUrl);
        
        showSyncStatus('success', '✅ Data synced successfully from Google Sheets! Reloading...');
        
        // Reload data
        setTimeout(() => {
            if (typeof loadSelectedClientsData === 'function') {
                loadSelectedClientsData().then(() => {
                    if (typeof updateUI === 'function') {
                        updateUI();
                    }
                    setTimeout(() => window.location.reload(), 1000);
                });
            } else {
                setTimeout(() => window.location.reload(), 1000);
            }
        }, 500);
        
    } catch (error) {
        console.error('Sync error:', error);
        showSyncStatus('error', 'Error: ' + error.message);
        syncBtn.disabled = false;
        syncBtn.textContent = originalText;
    }
}

// Extract sheet ID from Google Sheets URL
function extractSheetId(url) {
    // Handle different Google Sheets URL formats
    const patterns = [
        /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
        /id=([a-zA-Z0-9-_]+)/,
        /key=([a-zA-Z0-9-_]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Parse CSV to P&L data format
function parseCSVToPnlData(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Find column indices
    const dateIndex = headers.findIndex(h => h.includes('date'));
    const pnlIndex = headers.findIndex(h => h.includes('pnl') || h.includes('profit'));
    const nameIndex = headers.findIndex(h => h.includes('name') || h.includes('client'));
    const capitalIndex = headers.findIndex(h => h.includes('capital'));
    
    if (dateIndex === -1 || pnlIndex === -1) {
        throw new Error('CSV must contain "date" and "pnl" columns');
    }
    
    const daily = [];
    let clientName = 'Unknown Client';
    let capital = 10000000;
    
    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length <= Math.max(dateIndex, pnlIndex)) continue;
        
        const dateStr = values[dateIndex];
        const pnlStr = values[pnlIndex];
        
        // Parse date (handle various formats)
        let date = null;
        try {
            date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                // Try DD-MM-YYYY or DD/MM/YYYY
                const parts = dateStr.split(/[-\/]/);
                if (parts.length === 3) {
                    date = new Date(parts[2], parts[1] - 1, parts[0]);
                }
            }
        } catch (e) {
            continue;
        }
        
        if (isNaN(date.getTime())) continue;
        
        // Parse P&L
        const pnl = parseFloat(pnlStr.replace(/[₹,]/g, '')) || 0;
        
        // Format date as YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];
        
        daily.push({
            date: formattedDate,
            pnl: pnl,
            percent: (pnl / capital) * 100
        });
        
        // Get client name and capital from first row if available
        if (i === 1) {
            if (nameIndex !== -1 && values[nameIndex]) {
                clientName = values[nameIndex];
            }
            if (capitalIndex !== -1 && values[capitalIndex]) {
                capital = parseFloat(values[capitalIndex].replace(/[₹,]/g, '')) || 10000000;
            }
        }
    }
    
    // Sort by date
    daily.sort((a, b) => a.date.localeCompare(b.date));
    
    return {
        clientName: clientName,
        capital: capital,
        daily: daily
    };
}

// Show sync status
function showSyncStatus(type, message) {
    const statusEl = document.getElementById('sync-status');
    if (!statusEl) return;
    
    statusEl.style.display = 'block';
    statusEl.className = `sync-status sync-status-${type}`;
    statusEl.innerHTML = message;
    
    // Auto-hide after 10 seconds for info messages
    if (type === 'info') {
        setTimeout(() => {
            if (statusEl.className.includes('sync-status-info')) {
                statusEl.style.display = 'none';
            }
        }, 10000);
    }
}

// Start/stop auto-sync
function toggleAutoSync(enabled) {
    if (autoSyncInterval) {
        clearInterval(autoSyncInterval);
        autoSyncInterval = null;
    }
    
    if (enabled && currentSheetUrl) {
        // Sync every 5 minutes
        autoSyncInterval = setInterval(() => {
            const sheetUrlInput = document.getElementById('google-sheet-url');
            if (sheetUrlInput && sheetUrlInput.value.trim()) {
                syncFromGoogleSheet();
            }
        }, 5 * 60 * 1000); // 5 minutes
        
        showSyncStatus('info', '✅ Auto-sync enabled (every 5 minutes)');
    } else if (!enabled) {
        showSyncStatus('info', 'Auto-sync disabled');
    }
}

// Initialize manual data upload and Google Sheets sync
document.addEventListener('DOMContentLoaded', function() {
    // Manual upload handlers
    const uploadBtn = document.getElementById('upload-data-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', uploadPnlData);
    }
    
    const fileUploadInput = document.getElementById('file-upload-input');
    if (fileUploadInput) {
        fileUploadInput.addEventListener('change', handleFileUpload);
    }
    
    const clearBtn = document.getElementById('clear-data-input');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearDataInput);
    }
    
    // Allow Ctrl+Enter or Cmd+Enter to trigger upload
    const dataInput = document.getElementById('pnl-data-input');
    if (dataInput) {
        dataInput.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                uploadPnlData();
            }
        });
    }
    
    // Google Sheets sync handlers
    const syncBtn = document.getElementById('sync-from-sheet-btn');
    if (syncBtn) {
        syncBtn.addEventListener('click', syncFromGoogleSheet);
    }
    
    const sheetUrlInput = document.getElementById('google-sheet-url');
    if (sheetUrlInput) {
        // Load saved sheet URL
        const savedUrl = localStorage.getItem('fifto_google_sheet_url');
        if (savedUrl) {
            sheetUrlInput.value = savedUrl;
            currentSheetUrl = savedUrl;
        }
        
        // Allow Enter key to trigger sync
        sheetUrlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                syncFromGoogleSheet();
            }
        });
    }
    
    // Auto-sync checkbox
    const autoSyncCheckbox = document.getElementById('auto-sync-enabled');
    if (autoSyncCheckbox) {
        const savedAutoSync = localStorage.getItem('fifto_auto_sync_enabled') === 'true';
        autoSyncCheckbox.checked = savedAutoSync;
        
        autoSyncCheckbox.addEventListener('change', function(e) {
            localStorage.setItem('fifto_auto_sync_enabled', e.target.checked);
            toggleAutoSync(e.target.checked);
        });
        
        // Start auto-sync if enabled
        if (savedAutoSync && currentSheetUrl) {
            toggleAutoSync(true);
        }
    }
});

