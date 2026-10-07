[← Exercices JavaScript](../README.md)

# Blob prend des cours de danse : animer avec GSAP

Tu te souviens de Blob, le petit monstre de l'[exercice 05](../05-classes-et-animations-css/README.md) ? Cette fois, son CSS ne contient **aucune animation** : pas de `@keyframes`, pas de classe `jump` ni `dance`. Tout passe par [GSAP](https://gsap.com/docs/v3/), une bibliothèque JavaScript d'animation très utilisée.

Ce que tu vas apprendre :

- animer avec `gsap.to`, `gsap.from` et les courbes d'accélération (`ease`) ;
- enchaîner des animations dans une **timeline** ;
- piloter une animation : `play`, `pause`, `restart`, `reverse`, `timeScale` ;
- décaler le départ de plusieurs éléments avec `stagger` ;
- réagir à la fin d'une animation avec `onComplete` ;
- respecter le réglage « réduire les animations » avec `gsap.matchMedia` ;
- utiliser un plugin GSAP : `Draggable`.

**Prérequis** : l'[exercice 05](../05-classes-et-animations-css/README.md) (pour comparer) ; les fonctions et les événements.

## Démarrer

1. Ouvrir `index.html` dans le navigateur. GSAP est chargé depuis Internet (un CDN) : il faut une connexion.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. `index.html` charge déjà GSAP et son plugin `Draggable`, juste avant `js/script.js`.

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : Blob et la scène, sans aucune animation
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

## 05 et 10 : ce qui change

| | Exercice 05 (CSS) | Exercice 10 (GSAP) |
| --- | --- | --- |
| Où est décrite l'animation | dans le CSS (`@keyframes`) | dans le JavaScript |
| Comment on la lance | en ajoutant une classe | en appelant `gsap.to(…)` |
| Rejouer une animation | retirer la classe sur `animationend` | rien à faire : chaque appel rejoue |
| Enchaîner plusieurs animations | calculer des pourcentages de `@keyframes` | une timeline, étape par étape |
| Pause, retour en arrière, vitesse | difficile | `pause()`, `reverse()`, `timeScale()` |

Le CSS reste parfait pour les effets simples (survol, transition) ; GSAP devient intéressant dès qu'on enchaîne ou qu'on pilote des animations.

---

## Étape 1 : vérifier que GSAP est chargé

GSAP crée une variable globale `gsap`, utilisable partout dans ton script.

**À faire** : afficher `gsap.version` dans la console, et sélectionner Blob (`#blob`) et le message (`#message`) dans des constantes.

**Résultat attendu** : la console affiche `3.15.0` (ou une version proche). Si elle affiche `gsap is not defined`, GSAP n'est pas chargé : vérifie ta connexion.

## Étape 2 : le bouton « Couleur » change la couleur de Blob (gsap.to)

`gsap.to(élément, { propriétés })` anime un élément **depuis son état actuel vers** les valeurs indiquées. Les noms des propriétés CSS s'écrivent en camelCase : `background-color` devient `backgroundColor`. `duration` donne la durée en secondes.

**À faire** : au clic sur « Couleur », animer la couleur de fond de Blob vers le bleu (`#2F7FD6`), puis vers le vert (`#2FA65A`) au clic suivant.

**Résultat attendu** : Blob change de couleur en douceur, comme en 05, mais sans aucune transition CSS.

<details>
<summary>💡 Un indice ?</summary>

```js
gsap.to(blob, { backgroundColor: '#2F7FD6', duration: 0.6 });
```

Pour alterner, une variable `isBlue` que l'on inverse à chaque clic : `isBlue = !isBlue;`.

</details>

## Étape 3 : Blob tombe du ciel au chargement de la page (gsap.from)

`gsap.from` fait l'inverse de `gsap.to` : il anime **depuis** les valeurs indiquées **vers** l'état normal de l'élément. Parfait pour une entrée en scène. `y` déplace verticalement (en pixels), et `ease` choisit la façon d'accélérer : `'bounce.out'` fait rebondir à l'arrivée.

**À faire** : au chargement de la page, faire arriver Blob depuis 400 pixels plus haut, en 1,2 seconde, avec un rebond. Ranger ce code dans une fonction `intro()`, appelée juste après (elle resservira à l'étape 10).

**Résultat attendu** : à chaque rechargement, Blob tombe du ciel et rebondit avant de se poser.

<details>
<summary>💡 Un indice ?</summary>

```js
gsap.from(blob, { y: -400, duration: 1.2, ease: 'bounce.out' });
```

Les courbes disponibles se testent sur la page [Ease Visualizer](https://gsap.com/docs/v3/Eases) de GSAP.

</details>

## Étape 4 : le bouton « Saute » fait monter puis redescendre Blob (yoyo, repeat)

`repeat: 1` rejoue l'animation une fois de plus ; `yoyo: true` la rejoue **à l'envers**. Avec les deux, Blob monte puis redescend.

**À faire** : au clic sur « Saute », faire monter Blob de 150 pixels en 0,4 seconde, puis redescendre. Ranger ce code dans une fonction `jump()`.

**Résultat attendu** : Blob saute à chaque clic. Contrairement à l'exercice 04, il n'y a rien à faire pour pouvoir rejouer le saut.

<details>
<summary>💡 Un indice ?</summary>

```js
gsap.to(blob, { y: -150, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 1 });
```

</details>

## Étape 5 : un saut « cartoon » avec une timeline (s'écraser, sauter, retomber)

Un vrai saut de dessin animé se décompose : on s'écrase pour prendre de l'élan, on s'étire en montant, on retombe, on s'écrase au sol, puis on reprend sa forme. Une **timeline** enchaîne des animations les unes après les autres :

```js
const timeline = gsap.timeline();
timeline
    .to(blob, { … })   // d'abord ceci
    .to(blob, { … });  // puis cela, quand le premier est terminé
```

`scaleX` et `scaleY` étirent ou écrasent Blob (1 = taille normale). Le CSS fourni place l'origine des déformations en bas de Blob, comme un vrai rebond.

**À faire** : remplacer le saut de l'étape 4 par une timeline en cinq temps :

1. s'écraser : `scaleX: 1.2, scaleY: 0.8` (0,15 s) ;
2. monter en s'étirant : `y: -180, scaleX: 0.9, scaleY: 1.1` (0,35 s) ;
3. retomber : `y: 0` (0,35 s) ;
4. s'écraser au sol : `scaleX: 1.15, scaleY: 0.85` (0,1 s) ;
5. reprendre sa forme : `scaleX: 1, scaleY: 1`, avec `ease: 'elastic.out(1, 0.4)'` (0,4 s).

Bonus : empêcher un nouveau saut tant que le précédent n'est pas fini (`timeline.isActive()`).

**Résultat attendu** : Blob prend son élan, saute, retombe en s'écrasant et tremblote comme de la gelée.

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
function jump() {
    const timeline = gsap.timeline();
    timeline
        .to(blob, { scaleX: 1.2, scaleY: 0.8, duration: 0.15 })
        .to(blob, { y: -180, scaleX: 0.9, scaleY: 1.1, duration: 0.35, ease: 'power2.out' });
    // … à compléter avec les trois autres temps
}
```

</details>

## Étape 6 : la danse en boucle, avec les boutons « Danse » / « Pause » et « Recommencer »

Une timeline peut se répéter à l'infini (`repeat: -1`) et attendre qu'on la lance (`paused: true`). Elle se pilote ensuite comme un lecteur vidéo : `play()`, `pause()`, `restart()`, et `paused()` indique si elle est en pause.

**À faire** :

- créer une timeline `dance`, répétée à l'infini et en pause au départ, qui balance Blob : `rotation: -12, x: -30` (0,4 s), puis `rotation: 12, x: 30` (0,8 s), puis `rotation: 0, x: 0` (0,4 s), avec `ease: 'sine.inOut'` ;
- au clic sur « Danse » : si la danse est en pause, la jouer et afficher « Pause » sur le bouton ; sinon, la mettre en pause et afficher « Danse » ;
- au clic sur « Recommencer » : reprendre la danse depuis le début.

**Résultat attendu** : Blob se dandine sans fin ; « Pause » le fige exactement là où il est, et la danse reprend au même endroit.

<details>
<summary>💡 Un indice ?</summary>

```js
const dance = gsap.timeline({ repeat: -1, paused: true });
dance.to(blob, { rotation: -12, x: -30, duration: 0.4, ease: 'sine.inOut' });
// … puis les deux autres mouvements
```

</details>

## Étape 7 : le curseur règle la vitesse de la danse (timeScale)

`timeScale(2)` joue une animation deux fois plus vite, `timeScale(0.5)` deux fois moins vite. En 04, il fallait passer par une variable CSS ; ici, une seule ligne suffit.

**À faire** : à chaque mouvement du curseur (événement `input`), régler la vitesse de la danse sur sa valeur, et l'afficher dans `#speed-value` (par exemple « × 2 »).

**Résultat attendu** : Blob danse au ralenti, ou à toute allure.

<details>
<summary>💡 Un indice ?</summary>

La valeur d'un curseur est une chaîne de caractères : `Number(speedInput.value)` la transforme en nombre.

</details>

## Étape 8 : le bouton « Bébés » fait arriver cinq bébés Blobs l'un après l'autre (stagger)

Quand on anime plusieurs éléments d'un coup, `stagger` décale le départ de chacun : avec `stagger: 0.15`, le deuxième part 0,15 s après le premier, et ainsi de suite. C'est l'effet « cascade », très utilisé pour faire apparaître des cartes ou des listes.

Et `reverse()` rejoue une animation à l'envers : de quoi renvoyer les bébés d'où ils viennent.

**À faire** :

- créer un `gsap.from` sur les cinq `.baby`, en pause au départ : ils arrivent de 300 pixels plus haut, depuis une opacité de 0, avec un rebond et `stagger: 0.15` ;
- au clic sur « Bébés » : jouer l'animation et afficher « Au lit, les bébés » ; au clic suivant, la jouer à l'envers et afficher « Bébés ».

**Résultat attendu** : les bébés tombent l'un après l'autre de part et d'autre de Blob ; au clic suivant, ils repartent vers le ciel.

<details>
<summary>💡 Un indice ?</summary>

`gsap.from('.baby', { … })` anime tous les éléments de classe `baby`. Pour savoir dans quel sens jouer : `babies.progress()` vaut 0 si l'animation n'a jamais été jouée, et `babies.reversed()` indique si elle est jouée à l'envers.

</details>

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
const babies = gsap.from('.baby', {
    y: -300, opacity: 0, duration: 1, ease: 'bounce.out', stagger: 0.15, paused: true
});

babiesButton.addEventListener('click', () => {
    if (babies.progress() === 0 || babies.reversed()) {
        babies.play();
    } else {
        babies.reverse();
    }
});
```

</details>

## Étape 9 : afficher « Ouf ! » à la fin du saut (onComplete)

Une animation ou une timeline peut appeler une fonction à sa fin : c'est l'option `onComplete`. C'est l'équivalent GSAP de l'événement `animationend` de l'exercice 04.

**À faire** :

- écrire une fonction `showRelief()` qui affiche « Ouf ! » dans `#message`, puis le fait disparaître en fondu au bout d'une seconde ;
- la passer à la timeline du saut : `gsap.timeline({ onComplete: showRelief })`.

**Résultat attendu** : après chaque saut, « Ouf ! » apparaît au-dessus de la scène, puis s'efface.

<details>
<summary>💡 Un indice ?</summary>

`gsap.fromTo(message, { opacity: 1 }, { opacity: 0, delay: 1, duration: 0.5 })` : `fromTo` précise le point de départ **et** le point d'arrivée, et `delay` attend avant de commencer.

</details>

## Étape 10 : respecter le réglage « réduire les animations » (gsap.matchMedia)

Comme en 04, certaines personnes demandent à leur système de réduire les animations. Sans `@media` dans le CSS, c'est au JavaScript de s'en charger. `gsap.matchMedia()` appelle une fonction selon des requêtes média, et la rappelle si le réglage change pendant que la page est ouverte :

```js
const mm = gsap.matchMedia();
mm.add({
    reduce: '(prefers-reduced-motion: reduce)',
    noPreference: '(prefers-reduced-motion: no-preference)'
}, (context) => {
    // context.conditions.reduce vaut true si le réglage est actif
});
```

**À faire** :

- dans la fonction de `mm.add`, garder `context.conditions.reduce` dans une variable `reduceMotion`, et afficher ou masquer `#reduced-motion-message` selon sa valeur ;
- n'appeler `intro()` (étape 3) que si les animations ne sont pas réduites : déplacer son appel dans cette fonction ;
- au début de `jump()` et des écouteurs des boutons de danse, ne rien faire si `reduceMotion` est vrai ;
- pour les bébés, les afficher ou les cacher d'un coup : `babies.progress(1)` saute à la fin de l'animation, `babies.progress(0)` revient au début.

**Résultat attendu** : avec le réglage actif, Blob arrive sans tomber, ne saute ni ne danse, les bébés apparaissent d'un coup, et le message s'affiche. Pour tester sans changer ton système :

- **Firefox** : `about:config` > chercher `ui.prefersReducedMotion` > s'il n'existe pas, le créer en type **Nombre** > valeur `1`, puis recharger la page ; pour revenir à la normale, supprimer la préférence ;
- **Chrome, Edge** : outils de développement, menu ⋮ > More tools > Rendering, « Emulate CSS media feature prefers-reduced-motion » sur `reduce`, puis recharger la page.

<details>
<summary>💡 Un indice ?</summary>

`classList.toggle('hidden', !reduceMotion)` : avec un deuxième argument, `toggle` ajoute la classe si l'argument est vrai, et la retire sinon.

</details>

## Étape 11 (bonus) : Blob se déplace à la souris (Draggable)

GSAP propose des plugins, gratuits, qu'il faut charger (c'est fait dans `index.html`) puis enregistrer avec `gsap.registerPlugin`. `Draggable` rend un élément déplaçable à la souris ou au doigt.

On déplace le conteneur `.blob-wrapper`, et non Blob lui-même : comme en 04, les animations de Blob utilisent déjà `transform`, et le déplacement les écraserait.

**À faire** : enregistrer `Draggable`, puis rendre `.blob-wrapper` déplaçable, sans pouvoir sortir de la scène (`bounds: '.stage'`).

**Résultat attendu** : on attrape Blob et on le promène dans la scène ; il peut même danser pendant qu'on le déplace.

<details>
<summary>🔑 La réponse</summary>

```js
gsap.registerPlugin(Draggable);
Draggable.create('.blob-wrapper', { bounds: '.stage' });
```

</details>

---

## Pour aller plus loin

- Ajouter un bouton « Coucou » : Blob se penche et fait un clin d'œil (une timeline sur un œil : `scaleY: 0.1`, puis retour).
- Faire danser les bébés en même temps que Blob, avec un petit décalage (`stagger` dans la timeline de danse).
- Explorer d'autres plugins gratuits de GSAP, comme [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), qui déclenche les animations au défilement de la page.

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
