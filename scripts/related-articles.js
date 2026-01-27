/**
 * Related Articles System
 * ShamanTek Portal
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('related-articles-container');
    if (!container) return; // Si no hay contenedor, no hacemos nada

    // 1. Obtener ID del artículo actual
    // Buscamos un meta tag específico o usamos el pathname
    const currentPath = window.location.pathname;

    // 2. Cargar base de datos
    // Usamos ruta absoluta (funciona mejor con servidor web)
    const dbPath = '/content/articles.json';
    console.log('ShamanTek: Iniciando búsqueda de sintonías en', dbPath);

    fetch(dbPath)
        .then(response => response.json())
        .then(articles => {
            // Encontrar artículo actual en la DB
            const currentFilename = currentPath.split('/').pop() || 'index.html';
            const currentArticle = articles.find(a => a.url.endsWith(currentFilename));

            if (!currentArticle) {
                console.warn('Artículo actual no encontrado en DB, mostrando sugerencias aleatorias.');
                renderRelated(getRandomArticles(articles, 3), container);
                return;
            }

            // 3. Calcular similitud
            const related = articles
                .filter(a => a.id !== currentArticle.id) // Excluir actual
                .map(article => {
                    return {
                        ...article,
                        score: calculateSimilarity(currentArticle.tags, article.tags)
                    };
                })
                .sort((a, b) => b.score - a.score) // Ordenar por relevancia
                .slice(0, 3); // Top 3

            renderRelated(related, container);
        })
        .catch(err => console.error('Error cargando artículos relacionados:', err));
});

function normalizePath(path) {
    if (!path) return '';
    // Eliminar slash inicial y asegurar consistencia
    return path.replace(/^\//, '').replace(/\\/g, '/');
}

function calculateSimilarity(tagsA, tagsB) {
    if (!tagsA || !tagsB) return 0;
    // Intersección de tags
    const shared = tagsA.filter(tag => tagsB.includes(tag));
    return shared.length;
}

function getRandomArticles(articles, count) {
    // Barajar y tomar N
    return [...articles]
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
}

function renderRelated(articles, container) {
    if (articles.length === 0) return;

    const html = `
        <div class="separator"></div>
        <div class="related-section">
            <h3 class="part-header" style="padding: 2rem 0 1rem; text-align: left; font-size: 1.5rem;">
                <span class="part-number">EXPLORA MÁS</span><br>
                Sintonías Relacionadas
            </h3>
            
            <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                ${articles.map(article => `
                    <a href="${article.url}" class="stat-card" style="text-decoration: none; text-align: left; display: block;">
                        <span class="case-country" style="color: var(--accent-cyan);">${article.tags[0] || 'ARTÍCULO'}</span>
                        <h4 class="case-title" style="font-size: 1.1rem; margin: 0.5rem 0; color: var(--text-primary);">${article.title}</h4>
                        <p class="stat-label" style="font-size: 0.85rem; line-height: 1.5;">${article.excerpt.substring(0, 100)}...</p>
                        <div class="tool-link" style="display: inline-block; margin-top: 1rem; width: auto;">LEER TRANSMISIÓN</div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = html;
}
