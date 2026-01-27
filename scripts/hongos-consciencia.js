// Progress bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.getElementById('progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// Fade in sections on scroll
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
}
