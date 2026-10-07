// Correction : Attrape les lucioles
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les étapes successives complètent le code
// des étapes précédentes (indiqué en commentaire). Ce n'est qu'une solution parmi d'autres.


// Étape 1 : une luciole apparaît à une position au hasard
const forest = document.querySelector('#forest');
const FIREFLY_SIZE = 28;

// étape 6 : les lucioles sont des objets rangés dans un tableau
let fireflies = [];

function randomPosition(size) {
    return {
        x: Math.random() * (forest.clientWidth - size),
        y: Math.random() * (forest.clientHeight - size)
    };
}

// étape 5 : chaque créature a aussi une direction, un angle au hasard
function randomAngle() {
    return Math.random() * Math.PI * 2;
}

function place(creature) {
    creature.el.style.transform = `translate(${creature.x}px, ${creature.y}px)`;
}

function createFirefly() {
    const el = document.createElement('button');
    el.classList.add('firefly');
    el.setAttribute('aria-label', 'Luciole');
    forest.append(el);

    const firefly = { el, ...randomPosition(FIREFLY_SIZE), angle: randomAngle(), size: FIREFLY_SIZE };
    place(firefly);
    fireflies.push(firefly);
}


// Étape 2 : un clic sur la luciole rapporte 1 point, et elle réapparaît ailleurs
// un seul écouteur sur la forêt (délégation) : il sert pour toutes les lucioles
// (étape 7 : et pour le papillon)
const scoreDisplay = document.querySelector('#score');
let score = 0;

function setScore(value) {
    score = Math.max(0, value);
    scoreDisplay.textContent = score;
}

function relocate(creature) {
    Object.assign(creature, randomPosition(creature.size));
    creature.angle = randomAngle();
    place(creature);
}

forest.addEventListener('click', (event) => {
    if (!isPlaying) {
        return;
    }
    const fireflyEl = event.target.closest('.firefly');
    if (fireflyEl) {
        const firefly = fireflies.find(f => f.el === fireflyEl);
        showPoints(firefly, '+1', false); // étape 9
        setScore(score + 1);
        relocate(firefly);
        return;
    }
    // étape 7 : le papillon piège
    if (event.target.closest('.moth')) {
        showPoints(moth, '-3', true); // étape 9
        setScore(score - 3);
        relocate(moth);
    }
});


// Étape 3 : un compte à rebours de 30 secondes
const timeDisplay = document.querySelector('#time');
const GAME_DURATION = 30;
let timeLeft = GAME_DURATION;
let timerId = null;
let isPlaying = false;

function startTimer() {
    timeLeft = GAME_DURATION;
    timeDisplay.textContent = timeLeft;
    timerId = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame(); // étape 4
        }
    }, 1000);
}


// Étape 4 : écran de fin avec le score, et bouton « Rejouer »
const startScreen = document.querySelector('#start-screen');
const endScreen = document.querySelector('#end-screen');
const finalScore = document.querySelector('#final-score');

function startGame() {
    setScore(0);
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');

    // étape 6 : trois lucioles
    for (let i = 0; i < 3; i++) {
        createFirefly();
    }
    createMoth(); // étape 7

    isPlaying = true;
    startTimer();
    startLoop();  // étape 5
    if (reduceMotion) {
        startTeleport(); // étape 10
    }
    fireflies[0].el.focus();
}

function endGame() {
    isPlaying = false;
    clearInterval(timerId);
    stopLoop();      // étape 5
    stopTeleport();  // étape 10

    // on retire les lucioles et le papillon de la forêt
    fireflies.forEach(f => f.el.remove());
    fireflies = [];
    moth.el.remove();

    finalScore.textContent = score;
    saveRecord(); // étape 8
    endScreen.classList.remove('hidden');
    document.querySelector('#replay-button').focus();
}

document.querySelector('#start-button').addEventListener('click', startGame);
document.querySelector('#replay-button').addEventListener('click', startGame);


// Étape 5 : la luciole se déplace toute seule, de plus en plus vite
// la vitesse augmente avec le temps écoulé : de 60 à 240 pixels par seconde
let frameId = null;
let lastTime = null;

function currentSpeed() {
    const elapsed = GAME_DURATION - timeLeft;
    return 60 + elapsed * 6;
}

function move(creature, dt) {
    const speed = currentSpeed();
    creature.x += Math.cos(creature.angle) * speed * dt;
    creature.y += Math.sin(creature.angle) * speed * dt;

    // rebond sur les bords : on renvoie l'angle dans l'autre sens
    const maxX = forest.clientWidth - creature.size;
    const maxY = forest.clientHeight - creature.size;
    if (creature.x < 0 || creature.x > maxX) {
        creature.angle = Math.PI - creature.angle;
        creature.x = Math.max(0, Math.min(creature.x, maxX));
    }
    if (creature.y < 0 || creature.y > maxY) {
        creature.angle = -creature.angle;
        creature.y = Math.max(0, Math.min(creature.y, maxY));
    }
    place(creature);
}

function loop(time) {
    const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    // étape 10 : pas de déplacement si les animations sont réduites
    if (!reduceMotion) {
        fireflies.forEach(firefly => move(firefly, dt)); // étape 6 : toutes les lucioles
        move(moth, dt);                                  // étape 7 : et le papillon
    }
    frameId = requestAnimationFrame(loop);
}

function startLoop() {
    lastTime = null;
    frameId = requestAnimationFrame(loop);
}

function stopLoop() {
    cancelAnimationFrame(frameId);
}


// Étape 6 : plusieurs lucioles en même temps
// (voir le tableau fireflies à l'étape 1, la boucle de startGame à l'étape 4,
// et la mise à jour de toutes les lucioles dans loop, à l'étape 5)


// Étape 7 : un papillon de nuit piège fait perdre 3 points
const MOTH_SIZE = 36;
let moth = null;

function createMoth() {
    const el = document.createElement('button');
    el.classList.add('moth');
    el.textContent = '🦋';
    el.setAttribute('aria-label', 'Papillon de nuit (piège)');
    forest.append(el);

    moth = { el, ...randomPosition(MOTH_SIZE), angle: randomAngle(), size: MOTH_SIZE };
    place(moth);
}


// Étape 8 : le meilleur score est gardé d'une partie à l'autre (localStorage)
// localStorage garde des chaînes de caractères dans le navigateur, même après fermeture
const recordDisplay = document.querySelector('#record');
const newRecord = document.querySelector('#new-record');
const RECORD_KEY = 'fireflies-record';

function getRecord() {
    return Number(localStorage.getItem(RECORD_KEY)) || 0;
}

function saveRecord() {
    const isNewRecord = score > getRecord();
    if (isNewRecord) {
        localStorage.setItem(RECORD_KEY, score);
    }
    newRecord.classList.toggle('hidden', !isNewRecord);
    recordDisplay.textContent = getRecord();
}

// affichage du record au chargement de la page
recordDisplay.textContent = getRecord();


// Étape 9 : un petit effet à chaque capture
// un texte « +1 » (ou « -3 ») s'envole depuis la créature, puis disparaît
function showPoints(creature, text, isMinus) {
    // étape 10 : pas d'effet si les animations sont réduites
    if (reduceMotion) {
        return;
    }
    const points = document.createElement('span');
    points.classList.add('points');
    if (isMinus) {
        points.classList.add('minus');
    }
    points.textContent = text;
    points.style.transform = `translate(${creature.x}px, ${creature.y}px)`;
    points.addEventListener('animationend', () => points.remove());
    forest.append(points);
}


// Étape 10 (bonus) : mode « animations réduites »
// les créatures ne se déplacent plus : elles changent de place toutes les 1,5 seconde
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let teleportId = null;

function startTeleport() {
    teleportId = setInterval(() => {
        fireflies.forEach(relocate);
        relocate(moth);
    }, 1500);
}

function stopTeleport() {
    clearInterval(teleportId);
}
