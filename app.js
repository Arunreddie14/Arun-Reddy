// Portfolio Application JavaScript
// Professional portfolio for Arun Kumar Reddy Chintapally

// Initialize application on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeMobileNavigation();
    initializeScrollToTop();
    addLoadingAnimations();
    
    // Initialize page with smooth transitions
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            updateActiveNavLink(this);
        });
    });

    // Handle contact button clicks in hero section
    const contactButtons = document.querySelectorAll('a[href="#contact"]');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavOnScroll();
        handleNavbarBackground();
    }, 100));
}

// Smooth scroll to section with offset for fixed navbar
function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
        });
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Update active navigation based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + navbarHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Default to home if at the very top
    if (window.scrollY < 200) {
        currentSection = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Handle navbar background on scroll
function handleNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--color-surface)';
        navbar.style.backdropFilter = 'none';
    }
}

// Mobile navigation functionality
function initializeMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('nav-open');
            
            if (isOpen) {
                closeNavMenu();
            } else {
                openNavMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeNavMenu();
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeNavMenu();
            });
        });
    }
}

function openNavMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.add('nav-open');
    navToggle.classList.add('nav-toggle--open');
    
    // Add mobile menu styles
    navMenu.style.cssText = `
        display: flex;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--color-surface);
        flex-direction: column;
        padding: var(--space-20);
        border-bottom: 1px solid var(--color-border);
        box-shadow: var(--shadow-lg);
        z-index: 999;
        opacity: 1;
        transform: translateY(0);
        transition: all 0.3s ease;
    `;
}

function closeNavMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.remove('nav-open');
    navToggle.classList.remove('nav-toggle--open');
    
    // Reset mobile menu styles
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.cssText = '';
    }
}

// Enhanced resume download functionality
function downloadResume() {
    showNotification('Preparing your comprehensive resume download...', 'info');
    
    // Create detailed resume content
    const resumeContent = generateResumeContent();
    
    setTimeout(() => {
        try {
            // Create and download the file
            const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            
            downloadLink.href = url;
            downloadLink.download = 'Arun_Kumar_Reddy_Chintapally_Senior_Technical_Recruiter_Resume.txt';
            downloadLink.style.display = 'none';
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(downloadLink);
            
            showNotification('Resume downloaded successfully! Check your downloads folder.', 'success');
            trackEngagement('resume_download', 'Download Resume');
            
        } catch (error) {
            console.error('Download error:', error);
            showNotification('Download failed. Please try again or contact me directly.', 'error');
        }
    }, 1200);
}

// Generate comprehensive resume content
function generateResumeContent() {
    const resumeData = {
        header: {
            name: "ARUN KUMAR REDDY CHINTAPALLY",
            title: "Senior Technical Recruiter",
            subtitle: "US, Canada & Mexico Staffing Expert",
            contact: {
                phone: "+91 77318-79137",
                email: "reddyarun081@gmail.com", 
                linkedin: "https://www.linkedin.com/in/arunreddie14/",
                location: "Hyderabad, India",
                availability: "Supporting PST-EST Time Zones"
            }
        }
    };
    
    let resume = `${resumeData.header.name}\n`;
    resume += `${resumeData.header.title} | ${resumeData.header.subtitle}\n`;
    resume += `${'='.repeat(80)}\n\n`;
    
    resume += `CONTACT INFORMATION\n`;
    resume += `${'-'.repeat(40)}\n`;
    resume += `Phone: ${resumeData.header.contact.phone}\n`;
    resume += `Email: ${resumeData.header.contact.email}\n`;
    resume += `LinkedIn: ${resumeData.header.contact.linkedin}\n`;
    resume += `Location: ${resumeData.header.contact.location}\n`;
    resume += `Availability: ${resumeData.header.contact.availability}\n\n`;
    
    resume += `PROFESSIONAL SUMMARY\n`;
    resume += `${'-'.repeat(40)}\n`;
    resume += `Results-driven Senior Technical Recruiter with 5+ years of US/Canada IT staffing\n`;
    resume += `excellence, specializing in niche technologies including AEM, SAP, Oracle, and Cloud\n`;
    resume += `platforms. Consistently achieved 1-2 placements per month with 50-60 qualified\n`;
    resume += `submissions monthly and 30%+ submit-to-interview conversion rates. Expert in\n`;
    resume += `full-cycle recruitment across W2/C2C/1099 models, visa compliance (H1B/OPT/GC/TN),\n`;
    resume += `and enterprise ATS platforms (JobDiva, Talent Pathway). Proven track record\n`;
    resume += `supporting Fortune 500 clients through MSP/VMS programs while mentoring junior\n`;
    resume += `recruiters and maintaining 95%+ quality delivery standards.\n\n`;
    
    resume += `KEY PERFORMANCE METRICS\n`;
    resume += `${'-'.repeat(40)}\n`;
    resume += `• 5+ Years Experience in Specialized US/Canada IT Staffing\n`;
    resume += `• 50-60 Qualified Monthly Submissions with Consistent Quality\n`;
    resume += `• 30%+ Submit-to-Interview Conversion Rate Across All Placements\n`;
    resume += `• 95%+ Quality Delivery Standards with Same-day SLA Response\n`;
    resume += `• 1-2 Monthly Placements in Niche Technology Roles\n`;
    resume += `• Fortune 500 Client Support Across 6 Major Industry Verticals\n\n`;
    
    resume += `CORE COMPETENCIES\n`;
    resume += `${'-'.repeat(40)}\n`;
    const competencies = [
        "Full-Cycle Technical Recruitment", "ATS/VMS Platform Expertise",
        "Advanced Boolean & X-Ray Search", "LinkedIn Recruiter Mastery",
        "US Visa Compliance (H1B/OPT/GC/TN)", "Contract Models (W2/C2C/1099)",
        "Technical Screening & Assessment", "Team Leadership & Mentoring",
        "MSP/VMS Program Management", "Client Relationship Management",
        "Rate Negotiation & Vendor Management", "Quality Assurance & SLA Compliance"
    ];
    competencies.forEach((comp, index) => {
        resume += `• ${comp}\n`;
    });
    resume += `\n`;
    
    resume += `PROFESSIONAL EXPERIENCE\n`;
    resume += `${'-'.repeat(40)}\n\n`;
    
    resume += `SENIOR TECHNICAL RECRUITER | W3Global\n`;
    resume += `February 2024 – Present | Hyderabad, India\n\n`;
    resume += `Leading technical recruitment initiatives with focus on niche technologies and\n`;
    resume += `high-value placements across North American markets.\n\n`;
    resume += `Key Achievements:\n`;
    resume += `• Pipeline Excellence: Manage 20-25 concurrent requisitions across\n`;
    resume += `  IT/Non-IT/Engineering verticals with 30%+ submit-to-interview conversion\n`;
    resume += `• Delivery Leadership: Close 1-2 niche technology roles monthly (AEM, SAP,\n`;
    resume += `  Oracle, Cloud) with 15% reduction in time-to-fill\n`;
    resume += `• Team Performance: Improved interview pass-through rates by 12% through\n`;
    resume += `  standardized screening processes and training protocols\n`;
    resume += `• Technology Mastery: Leverage Talent Pathway ATS for end-to-end lifecycle\n`;
    resume += `  management with same-day SLA response\n`;
    resume += `• Global Coverage: Support US/Canada clients across PST-EST time zones\n`;
    resume += `  with 100% SLA adherence\n\n`;
    
    resume += `TECHNICAL RECRUITER | ASCII Group, LLC\n`;
    resume += `December 2020 – February 2024 | Hyderabad, India\n\n`;
    resume += `Delivered comprehensive recruitment services for major implementation partners\n`;
    resume += `while building expertise in MSP/VMS environments and complex visa requirements.\n\n`;
    resume += `Key Achievements:\n`;
    resume += `• Strategic Partnerships: Exclusively supported Infosys, TCS, Tech Mahindra,\n`;
    resume += `  Virtusa with 20% increase in qualified candidate flow\n`;
    resume += `• MSP/VMS Excellence: Achieved 98% submission accuracy across Beeline,\n`;
    resume += `  Blue Acorn, GbaMS platforms\n`;
    resume += `• Performance Leadership: Mentored 6+ junior recruiters, improving team\n`;
    resume += `  offer acceptance from 70% to 82%\n`;
    resume += `• Compliance Expertise: Managed complex visa requirements (CPT/H1B/GC/TN/EAD)\n`;
    resume += `  with 100% compliance rate\n`;
    resume += `• Process Innovation: Implemented JobDiva ATS optimization and quality\n`;
    resume += `  control measures\n\n`;
    
    resume += `RELATIONSHIP MANAGER | Religare Health Insurance\n`;
    resume += `April 2020 – September 2020 | Hyderabad, India\n\n`;
    resume += `Built foundational client relationship and sales skills that translated\n`;
    resume += `into recruitment success.\n\n`;
    resume += `Key Achievements:\n`;
    resume += `• Sales Excellence: Managed 1800+ weekly calls achieving 90% sales increase\n`;
    resume += `• Client Relations: Built strong relationships through consultative approach\n`;
    resume += `  and active listening\n\n`;
    
    resume += `TECHNICAL SPECIALIZATIONS\n`;
    resume += `${'-'.repeat(40)}\n`;
    resume += `Enterprise Platforms:\n`;
    resume += `Oracle (EBS/HCM/ATG/GTM), SAP (All Modules), Salesforce, ServiceNow,\n`;
    resume += `Workday, PeopleSoft\n\n`;
    resume += `Digital & Cloud Technologies:\n`;
    resume += `AEM/Adobe Experience Platform, AWS/Azure Cloud Platforms, Data Engineering\n`;
    resume += `& Analytics, DevOps & Infrastructure, AI/ML & Gen AI\n\n`;
    resume += `Development & Engineering:\n`;
    resume += `Java/J2EE Architecture, .NET Development, React/Node.js, Python & Full-Stack,\n`;
    resume += `Mulesoft Integration\n\n`;
    resume += `Specialized Roles:\n`;
    resume += `Solution Architects, Data Scientists, Cybersecurity (IAM/PAM), Scrum Masters\n`;
    resume += `& Product Owners, Project/Program Managers\n\n`;
    resume += `Healthcare & Life Sciences:\n`;
    resume += `LIMS Administration, Veeva Vault, EPIC & Cerner, Clinical Systems,\n`;
    resume += `FHIR Architecture, Regulatory Compliance\n\n`;
    
    resume += `CLIENT PORTFOLIO\n`;
    resume += `${'-'.repeat(40)}\n`;
    resume += `Technology Leaders:\n`;
    resume += `Apple Inc, Microsoft, Amazon, Google, Meta (Facebook), Adobe, Oracle,\n`;
    resume += `ServiceNow\n\n`;
    resume += `Healthcare & Pharmaceuticals:\n`;
    resume += `Johnson & Johnson, Pfizer, UnitedHealth Group, Merck & Co., CVS Health,\n`;
    resume += `Anthem, Cigna\n\n`;
    resume += `Financial Services:\n`;
    resume += `JPMorgan Chase, Bank of America, Wells Fargo, Morgan Stanley,\n`;
    resume += `American Express, Capital One, Charles Schwab\n\n`;
    resume += `Implementation Partners:\n`;
    resume += `Infosys, TCS, Tech Mahindra, Virtusa, HCL Technologies,\n`;
    resume += `L&T Technology Services, Nagarro\n\n`;
    
    resume += `TOOLS & PLATFORMS\n`;
    resume += `${'-'.repeat(40)}\n`;
    resume += `• ATS Systems: JobDiva, Talent Pathway\n`;
    resume += `• VMS/MSP Portals: Beeline, Blue Acorn, GbaMS\n`;
    resume += `• Job Boards: LinkedIn Recruiter, Monster, Dice, Indeed, CareerBuilder\n`;
    resume += `• Sourcing Tools: Boolean Search, X-Ray Search, Social Media Recruiting\n`;
    resume += `• Microsoft Office Suite: Word, Excel, Outlook, Teams, PowerPoint\n\n`;
    
    resume += `KEY ACHIEVEMENTS\n`;
    resume += `${'-'.repeat(40)}\n`;
    resume += `• Consistently maintained 30%+ submit-to-interview conversion rate across\n`;
    resume += `  all client engagements\n`;
    resume += `• Reduced average time-to-fill by 15% for niche technology roles through\n`;
    resume += `  optimized sourcing strategies\n`;
    resume += `• Successfully mentored 6+ junior recruiters, improving team performance\n`;
    resume += `  metrics by 12-15%\n`;
    resume += `• Achieved 98% MSP/VMS submission accuracy while maintaining full visa\n`;
    resume += `  compliance\n`;
    resume += `• Built and maintained candidate pipelines of 200+ qualified professionals\n`;
    resume += `  across specialty technologies\n`;
    resume += `• Supported Fortune 500 clients across 6 major industry verticals with\n`;
    resume += `  consistent quality delivery\n\n`;
    
    resume += `${'-'.repeat(80)}\n`;
    resume += `This resume was generated from my professional portfolio.\n`;
    resume += `For the most up-to-date information, please visit my LinkedIn profile\n`;
    resume += `or contact me directly.\n\n`;
    resume += `Generated on: ${new Date().toLocaleDateString()}\n`;
    resume += `Contact: reddyarun081@gmail.com | +91 77318-79137\n`;
    resume += `LinkedIn: https://www.linkedin.com/in/arunreddie14/`;
    
    return resume;
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
        
        // Add real-time validation with improved logic
        const fields = contactForm.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => clearFieldError(field));
        });
    }
}

// Handle contact form submission with enhanced validation
function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Convert FormData to object and clean values
    const formObject = {};
    for (let [key, value] of formData.entries()) {
        formObject[key] = value.trim();
    }
    
    // Clear all previous errors
    clearAllFieldErrors(form);
    
    // Validate form
    const validation = validateContactForm(formObject, form);
    if (!validation.isValid) {
        showNotification(validation.message, 'error');
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
    submitBtn.disabled = true;
    showNotification('Sending your message...', 'info');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form and button
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification(
            'Thank you for your message! I will respond within 24 hours. For urgent matters, please call me directly.',
            'success'
        );
        
        // Track form submission
        trackEngagement('contact_form', 'Contact Form Submission', formObject.subject);
        
        // Log form data for demonstration
        console.log('Contact form submitted:', {
            ...formObject,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        
    }, 2000);
}

// Improved form validation
function validateContactForm(data, form) {
    const errors = [];
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.length < 2) {
        showFieldError(form.querySelector('[name="name"]'), 'Name must be at least 2 characters');
        errors.push('name');
        isValid = false;
    }
    
    // Email validation
    if (!data.email) {
        showFieldError(form.querySelector('[name="email"]'), 'Email address is required');
        errors.push('email');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError(form.querySelector('[name="email"]'), 'Please enter a valid email address');
        errors.push('email');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject) {
        showFieldError(form.querySelector('[name="subject"]'), 'Please select a subject');
        errors.push('subject');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.length < 10) {
        showFieldError(form.querySelector('[name="message"]'), 'Message must be at least 10 characters');
        errors.push('message');
        isValid = false;
    }
    
    // Phone validation (optional but if provided, must be valid)
    if (data.phone && data.phone.length > 0 && !isValidPhone(data.phone)) {
        showFieldError(form.querySelector('[name="phone"]'), 'Please enter a valid phone number');
        errors.push('phone');
        isValid = false;
    }
    
    // Focus first error field
    if (errors.length > 0) {
        const firstErrorField = form.querySelector(`[name="${errors[0]}"]`);
        if (firstErrorField) {
            firstErrorField.focus();
        }
    }
    
    return {
        isValid,
        errors,
        message: isValid ? '' : 'Please correct the highlighted fields below.'
    };
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    // Remove all non-digit characters for validation
    const digits = phone.replace(/\D/g, '');
    // Accept 10-15 digits (international format)
    return digits.length >= 10 && digits.length <= 15;
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    
    // Clear existing error
    clearFieldError(field);
    
    // Skip validation for optional fields that are empty
    if (!field.hasAttribute('required') && !value) {
        return true;
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Specific field validations
    switch (name) {
        case 'name':
            if (value && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
                return false;
            }
            break;
            
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'message':
            if (value && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
                return false;
            }
            break;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    if (!field) return;
    
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
    if (!field) return;
    
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear all field errors
function clearAllFieldErrors(form) {
    const errorFields = form.querySelectorAll('.form-control.error');
    const errorMessages = form.querySelectorAll('.field-error');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
}

// Enhanced notification system with better UX
function showNotification(message, type = 'info', duration = null) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Set icon and colors based on type
    const config = {
        success: { 
            icon: 'fas fa-check-circle', 
            bg: 'var(--color-success)', 
            text: 'var(--color-btn-primary-text)' 
        },
        error: { 
            icon: 'fas fa-exclamation-circle', 
            bg: 'var(--color-error)', 
            text: 'var(--color-btn-primary-text)' 
        },
        warning: { 
            icon: 'fas fa-exclamation-triangle', 
            bg: 'var(--color-warning)', 
            text: 'var(--color-btn-primary-text)' 
        },
        info: { 
            icon: 'fas fa-info-circle', 
            bg: 'var(--color-info)', 
            text: 'var(--color-btn-primary-text)' 
        }
    };
    
    const typeConfig = config[type] || config.info;
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${typeConfig.icon}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Apply styles
    notification.style.cssText = `
        background: ${typeConfig.bg};
        color: ${typeConfig.text};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto-remove
    const autoDuration = duration || (type === 'error' ? 8000 : type === 'success' ? 6000 : 5000);
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, autoDuration);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .card, .timeline-item, .competency-item, .achievement-card, 
        .metric-item, .tech-tag, .client-category, .contact-item
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.cssText += `
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: ${Math.min(index * 0.1, 0.5)}s;
        `;
        observer.observe(el);
    });
}

// Initialize scroll to top functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    `;
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackEngagement('scroll_to_top', 'Scroll to Top Button');
    });
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
    }, 100));
}

// Add loading animations for hero section
function addLoadingAnimations() {
    const heroElements = document.querySelectorAll(`
        .hero-name, .hero-title, .hero-subtitle, .hero-location,
        .hero-metrics, .hero-actions, .profile-image-container
    `);
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
}

// Utility: Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Track user engagement
function trackEngagement(action, category, label = '') {
    const engagement = {
        action,
        category,
        label,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
    };
    
    console.log('Engagement tracked:', engagement);
    
    // In a real application, send to analytics service
    // Example: gtag('event', action, { event_category: category, event_label: label });
}

// Handle window resize
window.addEventListener('resize', throttle(() => {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768) {
        navMenu.style.cssText = '';
        closeNavMenu();
    }
}, 250));

// Add error handling for external links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
        trackEngagement('external_link', 'External Link Click', link.href);
    }
});

// Add styles for form validation and animations
if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        .form-control.error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1) !important;
        }
        
        .field-error {
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
            display: flex;
            align-items: center;
            gap: var(--space-4);
        }
        
        .field-error::before {
            content: '⚠';
        }
        
        .nav-toggle--open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle--open span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle--open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px !important;
                right: 20px !important;
                width: 45px !important;
                height: 45px !important;
            }
        }
        
        @media print {
            .navbar, .scroll-to-top, .notification {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load performance:', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
            });
        }, 1000);
    });
}