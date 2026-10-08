// Démo : une boucle de jeu écrite à la main (canvas 2D + requestAnimationFrame)
// Trois étapes à chaque image : lire les entrées, mettre à jour, dessiner.

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d'); // le « pinceau » du canvas

const GRAVITY = 0.4;   // ajoutée à la vitesse verticale à chaque image
const BOUNCE = 0.8;    // la balle garde 80 % de sa vitesse à chaque rebond

// La balle : position du centre (x, y), vitesse en pixels par image (vx vers la droite, vy vers le bas), rayon
const ball = { x: 100, y: 50, vx: 3, vy: 0, radius: 20 };
const keys = {};       // touches enfoncées

// ---------- Les entrées : on note l'état des touches ----------
document.addEventListener('keydown', (event) => { keys[event.key] = true; });
document.addEventListener('keyup', (event) => { keys[event.key] = false; });

// ---------- Mettre à jour : les positions, les rebonds ----------
function update() {
    if (keys.ArrowLeft) ball.vx -= 0.3;
    if (keys.ArrowRight) ball.vx += 0.3;

    ball.vy += GRAVITY;
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Rebond sur le sol
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy = -ball.vy * BOUNCE;
    }

    // Rebond sur les murs
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.vx = -ball.vx;
        ball.x = Math.min(Math.max(ball.x, ball.radius), canvas.width - ball.radius);
    }
}

// ---------- Dessiner : on efface tout, on redessine tout ----------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
}

// ---------- La boucle : le navigateur rappelle loop avant chaque image ----------
function loop() {
    update();
    draw();
    requestAnimationFrame(loop); // redemander l'image suivante : c'est ce qui fait tourner la boucle
}

// Premier appel : lance la boucle (environ 60 images par seconde, en pause quand l'onglet est caché)
requestAnimationFrame(loop);
