[← Défis CSS](../README.md)

# 06 : la machine à écrire

Un titre qui s'écrit lettre par lettre, avec un curseur qui clignote.

**Ce que tu vas utiliser** : `@keyframes`, `steps()`, l'unité `ch`, `overflow: hidden`, `white-space: nowrap`, `border-right`, variable CSS.

## Démarrer

1. Ouvrir [`cible.html`](cible.html) dans le navigateur : c'est le **résultat attendu**. Observe-le bien (survol, clic, clavier).
2. Ouvrir [`index.html`](index.html) : la même page, sans animation.
3. Écrire ton CSS dans [`style.css`](style.css), sous le commentaire « À toi », et recharger `index.html` pour comparer avec la cible.

Le HTML est terminé, il n'y a rien à y modifier. La correction est dans [`correction.css`](correction.css) : `cible.html` l'utilise. On pourrait l'inspecter pour tricher… mais cherche d'abord par toi-même !

---

## Étape 1 : une boîte de la largeur du texte

L'unité `ch` vaut la largeur du caractère « 0 » de la police. Avec une police à **chasse fixe** (tous les caractères ont la même largeur, comme `Courier New`), 26 caractères mesurent exactement `26ch`. Le HTML fournit ce nombre dans une variable : `--chars: 26`.

**À faire** : sur `.typing`,

- largeur : `calc(var(--chars) * 1ch)` ;
- couper ce qui dépasse (`overflow: hidden`) et interdire le retour à la ligne (`white-space: nowrap`).

**Résultat attendu** : rien ne change à l'œil, mais le titre est maintenant dans une boîte exactement de sa taille.

## Étape 2 : l'écriture, lettre par lettre

Si la largeur de la boîte passe de 0 à 26 caractères, le texte se dévoile. Avec un easing normal, il glisserait en continu ; `steps(26)` découpe l'animation en 26 sauts : un caractère à la fois.

**À faire** : écrire une animation `typing` qui part d'une largeur de 0 (`from { width: 0; }`, l'arrivée est la largeur normale), et l'appliquer à `.typing` : 3 secondes, `steps(var(--chars))`.

**Résultat attendu** : le titre s'écrit lettre par lettre, puis reste affiché.

<details>
<summary>💡 Un indice ?</summary>

Sans `to`, une animation va jusqu'à la valeur normale de l'élément : ici, la largeur de l'étape 1.

</details>

## Étape 3 : le curseur

**À faire** : ajouter une bordure droite à `.typing` : `.12em solid #B10DC9`.

**Résultat attendu** : un curseur violet suit les lettres pendant qu'elles s'écrivent.

## Étape 4 : le curseur clignote

Un élément peut avoir plusieurs animations, séparées par des virgules : `animation: a 3s, b 1s;`.

**À faire** : écrire une animation `blink` qui rend la bordure transparente à 50 %, et l'ajouter à `.typing` en plus de `typing` : 0,7 s, `step-end` (pas de fondu, un clignotement net), à l'infini.

**Résultat attendu** : le titre s'écrit, puis le curseur clignote au bout du texte, comme dans un vieux terminal.

<details>
<summary>🆘 Le texte est coupé trop tôt ou trop tard ?</summary>

Le nombre `--chars` doit correspondre exactement au nombre de caractères du texte, espaces et ponctuation compris, et la police doit être à chasse fixe. Si tu changes le texte, compte à nouveau (ou demande à la console : `'Bonjour, je suis un robot.'.length`).

</details>

## Pour finir : les animations réduites

**À faire** : couper les animations et les transitions quand le système demande de réduire les animations :

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation: none !important;
        transition: none !important;
    }
}
```

Pour tester :

- **Firefox** : `about:config` > chercher `ui.prefersReducedMotion` > s'il n'existe pas, le créer en type **Nombre** > valeur `1`, puis recharger la page ; pour revenir à la normale, supprimer la préférence ;
- **Chrome, Edge** : outils de développement, menu ⋮ > More tools > Rendering, « Emulate CSS media feature prefers-reduced-motion » sur `reduce`, puis recharger la page.

## Pour aller plus loin

- Écrire puis effacer le texte en boucle (`animation-direction: alternate` et `infinite`, avec une pause en début et fin d'animation).
- Plusieurs lignes qui s'écrivent l'une après l'autre (`animation-delay`).
- La version JavaScript : ajouter les lettres une à une avec `setInterval` (voir l'[exercice 08](../../js/08-timers-et-boucle-d-animation/README.md)), utile quand le texte change.
