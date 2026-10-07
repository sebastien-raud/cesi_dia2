[← Exercices JavaScript](../README.md)

# La confiserie : créer des éléments en JavaScript

La vitrine de la confiserie est vide : aucun bonbon dans le HTML. Toutes les cartes vont être fabriquées en JavaScript, à partir d'un tableau de données. Puis on remplira un sac, on filtrera la vitrine… et des bonbons tomberont du ciel.

Ce que tu vas apprendre :

- créer des éléments (`createElement`), les remplir et les ajouter à la page (`append`) ;
- générer une liste d'éléments à partir d'un tableau ;
- utiliser un `<template>` HTML pour fabriquer des cartes ;
- faire apparaître des éléments en cascade avec une variable CSS ;
- écouter les clics de toute une liste avec un seul écouteur (délégation) ;
- retirer des éléments (`remove`) et filtrer un tableau (`filter`).

**Prérequis** : [02 : introduction au DOM](../02-introduction-dom/README.md), [03 : introduction aux événements](../03-introduction-evenements/README.md) ; les tableaux et les objets.

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Le début de `js/script.js` contient les **données fournies** : un tableau de noms (`candyNames`), un tableau d'objets (`candies`, un objet par bonbon : `name`, `emoji`, `price`, `sour`, `color`) et une fonction `formatPrice(0.8)` qui renvoie « 0,80 € ».

Fichiers :

- [`index.html`](index.html) : la page, avec le modèle d'une carte (`<template>`)
- [`css/style.css`](css/style.css) : la confiserie et ses animations, fourni
- [`js/script.js`](js/script.js) : les données, puis le code à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : créer un bonbon « à la main » et l'ajouter à l'échauffement

Créer un élément se fait en trois temps :

```js
const element = document.createElement('p');  // 1. créer (en mémoire, invisible)
element.textContent = 'Bonjour';              // 2. remplir
parent.append(element);                       // 3. ajouter à la page : il apparaît
```

**À faire** : créer un paragraphe qui contient « 🍬 Mon premier bonbon », et l'ajouter dans `#warmup`.

**Résultat attendu** : le texte apparaît dans le cadre « Échauffement ».

## Étape 2 : afficher tous les noms de candyNames dans une liste

**À faire** : créer une liste `<ul>` ; pour chaque nom du tableau `candyNames`, créer un `<li>` qui contient ce nom et l'ajouter à la liste ; enfin, ajouter la liste dans `#warmup`.

**Résultat attendu** : une liste à puces de six noms de bonbons, sous le premier bonbon.

<details>
<summary>💡 Un indice ?</summary>

`for (const name of candyNames) { … }` parcourt le tableau : à chaque tour, `name` contient un nom. On peut ajouter les `<li>` à la liste avant même que la liste soit dans la page.

</details>

## Étape 3 : une carte par bonbon du tableau candies (emoji, nom, prix)

Une carte est un `<button>` de classe `candy`, qui contient trois `<span>` : l'emoji (classe `emoji`), le nom (classe `name`) et le prix (classe `price`). C'est un bouton pour pouvoir le choisir à la souris comme au clavier.

**À faire** :

- écrire une fonction `createCard(candy)` qui fabrique et renvoie la carte d'un bonbon, avec le prix formaté par `formatPrice` ;
- écrire une fonction `render(list)` qui ajoute dans `#showcase` une carte pour chaque bonbon de la liste ;
- appeler `render(candies)`.

**Résultat attendu** : la vitrine se remplit de 11 cartes, avec leur emoji, leur nom et leur prix.

<details>
<summary>🆘 Besoin d'aide pour la carte ?</summary>

```js
function createCard(candy) {
    const card = document.createElement('button');
    card.classList.add('candy');

    const emoji = document.createElement('span');
    emoji.classList.add('emoji');
    emoji.textContent = candy.emoji;
    card.append(emoji);

    // … de même pour le nom et le prix

    return card;
}
```

</details>

## Étape 4 : créer les cartes à partir du template

Écrire chaque `span` à la main, c'est long. Un `<template>` contient du HTML qui n'est pas affiché : on le **clone** autant de fois que nécessaire, puis on remplit les trous. Celui de la carte est déjà dans `index.html` (`#candy-template`).

```js
const card = template.content.cloneNode(true).querySelector('.candy');
```

**À faire** :

- réécrire `createCard` avec le template : cloner la carte, puis remplir `.emoji`, `.name` et `.price` ;
- en profiter pour donner à chaque carte sa couleur : `card.style.setProperty('--color', candy.color)`.

**Résultat attendu** : même vitrine, mais en couleurs, et avec un code bien plus court.

<details>
<summary>💡 Un indice ?</summary>

`card.querySelector('.name')` cherche à l'intérieur de la carte seulement, pas dans toute la page.

</details>

<details>
<summary>🆘 Erreur « Cannot access 'template' before initialization » ?</summary>

`render(candies)` appelle `createCard`, qui utilise `template`. Si `const template = …` est écrit **après** l'appel à `render(candies)`, la constante n'existe pas encore au moment de l'appel. Il suffit de déplacer `render(candies);` plus bas, après la déclaration de `template`.

</details>

## Étape 5 : apparition en cascade (variable CSS --i)

Le CSS fourni fait apparaître chaque carte avec un délai qui dépend de la variable `--i` : `animation-delay: calc(var(--i) * 80ms)`. Si la première carte a `--i` à 0, la deuxième à 1, la troisième à 2…, elles arrivent l'une après l'autre. C'est l'effet que fait `stagger` avec GSAP.

**À faire** :

- dans `render`, utiliser `list.forEach((candy, index) => { … })`, qui donne aussi le rang de chaque bonbon ;
- passer ce rang à `createCard(candy, index)`, qui le donne à la carte : `card.style.setProperty('--i', index)`.

**Résultat attendu** : au chargement, les cartes apparaissent en cascade, de gauche à droite.

## Étape 6 : un clic sur une carte met le bonbon dans le sac

**À faire** :

- créer un tableau `bag` (vide au départ) ;
- écrire une fonction `addToBag(candy)` qui ajoute le bonbon au tableau, ajoute son emoji dans `#bag-items` (un `<span>`), puis met à jour `#bag-count` (le nombre de bonbons) et `#bag-total` (le prix total, avec `formatPrice`) ;
- dans `createCard`, au clic sur la carte, appeler `addToBag` ;
- pour l'animation : au clic, ajouter la classe `picked` à la carte et `bump` à l'icône du sac (`#bag-icon`), puis les retirer à la fin de l'animation (`animationend`), comme dans l'[exercice 05](../05-classes-et-animations-css/README.md).

**Résultat attendu** : chaque clic fait sauter l'emoji de la carte et sursauter le sac ; le compteur, le total et la rangée d'emojis se mettent à jour.

<details>
<summary>💡 Un indice pour le total ?</summary>

Une variable `total` qui vaut 0, puis une boucle sur `bag` qui ajoute le prix de chaque bonbon. Le plus simple est de ranger ce calcul dans une fonction `updateBag()`, qui resservira à l'étape 8.

</details>

## Étape 7 : un seul écouteur sur la vitrine (délégation)

À l'étape 6, chaque carte a son propre écouteur : avec 1000 cartes, il y en aurait 1000. Or un clic « remonte » de l'élément cliqué jusqu'à ses parents : un seul écouteur sur la vitrine suffit, à condition de retrouver la carte cliquée. `event.target` est l'élément cliqué (peut-être l'emoji ou le prix), et `event.target.closest('.candy')` remonte jusqu'à la carte.

**À faire** :

- retirer l'écouteur de `createCard`, et y ranger le nom du bonbon dans la carte : `card.dataset.name = candy.name` ;
- ajouter un seul écouteur `click` sur `#showcase` : retrouver la carte cliquée (si on a cliqué entre deux cartes, il n'y en a pas : ne rien faire), puis le bonbon correspondant dans `candies`, et appeler `addToBag` ;
- faire de même pour retirer la classe `picked` : un seul écouteur `animationend` sur la vitrine.

**Résultat attendu** : exactement le même comportement qu'à l'étape 6, avec un seul écouteur pour toute la vitrine.

<details>
<summary>💡 Un indice ?</summary>

`candies.find(candy => candy.name === card.dataset.name)` renvoie le premier bonbon dont le nom correspond.

</details>

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
showcase.addEventListener('click', (event) => {
    const card = event.target.closest('.candy');
    if (!card) {
        return; // clic entre les cartes
    }
    // … retrouver le bonbon, puis addToBag
});
```

</details>

## Étape 8 : le bouton « Vider le sac »

`element.remove()` retire un élément de la page.

**À faire** : au clic sur « Vider le sac », vider le tableau `bag`, retirer tous les emojis de `#bag-items` avec `remove()`, puis mettre à jour le compteur et le total.

**Résultat attendu** : le sac revient à « 0 bonbon(s), total 0,00 € », et la rangée d'emojis disparaît.

<details>
<summary>💡 Un indice ?</summary>

`bagItems.querySelectorAll('span')` renvoie tous les emojis du sac ; `forEach` permet d'appeler `remove()` sur chacun.

</details>

## Étape 9 : les filtres « Tout », « Moins de 1 € », « Acidulés », « Au chocolat »

`filter` crée un nouveau tableau qui ne garde que les éléments qui vérifient une condition :

```js
const cheapCandies = candies.filter(candy => candy.price < 1);
```

**À faire** :

- au début de `render`, vider la vitrine (`showcase.replaceChildren()`) ;
- au clic sur chaque filtre, appeler `render` avec la bonne liste : tous les bonbons, ceux à moins de 1 €, les acidulés (`sour`), ceux au chocolat (`candy.chocolate`) ;
- donner la classe `active` au filtre cliqué, et la retirer des autres.

**Résultat attendu** : la vitrine se redessine (en cascade !) selon le filtre choisi : 6 bonbons à moins de 1 €, 5 acidulés… et aucun au chocolat.

<details>
<summary>💡 Un indice ?</summary>

Aucun bonbon n'a de propriété `chocolate` : `candy.chocolate` vaut `undefined`, considéré comme faux, donc le tableau obtenu est vide. C'est voulu : l'étape suivante s'en occupe.

</details>

## Étape 10 : un message quand la vitrine est vide

**À faire** : dans `render`, afficher `#empty-message` si la liste est vide, et le cacher sinon (classe `hidden`).

**Résultat attendu** : le filtre « Au chocolat » affiche « Plus de chocolat, tout a été mangé ! 🍫 » ; un autre filtre fait disparaître le message.

<details>
<summary>💡 Un indice ?</summary>

`emptyMessage.classList.toggle('hidden', list.length > 0)` : avec un deuxième argument, `toggle` ajoute la classe si l'argument est vrai, et la retire sinon.

</details>

## Étape 11 (bonus) : un bonbon tombe du ciel toutes les 5 secondes

**À faire** :

- toutes les 5 secondes (`setInterval`), créer un bouton de classe `falling` qui contient l'emoji d'un bonbon tiré au hasard, avec une position horizontale au hasard (`style.left` en `%`) et un `aria-label` (« Attraper : Sucette ») ;
- l'ajouter dans `#sky` : le CSS fourni le fait tomber en tournant ;
- au clic, le bonbon va dans le sac (`addToBag`) et disparaît ; s'il arrive en bas sans être attrapé (`animationend`), il disparaît aussi ;
- ne pas lancer la pluie de bonbons si le système demande de réduire les animations.

**Résultat attendu** : un bonbon traverse l'écran toutes les 5 secondes ; on peut l'attraper au vol.

<details>
<summary>💡 Un indice ?</summary>

- Un bonbon au hasard : `candies[Math.floor(Math.random() * candies.length)]`.
- Le réglage « réduire les animations » : `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

</details>

---

## Pour aller plus loin

- Un bouton « Retirer » dans le sac, pour enlever un seul bonbon.
- Trier la vitrine par prix, croissant ou décroissant (indice : `sort`).
- Ajouter un champ de recherche qui filtre les bonbons par nom pendant la saisie (événement `input`, `includes`).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
