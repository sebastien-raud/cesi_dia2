[← Exercices JavaScript](../README.md)

# Introduction au DOM : sélectionner et modifier la page

La page présente le DOM, avec un texte tiré de Wikipédia. En JavaScript, tu vas y sélectionner des éléments, les afficher dans la console, puis modifier la page : ajouter un identifiant, une classe, un attribut, un pied de page… et supprimer une section inutile.

Le **DOM** (Document Object Model), c'est la représentation de la page en mémoire, sous forme d'un arbre d'objets : un objet par élément HTML. JavaScript peut lire et modifier cet arbre, et la page se met à jour aussitôt.

Ce que tu vas apprendre :

- sélectionner des éléments (`getElementsByTagName`, `getElementsByClassName`, `getElementById`, `querySelector`, `querySelectorAll`) ;
- faire la différence entre un élément seul et une collection d'éléments ;
- parcourir une collection avec une boucle ;
- modifier un élément : identifiant, classe, attribut ;
- créer un élément, l'ajouter à la page, et en supprimer un autre.

**Prérequis** : les variables et les boucles ([01 : révisions des bases](../01-revisions/README.md)).

## Démarrer

1. Ouvrir `index.html` dans le navigateur.
2. Ouvrir le dossier dans l'éditeur de code : le code est à écrire dans `js/script.js`, sous chaque repère `// Étape N`.
3. Ouvrir la console du navigateur (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
4. Après chaque étape, recharger la page pour tester.

Les fichiers `index.html` et `css/style.css` sont fournis, il n'y a rien à y modifier. Le CSS prépare déjà des styles qui ne s'appliquent que si ton JavaScript fonctionne : une bordure sous un titre d'identifiant `title-1`, du bleu pour la classe `blue`, une petite icône pour les liens qui s'ouvrent dans un nouvel onglet.

Fichiers :

- [`index.html`](index.html) : la page
- [`css/style.css`](css/style.css) : les styles, fourni
- [`js/script.js`](js/script.js) : à compléter
- [`js/script-correction.js`](js/script-correction.js) : la correction complète et commentée

---

## Étape 1 : sélectionner tous les paragraphes et afficher leur nombre

`document.getElementsByTagName('p')` renvoie **tous** les éléments `<p>` de la page, dans une **collection** : une sorte de liste, qui a une longueur (`length`).

**À faire** : sélectionner tous les paragraphes dans une constante `paragraphs`, l'afficher dans la console, puis afficher son nombre d'éléments.

**Résultat attendu** : la console affiche une `HTMLCollection` de 3 paragraphes, puis le nombre `3`. En survolant les éléments dans la console, ils sont mis en surbrillance dans la page.

<details>
<summary>💡 Un indice ?</summary>

`console.log(paragraphs.length);`

</details>

## Étape 2 : sélectionner le paragraphe de classe « inutile »

`document.getElementsByClassName('inutile')` renvoie les éléments qui ont cette classe… toujours dans une collection, même s'il n'y en a qu'un.

**À faire** : sélectionner le paragraphe de classe `inutile` dans une constante `uselessParagraph`, et l'afficher dans la console.

**Résultat attendu** : la console affiche **le paragraphe** lui-même (`p.inutile`), et non une collection.

<details>
<summary>💡 La console affiche une HTMLCollection ?</summary>

C'est la différence entre une collection et un élément seul. Pour prendre le premier élément d'une collection : `[0]`, comme pour un tableau.

</details>

## Étape 3 : sélectionner les sections « generalites » et « histoire »

Un identifiant est unique dans la page : `document.getElementById('generalites')` renvoie donc directement l'élément (sans `#` devant le nom).

**À faire** : sélectionner les sections d'identifiants `generalites` et `histoire` dans deux constantes, et les afficher dans la console.

**Résultat attendu** : la console affiche les deux sections.

## Étape 4 : sélectionner le titre de niveau 1 avec un sélecteur CSS

`document.querySelector(sélecteur)` accepte n'importe quel sélecteur CSS (`'h1'`, `'.inutile'`, `'#histoire'`, `'main p'`…) et renvoie le **premier** élément qui correspond.

**À faire** : sélectionner le titre `<h1>` dans une constante `title`, avec `querySelector`, et l'afficher dans la console.

**Résultat attendu** : la console affiche le titre « Document Object Model ».

## Étape 5 : sélectionner tous les liens avec un sélecteur CSS

`document.querySelectorAll(sélecteur)` renvoie **tous** les éléments qui correspondent, dans une liste (`NodeList`).

**À faire** : sélectionner tous les liens `<a>` dans une constante `links`, et l'afficher dans la console.

**Résultat attendu** : la console affiche une `NodeList` de 10 liens.

`querySelector` et `querySelectorAll` savent tout faire, avec la même syntaxe qu'en CSS : ce sont les deux méthodes à retenir en priorité.

## Étape 6 : afficher le texte de chaque lien dans la console

Le texte d'un élément se lit avec `textContent`. Une collection se parcourt avec une boucle `for…of`.

**À faire** : pour chaque lien de `links`, afficher son texte dans la console.

**Résultat attendu** : la console affiche, ligne par ligne, « W3C », « navigateur web », « HTML »…

<details>
<summary>💡 Un indice ?</summary>

```js
for (const link of links) {
    // link contient un lien à chaque tour de boucle
}
```

Attention à bien utiliser `link` (le lien du tour en cours) dans la boucle, et pas `links` (toute la liste).

</details>

## Étape 7 : ajouter l'identifiant « title-1 » au titre

Les attributs d'un élément se modifient comme des propriétés : `element.id = 'mon-id'`.

**À faire** : donner l'identifiant `title-1` au titre.

**Résultat attendu** : une bordure apparaît sous le titre (le CSS fourni la prévoit pour `h1#title-1`).

## Étape 8 : ajouter la classe « blue » au titre

`element.classList.add('nom')` ajoute une classe à un élément, sans toucher à ses autres classes.

**À faire** : ajouter la classe `blue` au titre.

**Résultat attendu** : le titre devient bleu.

## Étape 9 : ouvrir tous les liens dans un nouvel onglet (target="_blank")

**À faire** : pour chaque lien, donner la valeur `'_blank'` à son attribut `target`.

**Résultat attendu** : une petite icône apparaît après chaque lien, et un clic ouvre le lien dans un nouvel onglet.

<details>
<summary>💡 Un indice ?</summary>

La même boucle qu'à l'étape 6, avec `link.target = '_blank';`.

</details>

## Étape 10 : ajouter un pied de page dans #container

Créer un élément se fait en trois temps : le créer (`document.createElement('footer')`), le remplir (`textContent`), puis l'ajouter dans un parent (`parent.append(element)`). Avant cette dernière étape, il n'existe qu'en mémoire.

**À faire** : créer un `<footer>` qui contient « source : Wikipedia / DOM », et l'ajouter à la fin de l'élément `#container`.

**Résultat attendu** : le texte « source : Wikipedia / DOM » apparaît en bas de la page.

<details>
<summary>🆘 Besoin d'aide ?</summary>

```js
const footer = document.createElement('footer');
footer.textContent = 'source : Wikipedia / DOM';
// … sélectionner #container, puis y ajouter le footer avec append
```

</details>

## Étape 11 : supprimer la section « inutile »

`element.remove()` retire un élément de la page.

**À faire** : sélectionner la section d'identifiant `inutile` et la supprimer.

**Résultat attendu** : la note rouge « il faut vraiment penser à supprimer cette section » a disparu. Mission accomplie !

---

## Pour aller plus loin

- Compter les liens qui pointent vers Wikipédia (indice : `link.href.includes('wikipedia')`).
- Ajouter un sommaire en haut de la page, avec un lien vers chaque section (`createElement`, `href = '#histoire'`).
- La suite logique : [06 : la confiserie](../06-creer-des-elements/README.md), pour créer des dizaines d'éléments à partir de données.

## La correction

Pour tester la correction, remplacer `js/script.js` par `js/script-correction.js` dans `index.html`. Cherche d'abord par toi-même : les aides de chaque étape sont là pour ça.
