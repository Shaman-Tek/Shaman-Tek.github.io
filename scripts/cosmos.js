/**
 * COSMOS - Starfield & Visuals
 * ShamanTek Portal
 */

const canvas = document.getElementById('cosmos');
const ctx = canvas.getContext('2d');
let stars = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
    updateConstellationLines();
}

function generateStars() {
    stars = [];
    const density = (canvas.width * canvas.height) / 6000;

    for (let i = 0; i < density; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.2 + 0.3,
            baseOpacity: Math.random() * 0.6 + 0.2,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2,
            depth: Math.random() // Para parallax
        });
    }
}

function renderStars(time) {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    stars.forEach(star => {
        // Parallax basado en mouse y profundidad
        const parallaxStrength = star.depth * 0.02;
        const dx = (mouseX - centerX) * parallaxStrength;
        const dy = (mouseY - centerY) * parallaxStrength;

        const x = star.x + dx;
        const y = star.y + dy;

        // Parpadeo
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity * (0.7 + twinkle * 0.3);

        // Dibujar estrella
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(renderStars);
}

// ============================================
// LÍNEAS DE CONSTELACIÓN
// ============================================
function updateConstellationLines() {
    const svg = document.getElementById('constellation');
    if (!svg) return;

    const stars = document.querySelectorAll('.nav-star');
    const center = document.querySelector('.center-light');

    if (!center) return;

    const centerRect = center.getBoundingClientRect();
    const cx = centerRect.left + centerRect.width / 2;
    const cy = centerRect.top + centerRect.height / 2;

    let lines = '';

    stars.forEach(star => {
        const rect = star.getBoundingClientRect();
        const sx = rect.left + rect.width / 2;
        const sy = rect.top + rect.height / 2;

        lines += `<line x1="${cx}" y1="${cy}" x2="${sx}" y2="${sy}" />`;
    });

    // Conectar estrellas entre sí
    const starPositions = Array.from(stars).map(s => {
        const r = s.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    for (let i = 0; i < starPositions.length; i++) {
        for (let j = i + 1; j < starPositions.length; j++) {
            lines += `<line x1="${starPositions[i].x}" y1="${starPositions[i].y}" x2="${starPositions[j].x}" y2="${starPositions[j].y}" />`;
        }
    }

    svg.innerHTML = lines;
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('resize', () => {
    resize();
});

// ============================================
// INICIALIZACIÓN (Deferred for TTI optimization)
// ============================================
function initCosmos() {
    if (canvas) {
        resize();
        renderStars(0);
    }
    updateConstellationLines();
}

if (window.requestIdleCallback) {
    window.requestIdleCallback(initCosmos);
} else {
    setTimeout(initCosmos, 1);
}

// Ocultar loader cuando todo esté cargado
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 500);
    }
});

// ============================================
// CONSOLE SIGNATURE
// ============================================
console.log('%c✦ ShamanTek ✦', 'font-size: 20px; color: #ffd700;');
console.log('%cRecuerda que hemos venido a explorar', 'color: #888; font-style: italic;');
console.log('%c—', 'color: #333;');
console.log('%c"La imaginación es más importante que el conocimiento."', 'color: #aaa;');
console.log('%c— Albert Einstein', 'color: #555;');

/*
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    
    "Your assumptions are your windows on the world. 
     Scrub them off every once in a while, or the light won't come in."
                                                    — Isaac Asimov
    
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
