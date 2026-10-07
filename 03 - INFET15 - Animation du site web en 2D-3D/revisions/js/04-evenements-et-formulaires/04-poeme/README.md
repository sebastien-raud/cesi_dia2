[← Événements et formulaires](../README.md)

# Le poème dans le désordre

Dans l'exercice 06 des révisions, les vers d'un poème (enfin, le début d'une chanson) étaient mélangés dans un tableau, et il fallait les remettre dans l'ordre dans le code. Cette fois, les vers sont des boutons dans la page : on clique dessus dans l'ordre, et le poème se reconstitue en dessous… à condition de choisir le bon vers à chaque fois.

Ce que tu vas apprendre :

- poser le même écouteur sur plusieurs éléments, avec une boucle ;
- retrouver l'élément cliqué avec `event.currentTarget` ;
- ajouter du texte à la suite d'un texte existant (`+=`) ;
- désactiver un bouton (`disabled`) ;
- lire un attribut `data-…` avec `dataset`.

**Prérequis** : [03 : Initials B.B.](../03-initiales/README.md), et l'exercice 06 des [révisions](../../01-revisions/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Les éléments à connaître :

| Élément | Sélecteur |
| --- | --- |
| les 8 vers (des boutons) | `.verse` |
| la zone où le poème se reconstitue | `#poem` |
| la zone des messages | `#message` |
| le bouton « Recommencer » (bonus) | `#restart` |

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner les vers et les zones de texte

`document.querySelectorAll('.verse')` sélectionne **tous** les éléments qui ont la classe `verse`, dans une liste que l'on peut parcourir avec une boucle `for…of`, comme un tableau.

**À faire** : sélectionner les vers dans une constante `verseElements`, le poème dans `poemElement`, la zone des messages dans `messageElement`. Afficher le nombre de vers dans la console (`length`).

**Résultat attendu** : la console affiche `8`.

## Étape 2 : réagir au clic sur chaque vers

Les 8 vers doivent réagir au clic de la même façon : on écrit **une** fonction, et on la donne aux 8 boutons. Pour savoir lequel a été cliqué, on utilise `event.currentTarget`, vu dans [03 : introduction aux événements](../../03-introduction-evenements/README.md).

**À faire** :

- écrire une fonction `handleVerseClick(event)` qui affiche dans la console le texte du vers cliqué (`textContent`) ;
- parcourir `verseElements` avec une boucle, et donner cette fonction à l'écouteur `click` de chaque vers.

**Résultat attendu** : un clic sur un vers affiche son texte dans la console.

<details>
<summary>💡 Un indice ?</summary>

```js
for (const verseElement of verseElements) {
    verseElement.addEventListener('click', handleVerseClick);
}
```

</details>

## Étape 3 : ajouter le vers cliqué au poème

`+=` ajoute à la suite : `poemElement.textContent += 'texte'` garde le texte déjà présent, et ajoute le nouveau à la fin. `'\n'` est un retour à la ligne : le CSS du poème est prévu pour l'afficher.

**À faire** : dans `handleVerseClick`, à la place du `console.log` :

- ajouter le texte du vers cliqué à la fin du poème, suivi d'un retour à la ligne ;
- désactiver le vers cliqué (`disabled = true`), pour qu'il ne puisse plus être choisi.

**Résultat attendu** : chaque vers cliqué s'ajoute au poème, et devient gris dans la liste. Pour l'instant, n'importe quel ordre est accepté.

<details>
<summary>🔑 La réponse</summary>

```js
function handleVerseClick(event) {
    const verseElement = event.currentTarget;
    poemElement.textContent += verseElement.textContent + '\n';
    verseElement.disabled = true;
}
```

</details>

## Étape 4 : n'accepter que le bon vers

Pour que la page sache quel est le bon ordre, chaque vers porte dans le HTML un attribut `data-order` : sa position dans le vrai poème, de `1` à `8`. En JavaScript, un attribut `data-quelquechose` se lit avec `element.dataset.quelquechose` : ici, `verseElement.dataset.order`, une chaîne (`'3'`).

Évidemment, tu peux tricher en lisant le HTML… mais c'est plus drôle de chercher. Indice : la chanson est de Renaud.

**À faire** :

- créer, en dehors de la fonction, une variable `placedCount` qui compte les vers déjà placés (`0` au départ) ;
- dans `handleVerseClick`, si la position du vers cliqué n'est pas la suivante attendue (`placedCount + 1`), afficher « ❌ Raté, ce n'est pas le vers suivant ! » et s'arrêter là (`return`) ;
- sinon, augmenter `placedCount`, ajouter le vers au poème comme à l'étape 3, et vider le message ;
- quand les 8 vers sont placés, afficher « 🎉 Bravo, le poème est reconstitué ! ».

**Résultat attendu** : un mauvais vers affiche le message d'erreur et ne s'ajoute pas ; le premier vers est « J'ai garé ma mobylette devant l'entrée des artistes » ; une fois le dernier placé, le message de victoire s'affiche.

<details>
<summary>🆘 Le premier vers est refusé lui aussi ?</summary>

`dataset.order` est une chaîne : `'1' !== 1` est vrai. Convertis-la avec `Number()`, comme les valeurs des champs dans les exercices précédents.

</details>

<details>
<summary>🆘 Pourquoi placedCount est-elle en dehors de la fonction ?</summary>

Une variable déclarée **dans** la fonction est recréée, à `0`, à chaque clic : elle oublierait les vers déjà placés. Déclarée en dehors, elle garde sa valeur d'un clic à l'autre. Et c'est un `let`, pas un `const`, puisqu'elle change.

</details>

## Étape 5 (bonus) : recommencer

Étape facultative.

**À faire** : au clic sur le bouton « Recommencer », remettre le compteur à `0`, vider le poème et le message, et réactiver tous les vers (`disabled = false`).

**Résultat attendu** : on peut refaire le poème depuis le début, sans recharger la page.

---

## Pour aller plus loin

- Compter les erreurs, et les afficher dans le message de victoire : « Bravo, en 3 erreurs ! ».
- Un bouton « Annuler le dernier vers » : il faut alors retenir les vers placés, par exemple dans un tableau (`push`, `pop`), comme `poemeOk` dans les révisions.
- La suite : [05 : trié ou pas ?](../05-trie-ou-pas/README.md).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
