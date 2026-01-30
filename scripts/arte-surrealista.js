/**
 * Arte Surrealista - Script Base
 * ShamanTek
 *
 * Funcionalidades compartidas para todas las galerías
 * del mundo de arte surrealista.
 */

(function() {
    'use strict';

    // ============================================
    // UTILIDADES COMPARTIDAS
    // ============================================

    const SurrealUtils = {
        /**
         * Selecciona un elemento aleatorio de un array
         */
        randomChoice(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        },

        /**
         * Genera un número aleatorio entre min y max
         */
        randomRange(min, max) {
            return Math.random() * (max - min) + min;
        },

        /**
         * Debounce para optimizar eventos frecuentes
         */
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Throttle para limitar ejecuciones
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Fade in/out de un elemento
         */
        fadeIn(element, duration = 400) {
            element.style.opacity = 0;
            element.style.display = 'block';

            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                element.style.opacity = Math.min(progress / duration, 1);
                if (progress < duration) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        },

        fadeOut(element, duration = 400) {
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                element.style.opacity = Math.max(1 - progress / duration, 0);
                if (progress < duration) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                }
            };
            requestAnimationFrame(animate);
        }
    };

    // ============================================
    // EFECTOS VISUALES
    // ============================================

    const SurrealEffects = {
        /**
         * Efecto parallax para fondos
         */
        initParallax(selector, intensity = 0.05) {
            const elements = document.querySelectorAll(selector);
            if (!elements.length) return;

            window.addEventListener('mousemove', SurrealUtils.throttle((e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                elements.forEach(el => {
                    const depth = parseFloat(el.dataset.depth) || 1;
                    const moveX = x * intensity * depth * 100;
                    const moveY = y * intensity * depth * 100;
                    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            }, 16));
        },

        /**
         * Efecto de distorsión en hover
         */
        initDistortion(container, options = {}) {
            const defaults = {
                intensity: 20,
                duration: 300
            };
            const settings = { ...defaults, ...options };

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                container.style.setProperty('--distort-x', `${(x - 0.5) * settings.intensity}px`);
                container.style.setProperty('--distort-y', `${(y - 0.5) * settings.intensity}px`);
            });

            container.addEventListener('mouseleave', () => {
                container.style.setProperty('--distort-x', '0px');
                container.style.setProperty('--distort-y', '0px');
            });
        },

        /**
         * Generador de estrellas dinámicas
         */
        generateStars(container, count = 50) {
            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.className = 'dynamic-star';
                star.style.cssText = `
                    position: absolute;
                    width: ${SurrealUtils.randomRange(1, 3)}px;
                    height: ${SurrealUtils.randomRange(1, 3)}px;
                    background: rgba(255, 232, 160, ${SurrealUtils.randomRange(0.3, 0.8)});
                    border-radius: 50%;
                    left: ${SurrealUtils.randomRange(0, 100)}%;
                    top: ${SurrealUtils.randomRange(0, 100)}%;
                    animation: twinkle ${SurrealUtils.randomRange(2, 6)}s ease-in-out infinite;
                    animation-delay: ${SurrealUtils.randomRange(0, 3)}s;
                `;
                container.appendChild(star);
            }
        }
    };

    // ============================================
    // TRANSICIONES
    // ============================================

    const SurrealTransitions = {
        /**
         * Transición tipo "dissolve"
         */
        dissolve(fromEl, toEl, duration = 1000) {
            return new Promise(resolve => {
                fromEl.style.transition = `opacity ${duration}ms ease`;
                toEl.style.transition = `opacity ${duration}ms ease`;
                toEl.style.opacity = 0;
                toEl.style.display = 'block';

                requestAnimationFrame(() => {
                    fromEl.style.opacity = 0;
                    toEl.style.opacity = 1;

                    setTimeout(() => {
                        fromEl.style.display = 'none';
                        resolve();
                    }, duration);
                });
            });
        },

        /**
         * Transición tipo "blur"
         */
        blur(fromEl, toEl, duration = 800) {
            return new Promise(resolve => {
                fromEl.style.transition = `opacity ${duration}ms ease, filter ${duration}ms ease`;
                toEl.style.transition = `opacity ${duration}ms ease, filter ${duration}ms ease`;

                toEl.style.opacity = 0;
                toEl.style.filter = 'blur(20px)';
                toEl.style.display = 'block';

                requestAnimationFrame(() => {
                    fromEl.style.opacity = 0;
                    fromEl.style.filter = 'blur(20px)';
                    toEl.style.opacity = 1;
                    toEl.style.filter = 'blur(0)';

                    setTimeout(() => {
                        fromEl.style.display = 'none';
                        fromEl.style.filter = '';
                        resolve();
                    }, duration);
                });
            });
        }
    };

    // ============================================
    // AUDIO (OPCIONAL)
    // ============================================

    const SurrealAudio = {
        context: null,
        gainNode: null,

        init() {
            if (this.context) return;
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.context.createGain();
            this.gainNode.connect(this.context.destination);
            this.gainNode.gain.value = 0.3;
        },

        /**
         * Tono ambiental suave
         */
        playAmbientTone(frequency = 220, duration = 2) {
            if (!this.context) this.init();

            const oscillator = this.context.createOscillator();
            const envelope = this.context.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;

            envelope.gain.setValueAtTime(0, this.context.currentTime);
            envelope.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.5);
            envelope.gain.linearRampToValueAtTime(0, this.context.currentTime + duration);

            oscillator.connect(envelope);
            envelope.connect(this.gainNode);

            oscillator.start();
            oscillator.stop(this.context.currentTime + duration);
        }
    };

    // ============================================
    // EXPORTAR GLOBALMENTE
    // ============================================

    window.ShamanTekSurreal = {
        Utils: SurrealUtils,
        Effects: SurrealEffects,
        Transitions: SurrealTransitions,
        Audio: SurrealAudio
    };

})();
