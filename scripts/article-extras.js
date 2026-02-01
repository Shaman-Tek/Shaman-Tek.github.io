/* 
    ARTICLE EXTRAS: Subscription & Social Sharing Logic
    Brand: Shaman-Tek
*/

const ArticleExtras = {
    init() {
        this.title = document.title;
        this.url = this.getCanonicalUrl();

        this.renderComponents();
        this.setupSharing();
        this.setupSubscription();
        this.handleScroll();
    },

    /**
     * Returns the canonical URL for sharing.
     * If viewing locally (file://), constructs the production URL from the path.
     */
    getCanonicalUrl() {
        const currentUrl = window.location.href;

        // If it's a local file, construct the production URL
        if (currentUrl.startsWith('file://')) {
            // Extract the path after 'shamantek/' or similar project folder
            const match = currentUrl.match(/shamantek[\/\\](.+)$/i);
            if (match) {
                const relativePath = match[1].replace(/\\/g, '/');
                return `https://shaman-tek.github.io/${relativePath}`;
            }
            // Fallback: return the base site URL
            return 'https://shaman-tek.github.io/';
        }

        return currentUrl;
    },

    renderComponents() {
        // --- Render Share Bar ---
        const shareBar = document.createElement('div');
        shareBar.className = 'share-bar';
        shareBar.id = 'shareBar';
        shareBar.innerHTML = `
            <a href="#" class="share-btn" data-platform="whatsapp" title="Compartir en WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="#" class="share-btn" data-platform="facebook" title="Compartir en Facebook">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="share-btn" data-platform="twitter" title="Compartir en X">
                <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" class="share-btn" data-platform="telegram" title="Compartir en Telegram">
                <i class="fab fa-telegram-plane"></i>
            </a>
            <a href="#" class="share-btn" data-platform="copy" title="Copiar enlace">
                <i class="fas fa-link"></i>
            </a>
        `;
        document.body.appendChild(shareBar);

        // --- Render Subscription Box at the end of article ---
        // Priority: explicit target > article > main > conclusion > footer
        const subscriptionTarget = document.querySelector('.article-extras-target') ||
            document.querySelector('article') ||
            document.querySelector('.main') ||
            document.querySelector('.conclusion') ||
            document.querySelector('footer');

        if (subscriptionTarget) {
            const subBox = document.createElement('div');
            subBox.className = 'subscription-container';
            subBox.innerHTML = `
                <div class="subscription-title">Transmisión de Datos</div>
                <p class="subscription-text">Unite a la red. Recibí actualizaciones sobre soberanía, tecnología y el futuro de la consciencia.</p>
                <form class="subscription-form" id="subForm">
                    <input type="email" class="subscription-input" placeholder="tu@email.com" required>
                    <button type="submit" class="subscription-submit">SUSCRIBIRSE</button>
                </form>
                <div class="form-message" id="formMessage"></div>
            `;

            // If it's the explicit target, replace its content; otherwise append
            if (subscriptionTarget.classList.contains('article-extras-target')) {
                subscriptionTarget.appendChild(subBox);
            } else {
                subscriptionTarget.appendChild(subBox);
            }
        }

        // Load FontAwesome 6 if not present (using brands specifically for X icon)
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
            document.head.appendChild(fa);
        }
    },

    setupSharing() {
        const btns = document.querySelectorAll('.share-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = btn.dataset.platform;
                let shareUrl = '';

                switch (platform) {
                    case 'whatsapp':
                        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.title + ' ' + this.url)}`;
                        break;
                    case 'facebook':
                        // Refined FB URL as sharer.php?u= can be finicky if not encoded perfectly
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.title)}&url=${encodeURIComponent(this.url)}`;
                        break;
                    case 'telegram':
                        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(this.url)}&text=${encodeURIComponent(this.title)}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(this.url).then(() => {
                            const msg = btn.title;
                            btn.title = '¡Copiado!';
                            setTimeout(() => btn.title = msg, 2000);
                        });
                        return;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    },

    setupSubscription() {
        const form = document.getElementById('subForm');
        const message = document.getElementById('formMessage');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input').value;

                // MOCK implementation
                message.textContent = 'Procesando conexión...';
                message.className = 'form-message';

                setTimeout(() => {
                    message.textContent = '¡Conexión establecida! Te has unido a la red.';
                    message.className = 'form-message success';
                    form.reset();
                }, 1500);
            });
        }
    },

    handleScroll() {
        const shareBar = document.getElementById('shareBar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                shareBar.classList.add('visible');
            } else {
                shareBar.classList.remove('visible');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => ArticleExtras.init());
