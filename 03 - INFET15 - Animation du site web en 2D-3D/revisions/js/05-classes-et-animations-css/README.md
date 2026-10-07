[← Exercices JavaScript](../README.md)

# Blob, le petit monstre : classes et animations CSS

Blob est un petit monstre dessiné en pur CSS. Toutes ses animations sont déjà prêtes dans `css/style.css` : il sait changer de couleur, sourire, sauter, danser, dormir… mais rien ne se passe tant que JavaScript ne lui dit pas quoi faire. À toi de lui donner vie !

Ce que tu vas apprendre :

- déclencher une transition ou une animation CSS en ajoutant ou retirant une classe ;
- rejouer une animation grâce à l'événement `animationend` ;
- réagir au clavier et à la souris ;
- modifier une variable CSS depuis JavaScript ;
- ranger ton code dans des fonctions réutilisables.

**Prérequis** : [02 : introduction au DOM](../02-introduction-dom/README.md) et [03 : introduction aux événements](../03-introduction-evenements/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur : Blob attend sagement.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Le fichier `css/style.css` est fourni, il n'y a rien à y modifier. Son en-tête liste les classes disponibles : `blue`, `happy`, `jump`, `dance`, `sleep`, `startled`.

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : Blob et ses animations, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner les éléments

Pour agir sur un élément de la page, il faut d'abord le récupérer en JavaScript et le garder dans une constante.

**À faire** : sélectionner Blob (`#blob`), les six boutons (`#color-button`, `#jump-button`, `#dance-button`, `#sleep-button`, `#surprise-button`, `#shy-button`) et le curseur de vitesse (`#speed`). Afficher Blob dans la console.

**Résultat attendu** : la console affiche l'élément `div#blob.blob`. En le survolant dans la console, Blob est mis en surbrillance dans la page.

<details>
<summary>💡 Un indice ?</summary>

`document.querySelector('#blob')` renvoie l'élément d'identifiant `blob`.

</details>

## Étape 2 : changer de couleur

`classList.toggle('blue')` ajoute la classe `blue` si elle est absente, et la retire si elle est présente. Le CSS de Blob contient `transition: background-color .6s` : quand sa couleur change, c'est le navigateur qui anime le passage d'une couleur à l'autre. Tu n'as rien à animer toi-même.

**À faire** : au clic sur le bouton « Couleur », basculer la classe `blue` sur Blob.

**Résultat attendu** : Blob passe en douceur du vert au bleu, puis du bleu au vert au clic suivant.

<details>
<summary>💡 Un indice ?</summary>

```js
colorButton.addEventListener('click', () => {
    // ici : basculer la classe
});
```

</details>

## Étape 3 : sourire au survol

Les événements `mouseenter` et `mouseleave` se déclenchent quand la souris entre sur un élément, puis quand elle en sort.

**À faire** : ajouter la classe `happy` quand la souris entre sur Blob, la retirer quand elle en sort.

**Résultat attendu** : Blob sourit tant que la souris est sur lui.

<details>
<summary>💡 Un indice ?</summary>

Deux écouteurs sur `blob` : l'un avec `classList.add`, l'autre avec `classList.remove`.

</details>

## Étape 4 : sauter

Une animation `@keyframes` se joue au moment où la classe qui la porte est ajoutée à l'élément. Dans le CSS, la classe `jump` lance l'animation du saut.

**À faire** : au clic sur « Saute », **ajouter** la classe `jump` (avec `add`, pas `toggle`).

**Résultat attendu** : Blob saute… une seule fois. Au deuxième clic, il ne se passe rien.

**Pourquoi ?** Après le premier saut, la classe `jump` est toujours sur Blob : ajouter une classe déjà présente ne change rien, et le navigateur ne rejoue pas l'animation. Pour le voir, inspecte Blob (clic droit, Inspecter) : la classe `jump` est restée. L'étape suivante corrige ce problème.

## Étape 5 : rejouer le saut

L'événement `animationend` se déclenche sur un élément quand une de ses animations CSS se termine. C'est le bon moment pour retirer la classe, afin de pouvoir l'ajouter à nouveau plus tard.

**À faire** : écouter `animationend` sur Blob et retirer la classe `jump`.

**Résultat attendu** : Blob saute à chaque clic.

À savoir : une animation infinie (comme la danse, à l'étape 7) ne se termine jamais, et ne déclenche donc jamais `animationend`.

<details>
<summary>💡 Un indice ?</summary>

`animationend` s'écoute comme `click` : `blob.addEventListener('animationend', …)`.

</details>

<details>
<summary>🔑 La réponse</summary>

```js
blob.addEventListener('animationend', () => {
    blob.classList.remove('jump');
});
```

</details>

## Étape 6 : sauter avec la touche Espace

Blob doit maintenant sauter de deux façons : au clic et au clavier. Plutôt que d'écrire deux fois le même code, on le range dans une fonction, appelée aux deux endroits.

L'événement `keydown` se déclenche à chaque touche enfoncée. On l'écoute sur `document`, pour qu'il fonctionne où que soit le focus. `event.code` indique la touche : `'Space'` pour la barre d'espace.

**À faire** :

- créer une fonction `jump()` qui ajoute la classe `jump` ;
- l'utiliser pour le bouton « Saute » ;
- l'appeler quand la touche Espace est enfoncée, en appelant aussi `event.preventDefault()`.

**Résultat attendu** : Blob saute au clic comme à la touche Espace.

`event.preventDefault()` annule le comportement normal de la touche : sans lui, la page défile vers le bas, et si un bouton a le focus, il est cliqué en même temps.

<details>
<summary>💡 Un indice ?</summary>

Une fonction peut être passée directement à `addEventListener`, sans parenthèses : `jumpButton.addEventListener('click', jump);`

</details>

<details>
<summary>🆘 Besoin d'aide pour le clavier ?</summary>

```js
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        // annuler le comportement normal, puis faire sauter Blob
    }
});
```

</details>

## Étape 7 : danser

La classe `dance` lance une animation **infinie** : Blob danse jusqu'à ce qu'on retire la classe.

**À faire** :

- au clic sur « Danse », basculer la classe `dance` ;
- changer le texte du bouton : « Stop » quand Blob danse, « Danse » sinon.

**Résultat attendu** : Blob se dandine sans fin, le bouton affiche « Stop » ; un clic sur « Stop » l'arrête. Essaie aussi de le faire sauter pendant qu'il danse : le saut interrompt la danse, qui reprend ensuite.

<details>
<summary>💡 Un indice ?</summary>

`blob.classList.contains('dance')` vaut `true` si la classe est présente. Le texte d'un bouton se change avec `textContent`.

</details>

## Étape 8 : dormir

**À faire** :

- au clic sur « Dors », basculer la classe `sleep` ;
- changer le texte du bouton : « Réveille » quand Blob dort, « Dors » sinon ;
- quand Blob s'endort, il arrête de danser : retirer la classe `dance` et remettre le texte « Danse » ;
- tant que Blob dort, il refuse de sauter et de danser.

**Résultat attendu** : Blob ferme les yeux, des « Zzz » flottent au-dessus de lui. Les boutons « Saute » et « Danse » (et la touche Espace) n'ont plus d'effet tant qu'il dort.

<details>
<summary>💡 Un indice ?</summary>

Pour refuser une action, on sort de la fonction dès le début avec `return`, si Blob dort.

</details>

<details>
<summary>🆘 Besoin d'aide ?</summary>

Au début de `jump()`, et de la même façon dans la fonction de la danse :

```js
if (blob.classList.contains('sleep')) {
    return; // Blob dort : on ne fait rien
}
```

Pour la danse, le plus simple est de ranger son code dans une fonction `toggleDance()`, comme pour `jump()`.

</details>

## Étape 9 : le réveil en sursaut

La classe `startled` fait trembler Blob une fois (une animation qui se termine, comme le saut).

**À faire** : au clic sur Blob, s'il dort, retirer `sleep`, ajouter `startled` et remettre le texte « Dors » sur le bouton. Retirer aussi `startled` à la fin de l'animation, pour que le sursaut puisse se rejouer.

**Résultat attendu** : un clic sur Blob endormi le fait trembler, puis il se réveille, les yeux ouverts. On peut le rendormir et recommencer.

<details>
<summary>💡 Un indice ?</summary>

Inutile d'écrire un nouvel écouteur `animationend` : celui de l'étape 5 peut retirer les deux classes, `classList.remove` accepte plusieurs noms : `blob.classList.remove('jump', 'startled')`.

</details>

## Étape 10 : régler la vitesse

Dans le CSS, la durée des animations dépend d'une variable : `--speed`, définie sur `:root` (l'élément `<html>`). Changer cette variable change la vitesse de **toutes** les animations d'un coup, sans toucher aux classes.

En JavaScript, on modifie une variable CSS avec `setProperty` : `document.documentElement.style.setProperty('--speed', '2s')`.

**À faire** :

- écouter l'événement `input` sur le curseur (il se déclenche en continu pendant qu'on le fait glisser) ;
- donner à `--speed` la valeur du curseur, suivie de l'unité `s` ;
- afficher la valeur dans `#speed-value` (par exemple « 2.5 s »).

**Résultat attendu** : vers la droite, Blob danse et saute au ralenti ; vers la gauche, à toute allure.

<details>
<summary>💡 Un indice ?</summary>

La valeur du curseur se lit avec `speedInput.value`. Pour coller l'unité : `` `${speedInput.value}s` ``.

</details>

<details>
<summary>🔑 La réponse</summary>

```js
speedInput.addEventListener('input', () => {
    document.documentElement.style.setProperty('--speed', `${speedInput.value}s`);
    speedValue.textContent = `${speedInput.value} s`;
});
```

</details>

## Étape 11 : la surprise

Un tableau peut contenir n'importe quoi, même des fonctions. On peut donc tirer une fonction au hasard, puis l'appeler.

**À faire** :

- si ce n'est pas déjà fait, ranger chaque action dans une fonction : `toggleColor()`, `jump()`, `toggleDance()`, `toggleSleep()` ;
- créer un tableau `actions` qui contient ces quatre fonctions (sans parenthèses : on range la fonction, on ne l'appelle pas) ;
- au clic sur « Surprise », tirer une case au hasard et appeler la fonction qu'elle contient.

**Résultat attendu** : chaque clic sur « Surprise » déclenche une action imprévisible.

<details>
<summary>💡 Un indice ?</summary>

`Math.random()` renvoie un nombre entre 0 (inclus) et 1 (exclu). `Math.floor(Math.random() * actions.length)` donne donc un indice valide du tableau.

</details>

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
const actions = [toggleColor, jump, toggleDance, toggleSleep];
const index = Math.floor(Math.random() * actions.length);
actions[index](); // les parenthèses appellent la fonction tirée
```

</details>

## Étape 12 (bonus) : Blob est timide

Quand le mode « Timide » est activé, Blob s'enfuit dès que la souris s'approche de lui.

**À faire** :

- sélectionner la scène (`.stage`) et le conteneur de Blob (`.blob-wrapper`) ;
- créer une variable `isShy` (`false` au départ) ; au clic sur « Timide : non », l'inverser et changer le texte du bouton (« Timide : oui » / « Timide : non ») ;
- écouter `mousemove` sur la scène (`.stage`) ; si Blob est timide et que la souris est à moins de 120 pixels de son centre, le déplacer au hasard dans la scène ;
- quand le mode est désactivé, remettre Blob au centre.

**Pourquoi déplacer `.blob-wrapper` et pas Blob lui-même ?** Les animations de Blob (saut, danse) utilisent déjà la propriété `transform`. Si on déplaçait Blob avec `transform`, ses animations écraseraient le déplacement. On déplace donc son conteneur : `blobWrapper.style.transform = 'translate(100px, -50px)'`.

**Résultat attendu** : impossible d'attraper Blob, il file à chaque approche (comme le bouton qui s'échappe de l'exercice 03).

<details>
<summary>💡 Un indice ?</summary>

`blob.getBoundingClientRect()` donne la position de Blob à l'écran (`left`, `top`, `width`, `height`), et `event.clientX`, `event.clientY` celle de la souris. La distance entre deux points se calcule avec Pythagore : `Math.sqrt(dx * dx + dy * dy)`.

</details>

<details>
<summary>🔑 La réponse</summary>

```js
let isShy = false;

shyButton.addEventListener('click', () => {
    isShy = !isShy;
    shyButton.textContent = isShy ? 'Timide : oui' : 'Timide : non';
    if (!isShy) {
        blobWrapper.style.transform = ''; // retour au centre
    }
});

stage.addEventListener('mousemove', (event) => {
    if (!isShy) {
        return;
    }
    const rect = blob.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
        const maxX = (stage.clientWidth - rect.width) / 2;
        const maxY = stage.clientHeight - rect.height - 40;
        const x = Math.floor(Math.random() * maxX * 2) - maxX;
        const y = -Math.floor(Math.random() * maxY);
        blobWrapper.style.transform = `translate(${x}px, ${y}px)`;
    }
});
```

</details>

## Pour finir : les animations réduites

Certaines personnes règlent leur système pour **réduire les animations** (mal des transports, troubles de l'attention…). Le CSS fourni en tient déjà compte avec `@media (prefers-reduced-motion: reduce)` : Blob reste alors immobile.

En JavaScript, on peut aussi tester ce réglage : `window.matchMedia('(prefers-reduced-motion: reduce)').matches` vaut `true` s'il est actif.

**À faire** : si le réglage est actif, afficher le message `#reduced-motion-message` (en retirant sa classe `hidden`).

**Résultat attendu** : avec le réglage actif, le message apparaît, et Blob ne bouge plus. Pour tester sans changer ton système :

- **Firefox** : `about:config` > chercher `ui.prefersReducedMotion` > s'il n'existe pas, le créer en type **Nombre** > valeur `1`, puis recharger la page ; pour revenir à la normale, supprimer la préférence ;
- **Chrome, Edge** : outils de développement, menu ⋮ > More tools > Rendering, « Emulate CSS media feature prefers-reduced-motion » sur `reduce`, puis recharger la page.

C'est une bonne habitude à garder pour toutes tes animations, en CSS comme avec une bibliothèque (GSAP, par exemple).

---

## Pour aller plus loin

- Ajouter une humeur à Blob : écrire une classe `.angry` dans le CSS (Blob rouge, bouche à l'envers), et un bouton pour la basculer.
- Faire cligner Blob des yeux toutes les 3 secondes (indice : `setInterval`, et une classe qui ferme les yeux un court instant).
- Faire suivre la souris par les pupilles de Blob.

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
