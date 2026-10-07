// Correction : Les balles rebondissantes
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les étapes 5 à 8, 10 et 11 transforment
// le code des étapes précédentes (indiqué en commentaire).


// Étape 1 : au clic sur « Lancer », afficher « Prêt ? » au bout de 2 secondes
const message = document.querySelector('#message');
const startButton = document.querySelector('#start-button');

startButton.addEventListener('click', () => {
    // on ne lance qu'une fois
    startButton.disabled = true;
    message.textContent = 'Attention…';
    // setTimeout exécute la fonction une seule fois, après le délai en millisecondes
    setTimeout(() => {
        message.textContent = 'Prêt ?';
        startCountdown(); // étape 2
    }, 2000);
});


// Étape 2 : compte à rebours 3, 2, 1, « Partez ! »
function startCountdown() {
    let count = 3;
    // setInterval exécute la fonction toutes les 1000 ms, jusqu'à clearInterval
    const countdownId = setInterval(() => {
        if (count > 0) {
            message.textContent = count;
            count--;
        } else {
            clearInterval(countdownId);
            message.textContent = 'Partez !';
            startChrono();    // étape 3
            startAnimation(); // étape 4
        }
    }, 1000);
}


// Étape 3 : chronomètre en dixièmes de seconde
const chrono = document.querySelector('#chrono');
let tenths = 0;
let chronoId = null;

function startChrono() {
    chronoId = setInterval(() => {
        tenths++;
        chrono.textContent = (tenths / 10).toFixed(1);
    }, 100);
}

function stopChrono() {
    clearInterval(chronoId);
}


// Étape 4 : la balle avance à chaque image (requestAnimationFrame)
// requestAnimationFrame demande au navigateur d'appeler une fonction juste avant
// d'afficher la prochaine image (environ 60 fois par seconde) ; en la rappelant
// à chaque fois, on obtient une boucle d'animation
const arena = document.querySelector('#arena');
const BALL_SIZE = 48;
let frameId = null;
let lastTime = null;

// étape 10 : les balles sont des objets rangés dans un tableau
// (étape 11 : les vitesses sont en pixels par seconde)
const balls = [
    { el: document.querySelector('#ball'), x: 0, y: 0, vx: 200, vy: 0 }
];

function loop(time) {
    // étape 11 : temps écoulé depuis l'image précédente, en secondes
    // (limité à 0,05 s, au cas où l'onglet aurait été mis en arrière-plan)
    const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    // étape 10 : on met à jour toutes les balles
    for (const ball of balls) {
        updateBall(ball, dt);
    }

    frameId = requestAnimationFrame(loop);
}

function startAnimation() {
    lastTime = null;
    frameId = requestAnimationFrame(loop);
    pauseButton.disabled = false; // étape 9
}


// Étape 5 : la balle s'arrête au bord droit
// (les étapes 5 à 8 complètent la fonction updateBall, appelée à chaque image)
const GRAVITY = 900; // étape 8 : accélération vers le bas, en pixels par seconde²
const BOUNCE = 0.8;  // étape 8 : un rebond garde 80 % de la vitesse

function updateBall(ball, dt) {
    // étape 8 : la gravité augmente la vitesse de chute
    ball.vy += GRAVITY * dt;

    // étape 11 : déplacement = vitesse × temps écoulé
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    const maxX = arena.clientWidth - BALL_SIZE;
    const maxY = arena.clientHeight - BALL_SIZE;

    // étape 5 : au bord droit, la balle s'arrêtait (ball.x = maxX)
    // étape 6 : elle rebondit, sa vitesse change de sens
    if (ball.x > maxX) {
        ball.x = maxX;
        ball.vx = -ball.vx;
    }
    if (ball.x < 0) {
        ball.x = 0;
        ball.vx = -ball.vx;
    }

    // étape 7 : même chose en haut et en bas
    if (ball.y < 0) {
        ball.y = 0;
        ball.vy = -ball.vy;
    }
    if (ball.y > maxY) {
        ball.y = maxY;
        // étape 8 : le rebond au sol est amorti, et la balle ralentit en roulant
        ball.vy = -ball.vy * BOUNCE;
        ball.vx *= 0.98;
        // une vitesse trop faible : la balle reste au sol
        if (Math.abs(ball.vy) < 40) {
            ball.vy = 0;
        }
    }

    ball.el.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
}


// Étape 6 : la balle rebondit sur les bords gauche et droit
// (voir updateBall, à l'étape 5)


// Étape 7 : la balle rebondit aussi en haut et en bas
// (voir updateBall, à l'étape 5)


// Étape 8 : la gravité fait tomber la balle, qui rebondit de moins en moins haut
// (voir GRAVITY, BOUNCE et updateBall, à l'étape 5)


// Étape 9 : boutons Pause et Reprendre
const pauseButton = document.querySelector('#pause-button');
let isPaused = false;

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        // cancelAnimationFrame annule l'image demandée : la boucle s'arrête
        cancelAnimationFrame(frameId);
        stopChrono();
        pauseButton.textContent = 'Reprendre';
    } else {
        startAnimation();
        startChrono();
        pauseButton.textContent = 'Pause';
    }
});


// Étape 10 : un clic dans l'arène ajoute une balle de couleur au hasard
// (la balle de départ est elle aussi rangée dans le tableau balls, à l'étape 4)
function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function createBall(x, y) {
    const el = document.createElement('div');
    el.classList.add('ball');
    // une teinte au hasard sur le cercle des couleurs
    el.style.setProperty('--color', `hsl(${Math.floor(randomBetween(0, 360))}, 80%, 55%)`);
    arena.append(el);

    const ball = { el, x, y, vx: randomBetween(-300, 300), vy: randomBetween(-500, 0) };
    balls.push(ball);
    ball.el.style.transform = `translate(${x}px, ${y}px)`;
}

arena.addEventListener('click', (event) => {
    // étape 12 : un clic sur une balle la fait éclater
    if (event.target.classList.contains('ball')) {
        popBall(event.target);
        return;
    }
    // position du clic dans l'arène, centrée sur la balle
    const rect = arena.getBoundingClientRect();
    createBall(event.clientX - rect.left - BALL_SIZE / 2, event.clientY - rect.top - BALL_SIZE / 2);
});


// Étape 11 : même vitesse sur tous les écrans (temps écoulé entre deux images)
// (voir loop, à l'étape 4 : dt ; et updateBall, à l'étape 5 : vitesses en pixels par seconde)


// Étape 12 (bonus) : un clic sur une balle la fait éclater
function popBall(el) {
    // on retire la balle du tableau : elle n'est plus mise à jour
    const index = balls.findIndex(ball => ball.el === el);
    balls.splice(index, 1);
    // puis on joue l'animation, et on retire l'élément de la page à la fin
    el.classList.add('pop');
    el.addEventListener('animationend', () => el.remove());
}
