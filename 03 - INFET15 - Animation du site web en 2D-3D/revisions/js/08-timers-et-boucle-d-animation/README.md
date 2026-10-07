[← Exercices JavaScript](../README.md)

# Les balles rebondissantes : minuteries et boucle d'animation

Un compte à rebours, un chronomètre, puis une balle qui traverse l'écran, rebondit, tombe… et finit par se multiplier. Tout se fait en JavaScript, image par image.

Ce que tu vas apprendre :

- différer une action avec `setTimeout`, la répéter avec `setInterval` ;
- écrire une **boucle d'animation** avec `requestAnimationFrame` ;
- faire bouger un objet avec une position et une vitesse, gérer les rebonds et la gravité ;
- animer plusieurs objets rangés dans un tableau ;
- obtenir la même vitesse sur tous les écrans grâce au temps écoulé entre deux images.

Cette boucle d'animation, c'est exactement ce que fait un moteur de jeu comme Phaser : sa fonction `update()` est appelée à chaque image, comme la fonction de l'étape 4.

**Prérequis** : [03 : introduction aux événements](../03-introduction-evenements/README.md) ; les objets et les tableaux ([01 : révisions des bases](../01-revisions/README.md)).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Le fichier `css/style.css` est fourni, il n'y a rien à y modifier. Une balle (`.ball`) mesure 48 pixels et part du coin en haut à gauche de l'arène ; on la déplace avec `style.transform`.

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : l'arène et les balles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée (son état final : les étapes 5 à 8, 10 et 11 y transforment le code des étapes précédentes)

---

## Étape 1 : au clic sur « Lancer », afficher « Prêt ? » au bout de 2 secondes

`setTimeout(fonction, délai)` exécute une fonction **une seule fois**, après un délai en millisecondes (2000 ms = 2 s). Le reste du code continue sans attendre.

**À faire** :

- au clic sur « Lancer », désactiver le bouton (`disabled = true`) pour ne pas lancer deux fois, et afficher « Attention… » dans `#message` ;
- 2 secondes plus tard, afficher « Prêt ? ».

**Résultat attendu** : le bouton devient gris, « Attention… » s'affiche, puis « Prêt ? » 2 secondes après.

<details>
<summary>💡 Un indice ?</summary>

```js
setTimeout(() => {
    // ce code s'exécute 2 secondes plus tard
}, 2000);
```

</details>

## Étape 2 : compte à rebours 3, 2, 1, « Partez ! »

`setInterval(fonction, délai)` exécute une fonction **à intervalles réguliers**, jusqu'à ce qu'on l'arrête. Il renvoie un identifiant, à donner à `clearInterval(identifiant)` pour l'arrêter.

**À faire** :

- créer une fonction `startCountdown()`, appelée juste après l'affichage de « Prêt ? » ;
- toutes les secondes, afficher 3, puis 2, puis 1, puis « Partez ! » ;
- arrêter l'intervalle après « Partez ! ».

**Résultat attendu** : « Prêt ? », puis 3, 2, 1 et « Partez ! », une seconde entre chaque. Le décompte s'arrête là.

<details>
<summary>💡 Un indice ?</summary>

Une variable `count`, qui vaut 3 au départ et diminue à chaque passage. Tant qu'elle est supérieure à 0, on l'affiche ; sinon, c'est « Partez ! » et `clearInterval`.

</details>

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
function startCountdown() {
    let count = 3;
    const countdownId = setInterval(() => {
        if (count > 0) {
            message.textContent = count;
            count--;
        } else {
            clearInterval(countdownId);
            message.textContent = 'Partez !';
        }
    }, 1000);
}
```

</details>

## Étape 3 : chronomètre en dixièmes de seconde

**À faire** :

- à « Partez ! », démarrer un chronomètre : une variable `tenths` augmente de 1 tous les dixièmes de seconde (100 ms) ;
- afficher le temps dans `#chrono`, en secondes avec un chiffre après la virgule (`1.3`) ;
- ranger le démarrage dans une fonction `startChrono()`, et prévoir `stopChrono()` qui l'arrête (elle servira à l'étape 9).

**Résultat attendu** : le chrono défile à partir de « Partez ! » : 0.1, 0.2… 1.0, 1.1…

<details>
<summary>💡 Un indice ?</summary>

`(tenths / 10).toFixed(1)` transforme 13 en `'1.3'`. Garde l'identifiant renvoyé par `setInterval` dans une variable déclarée en dehors de la fonction, pour que `stopChrono()` puisse l'utiliser.

</details>

## Étape 4 : la balle avance à chaque image (requestAnimationFrame)

Un écran affiche environ 60 images par seconde. `requestAnimationFrame(fonction)` demande au navigateur d'appeler une fonction **juste avant la prochaine image**. Si cette fonction se redemande elle-même à la fin, on obtient une boucle qui tourne à chaque image : une **boucle d'animation**.

```js
function loop() {
    // 1. mettre à jour les positions
    // 2. afficher
    requestAnimationFrame(loop); // et on recommence à l'image suivante
}
requestAnimationFrame(loop); // premier tour
```

On décrit la balle par un objet : sa position (`x`, `y`) et sa vitesse (`vx`, `vy`), en pixels par image pour l'instant. Ranger tout ça dans un objet dès maintenant facilitera l'étape 10.

**À faire** :

- créer un objet `ball = { el: …, x: 0, y: 0, vx: 2, vy: 0 }`, où `el` est l'élément `#ball` ;
- écrire une fonction `loop()` qui ajoute `vx` à `x`, déplace l'élément avec `style.transform = translate(…)`, puis se redemande avec `requestAnimationFrame` ;
- créer une fonction `startAnimation()` qui lance la boucle, et l'appeler à « Partez ! ».

**Résultat attendu** : à « Partez ! », la balle glisse vers la droite… et sort de l'arène.

<details>
<summary>💡 Un indice ?</summary>

`` ball.el.style.transform = `translate(${ball.x}px, ${ball.y}px)`; ``

</details>

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
const ball = { el: document.querySelector('#ball'), x: 0, y: 0, vx: 2, vy: 0 };
let frameId = null;

function loop() {
    ball.x += ball.vx;
    ball.el.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
    frameId = requestAnimationFrame(loop);
}

function startAnimation() {
    frameId = requestAnimationFrame(loop);
}
```

On garde la valeur renvoyée par `requestAnimationFrame` dans `frameId` : elle servira à arrêter la boucle (étape 9).

</details>

## Étape 5 : la balle s'arrête au bord droit

La position la plus à droite possible est la largeur de l'arène moins celle de la balle : `arena.clientWidth - 48`.

**À faire** : dans la boucle, si `x` dépasse cette limite, la ramener à la limite.

**Résultat attendu** : la balle s'arrête pile contre le bord droit.

Pour la suite, le plus lisible est de sortir la mise à jour de la balle de la boucle, dans une fonction `updateBall(ball)` appelée par `loop()`.

## Étape 6 : la balle rebondit sur les bords gauche et droit

Rebondir, c'est repartir dans l'autre sens : il suffit d'inverser la vitesse, `vx = -vx`.

**À faire** : au bord droit, ramener la balle à la limite **et** inverser sa vitesse ; faire de même au bord gauche (`x < 0`).

**Résultat attendu** : la balle fait des allers-retours sans fin.

## Étape 7 : la balle rebondit aussi en haut et en bas

**À faire** :

- donner une vitesse verticale de départ à la balle (par exemple `vy: 2`) et ajouter `vy` à `y` à chaque image ;
- gérer les rebonds en haut (`y < 0`) et en bas (`y > arena.clientHeight - 48`), comme pour les bords.

**Résultat attendu** : la balle part en diagonale et rebondit sur les quatre bords, comme un vieux jeu de casse-briques.

## Étape 8 : la gravité fait tomber la balle, qui rebondit de moins en moins haut

La gravité est une **accélération** : à chaque image, elle augmente un peu la vitesse de chute. Et au sol, un rebond ne rend jamais toute l'énergie : la balle repart moins vite.

**À faire** :

- à chaque image, ajouter une petite valeur à `vy` (par exemple `0.25`) ;
- au rebond sur le sol, inverser `vy` en le multipliant par `0.8` (la balle garde 80 % de sa vitesse) ;
- bonus : quand la vitesse au sol devient très faible, la mettre à 0, pour que la balle se pose.

**Résultat attendu** : la balle tombe, rebondit de moins en moins haut, puis roule sur le sol.

<details>
<summary>💡 Un indice ?</summary>

Au sol : `ball.vy = -ball.vy * 0.8;`. Pour qu'elle finisse aussi par s'arrêter de rouler, multiplie `vx` par un nombre un peu inférieur à 1 (par exemple `0.98`) à chaque rebond.

</details>

## Étape 9 : boutons Pause et Reprendre

`cancelAnimationFrame(frameId)` annule l'image demandée : la boucle ne tourne plus. Pour reprendre, on relance simplement la boucle.

**À faire** :

- activer le bouton « Pause » quand l'animation démarre (`disabled = false`) ;
- au clic : si l'animation tourne, l'arrêter, arrêter le chrono et afficher « Reprendre » sur le bouton ; sinon, relancer l'animation et le chrono, et afficher « Pause ».

**Résultat attendu** : la balle et le chrono se figent, puis repartent exactement d'où ils étaient.

<details>
<summary>💡 Un indice ?</summary>

Une variable `isPaused` (vrai ou faux) indique l'état ; on l'inverse à chaque clic : `isPaused = !isPaused;`.

</details>

## Étape 10 : un clic dans l'arène ajoute une balle de couleur au hasard

Pour animer plusieurs balles, on les range dans un **tableau d'objets**, et la boucle les met toutes à jour.

**À faire** :

- remplacer l'objet `ball` par un tableau `balls` qui contient la balle de départ ;
- dans `loop()`, appeler `updateBall` pour chaque balle du tableau ;
- écrire une fonction `createBall(x, y)` qui crée un élément `div` de classe `ball`, lui donne une couleur au hasard, l'ajoute à l'arène et ajoute son objet au tableau, avec une vitesse au hasard ;
- au clic dans l'arène, créer une balle à l'endroit du clic.

**Résultat attendu** : chaque clic fait apparaître une balle de couleur, qui part dans une direction au hasard et rebondit avec les autres.

<details>
<summary>💡 Un indice ?</summary>

- Couleur au hasard : ``el.style.setProperty('--color', `hsl(${Math.floor(Math.random() * 360)}, 80%, 55%)`)`` (une teinte au hasard sur le cercle des couleurs).
- Position du clic dans l'arène : `event.clientX - arena.getBoundingClientRect().left`, et de même pour `y` avec `top`.

</details>

<details>
<summary>🆘 Besoin d'aide pour la boucle ?</summary>

```js
const balls = [
    { el: document.querySelector('#ball'), x: 0, y: 0, vx: 2, vy: 0 }
];

function loop() {
    for (const ball of balls) {
        updateBall(ball);
    }
    frameId = requestAnimationFrame(loop);
}
```

</details>

## Étape 11 : même vitesse sur tous les écrans (temps écoulé entre deux images)

Jusqu'ici, la vitesse est en **pixels par image**. Sur un écran à 60 images par seconde, `vx: 2` donne 120 pixels par seconde ; sur un écran à 144 images par seconde, 288 : la balle va plus de deux fois plus vite ! La solution : exprimer les vitesses en **pixels par seconde**, et les multiplier par le temps écoulé depuis l'image précédente.

`requestAnimationFrame` donne justement à la fonction appelée l'heure actuelle, en millisecondes : `loop(time)`.

**À faire** :

- dans `loop(time)`, calculer `dt`, le temps écoulé depuis l'image précédente, en secondes : `(time - lastTime) / 1000` ;
- passer `dt` à `updateBall(ball, dt)`, et y écrire `x += vx * dt` (idem pour `y`) ;
- convertir les vitesses en pixels par seconde (`vx: 2` devient environ `vx: 120`), et la gravité aussi (environ `900`, à multiplier par `dt`).

**Résultat attendu** : même comportement qu'avant, mais à la même vitesse sur tous les écrans.

<details>
<summary>💡 Un indice ?</summary>

À la toute première image, il n'y a pas d'image précédente : `lastTime` vaut `null`, et `dt` doit valoir 0. Pense aussi à remettre `lastTime` à `null` quand l'animation reprend après une pause, sinon `dt` compterait toute la durée de la pause.

</details>

<details>
<summary>🔑 La réponse</summary>

```js
let lastTime = null;

function loop(time) {
    const dt = lastTime === null ? 0 : (time - lastTime) / 1000;
    lastTime = time;
    for (const ball of balls) {
        updateBall(ball, dt);
    }
    frameId = requestAnimationFrame(loop);
}

function updateBall(ball, dt) {
    ball.vy += 900 * dt;   // gravité, en pixels par seconde²
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    // … rebonds inchangés
}
```

La correction limite aussi `dt` à 0,05 s, au cas où l'onglet passerait en arrière-plan.

</details>

## Étape 12 (bonus) : un clic sur une balle la fait éclater

La classe `pop` (fournie) fait grossir la balle et la rend transparente.

**À faire** : au clic dans l'arène, si l'élément cliqué est une balle (`event.target.classList.contains('ball')`) :

- retirer son objet du tableau `balls` (elle n'est plus mise à jour) ;
- lui ajouter la classe `pop` ;
- retirer l'élément de la page à la fin de l'animation (`animationend`, puis `remove()`).

Sinon, créer une balle comme à l'étape 10.

**Résultat attendu** : un clic sur une balle la fait éclater ; un clic ailleurs en ajoute une.

<details>
<summary>💡 Un indice ?</summary>

`balls.findIndex(ball => ball.el === event.target)` donne la position de la balle cliquée dans le tableau, et `balls.splice(index, 1)` l'en retire.

</details>

---

## À propos des animations réduites

Ici, le mouvement est le sujet même de l'exercice, il n'y a donc pas d'adaptation à faire. Dans un vrai site, une animation décorative de ce genre devrait s'arrêter, ou ne pas démarrer, si `prefers-reduced-motion` est actif (voir l'exercice [05](../05-classes-et-animations-css/README.md)).

## Pour aller plus loin

- Les balles rebondissent entre elles (indice : deux balles se touchent si la distance entre leurs centres est inférieure à 48 pixels).
- Une balle « attrapée » au clic suit la souris, puis repart avec l'élan quand on la lâche.
- Ajouter un vent : une petite accélération horizontale, réglable avec un curseur.

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
