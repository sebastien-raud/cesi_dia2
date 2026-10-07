[← Événements et formulaires](../README.md)

# Initials B.B.

Dans les révisions, l'exercice 07 cherchait les initiales d'une liste d'artistes, dans la console. Cette fois, on tape un nom dans un champ, et ses initiales s'affichent au fur et à mesure dans un badge rond, comme sur les avatars des messageries.

Ce que tu vas apprendre :

- ranger un algorithme dans une fonction qui **reçoit** une valeur et en **retourne** une autre (`return`) ;
- appeler cette fonction à chaque saisie (`input`) ;
- nettoyer une saisie : `trim()`, `toUpperCase()`.

**Prérequis** : [02 : plage, piscine ou maison ?](../02-plage-ou-piscine/README.md), et l'exercice 07 des [révisions](../../01-revisions/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Le champ a pour identifiant `name`, le badge `initials`.

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner le champ et le badge

**À faire** : sélectionner le champ dans une constante `nameInput`, et le badge dans une constante `initialsElement`.

**Résultat attendu** : aucune erreur dans la console.

## Étape 2 : écrire la fonction getInitials

Pour rappel, la règle de l'exercice 07 : on garde le premier caractère, puis chaque caractère qui suit une espace ou un tiret.

Une fonction peut recevoir une valeur (un **paramètre**) et en renvoyer une autre avec `return` :

```js
function double(number) {
    return number * 2;
}

console.log(double(21)); // 42
```

**À faire** : écrire une fonction `getInitials(name)` qui reçoit un nom et **retourne** ses initiales. La tester dans la console avec deux artistes des révisions.

**Résultat attendu** : `getInitials('Hubert-Félix Thiéfaine')` retourne `'HFT'`, `getInitials('Dorothée')` retourne `'D'`.

<details>
<summary>💡 Un indice ?</summary>

Reprends la boucle sur les caractères de la correction de l'exercice 07. Seules différences : le nom est le paramètre `name`, et à la fin, au lieu d'afficher les initiales, on les retourne (`return initials;`).

</details>

<details>
<summary>🔑 La réponse</summary>

```js
function getInitials(name) {
    let initials = '';

    for (let index = 0; index < name.length; index++) {
        if (index === 0) {
            initials += name[index];
        } else if (name[index] === ' ' || name[index] === '-') {
            if (index + 1 < name.length) {
                initials += name[index + 1];
            }
        }
    }

    return initials;
}

console.log(getInitials('Hubert-Félix Thiéfaine'));
```

</details>

## Étape 3 : afficher les initiales à chaque saisie

**À faire** : à chaque événement `input` du champ, calculer les initiales de ce qui est saisi avec `getInitials`, et les écrire dans le badge. Si le champ est vide, le badge affiche `?`.

**Résultat attendu** : en tapant « Brigitte Bardot », le badge affiche `B`, puis `BB` dès la première lettre du nom. En effaçant tout, il revient à `?`.

<details>
<summary>💡 Un indice ?</summary>

La fonction retourne une valeur : on la range dans une constante, puis on la teste.

```js
const initials = getInitials(nameInput.value);
```

</details>

## Étape 4 : mettre en majuscules et ignorer les espaces en trop

Essaie « serge gainsbourg » (sans majuscules), puis « Jane␣␣Birkin » (deux espaces), puis « ␣Dorothée » (une espace au début) : le badge affiche `sg`, `J B`, puis un badge vide. Les espaces en trop sont des caractères comme les autres : la deuxième espace suit la première, et l'espace du début est le premier caractère.

**À faire** : améliorer `getInitials` :

- retirer les espaces au début et à la fin du nom (`name.trim()`) ;
- ne garder le caractère qui suit une espace ou un tiret que si ce n'est pas lui-même une espace ou un tiret ;
- retourner les initiales en majuscules (`toUpperCase()`).

**Résultat attendu** : `SG`, `JB` et `D` ; « Jean - Paul » donne `JP`.

<details>
<summary>💡 Un indice ?</summary>

`trim()` et `toUpperCase()` ne modifient pas la chaîne : ils en **retournent** une nouvelle. Il faut donc ranger le résultat : `name = name.trim();`.

</details>

<details>
<summary>🔑 La réponse (le cœur de la boucle)</summary>

```js
} else if (name[index] === ' ' || name[index] === '-') {
    const nextChar = name[index + 1];

    if (nextChar !== undefined && nextChar !== ' ' && nextChar !== '-') {
        initials += nextChar;
    }
}
```

Après le dernier caractère, `name[index + 1]` vaut `undefined` : c'est ce qui remplace le test `index + 1 < name.length`.

</details>

## Étape 5 (bonus) : une couleur de badge pour chaque nom

Étape facultative. Sur les messageries, chaque avatar a sa couleur, et une même personne garde toujours la même. L'astuce : calculer la couleur à partir des lettres du nom.

`name.charCodeAt(index)` donne le code d'un caractère, un nombre (`'A'` vaut 65, `'a'` vaut 97). En additionnant les codes de tous les caractères, on obtient un nombre propre à ce nom. `sum % 360` le ramène entre 0 et 359 : c'est une **teinte**, sur le cercle des couleurs de `hsl()`.

**À faire** : écrire une fonction `updateBadgeColor(name)` qui calcule cette teinte et l'applique au fond du badge : `` initialsElement.style.backgroundColor = `hsl(${hue}, 60%, 45%)`; ``. L'appeler à chaque saisie. Si le champ est vide, remettre la couleur d'origine (`style.backgroundColor = ''`).

**Résultat attendu** : le badge change de couleur à chaque lettre tapée ; retaper le même nom redonne la même couleur.

---

## Pour aller plus loin

- Limiter le badge à 3 initiales au maximum (« Jean-Pierre Marie Dupont » donne `JPM`).
- Afficher sous le badge une liste d'artistes des révisions ; un clic sur l'un d'eux remplit le champ (attention : changer `value` en JavaScript ne déclenche pas l'événement `input`).
- La suite : [04 : le poème dans le désordre](../04-poeme/README.md).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
