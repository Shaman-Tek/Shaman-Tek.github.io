// Navigation toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close nav when clicking a link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                navToggle.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    });
}

// Progress bar
const progressBar = document.getElementById('progressBar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Intersection Observer for sections
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const tocDots = document.querySelectorAll('.toc-dot');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Update nav active state
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });

            // Update TOC dots
            tocDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.dataset.section === id) {
                    dot.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// TOC dots click
tocDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const section = document.getElementById(dot.dataset.section);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initial animation for hero
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('visible');
    }
});

/*
    ████████████████████████████████████████████████████████████████████
    
    "En una época de engaño universal, decir la verdad es un 
        acto revolucionario."
                                                — George Orwell
    
    "El hombre más peligroso para cualquier gobierno es el hombre capaz 
        de pensar por sí mismo, sin importar las supersticiones y tabúes 
        predominantes."
                                                — H.L. Mencken
    
    "El código es ley."
                                                — Lawrence Lessig
    
    ████████████████████████████████████████████████████████████████████
*/

// Console easter egg para los exploradores
console.log('%c◈ LA LLAVE Y LA JAULA ◈', 'font-size: 20px; color: #00d4ff; font-family: monospace;');
console.log('%c—', 'color: #333;');
console.log('%c"La privacidad es necesaria para una sociedad abierta en la era electrónica."', 'color: #00ff88; font-style: italic;');
console.log('%c— Manifiesto Cypherpunk, Eric Hughes, 1993', 'color: #606060;');
console.log('%c—', 'color: #333;');
console.log('%c"Rechazamos: reyes, presidentes y votaciones.', 'color: #00d4ff;');
console.log('%c Creemos en: consenso aproximado y código en ejecución."', 'color: #00d4ff;');
console.log('%c— David D. Clark', 'color: #606060;');
console.log('%c—', 'color: #333;');
console.log('%cgenesis_block: 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', 'color: #444; font-size: 10px;');
console.log('%c—', 'color: #333;');
console.log('%cSi llegaste hasta aquí, las llaves ya son tuyas.', 'color: #ffd700;');
