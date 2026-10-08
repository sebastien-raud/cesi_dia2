// L'Atelier du Meuble : scripts de la page d'accueil
// Principe : le CSS décrit les animations, le JavaScript décide quand elles se jouent
// (en ajoutant ou en retirant une classe).

// ---------- Menu mobile ----------

// 1. Sélectionner les éléments dont on a besoin
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

// 2. Écouter le clic sur le bouton
menuButton.addEventListener('click', () => {
    // 3. Ajouter la classe si elle est absente, la retirer sinon.
    //    toggle renvoie true si la classe est maintenant présente.
    const isOpen = nav.classList.toggle('is-open');

    // Informer les lecteurs d'écran de l'état du menu
    menuButton.setAttribute('aria-expanded', isOpen);
});

// Pour aller plus loin : refermer le menu quand on choisit un lien
function closeMenu() {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', false);
}

nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

// Pour aller plus loin : refermer le menu avec la touche Échap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// ---------- Boutons « Ajouter aux favoris » ----------

// querySelectorAll renvoie tous les boutons : on les parcourt un par un
const favoriteButtons = document.querySelectorAll('.favorite-button');

favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const isFavorite = button.classList.toggle('is-favorite');

        // Le texte suit l'état du bouton
        button.textContent = isFavorite ? '♥ Dans vos favoris' : 'Ajouter aux favoris';

        // aria-pressed : indique aux lecteurs d'écran que le bouton est enfoncé ou non
        button.setAttribute('aria-pressed', isFavorite);
    });
});

// ---------- Intro animée avec GSAP (TP 3) ----------

// gsap.matchMedia() : l'intro n'est créée que si l'utilisateur n'a pas demandé
// à réduire les animations (la règle CSS prefers-reduced-motion ne concerne pas GSAP).
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Une timeline enchaîne les animations : chacune démarre quand la précédente se termine
    const intro = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });

    intro
        // from : l'élément part de cet état et revient à son état normal (celui du CSS)
        .from('.site-header', { y: -100, opacity: 0 })
        .from('.hero h1', { y: 30, opacity: 0 })
        // '-=0.3' : démarre 0,3 s avant la fin de l'animation précédente (chevauchement)
        .from('.hero-tagline', { y: 30, opacity: 0 }, '-=0.3')
        .from('.hero .button', { scale: 0.5, opacity: 0 }, '-=0.3')
        // stagger : chaque carte démarre 0,15 s après la précédente.
        // Seulement l'opacité : les cartes ont déjà une transition CSS sur transform (survol),
        // qui ralentirait un mouvement piloté par GSAP.
        .from('.product-card', { opacity: 0, stagger: 0.15 })
        // Pour aller plus loin : le bouton « respire » en boucle
        // (repeat: -1 = à l'infini, yoyo = aller-retour)
        .to('.hero .button', { scale: 1.05, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Rejouer toute la timeline depuis le début
    document.querySelector('.replay-button').addEventListener('click', () => {
        intro.restart();
    });
});
