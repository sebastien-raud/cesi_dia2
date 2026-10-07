[← Exercices JavaScript](../README.md)

# Introduction aux événements : le bouton qui s'échappe

Un simple bouton « Cliquez-moi !!! ». En JavaScript, tu vas le faire réagir au clic, puis au survol de la souris… jusqu'à le rendre impossible à attraper.

Un **événement**, c'est quelque chose qui se passe dans la page : un clic, un survol, une touche du clavier… On peut demander à JavaScript d'exécuter une fonction chaque fois qu'un événement se produit sur un élément : c'est un **écouteur** (`addEventListener`).

Ce que tu vas apprendre :

- écouter un événement avec `addEventListener` (`click`, `mouseover`) ;
- ajouter, retirer ou basculer une classe (`classList.add`, `classList.toggle`) ;
- modifier le texte d'un élément (`textContent`) ;
- utiliser l'objet `event` reçu par la fonction, et `event.currentTarget`.

**Prérequis** : [02 : introduction au DOM](../02-introduction-dom/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Le CSS prévoit déjà la classe `move` : quand le bouton l'a, il passe à droite de son cadre.

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner le bouton

**À faire** : sélectionner le bouton dans une constante `buttonElement`, et l'afficher dans la console.

**Résultat attendu** : la console affiche le bouton ; en le survolant dans la console, il est mis en surbrillance dans la page.

<details>
<summary>💡 Un indice ?</summary>

Il n'y a qu'un bouton : `document.querySelector('button')` suffit.

</details>

## Étape 2 : afficher un message au clic sur le bouton (alert)

`element.addEventListener('click', fonction)` demande d'appeler la fonction à chaque clic sur l'élément. `alert('texte')` affiche une fenêtre de message.

**À faire** : au clic sur le bouton, afficher « Chouette, j'adore être cliqué ! ».

**Résultat attendu** : chaque clic sur le bouton ouvre la fenêtre de message.

<details>
<summary>💡 Un indice ?</summary>

```js
buttonElement.addEventListener('click', function () {
    // ce code s'exécute à chaque clic
});
```

</details>

## Étape 3 : ajouter la classe « move » au survol du bouton

L'événement `mouseover` se déclenche quand la souris passe sur l'élément.

**À faire** : au survol du bouton, lui ajouter la classe `move` (`classList.add`).

**Résultat attendu** : au premier survol, le bouton saute à droite… puis il y reste : on peut l'attraper au deuxième essai.

## Étape 4 : changer le texte du bouton

**À faire** : remplacer le texte du bouton par « Attrape-moi si tu peux... » (`textContent`).

**Résultat attendu** : dès le chargement, le bouton affiche son défi.

Ce code n'est pas dans un écouteur : il s'exécute une seule fois, au chargement de la page.

## Étape 5 : basculer la classe « move » à chaque survol (toggle)

On peut attraper le bouton, pas du premier coup, mais quand même… `classList.toggle('move')` ajoute la classe si elle est absente, et la retire si elle est présente.

**À faire** : mettre en commentaire le code de l'étape 3, et le remplacer par un écouteur `mouseover` qui **bascule** la classe `move`.

**Résultat attendu** : à chaque survol, le bouton change de côté : impossible de l'attraper !

<details>
<summary>🆘 Le bouton ne bouge plus du tout ?</summary>

Vérifie que le code de l'étape 3 est bien en commentaire. Sinon, à chaque survol, l'étape 3 ajoute la classe et l'étape 5 l'enlève aussitôt : les deux s'annulent.

</details>

## Étape 6 : utiliser event.currentTarget dans la fonction

Dans la fonction, on écrit `buttonElement` pour désigner le bouton. Mais la fonction reçoit aussi, en paramètre, un objet qui décrit l'événement : `function (event) { … }`. Sa propriété `event.currentTarget` est l'élément sur lequel l'écouteur a été posé. Avantage : la même fonction pourrait servir pour plusieurs boutons.

**À faire** :

- mettre en commentaire le code de l'étape 5 ;
- écrire un nouvel écouteur `mouseover`, dont la fonction reçoit un paramètre `event` ;
- afficher `event.currentTarget` dans la console, et regarder ce qui s'affiche ;
- basculer la classe `move` sur `event.currentTarget`, sans plus écrire `buttonElement` dans la fonction.

**Résultat attendu** : le même bouton insaisissable qu'à l'étape 5, et la console affiche le bouton à chaque survol.

<details>
<summary>🔑 La réponse</summary>

```js
buttonElement.addEventListener('mouseover', function (event) {
    console.log(event.currentTarget);
    event.currentTarget.classList.toggle('move');
});
```

</details>

---

## Pour aller plus loin

- Compter les tentatives : afficher dans la console « Raté ! (3 tentatives) » à chaque survol.
- Ajouter un deuxième bouton, et lui donner la **même** fonction : c'est là que `event.currentTarget` montre son intérêt.
- La suite logique : [04 : événements et formulaires](../04-evenements-et-formulaires/README.md), six petits exercices pour s'entraîner aux événements, avant [05 : Blob, le petit monstre](../05-classes-et-animations-css/README.md).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
