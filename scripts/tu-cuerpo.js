/*
    "La única manera de enfrentar un mundo sin libertad es volverse 
    tan absolutamente libre que tu propia existencia sea un acto de rebeldía."
                                                            — Albert Camus
*/

// Console easter egg
console.log('%c⚠ TU CUERPO NO ES TUYO ⚠', 'font-size: 16px; color: #ff2d2d; font-family: monospace;');
console.log('%cO al menos eso es lo que quieren que creas.', 'color: #888; font-style: italic;');
console.log('%c—', 'color: #333;');
console.log('%c"Debemos ser hombres primero, y súbditos después."', 'color: #b85c38; font-style: italic;');
console.log('%c— Henry David Thoreau', 'color: #555;');
console.log('%c—', 'color: #333;');
console.log('%cDe la piel para adentro, mando yo.', 'color: #444;');
console.log('%c—', 'color: #333;');
console.log('%c◈ ShamanTek // IA & Futuro ◈', 'color: #ff2d2d; font-size: 10px;');

// Progress bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// ============================================
// ÍNDICE LATERAL - Funcionalidad
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Toggle sidebar en móvil
    const tocToggle = document.getElementById('tocToggle');
    const tocSidebar = document.getElementById('tocSidebar');

    if (tocToggle && tocSidebar) {
        tocToggle.addEventListener('click', () => {
            tocSidebar.classList.toggle('mobile-open');
            tocToggle.textContent = tocSidebar.classList.contains('mobile-open') ? '✕' : '☰';
        });
    }

    // Cerrar sidebar al hacer click en un link (móvil)
    document.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1100) {
                if (tocSidebar) tocSidebar.classList.remove('mobile-open');
                if (tocToggle) tocToggle.textContent = '☰';
            }
        });
    });

    // Resaltar sección activa según scroll
    const sections = document.querySelectorAll('section[id], div[id].resources, div[id].war-card, div[id].utopia-card, div[id].tool-section, h2[id], h3[id]');
    const tocLinks = document.querySelectorAll('.toc-link');
    const tocDots = document.querySelectorAll('.toc-dot');

    function highlightActiveSection() {
        let current = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPos >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Actualizar links del sidebar
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Actualizar dots para partes principales
        const mainSections = ['prologo', 'parte1', 'parte2', 'parte3', 'parte4', 'parte5', 'parte6', 'epilogo'];
        let currentMain = 'prologo';

        mainSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && scrollPos >= section.offsetTop) {
                currentMain = sectionId;
            }
        });

        tocDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentMain) {
                dot.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Ejecutar al cargar

    // Click en dots navega a la sección
    tocDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionId = dot.dataset.section;
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
