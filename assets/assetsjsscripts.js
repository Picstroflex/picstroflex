document.addEventListener('DOMContentLoaded', () => {

    // 1. Fonctionnalité Header Sticky & Opaque
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight;
    
    // Ajout d'une classe "scrolled" au body ou header
    function handleScroll() {
        if (window.scrollY > headerHeight) {
            header.classList.add('scrolled');
        } else {
            // Uniquement si la page d'accueil commence transparente
            if (header.classList.contains('header-transparent')) {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifie la position au chargement si on arrive via un lien ancre

    // 2. Animations Smooth Fade-In (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% de l'élément visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Arrête d'observer une fois l'animation déclenchée
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 3. Curseur personnalisé (désactivé sur mobile)
    const cur = document.getElementById('cursor');
    const rng = document.getElementById('cursor-ring');
    
    // Détection des appareils tactiles
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    };
    
    if (!isTouchDevice() && cur && rng) {
        // Seulement sur desktop (souris)
        document.addEventListener('mousemove', e => { 
            let x = e.clientX; 
            let y = e.clientY; 
            cur.style.left = x + 'px'; 
            cur.style.top = y + 'px';
            rng.style.left = x + 'px';
            rng.style.top = y + 'px';
        });
        
        // Effet de survol (agrandissement)
        const hoverElements = document.querySelectorAll('a, button, .chip, .pcard, .pcard-cta, .btn, .service-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    } else {
        // Sur mobile : on cache complètement le curseur personnalisé
        if (cur) cur.style.display = 'none';
        if (rng) rng.style.display = 'none';
    }

    // 4. Smooth Scroll (Fallback pour les anciens navigateurs)
    // Le CSS 'scroll-behavior: smooth' est déjà présent

});
