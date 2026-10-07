// Correction : La confiserie
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : certaines étapes complètent le code
// d'étapes précédentes (indiqué en commentaire).


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
// createElement crée l'élément en mémoire ; il n'apparaît qu'une fois ajouté à la page
const warmup = document.querySelector('#warmup');

const firstCandy = document.createElement('p');
firstCandy.textContent = '🍬 Mon premier bonbon';
warmup.append(firstCandy);


// Étape 2 : afficher tous les noms de candyNames dans une liste
const list = document.createElement('ul');

for (const name of candyNames) {
    const item = document.createElement('li');
    item.textContent = name;
    list.append(item);
}
warmup.append(list);


// Étape 3 : une carte par bonbon du tableau candies (emoji, nom, prix)
// à l'étape 3, la carte était construite élément par élément :
//     const card = document.createElement('button');
//     card.classList.add('candy');
//     const emoji = document.createElement('span');
//     emoji.classList.add('emoji');
//     emoji.textContent = candy.emoji;
//     card.append(emoji);
//     … de même pour le nom et le prix
// l'étape 4 la crée à partir du template ; la fonction render est complétée aux étapes 9 et 10
const showcase = document.querySelector('#showcase');
const emptyMessage = document.querySelector('#empty-message');

function render(list) {
    // étape 9 : on vide la vitrine avant de la remplir à nouveau
    showcase.replaceChildren();

    // étape 10 : message si la liste est vide
    emptyMessage.classList.toggle('hidden', list.length > 0);

    // étape 5 : forEach donne aussi le rang de chaque bonbon (index)
    list.forEach((candy, index) => {
        showcase.append(createCard(candy, index));
    });
}


// Étape 4 : créer les cartes à partir du template
// le template contient le HTML d'une carte : on le clone, puis on remplit les trous
const template = document.querySelector('#candy-template');

function createCard(candy, index) {
    const card = template.content.cloneNode(true).querySelector('.candy');
    card.querySelector('.emoji').textContent = candy.emoji;
    card.querySelector('.name').textContent = candy.name;
    card.querySelector('.price').textContent = formatPrice(candy.price);
    card.style.setProperty('--color', candy.color);
    // étape 7 : le nom, pour retrouver le bonbon au clic
    card.dataset.name = candy.name;
    // étape 5 : le rang de la carte règle son délai d'apparition
    card.style.setProperty('--i', index);
    return card;
}

// premier affichage de la vitrine (dès l'étape 3 ; placé ici, après la déclaration
// de template, car render appelle createCard qui l'utilise)
render(candies);


// Étape 5 : apparition en cascade (variable CSS --i)
// (voir createCard, à l'étape 4 ; le CSS fourni calcule animation-delay à partir de --i)


// Étape 6 : un clic sur une carte met le bonbon dans le sac
// à l'étape 6, chaque carte avait son écouteur, ajouté dans createCard :
//     card.addEventListener('click', () => addToBag(candy));
// l'étape 7 le remplace par un seul écouteur sur la vitrine
const bagIcon = document.querySelector('#bag-icon');
const bagCount = document.querySelector('#bag-count');
const bagTotal = document.querySelector('#bag-total');
const bagItems = document.querySelector('#bag-items');
let bag = [];

function updateBag() {
    let total = 0;
    for (const candy of bag) {
        total += candy.price;
    }
    bagCount.textContent = bag.length;
    bagTotal.textContent = formatPrice(total);
}

function addToBag(candy) {
    bag.push(candy);

    // l'emoji du bonbon s'ajoute au sac
    const item = document.createElement('span');
    item.textContent = candy.emoji;
    bagItems.append(item);

    updateBag();

    // le sac sursaute (la classe est retirée à la fin de l'animation, pour pouvoir rejouer)
    bagIcon.classList.add('bump');
}

bagIcon.addEventListener('animationend', () => {
    bagIcon.classList.remove('bump');
});


// Étape 7 : un seul écouteur sur la vitrine (délégation)
// le clic « remonte » de l'élément cliqué jusqu'à la vitrine ;
// closest trouve la carte, même si on a cliqué sur l'emoji ou le prix
showcase.addEventListener('click', (event) => {
    const card = event.target.closest('.candy');
    if (!card) {
        return; // clic entre les cartes
    }
    card.classList.add('picked');
    const candy = candies.find(c => c.name === card.dataset.name);
    addToBag(candy);
});

// la fin de l'animation de l'emoji remonte elle aussi jusqu'à la vitrine
showcase.addEventListener('animationend', (event) => {
    const card = event.target.closest('.candy');
    if (card) {
        card.classList.remove('picked');
    }
});


// Étape 8 : le bouton « Vider le sac »
const emptyButton = document.querySelector('#empty-button');

emptyButton.addEventListener('click', () => {
    bag = [];
    // remove() retire un élément de la page
    bagItems.querySelectorAll('span').forEach(item => item.remove());
    updateBag();
});


// Étape 9 : les filtres « Tout », « Moins de 1 € », « Acidulés », « Au chocolat »
// filter renvoie un nouveau tableau avec les éléments qui vérifient la condition
const filterButtons = document.querySelectorAll('.filters button');

function applyFilter(button, list) {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    render(list);
}

document.querySelector('#filter-all').addEventListener('click', (event) => {
    applyFilter(event.currentTarget, candies);
});
document.querySelector('#filter-cheap').addEventListener('click', (event) => {
    applyFilter(event.currentTarget, candies.filter(candy => candy.price < 1));
});
document.querySelector('#filter-sour').addEventListener('click', (event) => {
    applyFilter(event.currentTarget, candies.filter(candy => candy.sour));
});
document.querySelector('#filter-chocolate').addEventListener('click', (event) => {
    // aucun bonbon n'a de propriété chocolate : le tableau obtenu est vide
    applyFilter(event.currentTarget, candies.filter(candy => candy.chocolate));
});


// Étape 10 : un message quand la vitrine est vide
// (voir render, à l'étape 3)


// Étape 11 (bonus) : un bonbon tombe du ciel toutes les 5 secondes
const sky = document.querySelector('#sky');

function dropCandy() {
    const candy = candies[Math.floor(Math.random() * candies.length)];

    const falling = document.createElement('button');
    falling.classList.add('falling');
    falling.textContent = candy.emoji;
    falling.setAttribute('aria-label', `Attraper : ${candy.name}`);
    falling.style.left = `${Math.floor(Math.random() * 90)}%`;

    // attrapé au vol : il va dans le sac
    falling.addEventListener('click', () => {
        addToBag(candy);
        falling.remove();
    });
    // arrivé en bas sans être attrapé : on le retire
    falling.addEventListener('animationend', () => falling.remove());

    sky.append(falling);
}

// pas de pluie de bonbons si le système demande de réduire les animations
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(dropCandy, 5000);
}
