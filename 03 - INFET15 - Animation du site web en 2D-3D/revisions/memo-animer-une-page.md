[← Révisions](README.md)

# Mémo : animer une page web

Une fiche à garder sous la main : quel outil choisir selon ce que tu veux animer, un exemple minimal pour chacun, les pièges fréquents, et les bons réflexes (performances, accessibilité).

## Sommaire

1. [Quel outil pour quel besoin ?](#quel-outil)
2. [Transition CSS](#transition)
3. [Animation CSS (`@keyframes`)](#keyframes)
4. [JavaScript + classes CSS](#classes)
5. [Variables CSS pilotées en JavaScript](#variables)
6. [Boucle d'animation (`requestAnimationFrame`)](#boucle)
7. [GSAP](#gsap)
8. [Phaser](#phaser)
9. [Three.js](#threejs)
10. [Performances](#performances)
11. [Accessibilité](#accessibilite)
12. [Pour s'entraîner](#entrainement)

---

<a id="quel-outil"></a>
## 1. Quel outil pour quel besoin ?

| Je veux… | Outil | Exemple |
| --- | --- | --- |
| un effet doux quand l'état change (survol, focus) | **transition CSS** | un bouton qui grossit au survol |
| une animation qui se joue seule ou en boucle | **`@keyframes`** | un loader qui tourne |
| lancer une animation CSS au clic, au défilement… | **JS + classe CSS** | un menu qui s'ouvre |
| régler une animation en direct (vitesse, couleur) | **variable CSS + JS** | un curseur de vitesse |
| un mouvement calculé à chaque image (physique, rebonds) | **`requestAnimationFrame`** | une balle qui rebondit |
| enchaîner, synchroniser, piloter des animations | **GSAP** | une intro en plusieurs temps |
| un jeu 2D (sprites, collisions, scènes) | **Phaser** | un jeu de plateforme |
| de la 3D | **Three.js** | un objet 3D qui tourne |

Règle simple : commencer par la solution la plus simple qui suffit. Un survol n'a pas besoin de GSAP, et un jeu n'a pas besoin d'être écrit à la main.

<a id="transition"></a>
## 2. Transition CSS

Le navigateur anime le passage d'une valeur à une autre quand la propriété change.

```css
.button {
    background-color: #B10DC9;
    transition: transform .3s ease-out, background-color .3s;
}
.button:hover {
    transform: scale(1.1);
    background-color: #8A0A9E;
}
```

Pièges fréquents :

- la transition se déclare sur l'élément **de départ** (`.button`), pas seulement sur `:hover` ;
- `display` ne s'anime pas : pour faire apparaître un élément, animer `opacity` (et `visibility`) ;
- éviter `transition: all` : on anime sans le vouloir des propriétés coûteuses.

<a id="keyframes"></a>
## 3. Animation CSS (`@keyframes`)

Une suite d'étapes, qui se joue toute seule, une fois ou en boucle.

```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.2); }
}
.heart {
    animation: pulse 1s ease-in-out infinite;
}
```

Pièges fréquents :

- à la fin, l'élément revient à son état de départ : `animation-fill-mode: forwards` le laisse dans l'état final ;
- une animation et une transition sur la même propriété (`transform`) se gênent : utiliser un conteneur, ou les propriétés séparées `translate`, `scale`, `rotate` ;
- `animation-delay` négatif démarre l'animation « déjà en cours » : pratique pour décaler plusieurs éléments.

<a id="classes"></a>
## 4. JavaScript + classes CSS

Le CSS décrit l'animation, le JavaScript décide **quand** elle se joue, en ajoutant ou retirant une classe.

```js
button.addEventListener('click', () => {
    box.classList.add('jump');
});
// pour pouvoir rejouer : retirer la classe à la fin de l'animation
box.addEventListener('animationend', () => {
    box.classList.remove('jump');
});
```

Pièges fréquents :

- ajouter une classe déjà présente ne rejoue pas l'animation : la retirer sur `animationend` ;
- une animation infinie ne déclenche jamais `animationend` ;
- `classList.toggle('open')` est parfait pour un état ouvert ou fermé (menu, accordéon).

<a id="variables"></a>
## 5. Variables CSS pilotées en JavaScript

Une variable CSS utilisée par l'animation, modifiée en JavaScript : toutes les animations qui l'utilisent changent d'un coup.

```css
:root { --speed: 1s; }
.ball { animation: spin var(--speed) linear infinite; }
```

```js
document.documentElement.style.setProperty('--speed', `${slider.value}s`);
```

Pièges fréquents :

- ne pas oublier l'unité (`'2s'`, `'10px'`) : `'2'` tout court ne marche pas ;
- une variable par élément (`card.style.setProperty('--i', index)`) permet de décaler chaque élément : `animation-delay: calc(var(--i) * 80ms)`.

<a id="boucle"></a>
## 6. Boucle d'animation (`requestAnimationFrame`)

Quand le mouvement se calcule (physique, rebonds, jeu), on met à jour les positions à chaque image.

```js
let x = 0;
let lastTime = null;
const speed = 200; // pixels par seconde

function loop(time) {
    const dt = lastTime === null ? 0 : (time - lastTime) / 1000; // secondes écoulées
    lastTime = time;
    x += speed * dt;
    ball.style.transform = `translate(${x}px, 0)`;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
```

Pièges fréquents :

- sans `dt`, la vitesse dépend de l'écran (60 ou 144 images par seconde) ;
- garder la valeur renvoyée par `requestAnimationFrame` pour arrêter la boucle avec `cancelAnimationFrame` ;
- `setInterval` n'est pas fait pour animer : il n'est pas synchronisé avec l'affichage.

<a id="gsap"></a>
## 7. GSAP

Une bibliothèque qui anime tout ce qui a une valeur numérique : propriétés CSS, objets JavaScript, objets 3D. Chargement par CDN, avant ton script :

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
```

```js
gsap.to('.box', { x: 200, duration: 1, ease: 'power2.out' });     // vers
gsap.from('.title', { y: -100, opacity: 0, duration: 1 });         // depuis
gsap.from('.card', { y: 50, opacity: 0, stagger: 0.1 });           // en cascade

const intro = gsap.timeline();                                     // enchaîner
intro.from('.logo', { scale: 0, duration: 0.5 })
     .from('.menu a', { y: -20, opacity: 0, stagger: 0.1 });

intro.pause(); intro.play(); intro.reverse(); intro.timeScale(2);  // piloter
```

Pièges fréquents :

- `gsap is not defined` : le CDN n'est pas chargé, ou chargé **après** ton script ;
- les propriétés CSS s'écrivent en camelCase : `backgroundColor`, pas `background-color` ;
- GSAP anime `transform` lui-même (`x`, `y`, `rotation`, `scale`) : ne pas mélanger avec un `transform` écrit dans le CSS sur le même élément ;
- les plugins (`ScrollTrigger`, `Draggable`…) se chargent à part et s'enregistrent : `gsap.registerPlugin(ScrollTrigger)`.

Documentation : [gsap.com/docs/v3](https://gsap.com/docs/v3/).

<a id="phaser"></a>
## 8. Phaser

Un moteur de jeu 2D : il dessine dans un `<canvas>`, gère la boucle, les images, la physique, les collisions et le clavier. Une scène a trois fonctions : `preload` (charger), `create` (installer), `update` (à chaque image, comme la boucle de la partie 6).

```js
class GameScene extends Phaser.Scene {
    create() {
        this.player = this.add.circle(400, 300, 20, 0xffcc00);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (this.cursors.left.isDown) { this.player.x -= 4; }
        if (this.cursors.right.isDown) { this.player.x += 4; }
    }
}

new Phaser.Game({ type: Phaser.AUTO, width: 800, height: 600, scene: GameScene });
```

Chargement : `https://cdn.jsdelivr.net/npm/phaser@4.2/dist/phaser.min.js`. Documentation : [docs.phaser.io](https://docs.phaser.io/).

<a id="threejs"></a>
## 9. Three.js

La 3D dans le navigateur. Les ingrédients : une **scène** (le monde), des **objets** (forme + matière), des **lumières**, une **caméra** et un **renderer** qui dessine le tout dans un `<canvas>`.

```html
<script type="importmap">
    { "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.186/build/three.module.js" } }
</script>
<script type="module" src="scene.js"></script>
```

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.append(renderer.domElement);

const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
scene.add(cube, new THREE.AmbientLight(0xffffff, 0.5), new THREE.DirectionalLight(0xffffff, 2));

renderer.setAnimationLoop(() => {   // la boucle de rendu
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
});
```

Pièges fréquents : une page ouverte en double-clic (`file://`) ne charge pas les modules, il faut un petit serveur (Live Server) ; un `MeshStandardMaterial` sans lumière reste noir. Documentation : [threejs.org/docs](https://threejs.org/docs/).

<a id="performances"></a>
## 10. Performances

- Animer **`transform`** (déplacer, tourner, agrandir) et **`opacity`** : le navigateur les anime sans recalculer la mise en page.
- Éviter d'animer `left`, `top`, `width`, `height`, `margin` : chaque image recalcule la position de tous les éléments autour.
- Peu d'éléments animés en même temps : quelques dizaines, pas des milliers.
- `will-change: transform` peut aider un élément qui bouge beaucoup, mais à utiliser avec parcimonie.

<a id="accessibilite"></a>
## 11. Accessibilité

Certaines personnes règlent leur système pour **réduire les animations** (mal des transports, troubles vestibulaires ou de l'attention). Une page bien faite respecte ce réglage.

En CSS :

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation: none !important;
        transition: none !important;
    }
}
```

En JavaScript :

```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // pas d'animation décorative, ou une version très courte
}
```

Avec GSAP : `gsap.matchMedia()` (voir l'[exercice 10](js/10-blob-avec-gsap/README.md), étape 10).

Autres règles utiles :

- jamais de clignotement de plus de 3 fois par seconde (risque de crise d'épilepsie) ;
- une animation qui dure plus de 5 secondes doit pouvoir être mise en pause ;
- l'information ne doit pas passer **que** par l'animation : le contenu doit rester compréhensible sans elle.

Pour tester sans changer son système :

- **Firefox** : `about:config` > chercher `ui.prefersReducedMotion` > s'il n'existe pas, le créer en type **Nombre** > valeur `1`, puis recharger la page ; pour revenir à la normale, supprimer la préférence ;
- **Chrome, Edge** : outils de développement, menu ⋮ > More tools > Rendering, « Emulate CSS media feature prefers-reduced-motion » sur `reduce`, puis recharger la page.

<a id="entrainement"></a>
## 12. Pour s'entraîner

| Outil | Exercice |
| --- | --- |
| JS + classes CSS, `animationend`, variables CSS | [05 : Blob, le petit monstre](js/05-classes-et-animations-css/README.md) |
| Créer des éléments, apparition en cascade | [06 : la confiserie](js/06-creer-des-elements/README.md) |
| Souris, clavier, personnage, collisions | [07 : la coccinelle au jardin](js/07-souris-et-clavier/README.md) |
| `setTimeout`, `setInterval`, `requestAnimationFrame` | [08 : les balles rebondissantes](js/08-timers-et-boucle-d-animation/README.md) |
| Tout ensemble, dans un petit jeu | [09 : attrape les lucioles](js/09-mini-jeu-lucioles/README.md) |
| GSAP | [10 : Blob prend des cours de danse](js/10-blob-avec-gsap/README.md) |
