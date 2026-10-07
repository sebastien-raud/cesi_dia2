[← Exercices JavaScript](../README.md)

# La coccinelle au jardin : souris et clavier

Un jardin vu du ciel. D'abord, une fleur suit la souris et des étincelles jaillissent au clic. Puis une coccinelle se pilote aux flèches du clavier : elle se tourne dans le sens de la marche, mange des feuilles… et doit éviter l'araignée.

Ce que tu vas apprendre :

- lire la position de la souris (`mousemove`, `clientX`, `clientY`) et la convertir en coordonnées dans un élément ;
- déplacer un élément avec `transform: translate()` et le faire tourner avec `rotate()` ;
- réagir aux touches du clavier (`keydown`, `keyup`, `event.key`) ;
- garder un élément dans une zone (`Math.min`, `Math.max`) ;
- se déplacer de façon fluide, en diagonale, en gardant les touches enfoncées en mémoire ;
- détecter qu'un élément en touche un autre (collision).

C'est exactement ce que demande le pilotage d'un personnage dans un jeu, comme dans un jeu Phaser.

**Prérequis** : [03 : introduction aux événements](../03-introduction-evenements/README.md) ; [06 : créer des éléments](../06-creer-des-elements/README.md) est utile pour les étapes 4 et 10.

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Dans le jardin, tous les éléments partent du coin en haut à gauche : on les place avec `style.transform = 'translate(x, y)'`. La coccinelle mesure 40 × 40 pixels, tête vers le haut.

Le début de `js/script.js` contient deux fonctions **fournies** :

- `startLoop(update)` : une boucle d'animation, qui appelle `update(dt)` à chaque image (étape 9) ; l'[exercice 08](../08-timers-et-boucle-d-animation/README.md) explique comment l'écrire ;
- `touches(a, b)` : renvoie `true` si deux éléments se chevauchent à l'écran (étape 10).

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : le jardin, la coccinelle, les étincelles, fourni
- [`js/script.js`](js/script.js) : les fonctions fournies, puis le code à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : afficher les coordonnées de la souris dans le jardin

L'événement `mousemove` se déclenche à chaque mouvement de la souris. `event.clientX` et `event.clientY` donnent sa position… depuis le coin de la **fenêtre**. Pour avoir la position dans le jardin, on retire la position du jardin, donnée par `getBoundingClientRect()` :

```js
const rect = garden.getBoundingClientRect();
const x = event.clientX - rect.left;
```

**À faire** : à chaque mouvement de la souris dans le jardin (`#garden`), afficher ses coordonnées dans `#coords`, arrondies (« x : 230, y : 120 »).

**Résultat attendu** : les coordonnées changent quand la souris bouge ; elles valent à peu près 0, 0 dans le coin en haut à gauche du jardin.

<details>
<summary>💡 Un indice ?</summary>

`Math.round` arrondit à l'entier le plus proche. Le calcul de la position resservira à l'étape 4 : le ranger dans une fonction `gardenPosition(event)` qui renvoie `{ x, y }` évite de l'écrire deux fois.

</details>

## Étape 2 : une fleur suit la souris

**À faire** : dans le même écouteur, déplacer la fleur (`#flower`) à la position de la souris, centrée sur le pointeur (la fleur mesure 32 pixels : on retire 16 de chaque coordonnée).

**Résultat attendu** : la fleur remplace le pointeur de la souris dans le jardin (le CSS cache le vrai pointeur).

<details>
<summary>💡 Un indice ?</summary>

`` flower.style.transform = `translate(${x - 16}px, ${y - 16}px)`; ``

</details>

## Étape 3 : la fleur suit avec un léger retard (classe smooth)

La classe `smooth` ajoute une transition sur `transform` : à chaque nouvelle position, la fleur glisse au lieu de sauter.

**À faire** : ajouter la classe `smooth` à la fleur.

**Résultat attendu** : la fleur suit la souris avec un petit temps de retard, comme une traînée. Une seule ligne de JavaScript : c'est la transition CSS qui fait tout le travail.

## Étape 4 : un clic fait apparaître des étincelles qui s'envolent

La classe `sparkle` fait s'envoler et disparaître une étincelle, dans la direction donnée par les variables CSS `--dx` et `--dy`.

**À faire** : au clic dans le jardin, créer 6 étincelles (des `<span>` qui contiennent « ✨ ») :

- chacune placée à l'endroit du clic (`translate`) ;
- avec une direction au hasard : `--dx` et `--dy` entre -60 et 60 pixels ;
- retirée de la page à la fin de son animation (`animationend`).

**Résultat attendu** : chaque clic fait jaillir un petit bouquet d'étincelles, qui s'envolent dans toutes les directions et s'effacent.

<details>
<summary>💡 Un indice ?</summary>

- Un nombre entre -60 et 60 : `Math.random() * 120 - 60`.
- Une variable CSS avec une unité : `` sparkle.style.setProperty('--dx', `${dx}px`) ``.

</details>

## Étape 5 : les flèches déplacent la coccinelle

L'événement `keydown` se déclenche quand une touche est enfoncée ; on l'écoute sur `document`, pour qu'il fonctionne quel que soit l'élément actif. `event.key` vaut `'ArrowUp'`, `'ArrowDown'`, `'ArrowLeft'` ou `'ArrowRight'` pour les flèches.

**À faire** :

- garder la position de la coccinelle dans deux variables, `bugX` et `bugY` (par exemple 200 et 180 au départ) ;
- écrire une fonction `moveLadybug()` qui place la coccinelle à cette position, et l'appeler une première fois ;
- à chaque flèche, modifier `bugX` ou `bugY` de 10 pixels, puis appeler `moveLadybug()`.

**Résultat attendu** : chaque appui sur une flèche déplace la coccinelle d'un petit pas. En gardant la touche enfoncée, elle avance par à-coups.

## Étape 6 : la coccinelle s'oriente dans le sens de la marche

`rotate()` fait tourner un élément. Placé **après** `translate()` dans `transform`, il le fait tourner sur place : `translate(200px, 180px) rotate(90deg)`.

**À faire** : garder un angle dans une variable `bugAngle` : 0 vers le haut, 90 vers la droite, 180 vers le bas, 270 vers la gauche. Le mettre à jour selon la flèche, et l'ajouter dans `moveLadybug()`.

**Résultat attendu** : la coccinelle regarde toujours dans la direction où elle avance.

## Étape 7 : la coccinelle ne sort pas du jardin

`Math.max(0, valeur)` empêche une valeur de descendre sous 0 ; `Math.min(valeur, max)` l'empêche de dépasser `max`.

**À faire** : dans `moveLadybug()`, limiter `bugX` entre 0 et la largeur du jardin moins 40, et `bugY` entre 0 et sa hauteur moins 40.

**Résultat attendu** : la coccinelle s'arrête contre les bords, quelle que soit la flèche enfoncée.

<details>
<summary>💡 Un indice ?</summary>

`bugX = Math.max(0, Math.min(bugX, garden.clientWidth - 40));` : `Math.min` empêche de dépasser à droite, puis `Math.max` empêche de dépasser à gauche.

</details>

## Étape 8 : les flèches ne font plus défiler la page

Par défaut, les flèches font défiler la page : gênant pendant une partie ! `event.preventDefault()` annule ce comportement.

**À faire** : appeler `event.preventDefault()` quand la touche est une flèche.

**Résultat attendu** : sur une petite fenêtre (où la page défile), les flèches ne déplacent plus que la coccinelle.

<details>
<summary>💡 Un indice ?</summary>

Toutes les flèches commencent par `Arrow` : `event.key.startsWith('Arrow')`.

</details>

## Étape 9 : déplacement fluide et en diagonale (touches gardées en mémoire)

Avec `keydown`, la coccinelle avance par à-coups, et une seule flèche compte à la fois. Les jeux font autrement : ils **retiennent** quelles touches sont enfoncées, puis, à chaque image, déplacent le personnage en fonction de ces touches.

Un `Set` est une collection sans doublon, idéale pour ça : `add` ajoute une touche, `delete` la retire, `has` dit si elle est présente.

**À faire** :

- créer un `Set` `pressedKeys` ; sur `keydown`, y ajouter la flèche enfoncée ; sur `keyup`, la retirer ; retirer le déplacement de l'étape 5 ;
- écrire une fonction `updateLadybug(dt)` : selon les flèches présentes dans `pressedKeys`, calculer une direction `dx` (-1, 0 ou 1) et `dy` (-1, 0 ou 1), puis avancer de `dx * SPEED * dt` et `dy * SPEED * dt` (`SPEED` valant par exemple 220 pixels par seconde) ;
- lancer la boucle fournie : `startLoop((dt) => { updateLadybug(dt); })`.

Pour l'angle, `Math.atan2(dx, -dy) * 180 / Math.PI` donne l'angle de la direction en degrés, diagonales comprises (0 vers le haut, 90 vers la droite…).

**Résultat attendu** : la coccinelle glisse en douceur tant qu'une flèche est enfoncée, et file en diagonale avec deux flèches à la fois, en se tournant dans la bonne direction.

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
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

function updateLadybug(dt) {
    let dx = 0;
    let dy = 0;
    if (pressedKeys.has('ArrowLeft')) { dx -= 1; }
    // … de même pour les trois autres flèches
    // puis : avancer, calculer l'angle, appeler moveLadybug()
}
```

</details>

## Étape 10 : des feuilles à manger, et un score

**À faire** :

- écrire une fonction `addLeaf()` qui crée une feuille (un `<span>` de classe `leaf` contenant « 🍃 ») à une position au hasard dans le jardin, l'ajoute au jardin et dans un tableau `leaves` ;
- au départ, ajouter 5 feuilles ;
- à chaque image (dans la boucle), pour chaque feuille : si la coccinelle la touche (fonction fournie `touches(ladybug, leaf)`), la retirer de la page et du tableau, augmenter le score affiché dans `#score`, et faire pousser une nouvelle feuille ailleurs.

**Résultat attendu** : la coccinelle mange les feuilles qu'elle touche, le score augmente, et il y a toujours 5 feuilles dans le jardin.

<details>
<summary>💡 Un indice ?</summary>

Pour retirer une feuille du tableau : `leaves = leaves.filter(l => l !== leaf);` (le tableau doit alors être déclaré avec `let`).

</details>

## Étape 11 (bonus) : une araignée se promène ; la toucher, c'est perdu

**À faire** :

- afficher l'araignée (`#spider`, retirer `hidden`) et la faire se déplacer toute seule en rebondissant sur les bords, comme les balles de l'[exercice 08](../08-timers-et-boucle-d-animation/README.md) : une position et une vitesse (par exemple 130 et 90 pixels par seconde) ;
- si elle touche la coccinelle : la partie s'arrête (la boucle ne met plus rien à jour), et `#game-over` s'affiche ;
- le bouton « Rejouer » remet le score à 0, replace la coccinelle et l'araignée, et relance la partie.

**Résultat attendu** : une vraie petite partie : manger le plus de feuilles possible sans se faire croquer.

<details>
<summary>💡 Un indice ?</summary>

- Une variable `isGameOver` : au début de la fonction donnée à `startLoop`, si elle est vraie, on sort avec `return`.
- Le clic sur « Rejouer » est aussi un clic dans le jardin : il ferait des étincelles. `event.stopPropagation()` l'empêche de remonter jusqu'au jardin.

</details>

---

## Pour aller plus loin

- La coccinelle accélère un peu à chaque feuille mangée.
- Une feuille dorée, plus rare, qui rapporte 5 points.
- Piloter aussi la coccinelle avec les touches Z, Q, S, D (indice : `event.key` vaut `'z'`, `'q'`…).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
