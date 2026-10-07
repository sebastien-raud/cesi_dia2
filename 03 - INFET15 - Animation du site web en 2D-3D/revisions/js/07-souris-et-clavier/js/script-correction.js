// Correction : La coccinelle au jardin
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : certaines étapes transforment le code
// d'étapes précédentes (indiqué en commentaire).


// ----- Fourni (rien à modifier) -----

// Boucle d'animation, pour l'étape 9 (l'exercice 08 explique comment l'écrire).
// startLoop(update) appelle la fonction update(dt) à chaque image ;
// dt est le temps écoulé depuis l'image précédente, en secondes.
function startLoop(update) {
    let lastTime = null;
    function frame(time) {
        const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
        lastTime = time;
        update(dt);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

// Pour l'étape 10 : renvoie true si les deux éléments se chevauchent à l'écran.
function touches(elementA, elementB) {
    const a = elementA.getBoundingClientRect();
    const b = elementB.getBoundingClientRect();
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}


// Étape 1 : afficher les coordonnées de la souris dans le jardin
// clientX et clientY sont mesurés depuis le coin de la fenêtre :
// on retire la position du jardin pour avoir des coordonnées dans le jardin
const garden = document.querySelector('#garden');
const coords = document.querySelector('#coords');
const flower = document.querySelector('#flower');

function gardenPosition(event) {
    const rect = garden.getBoundingClientRect();
    return {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
    };
}

garden.addEventListener('mousemove', (event) => {
    const { x, y } = gardenPosition(event);
    coords.textContent = `x : ${x}, y : ${y}`;

    // étape 2 : la fleur (32 px) est centrée sur la souris
    flower.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
});


// Étape 2 : une fleur suit la souris
// (voir l'écouteur mousemove, à l'étape 1)


// Étape 3 : la fleur suit avec un léger retard (classe smooth)
// la classe ajoute une transition sur transform : la fleur glisse vers chaque nouvelle position
flower.classList.add('smooth');


// Étape 4 : un clic fait apparaître des étincelles qui s'envolent
garden.addEventListener('click', (event) => {
    const { x, y } = gardenPosition(event);

    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('span');
        sparkle.classList.add('sparkle');
        sparkle.textContent = '✨';
        sparkle.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
        // une direction au hasard, entre -60 et 60 pixels
        sparkle.style.setProperty('--dx', `${Math.round(Math.random() * 120 - 60)}px`);
        sparkle.style.setProperty('--dy', `${Math.round(Math.random() * 120 - 60)}px`);
        // retirée de la page à la fin de son animation
        sparkle.addEventListener('animationend', () => sparkle.remove());
        garden.append(sparkle);
    }
});


// Étape 5 : les flèches déplacent la coccinelle
// à l'étape 5, chaque appui déplaçait la coccinelle de STEP pixels :
//     document.addEventListener('keydown', (event) => {
//         if (event.key === 'ArrowUp') { bugY -= STEP; }
//         … de même pour les trois autres flèches
//         moveLadybug();
//     });
// l'étape 9 remplace ce déplacement par une boucle d'animation
const ladybug = document.querySelector('#ladybug');
const BUG_SIZE = 40;
const SPEED = 220; // étape 9 : vitesse en pixels par seconde
let bugX = 200;
let bugY = 180;
let bugAngle = 0;

function moveLadybug() {
    // étape 7 : la coccinelle reste dans le jardin
    bugX = Math.max(0, Math.min(bugX, garden.clientWidth - BUG_SIZE));
    bugY = Math.max(0, Math.min(bugY, garden.clientHeight - BUG_SIZE));
    // étape 6 : rotate après translate, pour tourner sur place
    ladybug.style.transform = `translate(${bugX}px, ${bugY}px) rotate(${bugAngle}deg)`;
}
moveLadybug();


// Étape 6 : la coccinelle s'oriente dans le sens de la marche
// (voir moveLadybug, à l'étape 5 ; l'angle est calculé à l'étape 9)
// à l'étape 6, chaque flèche donnait un angle : haut 0, droite 90, bas 180, gauche 270


// Étape 7 : la coccinelle ne sort pas du jardin
// (voir moveLadybug, à l'étape 5)


// Étape 8 : les flèches ne font plus défiler la page
// étape 9 : les touches enfoncées sont gardées dans un Set (un ensemble sans doublon)
const pressedKeys = new Set();

document.addEventListener('keydown', (event) => {
    if (event.key.startsWith('Arrow')) {
        event.preventDefault();
        pressedKeys.add(event.key);
    }
});

document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.key);
});


// Étape 9 : déplacement fluide et en diagonale (touches gardées en mémoire)
// à chaque image, on regarde quelles flèches sont enfoncées
function updateLadybug(dt) {
    let dx = 0;
    let dy = 0;
    if (pressedKeys.has('ArrowLeft')) { dx -= 1; }
    if (pressedKeys.has('ArrowRight')) { dx += 1; }
    if (pressedKeys.has('ArrowUp')) { dy -= 1; }
    if (pressedKeys.has('ArrowDown')) { dy += 1; }

    if (dx !== 0 || dy !== 0) {
        bugX += dx * SPEED * dt;
        bugY += dy * SPEED * dt;
        // étape 6 : l'angle de la marche (0° = vers le haut), diagonales comprises
        bugAngle = Math.atan2(dx, -dy) * 180 / Math.PI;
        moveLadybug();
    }
}

// étapes 10 et 11 : la même boucle met aussi à jour les feuilles et l'araignée
startLoop((dt) => {
    if (isGameOver) {
        return; // étape 11
    }
    updateLadybug(dt);
    eatLeaves();      // étape 10
    updateSpider(dt); // étape 11
});


// Étape 10 : des feuilles à manger, et un score
const scoreDisplay = document.querySelector('#score');
let score = 0;
let leaves = [];

function addLeaf() {
    const leaf = document.createElement('span');
    leaf.classList.add('leaf');
    leaf.textContent = '🍃';
    leaf.setAttribute('aria-hidden', 'true');
    const x = Math.random() * (garden.clientWidth - 32);
    const y = Math.random() * (garden.clientHeight - 32);
    leaf.style.transform = `translate(${x}px, ${y}px)`;
    garden.append(leaf);
    leaves.push(leaf);
}

function eatLeaves() {
    for (const leaf of leaves) {
        if (touches(ladybug, leaf)) {
            leaf.remove();
            leaves = leaves.filter(l => l !== leaf);
            score++;
            scoreDisplay.textContent = score;
            addLeaf(); // une feuille mangée, une nouvelle pousse ailleurs
        }
    }
}

for (let i = 0; i < 5; i++) {
    addLeaf();
}


// Étape 11 (bonus) : une araignée se promène ; la toucher, c'est perdu
// l'araignée rebondit sur les bords, comme les balles de l'exercice 07
const spider = document.querySelector('#spider');
const gameOver = document.querySelector('#game-over');
const replayButton = document.querySelector('#replay-button');
const SPIDER_SIZE = 36;
const spiderState = { x: 20, y: 20, vx: 130, vy: 90 };
let isGameOver = false;

spider.classList.remove('hidden');

function updateSpider(dt) {
    spiderState.x += spiderState.vx * dt;
    spiderState.y += spiderState.vy * dt;
    const maxX = garden.clientWidth - SPIDER_SIZE;
    const maxY = garden.clientHeight - SPIDER_SIZE;
    if (spiderState.x < 0 || spiderState.x > maxX) {
        spiderState.vx = -spiderState.vx;
        spiderState.x = Math.max(0, Math.min(spiderState.x, maxX));
    }
    if (spiderState.y < 0 || spiderState.y > maxY) {
        spiderState.vy = -spiderState.vy;
        spiderState.y = Math.max(0, Math.min(spiderState.y, maxY));
    }
    spider.style.transform = `translate(${spiderState.x}px, ${spiderState.y}px)`;

    if (touches(ladybug, spider)) {
        isGameOver = true;
        gameOver.classList.remove('hidden');
        replayButton.focus();
    }
}

replayButton.addEventListener('click', (event) => {
    // le clic ne doit pas faire d'étincelles dans le jardin
    event.stopPropagation();
    score = 0;
    scoreDisplay.textContent = score;
    bugX = 200;
    bugY = 180;
    moveLadybug();
    spiderState.x = 20;
    spiderState.y = 20;
    pressedKeys.clear();
    gameOver.classList.add('hidden');
    isGameOver = false;
});
