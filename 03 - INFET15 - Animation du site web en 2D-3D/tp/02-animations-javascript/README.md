# TP2 : Déclencher les animations en JavaScript

## Contexte

> **De :** Paul Hissage, secrétaire · **Objet :** Le menu sur mon téléphone
>
> Bonjour,
>
> Le site est bien plus joli sur l'ordinateur, merci. Sur mon téléphone, par contre, le menu prend toute la place en haut de l'écran : le client doit faire défiler avant de voir un seul meuble.
>
> Sur les autres sites, il y a un bouton « Menu » qui ouvre la liste. On peut avoir ça ?
>
> Autre chose : quand je clique sur « Ajouter aux favoris », rien ne se passe. J'ai cliqué quatre fois sur la table, par sécurité.
>
> Paul

Un bouton « Menu » existe déjà dans le HTML, mais il est masqué. Les boutons « Ajouter aux favoris » n'ont aucun comportement.

## Objectif

Déclencher des animations CSS depuis le JavaScript, en ajoutant et en retirant des classes.

## Prérequis

- Séquence « Rappel JavaScript : DOM et événements » ;
- TP1 terminé (le dossier `01-depart/` reprend son corrigé).

## Le principe

Le CSS **décrit** les états et les animations. Le JavaScript **décide quand** elles se jouent, en changeant une classe :

```text
clic ──► JavaScript : ajoute la classe is-open ──► CSS : .main-nav.is-open { ... } ──► animation
```

## Travail demandé

### Le menu mobile

1. Dans `style.css`, afficher le bouton `.menu-toggle` (il est en `display: none`) et le placer à droite du logo.
2. Toujours dans `style.css`, masquer la navigation `.main-nav` sur mobile, puis écrire la règle `.main-nav.is-open` qui l'affiche, avec une transition.
3. Sur ordinateur (media query à partir de 960 px) : masquer le bouton et toujours afficher la navigation.
4. Dans `main.js`, au clic sur le bouton, ajouter la classe `is-open` à la navigation si elle est absente, la retirer sinon.
5. Mettre à jour l'attribut `aria-expanded` du bouton (`true` menu ouvert, `false` menu fermé).

<details>
<summary>💡 Comment masquer la navigation avec une animation ?</summary>

On ne peut pas animer `display: none`. On anime la hauteur : `max-height: 0` et `overflow: hidden` pour la fermer, une grande valeur fixe (`15rem`) pour l'ouvrir. On ne peut pas non plus animer vers `auto`, d'où la valeur fixe.

<details>
<summary>🆘 Toujours coincé ?</summary>

```css
.main-nav {
    max-height: 0;
    overflow: hidden;
    visibility: hidden;
    transition: max-height 0.3s ease, visibility 0.3s;
}

.main-nav.is-open {
    max-height: 15rem;
    visibility: visible;
}
```

`visibility: hidden` rend aussi les liens inaccessibles au clavier quand le menu est fermé : sans lui, on pourrait tabuler sur des liens invisibles.

</details>
</details>

<details>
<summary>💡 Le JavaScript, par où commencer ?</summary>

Toujours les trois mêmes étapes : sélectionner (`querySelector`), écouter (`addEventListener`), agir (`classList`).

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', isOpen);
});
```

`toggle` ajoute la classe si elle est absente, la retire sinon, et renvoie `true` si elle est présente après l'appel.

</details>
</details>

### Les favoris

6. Au clic sur un bouton « Ajouter aux favoris », lui ajouter la classe `is-favorite` (ou la retirer s'il l'a déjà) et changer son texte : « ♥ Dans vos favoris » ou « Ajouter aux favoris ».
7. Dans `style.css`, donner un style au bouton `.is-favorite` et une petite animation de confirmation (le bouton grossit puis revient, avec `@keyframes`).
8. Mettre à jour l'attribut `aria-pressed` du bouton (`true` ou `false`).

<details>
<summary>💡 Il y a six boutons, pas un seul ?</summary>

`querySelector` ne renvoie que le premier. `querySelectorAll` les renvoie tous, et `forEach` permet de les parcourir pour ajouter un écouteur à chacun.

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
const favoriteButtons = document.querySelectorAll('.favorite-button');

favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const isFavorite = button.classList.toggle('is-favorite');
        button.textContent = isFavorite ? '♥ Dans vos favoris' : 'Ajouter aux favoris';
        button.setAttribute('aria-pressed', isFavorite);
    });
});
```

`condition ? a : b` vaut `a` si la condition est vraie, `b` sinon.

</details>
</details>

### Pour aller plus loin

9. Refermer le menu quand on clique sur un de ses liens.
10. Refermer le menu avec la touche `Échap` (événement `keydown` sur `document`, `event.key === 'Escape'`).

## Points de vigilance

- Le JavaScript ne modifie pas de style directement (`element.style...`) : il change une classe, le CSS fait le reste ;
- ouvrir la console (`F12`) : une faute de frappe dans un sélecteur donne `null`, puis une erreur `Cannot read properties of null` ;
- vérifier les deux largeurs : sur ordinateur, le menu doit rester affiché, sans bouton.

## Résultat attendu

- Sur mobile : un bouton « Menu » à droite du logo, qui ouvre et referme la navigation en douceur ;
- sur ordinateur : la navigation en ligne, comme au TP1, sans bouton ;
- un clic sur « Ajouter aux favoris » change le bouton, avec une petite animation ; un second clic le remet dans son état de départ ;
- `aria-expanded` et `aria-pressed` suivent l'état des boutons (visible dans l'inspecteur) ;
- aucune erreur dans la console.
