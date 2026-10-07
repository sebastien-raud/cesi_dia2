// La confiserie
// Les consignes détaillées, les résultats attendus et les aides sont dans le README.md.
// Écris ton code sous chaque étape, puis recharge la page pour tester.


// ----- Données fournies (rien à modifier) -----

// pour l'étape 2
const candyNames = ['Fraise Tagada', 'Crocodile', 'Sucette', 'Berlingot', 'Chamallow', 'Ourson guimauve'];

// à partir de l'étape 3 : un objet par bonbon
const candies = [
    { name: 'Fraise Tagada', emoji: '🍓', price: 0.8, sour: false, color: '#FFD6E7' },
    { name: 'Crocodile', emoji: '🐊', price: 0.7, sour: false, color: '#C9F2D9' },
    { name: 'Sucette', emoji: '🍭', price: 0.5, sour: false, color: '#FFE3A3' },
    { name: 'Berlingot', emoji: '🍬', price: 0.3, sour: true, color: '#D3F0FF' },
    { name: 'Bonbon citron', emoji: '🍋', price: 0.6, sour: true, color: '#FFF6A8' },
    { name: 'Cerise acidulée', emoji: '🍒', price: 0.9, sour: true, color: '#FFC9C9' },
    { name: 'Pomme piquante', emoji: '🍏', price: 1.1, sour: true, color: '#D8F5C4' },
    { name: 'Chamallow', emoji: '☁️', price: 1.3, sour: false, color: '#EEF0F4' },
    { name: 'Ourson guimauve', emoji: '🧸', price: 1.5, sour: false, color: '#F3DCC2' },
    { name: 'Ruban arc-en-ciel', emoji: '🌈', price: 1.8, sour: true, color: '#FFE0F0' },
    { name: 'Brochette de bonbons', emoji: '🍡', price: 2, sour: false, color: '#E9D7FF' }
];

// transforme 0.8 en « 0,80 € »
function formatPrice(price) {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}


// Étape 1 : créer un bonbon « à la main » et l'ajouter à l'échauffement


// Étape 2 : afficher tous les noms de candyNames dans une liste


// Étape 3 : une carte par bonbon du tableau candies (emoji, nom, prix)


// Étape 4 : créer les cartes à partir du template


// Étape 5 : apparition en cascade (variable CSS --i)


// Étape 6 : un clic sur une carte met le bonbon dans le sac


// Étape 7 : un seul écouteur sur la vitrine (délégation)


// Étape 8 : le bouton « Vider le sac »


// Étape 9 : les filtres « Tout », « Moins de 1 € », « Acidulés », « Au chocolat »


// Étape 10 : un message quand la vitrine est vide


// Étape 11 (bonus) : un bonbon tombe du ciel toutes les 5 secondes
