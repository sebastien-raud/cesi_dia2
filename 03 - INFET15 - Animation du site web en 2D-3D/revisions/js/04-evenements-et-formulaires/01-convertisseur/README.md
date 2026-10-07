[← Événements et formulaires](../README.md)

# Le convertisseur de températures

Tu te souviens du premier exercice des révisions : convertir 25 °C en degrés Fahrenheit, dans la console ? Cette fois, la conversion se fait dans la page : on tape une température dans un champ, et l'autre champ se met à jour tout seul. Dans les deux sens.

Pour rappel, la formule : **°F = °C × 9/5 + 32**.

Ce que tu vas apprendre :

- écouter l'événement `input`, déclenché à chaque modification d'un champ ;
- lire la valeur d'un champ (`value`), et la transformer en nombre (`Number()`) ;
- écrire une valeur dans un champ ;
- arrondir un nombre (`Math.round`).

**Prérequis** : [03 : introduction aux événements](../../03-introduction-evenements/README.md), et l'exercice 01 des [révisions](../../01-revisions/README.md).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Les deux champs ont pour identifiants `celsius` et `fahrenheit`. Le thermomètre à droite ne sert qu'au bonus (étape 6).

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner les deux champs

**À faire** : sélectionner le champ Celsius dans une constante `celsiusInput`, le champ Fahrenheit dans une constante `fahrenheitInput`, et les afficher dans la console.

**Résultat attendu** : la console affiche les deux champs `<input>`.

<details>
<summary>💡 Un indice ?</summary>

Un identifiant se sélectionne avec un `#` : `document.querySelector('#celsius')`.

</details>

## Étape 2 : afficher dans la console ce qui est saisi en Celsius

L'événement `input` se déclenche à **chaque** modification du champ : une touche tapée, un effacement, un clic sur les petites flèches du champ, un copier-coller… La propriété `value` du champ contient ce qui est saisi.

**À faire** : écouter l'événement `input` sur le champ Celsius, et afficher dans la console sa valeur, ainsi que son type (`typeof`).

**Résultat attendu** : en tapant `25`, la console affiche `2 string`, puis `25 string`.

<details>
<summary>💡 Un indice ?</summary>

```js
celsiusInput.addEventListener('input', function () {
    console.log(celsiusInput.value, typeof celsiusInput.value);
});
```

</details>

<details>
<summary>🆘 Pourquoi pas l'événement keyup ?</summary>

`keyup` ne réagit qu'au clavier : il rate les petites flèches du champ et le copier-coller. Il réagit aussi à des touches qui ne changent rien, comme `Maj` ou les flèches gauche et droite. `input` réagit exactement quand la valeur change, quelle que soit la façon.

</details>

## Étape 3 : convertir les Celsius en Fahrenheit

Attention, `value` est **toujours** une chaîne de caractères, même dans un champ `type="number"` : `'25'` et non `25`. `Number('25')` la transforme en nombre.

**À faire** : remplacer le code de l'étape 2 (le mettre en commentaire). À chaque saisie en Celsius, convertir la valeur en nombre, calculer les Fahrenheit, et écrire le résultat dans le champ Fahrenheit (`fahrenheitInput.value = …`).

**Résultat attendu** : `25` donne `77`, `0` donne `32`, `100` donne `212`.

<details>
<summary>💡 Un indice ?</summary>

On écrit dans un champ comme on lit : `fahrenheitInput.value = fahrenheit;`.

</details>

<details>
<summary>🔑 La réponse</summary>

```js
celsiusInput.addEventListener('input', function () {
    const celsius = Number(celsiusInput.value);
    const fahrenheit = celsius * 9 / 5 + 32;
    fahrenheitInput.value = fahrenheit;
});
```

</details>

## Étape 4 : convertir dans l'autre sens

La formule inverse : **°C = (°F − 32) × 5/9**.

**À faire** : écouter aussi l'événement `input` sur le champ Fahrenheit, et mettre à jour le champ Celsius.

**Résultat attendu** : `212` en Fahrenheit donne `100` en Celsius, `32` donne `0`.

<details>
<summary>🆘 Le résultat est faux, ou ne change pas ?</summary>

Vérifie que, dans ce deuxième écouteur, tu lis bien `fahrenheitInput.value`. Un copier-coller du premier écouteur garde facilement `celsiusInput.value` : on convertit alors la mauvaise valeur.

</details>

## Étape 5 : gérer le champ vide et arrondir

Deux défauts restent :

- effacer complètement un champ affiche `32` (ou `-17.77777777777778`) dans l'autre : `Number('')` vaut `0` ;
- `100` °F donne `37.77777777777778` °C : un chiffre après la virgule suffit.

**À faire** :

- dans les deux écouteurs, si le champ est vide (`value === ''`), vider l'autre champ et s'arrêter là (`return`) ;
- arrondir le résultat à un chiffre après la virgule.

**Résultat attendu** : effacer un champ vide l'autre ; `100` °F donne `37.8` °C, et `37.5` °C donne `99.5` °F.

<details>
<summary>💡 Un indice ?</summary>

`Math.round()` arrondit à l'entier : `Math.round(37.78)` vaut `38`. Pour garder un chiffre après la virgule, on multiplie par 10 avant, et on divise par 10 après : `Math.round(37.78 * 10) / 10` vaut `37.8`.

</details>

<details>
<summary>🔑 La réponse (premier écouteur)</summary>

```js
celsiusInput.addEventListener('input', function () {
    if (celsiusInput.value === '') {
        fahrenheitInput.value = '';
        return;
    }

    const celsius = Number(celsiusInput.value);
    const fahrenheit = celsius * 9 / 5 + 32;
    fahrenheitInput.value = Math.round(fahrenheit * 10) / 10;
});
```

Le second écouteur se construit de la même façon, en inversant les deux champs.

</details>

## Étape 6 (bonus) : faire monter le thermomètre

Étape facultative. Le thermomètre va de -20 °C (vide) à 50 °C (plein). Il suffit de changer la hauteur de l'élément `.mercury` : le CSS anime déjà le changement.

**À faire** :

- écrire une fonction `updateThermometer(celsius)` qui calcule le pourcentage de remplissage, et l'applique à la hauteur de `.mercury` (`style.height`) ;
- l'appeler dans les deux écouteurs, avec la température en Celsius.

**Résultat attendu** : le mercure monte et descend en douceur à chaque saisie ; `15` °C le remplit à moitié, et il ne déborde pas pour `80` °C.

<details>
<summary>💡 Un indice ?</summary>

Le pourcentage : `(celsius + 20) / 70 * 100`. Pour l'appliquer : `mercuryElement.style.height = percent + '%';`.

</details>

<details>
<summary>🆘 Le mercure déborde, ou passe sous zéro ?</summary>

Au-delà de 50 °C, le calcul dépasse 100 % ; sous -20 °C, il devient négatif. `Math.min(100, percent)` garde la plus petite des deux valeurs, `Math.max(0, percent)` la plus grande : les deux ensemble bloquent le pourcentage entre 0 et 100.

</details>

---

## Pour aller plus loin

- Colorer le mercure en bleu sous 0 °C (écrire une classe `.cold` dans le CSS, et la basculer avec `classList.toggle('cold', celsius < 0)`).
- Ajouter un troisième champ, en kelvins (K = °C + 273,15).
- La suite : [02 : plage, piscine ou maison ?](../02-plage-ou-piscine/README.md).

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
