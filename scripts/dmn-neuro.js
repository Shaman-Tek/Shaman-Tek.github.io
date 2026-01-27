// Progress bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.getElementById('progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');

    if (scrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Intersection Observer for fade-in animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // TOC active state
    const tocItems = document.querySelectorAll('.toc-item');
    const articleSections = document.querySelectorAll('[data-section]');

    if (tocItems.length > 0 && articleSections.length > 0) {
        const tocObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionNum = entry.target.dataset.section;
                    tocItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.dataset.section === sectionNum) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        articleSections.forEach(section => {
            tocObserver.observe(section);
        });

        // TOC click navigation
        tocItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionNum = item.dataset.section;
                const targetSection = document.querySelector(`[data-section="${sectionNum}"]`);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});
