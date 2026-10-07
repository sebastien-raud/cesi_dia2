[← Exercices JavaScript](../README.md)

# Attrape les lucioles : un mini-jeu complet

La nuit tombe sur la forêt. Des lucioles volent dans tous les sens : il faut en attraper le plus possible en 30 secondes, sans toucher au papillon de nuit, qui fait perdre des points.

Cet exercice est différent des précédents : chaque étape donne un **cahier des charges** (ce que le jeu doit faire), pas la marche à suivre. À toi de choisir comment l'écrire, en réutilisant ce que tu as appris. Les aides sont là si tu bloques, et la correction n'est qu'une solution parmi d'autres.

Ce que tu vas réutiliser :

- créer et retirer des éléments, et la délégation d'événements ([06](../06-creer-des-elements/README.md)) ;
- les positions et les collisions ([07](../07-souris-et-clavier/README.md)) ;
- `setInterval`, la boucle d'animation et les rebonds ([08](../08-timers-et-boucle-d-animation/README.md)) ;
- les animations CSS déclenchées en JavaScript ([05](../05-classes-et-animations-css/README.md)).

Et une nouveauté : garder une information dans le navigateur avec `localStorage` (étape 8).

**Prérequis** : les exercices [06](../06-creer-des-elements/README.md), [07](../07-souris-et-clavier/README.md) et [08](../08-timers-et-boucle-d-animation/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Ce qui est prêt :

- la forêt (`#forest`), avec un écran de début (`#start-screen`, bouton `#start-button`) et un écran de fin (`#end-screen`, avec `#final-score`, `#new-record` et le bouton `#replay-button`) ;
- l'affichage du score (`#score`), du temps (`#time`) et du record (`#record`) ;
- dans le CSS : une luciole est un bouton de classe `firefly` (28 × 28 px, qui brille tout seul), le papillon un bouton de classe `moth` (36 × 36 px, avec l'emoji 🦋), et la classe `points` fait s'envoler un petit texte. Dans la forêt, on place les éléments avec `transform: translate(x, y)`.

Les lucioles et le papillon sont des **boutons** : on peut aussi jouer au clavier (`Tab` pour passer de l'un à l'autre, `Entrée` pour attraper).

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : la forêt et les créatures, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : une solution complète et commentée

---

## Étape 1 : une luciole apparaît à une position au hasard

**Cahier des charges** :

- au clic sur « Commencer », l'écran de début disparaît ;
- une luciole apparaît dans la forêt, à une position au hasard ;
- elle ne dépasse jamais du cadre de la forêt.

**Résultat attendu** : à chaque partie, la luciole brille à un endroit différent.

<details>
<summary>💡 Un indice ?</summary>

Une position au hasard qui ne dépasse pas : `Math.random() * (forest.clientWidth - 28)` pour `x`, et de même pour `y` avec la hauteur. Garder la luciole dans un objet `{ el, x, y }` facilitera les étapes 5 et 6.

</details>

## Étape 2 : un clic sur la luciole rapporte 1 point, et elle réapparaît ailleurs

**Cahier des charges** :

- un clic sur la luciole ajoute 1 point au score affiché ;
- la luciole réapparaît aussitôt à une autre position au hasard.

**Résultat attendu** : le jeu de base fonctionne déjà : on peut enchaîner les clics et faire monter le score.

<details>
<summary>💡 Un indice ?</summary>

Pense à l'étape 6, où il y aura plusieurs lucioles : un seul écouteur sur la forêt, avec `event.target.closest('.firefly')`, évite d'en ajouter un par luciole (délégation, exercice 05).

</details>

## Étape 3 : un compte à rebours de 30 secondes

**Cahier des charges** :

- la partie dure 30 secondes ;
- le temps restant s'affiche et diminue chaque seconde ;
- à 0, la partie s'arrête : le compte à rebours aussi.

**Résultat attendu** : le temps défile de 30 à 0, puis s'arrête.

<details>
<summary>💡 Un indice ?</summary>

`setInterval` toutes les 1000 ms, et `clearInterval` à 0 (exercice 07, étape 2). Une variable `isPlaying` (vraie pendant la partie) permettra d'ignorer les clics une fois la partie finie.

</details>

## Étape 4 : écran de fin avec le score, et bouton « Rejouer »

**Cahier des charges** :

- à la fin de la partie, la luciole disparaît et l'écran de fin affiche le score ;
- « Rejouer » relance une partie : score à 0, temps à 30, nouvelle luciole.

**Résultat attendu** : on peut enchaîner les parties sans recharger la page.

<details>
<summary>🆘 Besoin d'aide pour organiser le code ?</summary>

Deux fonctions rendent le code lisible :

- `startGame()` : remet le score à 0, cache les écrans, crée la luciole, lance le compte à rebours ;
- `endGame()` : arrête le compte à rebours, retire la luciole, affiche l'écran de fin.

« Commencer » et « Rejouer » appellent tous les deux `startGame`.

</details>

## Étape 5 : la luciole se déplace toute seule, de plus en plus vite

**Cahier des charges** :

- la luciole vole en ligne droite, dans une direction au hasard, et rebondit sur les bords de la forêt ;
- sa vitesse augmente au fil de la partie : lente au début, beaucoup plus rapide à la fin ;
- le mouvement s'arrête à la fin de la partie.

**Résultat attendu** : la luciole devient de plus en plus difficile à attraper.

<details>
<summary>💡 Un indice ?</summary>

Une boucle `requestAnimationFrame` avec le temps écoulé `dt`, comme dans l'exercice 07. La vitesse peut dépendre du temps écoulé depuis le début : par exemple `60 + (30 - timeLeft) * 6` pixels par seconde.

</details>

<details>
<summary>🆘 Une direction au hasard, comment faire ?</summary>

On peut garder un angle au hasard (`Math.random() * Math.PI * 2`), puis avancer de `Math.cos(angle) * vitesse * dt` en x et de `Math.sin(angle) * vitesse * dt` en y. Au rebond sur un bord gauche ou droit, l'angle devient `Math.PI - angle` ; sur le bord haut ou bas, `-angle`.

L'autre solution, celle de l'exercice 07 (une vitesse `vx` et une vitesse `vy`), marche aussi : il faut alors augmenter les deux en même temps.

</details>

## Étape 6 : plusieurs lucioles en même temps

**Cahier des charges** :

- trois lucioles volent en même temps ;
- chacune rapporte 1 point et réapparaît ailleurs quand on l'attrape.

**Résultat attendu** : la forêt est plus vivante, et le score monte plus vite.

<details>
<summary>💡 Un indice ?</summary>

Un tableau d'objets lucioles, et la boucle met chacune à jour (exercice 07, étape 10). Au clic, `fireflies.find(f => f.el === element)` retrouve l'objet de la luciole cliquée.

</details>

## Étape 7 : un papillon de nuit piège fait perdre 3 points

**Cahier des charges** :

- un papillon de nuit (bouton de classe `moth`, contenant « 🦋 ») vole lui aussi dans la forêt ;
- l'attraper fait perdre 3 points, sans jamais descendre sous 0 ;
- il réapparaît ailleurs après avoir été touché.

**Résultat attendu** : il faut viser juste, et éviter le papillon.

<details>
<summary>💡 Un indice ?</summary>

`Math.max(0, score - 3)` empêche le score de devenir négatif. Le papillon peut se déplacer avec la même fonction que les lucioles.

</details>

## Étape 8 : le meilleur score est gardé d'une partie à l'autre (localStorage)

`localStorage` garde des informations dans le navigateur, même après avoir fermé la page :

```js
localStorage.setItem('fireflies-record', 12);           // enregistrer
const record = localStorage.getItem('fireflies-record'); // relire : '12' (une chaîne !)
```

`getItem` renvoie `null` si rien n'a encore été enregistré.

**Cahier des charges** :

- le record s'affiche dès le chargement de la page (0 la toute première fois) ;
- en fin de partie, si le score bat le record, il devient le nouveau record et « Nouveau record ! » s'affiche sur l'écran de fin ;
- le record est conservé après un rechargement de la page.

**Résultat attendu** : un record à battre, partie après partie.

<details>
<summary>💡 Un indice ?</summary>

`Number(localStorage.getItem('fireflies-record')) || 0` donne le record sous forme de nombre, ou 0 s'il n'y en a pas encore.

</details>

## Étape 9 : un petit effet à chaque capture

**Cahier des charges** :

- à chaque luciole attrapée, un « +1 » s'envole depuis l'endroit de la capture, puis disparaît ;
- pour le papillon, c'est un « -3 » en rouge.

**Résultat attendu** : chaque capture se voit, et le jeu devient bien plus agréable.

<details>
<summary>💡 Un indice ?</summary>

Un `<span>` de classe `points` (ajouter `minus` pour le rouge), placé avec `translate` à la position de la créature, et retiré sur `animationend` (exercice 05, étape 11).

</details>

## Étape 10 (bonus) : mode « animations réduites »

**Cahier des charges** : si le système demande de réduire les animations,

- les créatures ne se déplacent plus en continu : elles changent de place toutes les 1,5 seconde ;
- pas d'effet « +1 » ou « -3 » ;
- le reste du jeu fonctionne normalement.

**Résultat attendu** : le jeu reste jouable et amusant, sans mouvement continu. Pour tester :

- **Firefox** : `about:config` > chercher `ui.prefersReducedMotion` > s'il n'existe pas, le créer en type **Nombre** > valeur `1`, puis recharger la page ; pour revenir à la normale, supprimer la préférence ;
- **Chrome, Edge** : outils de développement, menu ⋮ > More tools > Rendering, « Emulate CSS media feature prefers-reduced-motion » sur `reduce`, puis recharger la page.

<details>
<summary>💡 Un indice ?</summary>

`window.matchMedia('(prefers-reduced-motion: reduce)').matches` vaut `true` si le réglage est actif. Un `setInterval` de 1500 ms peut replacer toutes les créatures au hasard.

</details>

---

## Pour aller plus loin

- Une luciole dorée, plus rare et plus rapide, qui rapporte 5 points.
- Un son à chaque capture (indice : `new Audio('fichier.mp3').play()`).
- Refaire le jeu avec Phaser : les lucioles deviennent des sprites, et la boucle de l'étape 5 devient la fonction `update()` d'une scène.

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Ce n'est qu'une solution parmi d'autres : si ton jeu respecte le cahier des charges, il est juste.
