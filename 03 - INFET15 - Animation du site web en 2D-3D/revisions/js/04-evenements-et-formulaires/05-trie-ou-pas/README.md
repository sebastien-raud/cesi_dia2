[← Événements et formulaires](../README.md)

# Trié ou pas ?

Dans l'exercice 10 des révisions, on vérifiait si un tableau de nombres était trié, et ce tableau était écrit en dur dans le code. Cette fois, c'est l'internaute qui ajoute les nombres un par un avec un formulaire, et la page lui dit à chaque fois si sa liste est triée.

Ce que tu vas apprendre :

- écouter l'envoi d'un formulaire (`submit`) ;
- empêcher le rechargement de la page (`event.preventDefault()`) ;
- ajouter un élément à un tableau (`push`), et afficher un tableau (`join`) ;
- écrire une fonction qui retourne `true` ou `false`.

**Prérequis** : [04 : le poème dans le désordre](../04-poeme/README.md), et l'exercice 10 des [révisions](../../01-revisions/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Les éléments à connaître :

| Élément | Sélecteur |
| --- | --- |
| le formulaire | `form` |
| le champ | `#number` |
| la zone où la liste s'affiche | `#numbers` |
| la zone du statut (trié ou pas) | `#status` |
| le bouton « Trier » (bonus) | `#sort` |

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner les éléments et créer le tableau

**À faire** : sélectionner le formulaire (`formElement`), le champ (`numberInput`), la zone de la liste (`numbersElement`) et celle du statut (`statusElement`). Créer aussi un tableau vide `numbers`, qui contiendra les nombres saisis.

**Résultat attendu** : aucune erreur dans la console.

## Étape 2 : intercepter l'envoi du formulaire

Tape un nombre et clique sur « Ajouter » : la page se recharge, et le nombre disparaît. C'est le comportement normal d'un formulaire : il **envoie** les données (en principe à un serveur), ce qui recharge la page. Cet envoi déclenche l'événement `submit` sur le `<form>`, que ce soit par le bouton ou par la touche `Entrée` dans le champ.

`event.preventDefault()` annule ce comportement par défaut : la page ne se recharge plus, et c'est notre code qui décide de la suite.

**À faire** : écouter l'événement `submit` du formulaire ; dans la fonction, annuler l'envoi, puis afficher la valeur du champ dans la console.

**Résultat attendu** : « Ajouter » ou `Entrée` affiche le nombre dans la console, sans recharger la page.

<details>
<summary>💡 Un indice ?</summary>

```js
formElement.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(numberInput.value);
});
```

</details>

<details>
<summary>🆘 Pourquoi écouter submit plutôt que click sur le bouton ?</summary>

`click` sur le bouton rate la touche `Entrée`. `submit` couvre les deux, et c'est bien l'envoi du formulaire que l'on veut intercepter. Dans les deux cas, il faudrait de toute façon `preventDefault()` pour éviter le rechargement.

</details>

## Étape 3 : ajouter le nombre à la liste

**À faire** : à la place du `console.log` de l'étape 2 :

- si le champ est vide, s'arrêter là (`return`) ;
- ajouter le nombre (converti avec `Number()`) à la fin du tableau `numbers` (`push`) ;
- afficher le tableau dans la zone de la liste, les nombres séparés par une virgule (`numbers.join(', ')`) ;
- vider le champ, et y replacer le curseur (`numberInput.focus()`) pour enchaîner les saisies.

**Résultat attendu** : en tapant `1`, `Entrée`, `5`, `Entrée`, `3`, `Entrée`, la liste affiche `1, 5, 3`, et le champ est prêt pour le nombre suivant.

<details>
<summary>💡 Un indice ?</summary>

`join` assemble les éléments d'un tableau en une seule chaîne, avec le séparateur indiqué : `[1, 5, 3].join(', ')` vaut `'1, 5, 3'`.

</details>

## Étape 4 : dire si la liste est triée

**À faire** :

- écrire une fonction `isSorted(array)` qui retourne `true` si le tableau reçu est trié par ordre croissant, `false` sinon (l'algorithme de l'exercice 10 des révisions) ;
- écrire une fonction `render()` qui affiche la liste (le code de l'étape 3) **et** le statut : « ✅ La liste est triée » ou « ❌ La liste n'est pas triée » ;
- dans l'écouteur, remplacer l'affichage de la liste par un appel à `render()`.

**Résultat attendu** : `1, 5` est triée ; en ajoutant `3`, elle ne l'est plus ; `2, 2, 7` est triée (deux nombres égaux ne cassent pas l'ordre).

<details>
<summary>💡 Un indice ?</summary>

Dans une fonction, `return` s'arrête tout de suite : dès que deux nombres voisins sont dans le mauvais ordre, on peut `return false;`. Si la boucle va jusqu'au bout sans rien trouver, c'est que le tableau est trié : `return true;` après la boucle.

</details>

<details>
<summary>🔑 La réponse (isSorted)</summary>

```js
function isSorted(array) {
    for (let index = 0; index < array.length - 1; index++) {
        if (array[index + 1] < array[index]) {
            return false;
        }
    }

    return true;
}
```

</details>

## Étape 5 (bonus) : trier la liste

Étape facultative. Le bouton « Trier » est placé **en dehors** du formulaire : un bouton dans un `<form>` l'envoie par défaut, il déclencherait donc `submit`.

**À faire** : au clic sur « Trier », trier le tableau `numbers` par ordre croissant, avec le tri à bulles de l'exercice 11 des révisions, puis appeler `render()`.

**Résultat attendu** : `1, 5, 3, 2` devient `1, 2, 3, 5`, et le statut passe à « ✅ La liste est triée ».

<details>
<summary>💡 Un indice ?</summary>

Reprends le `while (!trie)` de la correction de l'exercice 11, en remplaçant `nombres` par `numbers`. Grâce à `render()`, l'affichage se met à jour en une ligne.

</details>

---

## Pour aller plus loin

- Ajouter un bouton « Vider » qui remet la liste à zéro (indice : `numbers.length = 0` vide un tableau déclaré avec `const`).
- Remplacer le tri à bulles par la méthode toute prête : `numbers.sort((a, b) => a - b)`. Que se passe-t-il avec `numbers.sort()` tout court, et `10`, `9`, `1` ?
- La suite : [06 : le quiz](../06-quiz/README.md).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
