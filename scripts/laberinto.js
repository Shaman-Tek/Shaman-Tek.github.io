/**
 * Laberinto Onírico - Galería Interactiva
 * ShamanTek - Arte Surrealista
 *
 * Sistema de navegación no-lineal con capas revelables
 * y ritual de entrada personalizado.
 */

(function () {
    'use strict';

    // ============================================
    // CONFIGURACIÓN
    // ============================================

    const CONFIG = {
        DEEP_REVEAL_DELAY: 800,      // ms para revelar capa profunda
        DEEP_REVEAL_DURATION: 2000,  // ms que permanece la capa profunda
        WHISPER_FADE_DELAY: 10000,   // ms antes de ocultar instrucciones
        RITUAL_QUESTIONS: 4,
        SKIP_CLICKS_REQUIRED: 3,
        HINT_CYCLE_INTERVAL: 8000    // ms entre rotación de hints
    };

    // Fragmentos oraculares
    const ORACLE_FRAGMENTS = [
        "Lo que buscás ya te encontró. Solo falta que lo reconozcas.",
        "El agua recuerda la forma de todo lo que la atraviesa.",
        "No hay respuesta incorrecta cuando la pregunta es sincera.",
        "Entre el sueño y la vigilia existe una puerta sin llave.",
        "Lo que parece un final es solo un umbral visto desde el otro lado.",
        "El espejo no miente, pero tampoco dice toda la verdad.",
        "Cada decisión crea un mundo que nunca conocerás.",
        "La oscuridad no es ausencia de luz, es presencia de misterio.",
        "Lo que te da miedo y lo que te atrae son la misma cosa.",
        "El camino que no tomaste también te llevaba aquí.",
        "Lo que ves en el reflejo no siempre es lo que te mira.",
        "Las serpientes del marco saben tu nombre.",
        "Los árboles duermen, pero nunca dejan de escuchar.",
        "El bosque es una sola mente soñando con ser muchos.",
        "El vacío no está vacío. Está lleno de lo que aún no tiene nombre.",
        "El ojo que observa desde el centro es también el tuyo."
    ];

    // ============================================
    // ESTADO
    // ============================================

    const state = {
        ritualAnswers: {},
        currentQuestion: 1,
        currentNode: 'umbral',
        visitedNodes: new Set(['umbral']),
        skipClickCount: 0,
        hintIndex: 0,
        interactions: {
            hovered: false,
            held: false,
            moved: false
        }
    };

    // ============================================
    // UTILIDADES
    // ============================================

    /**
     * Selecciona un elemento aleatorio de un array
     */
    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Obtiene todas las imágenes disponibles para el oráculo
     */
    function getOracleImages() {
        const nodes = ['umbral', 'agua', 'espejo', 'bosque', 'abismo'];
        const images = [];
        nodes.forEach(node => {
            for (let i = 1; i <= 3; i++) {
                images.push(`${node}-capa${i}.png`);
            }
        });
        return images;
    }

    // ============================================
    // MÓDULO: RITUAL DE ENTRADA
    // ============================================

    const RitualModule = {
        init() {
            this.bindOptionButtons();
            this.bindSkipTrigger();
        },

        bindOptionButtons() {
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const aspect = btn.dataset.aspect;
                    const value = btn.dataset.value;
                    state.ritualAnswers[aspect] = value;
                    this.advanceQuestion();
                });
            });
        },

        bindSkipTrigger() {
            const ritualTitle = document.querySelector('.ritual-title');
            if (ritualTitle) {
                ritualTitle.addEventListener('click', () => {
                    state.skipClickCount++;
                    if (state.skipClickCount >= CONFIG.SKIP_CLICKS_REQUIRED) {
                        this.complete();
                    }
                    setTimeout(() => state.skipClickCount = 0, 500);
                });
            }
        },

        advanceQuestion() {
            const currentQ = document.querySelector(`.ritual-question[data-question="${state.currentQuestion}"]`);
            const dots = document.querySelectorAll('.ritual-progress .progress-dot');

            if (dots[state.currentQuestion - 1]) {
                dots[state.currentQuestion - 1].classList.remove('active');
                dots[state.currentQuestion - 1].classList.add('completed');
            }

            state.currentQuestion++;

            if (state.currentQuestion <= CONFIG.RITUAL_QUESTIONS) {
                if (currentQ) currentQ.classList.remove('active');
                const nextQ = document.querySelector(`.ritual-question[data-question="${state.currentQuestion}"]`);
                setTimeout(() => {
                    if (nextQ) nextQ.classList.add('active');
                    if (dots[state.currentQuestion - 1]) {
                        dots[state.currentQuestion - 1].classList.add('active');
                    }
                }, 500);
            } else {
                this.complete();
            }
        },

        complete() {
            const ritualScreen = document.getElementById('ritual-screen');
            const labyrinth = document.getElementById('labyrinth');

            setTimeout(() => {
                if (ritualScreen) ritualScreen.classList.add('hidden');
                if (labyrinth) labyrinth.classList.add('visible');
            }, 800);
        }
    };

    // ============================================
    // MÓDULO: ARTWORK INTERACTIVO
    // ============================================

    const ArtworkModule = {
        init() {
            document.querySelectorAll('.artwork-container[data-artwork]').forEach(container => {
                this.setupInteraction(container);
            });
        },

        setupInteraction(container) {
            if (!container || container.dataset.initialized) return;
            container.dataset.initialized = 'true';

            const layerDots = container.querySelectorAll('.layer-dot');
            let currentLayer = 1;
            let isHolding = false;
            let holdTimer;

            const updateLayerIndicator = (layer) => {
                layerDots.forEach((dot, index) => {
                    dot.classList.toggle('active', index < layer);
                });
            };

            // Hover - revela capa 2
            container.addEventListener('mouseenter', () => {
                if (!isHolding) {
                    currentLayer = 2;
                    updateLayerIndicator(2);
                }
                state.interactions.hovered = true;
                UIModule.updateHints();
            });

            container.addEventListener('mouseleave', () => {
                if (!isHolding) {
                    currentLayer = 1;
                    updateLayerIndicator(1);
                    container.classList.remove('deep-reveal');
                }
            });

            // Click prolongado - revela capa 3
            container.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isHolding = true;

                holdTimer = setTimeout(() => {
                    container.classList.add('deep-reveal');
                    currentLayer = 3;
                    updateLayerIndicator(3);
                    state.interactions.held = true;
                    UIModule.updateHints();
                }, CONFIG.DEEP_REVEAL_DELAY);
            });

            container.addEventListener('mouseup', () => {
                clearTimeout(holdTimer);
                isHolding = false;

                setTimeout(() => {
                    if (!isHolding) {
                        container.classList.remove('deep-reveal');
                        currentLayer = 2;
                        updateLayerIndicator(2);
                    }
                }, CONFIG.DEEP_REVEAL_DURATION);
            });

            // Efecto de luz siguiendo el mouse
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                container.style.setProperty('--mouse-x', `${x}%`);
                container.style.setProperty('--mouse-y', `${y}%`);

                if (!state.interactions.moved && state.interactions.hovered) {
                    state.interactions.moved = true;
                    UIModule.updateHints();
                }
            });

            // Touch support
            container.addEventListener('touchstart', (e) => {
                e.preventDefault();
                isHolding = true;
                currentLayer = 2;
                updateLayerIndicator(2);

                holdTimer = setTimeout(() => {
                    container.classList.add('deep-reveal');
                    currentLayer = 3;
                    updateLayerIndicator(3);
                }, CONFIG.DEEP_REVEAL_DELAY);
            });

            container.addEventListener('touchend', () => {
                clearTimeout(holdTimer);
                isHolding = false;

                setTimeout(() => {
                    container.classList.remove('deep-reveal');
                    currentLayer = 1;
                    updateLayerIndicator(1);
                }, CONFIG.DEEP_REVEAL_DURATION);
            });
        },

        // Reinicializar artwork en un nuevo nodo
        initializeNode(node) {
            const artwork = node.querySelector('.artwork-container[data-artwork]');
            if (artwork) this.setupInteraction(artwork);
        }
    };

    // ============================================
    // MÓDULO: NAVEGACIÓN
    // ============================================

    const NavigationModule = {
        init() {
            this.bindPortals();
            this.bindNodeDots();
            this.bindResetButton();
        },

        bindPortals() {
            document.querySelectorAll('.portal').forEach(portal => {
                portal.addEventListener('click', () => {
                    const target = portal.dataset.target;
                    this.navigateToNode(target);
                });
            });
        },

        bindNodeDots() {
            document.querySelectorAll('.node-dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    const target = dot.dataset.node;
                    if (state.visitedNodes.has(target)) {
                        this.navigateToNode(target);
                    }
                });
            });
        },

        bindResetButton() {
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    location.reload();
                });
            }
        },

        navigateToNode(nodeName) {
            const currentNode = document.querySelector('.dream-node.active');
            const targetNode = document.getElementById(`node-${nodeName}`);

            if (!targetNode || targetNode === currentNode) return;

            // Transición de salida
            if (currentNode) currentNode.classList.add('exiting');

            setTimeout(() => {
                if (currentNode) currentNode.classList.remove('active', 'exiting');
                targetNode.classList.add('active');
                state.currentNode = nodeName;
                state.visitedNodes.add(nodeName);

                this.updateIndicators();
                ArtworkModule.initializeNode(targetNode);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 600);
        },

        updateIndicators() {
            document.querySelectorAll('.node-dot').forEach(dot => {
                const node = dot.dataset.node;
                dot.classList.remove('active', 'visited');

                if (node === state.currentNode) {
                    dot.classList.add('active');
                } else if (state.visitedNodes.has(node)) {
                    dot.classList.add('visited');
                }
            });
        },

        bindFullscreen() {
            const fsBtn = document.getElementById('fullscreen-btn');
            if (fsBtn) {
                fsBtn.addEventListener('click', () => {
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().catch(err => {
                            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                        });
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        }
                    }
                });
            }
        }
    };

    // ============================================
    // MÓDULO: ORÁCULO
    // ============================================

    const OracleModule = {
        init() {
            this.bindTrigger();
            this.bindClose();
            this.bindConsult();
        },

        bindTrigger() {
            const trigger = document.getElementById('oracle-trigger');
            const oracle = document.getElementById('oracle');

            if (trigger && oracle) {
                trigger.addEventListener('click', () => {
                    oracle.classList.add('active');
                });
            }
        },

        bindClose() {
            const closeBtn = document.getElementById('oracle-close');
            const oracle = document.getElementById('oracle');
            const response = document.getElementById('oracle-response');
            const consultBtn = document.getElementById('oracle-consult');

            if (closeBtn && oracle) {
                closeBtn.addEventListener('click', () => {
                    oracle.classList.remove('active');
                    if (response) response.classList.remove('visible');
                    if (consultBtn) consultBtn.style.display = 'block';
                });
            }
        },

        bindConsult() {
            const consultBtn = document.getElementById('oracle-consult');
            const response = document.getElementById('oracle-response');
            const textEl = document.getElementById('oracle-text');
            const imageEl = document.getElementById('oracle-image');

            if (consultBtn) {
                consultBtn.addEventListener('click', () => {
                    const fragment = randomChoice(ORACLE_FRAGMENTS);
                    const images = getOracleImages();
                    const image = randomChoice(images);

                    if (textEl) textEl.textContent = fragment;
                    if (imageEl) imageEl.style.backgroundImage = `url('${image}')`;
                    if (response) response.classList.add('visible');
                    consultBtn.style.display = 'none';
                });
            }
        }
    };

    // ============================================
    // MÓDULO: UI
    // ============================================

    const UIModule = {
        init() {
            this.setupWhisperFade();
        },

        setupWhisperFade() {
            // Ya no dependemos de un ID "whisper" único
            // El intervalo sigue siendo global, pero rotateHints es inteligente
            this.hintInterval = setInterval(() => {
                this.rotateHints();
            }, CONFIG.HINT_CYCLE_INTERVAL);
        },

        rotateHints() {
            const activeNode = document.querySelector('.dream-node.active');
            if (!activeNode) return;

            const whisper = activeNode.querySelector('.whisper');
            if (!whisper) return;

            const hints = whisper.querySelectorAll('.whisper-content');
            if (hints.length === 0) return;

            // Quitar active del actual
            let activeIdx = Array.from(hints).findIndex(h => h.classList.contains('active'));
            if (activeIdx !== -1) {
                hints[activeIdx].classList.remove('active');
            }

            // Rotar al siguiente
            activeIdx = (activeIdx + 1) % hints.length;
            hints[activeIdx].classList.add('active');
        },

        updateHints() {
            const activeNode = document.querySelector('.dream-node.active');
            if (!activeNode) return;

            const whisper = activeNode.querySelector('.whisper');
            if (!whisper || whisper.classList.contains('fade')) return;

            // Si el usuario ya dominó las interacciones básicas, ocultar hints gradualmente
            if (state.interactions.hovered && state.interactions.held && state.interactions.moved) {
                setTimeout(() => {
                    whisper.classList.add('fade');
                    // El intervalo puede seguir corriendo, no afecta si el contenedor está fade/invisible
                }, 3000);
            }
        }
    };

    // ============================================
    // INICIALIZACIÓN
    // ============================================

    function init() {
        RitualModule.init();
        ArtworkModule.init();
        NavigationModule.init();
        NavigationModule.bindFullscreen();
        OracleModule.init();
        UIModule.init();
    }

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exportar para uso externo si es necesario
    window.LaberintoOnirico = {
        state,
        navigate: NavigationModule.navigateToNode.bind(NavigationModule),
        getRitualAnswers: () => ({ ...state.ritualAnswers })
    };

})();
