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
