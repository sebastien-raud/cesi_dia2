[← Événements et formulaires](../README.md)

# That is the question… : le quiz

Dans les exercices 08 et 09 des révisions, le quiz posait ses questions avec `prompt`, dans une boucle, et affichait le score dans la console. Cette fois, le quiz est dans la page : une question, un champ, un bouton « Valider »… et plus de boucle du tout.

Avec `prompt`, la boucle **attendait** chaque réponse. Une page web, elle, n'attend pas : elle réagit à des événements. C'est donc chaque envoi du formulaire qui fait avancer le quiz d'une question, et une variable retient où on en est.

Ce que tu vas apprendre :

- remplacer une boucle par des événements : une variable garde l'**état** du jeu (la question en cours, le score) d'un envoi à l'autre ;
- réutiliser `submit` et `preventDefault()` ;
- cacher un élément (`hidden`) ;
- en bonus, enregistrer une valeur dans le navigateur (`localStorage`).

**Prérequis** : [05 : trié ou pas ?](../05-trie-ou-pas/README.md), et les exercices 08 et 09 des [révisions](../../01-revisions/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Les questions et les réponses sont déjà dans `js/script.js`, dans deux tableaux `questions` et `answers` : les réponses sont des chaînes, en minuscules.

| Élément | Sélecteur |
| --- | --- |
| la progression (« Question 1 / 4 ») | `#progress` |
| la question | `#question` |
| le formulaire | `form` |
| le champ de réponse | `#answer` |
| la zone du message (bonne ou mauvaise réponse) | `#feedback` |
| le meilleur score (bonus) | `#best` |

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner les éléments

**À faire** : sélectionner la progression (`progressElement`), la question (`questionElement`), le formulaire (`formElement`), le champ (`answerInput`) et la zone du message (`feedbackElement`).

**Résultat attendu** : aucune erreur dans la console. La page affiche toujours « Chargement… ».

## Étape 2 : afficher la question en cours

**À faire** :

- créer une variable `currentIndex`, l'indice de la question en cours (`0` au départ) ;
- écrire une fonction `showQuestion()` qui affiche la progression (« Question 1 / 4 ») et le texte de la question d'indice `currentIndex` ;
- l'appeler une fois, au chargement.

**Résultat attendu** : la page affiche « Question 1 / 4 » et « Combien font 1 + 1 ? ». En changeant `currentIndex` à `2` pour tester, elle affiche « Question 3 / 4 » et la question sur la capitale (remettre `0` ensuite).

<details>
<summary>💡 Un indice ?</summary>

L'indice commence à 0, la numérotation affichée à 1 : `` `Question ${currentIndex + 1} / ${questions.length}` ``.

</details>

## Étape 3 : vérifier la réponse et passer à la suivante

**À faire** :

- créer une variable `score` (`0` au départ) ;
- écouter `submit` sur le formulaire, et annuler l'envoi (`preventDefault()`), comme dans l'exercice 05 ;
- lire la réponse, sans les espaces autour et en minuscules (`trim()`, `toLowerCase()`) ; si elle est vide, s'arrêter là ;
- si elle est égale à `answers[currentIndex]`, augmenter le score et afficher « ✅ Bonne réponse ! », sinon afficher « ❌ Raté, la réponse était : … » avec la bonne réponse ;
- passer à la question suivante : augmenter `currentIndex`, vider le champ, appeler `showQuestion()`.

**Résultat attendu** : chaque validation affiche le message, puis la question suivante. « Paris » (avec une majuscule) est accepté. Après la 4ᵉ question, la page affiche… « Question 5 / 4 » et une question vide : c'est l'objet de l'étape 4.

<details>
<summary>🆘 Pourquoi les réponses sont-elles des chaînes ?</summary>

`value` est toujours une chaîne. Dans la correction des révisions, les réponses étaient des nombres (`2`), et la comparaison utilisait `==`, qui convertit. Ici, les réponses sont écrites en chaînes (`'2'`) : on peut comparer avec `===`, sans surprise.

</details>

<details>
<summary>🆘 currentIndex et score : pourquoi en dehors de la fonction ?</summary>

Comme `placedCount` dans l'exercice 04 : déclarées dans la fonction, elles seraient remises à `0` à chaque envoi. Déclarées en dehors, elles gardent leur valeur entre deux envois : c'est l'état du quiz.

</details>

## Étape 4 : terminer le quiz

Après la dernière question, `questions[4]` n'existe pas : il ne faut plus appeler `showQuestion()`.

**À faire** :

- dans l'écouteur, après avoir augmenté `currentIndex` : si toutes les questions sont passées, appeler une fonction `endQuiz()`, sinon `showQuestion()` ;
- `endQuiz()` affiche « Terminé ! » à la place de la progression, « Score : 3 / 4 » à la place de la question, et cache le formulaire (`formElement.hidden = true`).

**Résultat attendu** : après la 4ᵉ réponse, le formulaire disparaît, et le score s'affiche ; le message de la dernière réponse reste visible.

<details>
<summary>💡 Un indice ?</summary>

Toutes les questions sont passées quand `currentIndex === questions.length`.

</details>

## Étape 5 (bonus) : retenir le meilleur score

Étape facultative. `localStorage` est une petite mémoire du navigateur, qui survit au rechargement de la page et même à la fermeture du navigateur. Elle range des chaînes, sous un nom :

```js
localStorage.setItem('quizBestScore', 3);           // enregistre '3'
const saved = localStorage.getItem('quizBestScore'); // '3', ou null si rien n'est enregistré
```

**À faire** : écrire une fonction `updateBestScore()`, appelée à la fin du quiz, qui :

- lit le meilleur score enregistré (en nombre) ;
- s'il est battu, enregistre le nouveau ;
- affiche « Meilleur score : 3 / 4 » dans `#best`.

**Résultat attendu** : après une partie, le meilleur score s'affiche ; en rechargeant la page et en faisant moins bien, il ne bouge pas ; en faisant mieux, il est remplacé.

<details>
<summary>💡 Un indice ?</summary>

`Number(null)` vaut `0` : `Number(localStorage.getItem('quizBestScore'))` donne donc `0` à la toute première partie, sans cas particulier à gérer.

</details>

---

## Pour aller plus loin

- Afficher le meilleur score dès le chargement de la page, s'il existe.
- Un bouton « Rejouer », qui remet tout à zéro et réaffiche le formulaire (`hidden = false`).
- Ranger chaque question et sa réponse dans un objet (`{ question: '…', answer: '…' }`), dans un seul tableau, comme l'exercice 05 des révisions le faisait pour la météo.
- La suite : [05 : Blob, le petit monstre](../../05-classes-et-animations-css/README.md), où les classes déclenchent de vraies animations.

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
