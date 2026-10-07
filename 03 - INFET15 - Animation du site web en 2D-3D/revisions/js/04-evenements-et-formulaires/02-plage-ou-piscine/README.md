[← Événements et formulaires](../README.md)

# Plage, piscine ou maison ?

Tu te souviens de Geoffroy Denledo, qui ne sait jamais quoi faire de sa journée ? Dans les révisions, son programme d'aide à la décision s'affichait dans la console, avec des valeurs écrites en dur dans le code. Cette fois, il a des curseurs : il règle la météo, et la réponse s'affiche en direct.

Pour rappel, les règles de Geoffroy (exercice 04 des révisions) :

- **la plage** : au moins 25 °C, un vent sous 20 km/h, entre juin et septembre, et un indice UV modéré (de 3 à 5) ;
- **sinon la piscine** : un vent sous 80 km/h (il y va à pied), et pas en novembre (fermée pour maintenance) ;
- **sinon** : il reste au chaud.

Ce que tu vas apprendre :

- lire la valeur d'un curseur (`<input type="range">`) et d'une liste déroulante (`<select>`) ;
- écouter les événements `input` et `change` ;
- ranger un traitement dans une fonction, et la donner directement à `addEventListener` ;
- poser plusieurs écouteurs sur un même élément.

**Prérequis** : [01 : le convertisseur de températures](../01-convertisseur/README.md), et les exercices 03 et 04 des [révisions](../../01-revisions/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Les identifiants à connaître :

| Élément | Identifiant |
| --- | --- |
| les curseurs | `temperature`, `wind`, `uv` |
| la liste des mois (valeurs de `1` à `12`) | `month` |
| les valeurs affichées à côté des curseurs | `temperature-value`, `wind-value`, `uv-value` |
| la zone de réponse | `result` |

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner les éléments

**À faire** : sélectionner dans des constantes les trois curseurs (`temperatureInput`, `windInput`, `uvInput`), la liste des mois (`monthSelect`), les trois valeurs affichées (`temperatureValue`, `windValue`, `uvValue`) et la zone de réponse (`resultElement`).

**Résultat attendu** : rien ne change à l'écran ; aucune erreur dans la console. Tu peux afficher une ou deux constantes dans la console pour vérifier.

## Étape 2 : afficher la valeur des curseurs

Quand on fait glisser un curseur, le nombre à côté ne bouge pas : c'est à toi de le mettre à jour. Un curseur déclenche l'événement `input` pendant qu'on le fait glisser, et sa valeur est dans `value`, comme pour un champ texte.

**À faire** : pour chacun des trois curseurs, à chaque événement `input`, écrire sa valeur dans le texte affiché à côté (`textContent`).

**Résultat attendu** : les nombres suivent les curseurs en direct.

<details>
<summary>💡 Un indice ?</summary>

```js
temperatureInput.addEventListener('input', function () {
    temperatureValue.textContent = temperatureInput.value;
});
```

Et la même chose pour les deux autres curseurs.

</details>

## Étape 3 : écrire la fonction de décision

**À faire** :

- écrire une fonction `decide()` qui lit les quatre valeurs (curseurs et mois), les transforme en nombres, applique les règles de Geoffroy, et écrit la réponse dans la zone de réponse : « 🏖️ Vu le temps, tu peux aller à la plage », « 🏊 Vu le temps, tu peux aller à la piscine » ou « 🏠 Vu le temps, tu peux rester au chaud » ;
- l'appeler une fois, juste après, pour avoir une réponse dès le chargement.

**Résultat attendu** : au chargement (25 °C, 10 km/h, UV 4, juillet), la page affiche « 🏖️ Vu le temps, tu peux aller à la plage ». Bouger les curseurs ne change encore rien à la réponse.

<details>
<summary>💡 Un indice ?</summary>

Les conditions sont celles de la correction de l'exercice 04 des révisions. Seule différence : les valeurs ne sont plus des constantes en haut du fichier, elles sont lues dans les champs au début de la fonction, par exemple `const temperature = Number(temperatureInput.value);`.

</details>

<details>
<summary>🆘 La piscine reste ouverte en novembre ?</summary>

Vérifie que chaque valeur passe par `Number()`, celle de la liste des mois comprise : `monthSelect.value` est aussi une chaîne. `'7' >= 6` fonctionne quand même, car JavaScript convertit la chaîne pour comparer… mais `!==` ne convertit rien : `'11' !== 11` est vrai, et la piscine n'est jamais fermée.

</details>

## Étape 4 : décider à chaque changement

Un élément peut avoir **plusieurs** écouteurs pour le même événement : ils sont tous appelés. Inutile donc de toucher au code de l'étape 2. Et quand la fonction existe déjà, on peut la donner directement à `addEventListener`, sans l'envelopper dans `function () { … }` : `temperatureInput.addEventListener('input', decide);`.

Pour une liste déroulante, l'événement habituel est `change` : il se déclenche quand on choisit une autre option.

**À faire** : appeler `decide` à chaque `input` des trois curseurs, et à chaque `change` de la liste des mois.

**Résultat attendu** :

| Réglage, en partant du chargement | Réponse |
| --- | --- |
| température à 20 °C | 🏊 piscine |
| vent à 90 km/h | 🏠 rester au chaud |
| mois de novembre | 🏠 rester au chaud |
| UV à 8 | 🏊 piscine |

<details>
<summary>🆘 Écrire decide() ou decide ?</summary>

Sans parenthèses : `addEventListener('input', decide)` donne la fonction, que le navigateur appellera plus tard, à chaque événement. Avec `decide()`, la fonction est appelée tout de suite, une seule fois, et c'est son résultat (`undefined`) qui est donné à `addEventListener` : plus rien ne se passe ensuite.

</details>

## Étape 5 (bonus) : changer la couleur du fond

Étape facultative. Le CSS prévoit trois classes pour `<body>` : `beach` (fond sable), `pool` (fond bleu) et `home` (fond gris).

**À faire** : dans `decide()`, donner à `<body>` la classe qui correspond à la réponse. Une seule classe doit être présente à la fois.

**Résultat attendu** : le fond change de couleur, en douceur, en même temps que la réponse.

<details>
<summary>💡 Un indice ?</summary>

`document.body` désigne l'élément `<body>`. Avec `classList.add`, il faudrait penser à retirer les deux autres classes. Plus court : `document.body.className = 'beach';` remplace **toutes** les classes de l'élément par celle-ci.

</details>

---

## Pour aller plus loin

- Afficher aussi la raison : « trop de vent pour la plage », « piscine fermée en novembre »…
- Remplacer les quatre écouteurs de l'étape 4 par un seul, posé sur le `<form>` : les événements `input` des champs **remontent** jusqu'à lui.
- La suite : [03 : les initiales](../03-initiales/README.md).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
