// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const texts = [
        "AI & Data Science Student",
        "Computer Vision Enthusiast",
        "LLM Researcher"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById("typed-text");

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }

    // Start typing animation
    type();

    // Navbar Scroll Effect with Dynamic Animation
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    let isScrollingUp = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add background when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Detect scroll direction and animate navbar
        if (currentScroll > lastScroll && !isScrollingUp && currentScroll > 100) {
            // Scrolling down
            navbar.classList.add('hide');
            isScrollingUp = false;
        } else if (currentScroll < lastScroll && (isScrollingUp || currentScroll < 100)) {
            // Scrolling up
            navbar.classList.remove('hide');
            isScrollingUp = true;
        }
        
        lastScroll = currentScroll;
    });

    // Skill Progress Animation
    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
    }

    // Intersection Observer for Skills Animation
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for navigation with dynamic animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Add animation class before scrolling
                target.classList.add('section-animate');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Remove animation class after scrolling
                setTimeout(() => {
                    target.classList.remove('section-animate');
                }, 1000);
            }
        });
    });

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Back to Top Button with Dynamic Animation
    const backToTop = document.getElementById('back-to-top');
    let isScrolling;

    window.addEventListener('scroll', () => {
        // Show/hide back to top button with fade effect
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Add pulse animation while scrolling
        clearTimeout(isScrolling);
        backToTop.classList.add('pulse');
        
        isScrolling = setTimeout(() => {
            backToTop.classList.remove('pulse');
        }, 150);
    });

    backToTop.addEventListener('click', () => {
        backToTop.classList.add('clicked');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setTimeout(() => {
            backToTop.classList.remove('clicked');
        }, 300);
    });

    // Add scroll reveal animations for sections
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}); 