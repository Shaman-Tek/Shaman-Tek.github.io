/*
    "In a time of universal deceit, telling the truth is a revolutionary act."
                                                            — George Orwell
*/

document.addEventListener('DOMContentLoaded', () => {
    // Console easter egg
    console.log('%c◈ IA & FUTURO ◈', 'font-size: 16px; color: #00f0ff; font-family: monospace;');
    console.log('%cNodo activo en la red ShamanTek', 'color: #888; font-style: italic;');
    console.log('%c—', 'color: #333;');
    console.log('%c"Privacy is necessary for an open society in the electronic age."', 'color: #00ff88; font-style: italic;');
    console.log('%c— A Cypherpunk\'s Manifesto', 'color: #555;');
    console.log('%c—', 'color: #333;');
    console.log('%cSi puedes leer esto, quizás ya entiendes.', 'color: #444;');

    /*
        ████████████████████████████████████████████████████████████████
        
        "Code is law."
                                                    — Lawrence Lessig
        
        ████████████████████████████████████████████████████████████████
    */

    // Efecto de typing en terminal
    const terminalText = document.querySelector('.terminal-line span:first-child');
    if (terminalText) {
        const originalText = terminalText.textContent;

        function typeEffect() {
            let i = 0;
            terminalText.textContent = '';

            const typing = setInterval(() => {
                if (i < originalText.length) {
                    terminalText.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 50);
        }

        // Iniciar efecto cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeEffect, 500);
                    observer.unobserve(entry.target);
                }
            });
        });

        const terminalLine = document.querySelector('.terminal-line');
        if (terminalLine) {
            observer.observe(terminalLine);
        }
    }
});
