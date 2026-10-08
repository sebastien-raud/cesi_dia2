// Démo : GSAP (to, from, fromTo, timeline, stagger)

// ---------- 1. to, from, fromTo ----------

document.querySelector('.play-basics').addEventListener('click', () => {
    // to : de l'état actuel VERS cet état
    gsap.to('.box-to', { x: 400, duration: 1 });

    // from : DEPUIS cet état, jusqu'à l'état actuel (celui du CSS)
    gsap.from('.box-from', { x: 400, opacity: 0, duration: 1 });

    // fromTo : on précise le départ ET l'arrivée
    gsap.fromTo('.box-fromto', { x: 400, rotation: 0 }, { x: 0, rotation: 360, duration: 1 });
});

// ---------- 2. Timeline ----------

const progressInput = document.querySelector('.tl-progress'); // la barre de progression

// paused: true : la timeline attend qu'on appuie sur « Lecture »
const tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.8, ease: 'power2.inOut' }, // valeurs par défaut de chaque étape
    onUpdate: () => {
        progressInput.value = tl.progress(); // la barre suit la lecture
    },
});

tl.to('.shape-square', { y: -40, rotation: 90 })
  .to('.shape-circle', { scale: 1.5 })
  // '<' : démarre en même temps que l'étape précédente
  .to('.shape-bar', { height: 120, y: -30 }, '<')
  // '+=0.5' : une demi-seconde de pause avant cette étape
  .to('.shape', { x: 380, stagger: 0.1 }, '+=0.5');

// La timeline se pilote comme une vidéo
document.querySelector('.tl-play').addEventListener('click', () => tl.play());
document.querySelector('.tl-pause').addEventListener('click', () => tl.pause());
document.querySelector('.tl-reverse').addEventListener('click', () => tl.reverse());
document.querySelector('.tl-restart').addEventListener('click', () => tl.restart());

// Le curseur pilote la timeline : on la met en pause, puis on la place à la position choisie (0 = début, 1 = fin)
progressInput.addEventListener('input', () => {
    tl.pause();
    tl.progress(progressInput.value);
});

// ---------- 3. stagger ----------

document.querySelector('.play-stagger').addEventListener('click', () => {
    gsap.from('.dots span', {
        y: -60,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out',     // dépasse un peu, puis revient
        stagger: 0.08,        // chaque point démarre 0,08 s après le précédent
        // Étape de la démo : remplacer par stagger: { each: 0.08, from: 'center' }
    });
});
