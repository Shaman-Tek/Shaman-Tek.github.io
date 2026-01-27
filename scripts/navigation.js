/**
 * NAVIGATION
 * ShamanTek Portal
 */

function enterWorld(worldId) {
    const transition = document.getElementById(`transition-${worldId}`);
    if (!transition) return;

    transition.classList.add('active');

    // Obtener posición de la estrella clickeada
    const star = document.querySelector(`[data-world="${worldId}"]`);
    if (star) {
        const rect = star.getBoundingClientRect();
        const zoom = transition.querySelector('.transition-zoom');

        if (zoom) {
            zoom.style.left = `${rect.left + rect.width / 2}px`;
            zoom.style.top = `${rect.top + rect.height / 2}px`;
        }
    }

    // Redirigir después de la animación
    setTimeout(() => {
        // Mapeo de mundos a URLs
        const worldUrls = {
            'ia': 'mundos/ia-futuro/index.html',
            'spirit': 'mundos/espiritualidad/index.html',
            'art': 'mundos/arte-surrealista/index.html'
        };

        if (worldUrls[worldId]) {
            window.location.href = worldUrls[worldId];
        } else {
            // Mundo en construcción
            const text = transition.querySelector('.transition-text');
            if (text) {
                const originalText = text.innerHTML;
                text.innerHTML = 'Mundo en construcción<br><span style="font-size: 0.7em; opacity: 0.6;">Volviendo...</span>';

                setTimeout(() => {
                    transition.classList.remove('active');
                    setTimeout(() => {
                        const zoom = transition.querySelector('.transition-zoom');
                        if (zoom) {
                            zoom.style.left = '50%';
                            zoom.style.top = '50%';
                        }
                        text.innerHTML = originalText.split('<br>')[0];
                    }, 500);
                }, 2000);
            }
        }
    }, 1800);
}
