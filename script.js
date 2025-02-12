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

    // Enhanced Navbar Scroll Effect with Dynamic Animation
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    let isScrollingUp = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add background and blur effect when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backdropFilter = `blur(${Math.min(currentScroll / 100, 10)}px)`;
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backdropFilter = 'none';
        }

        // Enhanced scroll direction detection
        if (currentScroll > lastScroll && !isScrollingUp && currentScroll > 100) {
            navbar.classList.add('hide');
            navbar.style.transform = 'translateY(-100%)';
            isScrollingUp = false;
        } else if (currentScroll < lastScroll && (isScrollingUp || currentScroll < 100)) {
            navbar.classList.remove('hide');
            navbar.style.transform = 'translateY(0)';
            isScrollingUp = true;
        }
        
        lastScroll = currentScroll;
    });

    // Enhanced Skill Progress Animation
    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = '0%';
            
            // Add delay for cascade effect
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = percent + '%';
            }, 200);
        });
    }

    // Enhanced Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                
                // Animate skills if it's the skills section
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                }
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial animation states to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.transform = 'translateY(50px)';
        section.style.opacity = '0';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // Enhanced Smooth Scroll with Dynamic Animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Add pre-animation class
                target.classList.add('section-animate');
                
                // Smooth scroll with dynamic offset based on navbar height
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Remove animation class after scrolling
                setTimeout(() => {
                    target.classList.remove('section-animate');
                }, 1000);
            }
        });
    });

    // Enhanced Back to Top Button with Dynamic Animation
    const backToTop = document.getElementById('back-to-top');
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        // Show/hide button with fade and scale effect
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
            backToTop.style.transform = 'scale(1)';
        } else {
            backToTop.classList.remove('show');
            backToTop.style.transform = 'scale(0)';
        }
        
        // Add pulse animation while scrolling
        backToTop.classList.add('pulse');
        
        scrollTimeout = setTimeout(() => {
            backToTop.classList.remove('pulse');
        }, 150);
    });

    backToTop.addEventListener('click', () => {
        backToTop.classList.add('clicked');
        
        // Smooth scroll to top with dynamic duration
        const scrollTop = window.pageYOffset;
        const duration = Math.min(Math.max(scrollTop / 3, 500), 1500);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            backToTop.classList.remove('clicked');
        }, duration);
    });

    // Three.js Background Animation
    class ParticleNetwork {
        constructor() {
            this.canvas = document.getElementById('bg-canvas');
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                alpha: true
            });
            
            this.particles = [];
            this.connections = [];
            this.init();
        }

        init() {
            // Setup renderer
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x0a192f, 1);

            // Position camera
            this.camera.position.z = 30;

            // Create particles
            const particleCount = 100;
            const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff9d });

            for (let i = 0; i < particleCount; i++) {
                const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                particle.position.x = Math.random() * 60 - 30;
                particle.position.y = Math.random() * 60 - 30;
                particle.position.z = Math.random() * 60 - 30;
                
                // Add velocity for animation
                particle.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                );

                this.particles.push(particle);
                this.scene.add(particle);
            }

            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize(), false);

            // Start animation
            this.animate();
        }

        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            // Update particle positions
            this.particles.forEach(particle => {
                particle.position.add(particle.velocity);

                // Bounce off boundaries
                if (Math.abs(particle.position.x) > 30) particle.velocity.x *= -1;
                if (Math.abs(particle.position.y) > 30) particle.velocity.y *= -1;
                if (Math.abs(particle.position.z) > 30) particle.velocity.z *= -1;
            });

            // Remove old connections
            this.connections.forEach(line => this.scene.remove(line));
            this.connections = [];

            // Create new connections
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const distance = this.particles[i].position.distanceTo(this.particles[j].position);
                    
                    if (distance < 8) {
                        const opacity = 1 - (distance / 8);
                        const lineMaterial = new THREE.LineBasicMaterial({ 
                            color: 0x00ff9d,
                            transparent: true,
                            opacity: opacity * 0.5
                        });
                        
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            this.particles[i].position,
                            this.particles[j].position
                        ]);
                        
                        const line = new THREE.Line(geometry, lineMaterial);
                        this.connections.push(line);
                        this.scene.add(line);
                    }
                }
            }

            // Rotate camera slowly
            this.camera.position.x = 30 * Math.cos(Date.now() * 0.0001);
            this.camera.position.z = 30 * Math.sin(Date.now() * 0.0001);
            this.camera.lookAt(0, 0, 0);

            this.renderer.render(this.scene, this.camera);
        }
    }

    // Initialize particle network
    new ParticleNetwork();

    // Enhanced Mobile Menu Toggle with Animation
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
        
        // Add slide animation
        if (isMenuOpen) {
            navLinks.style.transform = 'translateX(0)';
            navLinks.style.opacity = '1';
        } else {
            navLinks.style.transform = 'translateX(100%)';
            navLinks.style.opacity = '0';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.nav-content')) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            navLinks.style.transform = 'translateX(100%)';
            navLinks.style.opacity = '0';
            isMenuOpen = false;
        }
    });

    // Enhanced Preloader with Smooth Transition
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            document.body.style.overflow = 'visible';
            
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // Animate sections after preloader
                document.querySelectorAll('section').forEach((section, index) => {
                    setTimeout(() => {
                        section.classList.add('section-visible');
                    }, index * 200);
                });
            }, 500);
        }, 1000);
    });
}); 
