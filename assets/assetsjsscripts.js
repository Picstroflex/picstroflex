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


    // 3. Smooth Scroll (Fallback pour les anciens navigateurs si scroll-behavior: smooth n'est pas supporté)
    // Ici, nous nous reposons principalement sur le CSS 'scroll-behavior: smooth', 
    // mais si un script JS était nécessaire pour la compatibilité, il irait ici.

});