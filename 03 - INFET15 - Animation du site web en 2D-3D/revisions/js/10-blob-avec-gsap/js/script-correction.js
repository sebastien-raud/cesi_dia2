// Correction : Blob prend des cours de danse
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : certaines étapes complètent le code
// d'étapes précédentes (indiqué en commentaire).


// Étape 1 : vérifier que GSAP est chargé
console.log(gsap.version);

const blob = document.querySelector('#blob');
const message = document.querySelector('#message');


// Étape 2 : le bouton « Couleur » change la couleur de Blob (gsap.to)
// gsap.to anime un élément depuis son état actuel VERS les valeurs indiquées
const colorButton = document.querySelector('#color-button');
let isBlue = false;

colorButton.addEventListener('click', () => {
    isBlue = !isBlue;
    gsap.to(blob, {
        backgroundColor: isBlue ? '#2F7FD6' : '#2FA65A',
        duration: 0.6
    });
});


// Étape 3 : Blob tombe du ciel au chargement de la page (gsap.from)
// gsap.from anime DEPUIS les valeurs indiquées vers l'état normal de l'élément
// (étape 10 : cette fonction n'est appelée que si les animations ne sont pas réduites)
function intro() {
    gsap.from(blob, {
        y: -400,
        duration: 1.2,
        ease: 'bounce.out'
    });
}


// Étape 4 : le bouton « Saute » fait monter puis redescendre Blob (yoyo, repeat)
// à l'étape 4, un seul tween suffisait :
//     gsap.to(blob, { y: -150, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 1 });
// (repeat: 1 rejoue l'animation une fois, yoyo: true la rejoue à l'envers)
// l'étape 5 le remplace par une timeline
const jumpButton = document.querySelector('#jump-button');
let jumpTimeline = null;

function jump() {
    // étape 10 : pas de saut si les animations sont réduites
    if (reduceMotion) {
        return;
    }
    // un seul saut à la fois
    if (jumpTimeline && jumpTimeline.isActive()) {
        return;
    }
    jumpTimeline = createJump();
}
jumpButton.addEventListener('click', jump);


// Étape 5 : un saut « cartoon » avec une timeline (s'écraser, sauter, retomber)
// une timeline enchaîne les animations les unes après les autres
function createJump() {
    // étape 9 : onComplete est appelée à la fin de la timeline
    const timeline = gsap.timeline({ onComplete: showRelief });
    timeline
        .to(blob, { scaleX: 1.2, scaleY: 0.8, duration: 0.15 })                           // s'écraser
        .to(blob, { y: -180, scaleX: 0.9, scaleY: 1.1, duration: 0.35, ease: 'power2.out' }) // monter
        .to(blob, { y: 0, duration: 0.35, ease: 'power2.in' })                             // retomber
        .to(blob, { scaleX: 1.15, scaleY: 0.85, duration: 0.1 })                           // s'écraser au sol
        .to(blob, { scaleX: 1, scaleY: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });   // reprendre sa forme
    return timeline;
}


// Étape 6 : la danse en boucle, avec les boutons « Danse » / « Pause » et « Recommencer »
// repeat: -1 répète à l'infini ; paused: true attend qu'on lance la timeline
const danceButton = document.querySelector('#dance-button');
const restartButton = document.querySelector('#restart-button');

const dance = gsap.timeline({ repeat: -1, paused: true });
dance
    .to(blob, { rotation: -12, x: -30, duration: 0.4, ease: 'sine.inOut' })
    .to(blob, { rotation: 12, x: 30, duration: 0.8, ease: 'sine.inOut' })
    .to(blob, { rotation: 0, x: 0, duration: 0.4, ease: 'sine.inOut' });

danceButton.addEventListener('click', () => {
    // étape 10 : pas de danse si les animations sont réduites
    if (reduceMotion) {
        return;
    }
    if (dance.paused()) {
        dance.play();
        danceButton.textContent = 'Pause';
    } else {
        dance.pause();
        danceButton.textContent = 'Danse';
    }
});

restartButton.addEventListener('click', () => {
    if (reduceMotion) {
        return;
    }
    dance.restart();
    danceButton.textContent = 'Pause';
});


// Étape 7 : le curseur règle la vitesse de la danse (timeScale)
// timeScale(2) joue deux fois plus vite, timeScale(0.5) deux fois moins vite
const speedInput = document.querySelector('#speed');
const speedValue = document.querySelector('#speed-value');

speedInput.addEventListener('input', () => {
    dance.timeScale(Number(speedInput.value));
    speedValue.textContent = `× ${speedInput.value}`;
});


// Étape 8 : le bouton « Bébés » fait arriver cinq bébés Blobs l'un après l'autre (stagger)
// stagger décale le départ de chaque élément : ici, 0,15 s entre deux bébés
// (le même tween joué à l'envers les fait repartir)
const babiesButton = document.querySelector('#babies-button');

const babies = gsap.from('.baby', {
    y: -300,
    opacity: 0,
    duration: 1,
    ease: 'bounce.out',
    stagger: 0.15,
    paused: true
});

babiesButton.addEventListener('click', () => {
    // étape 10 : animations réduites, les bébés apparaissent ou disparaissent d'un coup
    if (reduceMotion) {
        babies.progress(babies.progress() === 1 ? 0 : 1);
        return;
    }
    // pas encore joué, ou joué à l'envers : on joue ; sinon, on rembobine
    if (babies.progress() === 0 || babies.reversed()) {
        babies.play();
        babiesButton.textContent = 'Au lit, les bébés';
    } else {
        babies.reverse();
        babiesButton.textContent = 'Bébés';
    }
});


// Étape 9 : afficher « Ouf ! » à la fin du saut (onComplete)
// (la fonction est passée à la timeline du saut, à l'étape 5)
function showRelief() {
    message.textContent = 'Ouf !';
    // le message apparaît, puis s'efface au bout d'une seconde
    gsap.fromTo(message, { opacity: 1 }, { opacity: 0, delay: 1, duration: 0.5 });
}


// Étape 10 : respecter le réglage « réduire les animations » (gsap.matchMedia)
// gsap.matchMedia appelle la fonction quand une des conditions correspond
// (et la rappelle si le réglage change pendant que la page est ouverte)
let reduceMotion = false;
const mm = gsap.matchMedia();

mm.add({
    reduce: '(prefers-reduced-motion: reduce)',
    noPreference: '(prefers-reduced-motion: no-preference)'
}, (context) => {
    reduceMotion = context.conditions.reduce;
    document.querySelector('#reduced-motion-message').classList.toggle('hidden', !reduceMotion);
    // l'arrivée de Blob (étape 3) seulement si les animations ne sont pas réduites
    if (!reduceMotion) {
        intro();
    }
});


// Étape 11 (bonus) : Blob se déplace à la souris (Draggable)
// un plugin GSAP doit être enregistré avant d'être utilisé
gsap.registerPlugin(Draggable);
Draggable.create('.blob-wrapper', {
    bounds: '.stage'
});
