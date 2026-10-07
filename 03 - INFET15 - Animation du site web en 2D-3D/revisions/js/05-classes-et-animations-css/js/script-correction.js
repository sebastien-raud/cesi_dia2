// Correction : Blob, le petit monstre
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : certaines fonctions écrites tôt sont complétées
// par des étapes suivantes (indiqué en commentaire).


// Étape 1 : sélectionner Blob et les boutons
const blob = document.querySelector('#blob');
const colorButton = document.querySelector('#color-button');
const jumpButton = document.querySelector('#jump-button');
const danceButton = document.querySelector('#dance-button');
const sleepButton = document.querySelector('#sleep-button');
const surpriseButton = document.querySelector('#surprise-button');
const shyButton = document.querySelector('#shy-button');
const speedInput = document.querySelector('#speed');

console.log(blob);


// Étape 2 : le bouton « Couleur » bascule la classe blue
// toggle ajoute la classe si elle est absente, la retire si elle est présente
// (rangé dans une fonction pour l'étape 11)
function toggleColor() {
    blob.classList.toggle('blue');
}
colorButton.addEventListener('click', toggleColor);


// Étape 3 : Blob sourit au survol (classe happy)
blob.addEventListener('mouseenter', () => {
    blob.classList.add('happy');
});
blob.addEventListener('mouseleave', () => {
    blob.classList.remove('happy');
});


// Étape 4 : le bouton « Saute » ajoute la classe jump
// (rangé dans la fonction jump() à l'étape 6, complétée à l'étape 8)
function jump() {
    // étape 8 : Blob refuse de sauter quand il dort
    if (blob.classList.contains('sleep')) {
        return;
    }
    blob.classList.add('jump');
}
jumpButton.addEventListener('click', jump);


// Étape 5 : retirer la classe jump à la fin de l'animation (animationend)
// (les animations infinies, comme la danse, ne déclenchent jamais animationend)
blob.addEventListener('animationend', () => {
    // étape 9 : on retire aussi la classe startled
    blob.classList.remove('jump', 'startled');
});


// Étape 6 : la touche Espace fait aussi sauter Blob (fonction jump)
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        // empêche le défilement de la page et le clic sur le bouton qui a le focus
        event.preventDefault();
        jump();
    }
});


// Étape 7 : le bouton « Danse » bascule la classe dance et change de texte
function toggleDance() {
    // étape 8 : Blob refuse de danser quand il dort
    if (blob.classList.contains('sleep')) {
        return;
    }
    blob.classList.toggle('dance');
    danceButton.textContent = blob.classList.contains('dance') ? 'Stop' : 'Danse';
}
danceButton.addEventListener('click', toggleDance);


// Étape 8 : le bouton « Dors » bascule la classe sleep (Blob refuse alors de sauter et de danser)
// (le refus est ajouté au début de jump() et de toggleDance())
function toggleSleep() {
    blob.classList.toggle('sleep');
    // en s'endormant, Blob arrête de danser
    blob.classList.remove('dance');
    danceButton.textContent = 'Danse';
    sleepButton.textContent = blob.classList.contains('sleep') ? 'Réveille' : 'Dors';
}
sleepButton.addEventListener('click', toggleSleep);


// Étape 9 : un clic sur Blob endormi le réveille en sursaut (classe startled)
// (la classe startled est retirée par l'écouteur animationend de l'étape 5)
blob.addEventListener('click', () => {
    if (blob.classList.contains('sleep')) {
        blob.classList.remove('sleep');
        blob.classList.add('startled');
        sleepButton.textContent = 'Dors';
    }
});


// Étape 10 : le curseur règle la vitesse (variable CSS --speed)
const speedValue = document.querySelector('#speed-value');

speedInput.addEventListener('input', () => {
    document.documentElement.style.setProperty('--speed', `${speedInput.value}s`);
    speedValue.textContent = `${speedInput.value} s`;
});


// Étape 11 : le bouton « Surprise » lance une action au hasard
// un tableau peut contenir des fonctions : on en tire une, puis on l'appelle
const actions = [toggleColor, jump, toggleDance, toggleSleep];

surpriseButton.addEventListener('click', () => {
    const index = Math.floor(Math.random() * actions.length);
    actions[index]();
});


// Étape 12 (bonus) : Blob est timide, il s'enfuit quand la souris approche
const stage = document.querySelector('.stage');
const blobWrapper = document.querySelector('.blob-wrapper');
let isShy = false;

shyButton.addEventListener('click', () => {
    isShy = !isShy;
    shyButton.textContent = isShy ? 'Timide : oui' : 'Timide : non';
    if (!isShy) {
        // retour au centre
        blobWrapper.style.transform = '';
    }
});

stage.addEventListener('mousemove', (event) => {
    if (!isShy) {
        return;
    }
    // distance entre la souris et le centre de Blob
    const rect = blob.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
        // nouvelle position au hasard dans la scène
        const maxX = (stage.clientWidth - rect.width) / 2;
        const maxY = stage.clientHeight - rect.height - 40;
        const x = Math.floor(Math.random() * maxX * 2) - maxX;
        const y = -Math.floor(Math.random() * maxY);
        blobWrapper.style.transform = `translate(${x}px, ${y}px)`;
    }
});


// Pour finir : afficher un message si le système demande de réduire les animations
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelector('#reduced-motion-message').classList.remove('hidden');
}
