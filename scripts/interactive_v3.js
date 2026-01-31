/**
 * INTERACTIVE V3 - Engagement Engine
 * ShamanTek Portal
 */

// 1. TUNNEL REVEAL EFFECT
class TunnelReveal {
    constructor(el) {
        this.el = el;
        this.text = el.innerText;
        this.splitText();
    }

    splitText() {
        this.el.innerHTML = '';
        const chars = this.text.split('');
        let html = '';

        chars.forEach((char, index) => {
            if (char === ' ') {
                html += '&nbsp;';
            } else if (char === '\n') {
                html += '<br>';
            } else {
                const delay = index * 0.05;
                html += `<span class="tunnel-char animating" style="animation-delay: ${delay}s">${char}</span>`;
            }
        });

        this.el.classList.add('tunnel-text');
        this.el.innerHTML = html;

        const lastChar = this.el.lastElementChild;
        if (lastChar) {
            // Wait for animation + buffer
            const totalTime = (chars.length * 50) + 1400;

            setTimeout(() => {
                const spans = this.el.querySelectorAll('.tunnel-char');
                spans.forEach(span => {
                    span.classList.remove('animating');
                    span.classList.add('reveal-complete');
                    span.style.animationDelay = '';
                });
            }, totalTime);
        }
    }
}

// 2. HOVER SCRAMBLE EFFECT (For Subtitle)
class HoverScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.innerText;
        this.update = this.update.bind(this);

        this.el.addEventListener('mouseenter', () => {
            this.scramble(this.originalText); /* Re-scramble to itself */
        });
    }

    scramble(newText) {
        const oldText = this.originalText;
        const length = Math.max(oldText.length, newText.length);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 15); // Fast scramble
            const end = start + Math.floor(Math.random() * 15);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            // Done
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}


// 3. 3D TILT EFFECT
function initTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        let ticking = false;
        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateTilt(card, e.clientX, e.clientY);
                    ticking = false;
                });
                ticking = true;
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const shine = card.querySelector('.shine');
            if (shine) shine.style.opacity = '0';
        });
    });
}

function updateTilt(card, mouseX, mouseY) {
    const rect = card.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    const shine = card.querySelector('.shine');
    if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 50%)`;
        shine.style.opacity = '1';
    }
}

// 4. MOUSE SPOTLIGHT
function initSpotlight() {
    let spotlight = document.querySelector('.cursor-spotlight');
    if (!spotlight) return;

    spotlight.style.background = `radial-gradient(600px circle at center, rgba(124, 58, 237, 0.15), transparent 40%)`;
    spotlight.style.width = '1200px';
    spotlight.style.height = '1200px';
    spotlight.style.position = 'fixed';
    spotlight.style.top = '0';
    spotlight.style.left = '0';
    spotlight.style.transform = 'translate(-50%, -50%)';
    spotlight.style.willChange = 'transform';
    spotlight.style.pointerEvents = 'none';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        spotlight.style.transform = `translate3d(${currentX - 600}px, ${currentY - 600}px, 0)`;
        requestAnimationFrame(animate);
    }
    animate();
}

// 5. MAGNETIC BUTTONS (Consolidated)
function initMagnetic() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');
    });
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Tunnel
    const el = document.querySelector('.scramble-text');
    if (el) new TunnelReveal(el);

    // 2. Subtitle Scramble
    const sub = document.querySelector('.interactive-subtitle');
    if (sub) new HoverScramble(sub);

    initTilt();
    initSpotlight();
    initMagnetic();
});
