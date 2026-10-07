[← Défis CSS](../README.md)

# 03 : le loader à trois points

Trois points qui sautent l'un après l'autre, en vague.

**Ce que tu vas utiliser** : `@keyframes`, `animation`, `animation-delay`, `:nth-child()`, `transform`, `opacity`.

## Démarrer

1. Ouvrir [`cible.html`](cible.html) dans le navigateur : c'est le **résultat attendu**. Observe-le bien (survol, clic, clavier).
2. Ouvrir [`index.html`](index.html) : la même page, sans animation.
3. Écrire ton CSS dans [`style.css`](style.css), sous le commentaire « À toi », et recharger `index.html` pour comparer avec la cible.

Le HTML est terminé, il n'y a rien à y modifier. La correction est dans [`correction.css`](correction.css) : `cible.html` l'utilise. On pourrait l'inspecter pour tricher… mais cherche d'abord par toi-même !

---

## Étape 1 : un saut

**À faire** : écrire une animation `bounce` : à 30 % de sa durée, le point est remonté (`translateY(-1.75rem)`) et un peu transparent (`opacity: .5`) ; à 0 %, 60 % et 100 %, il est à sa place et opaque.

<details>
<summary>💡 Un indice ?</summary>

Le point reste immobile de 60 % à 100 % : c'est cette petite pause qui donne le rythme.

</details>

## Étape 2 : les points sautent

**À faire** : appliquer l'animation aux trois `.dot` : 1,2 s, `ease-in-out`, à l'infini.

**Résultat attendu** : les trois points sautent… tous en même temps. Ça ressemble plus à un tremblement qu'à une vague.

## Étape 3 : la vague

`animation-delay` retarde le départ d'une animation. `:nth-child(2)` cible le deuxième enfant de son parent.

**À faire** : retarder le deuxième point de 0,15 s et le troisième de 0,3 s.

**Résultat attendu** : les points sautent l'un après l'autre, en vague, comme la célèbre animation « quelqu'un est en train d'écrire… ».

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

- Remplacer les `:nth-child` par une variable : `style="--i: 1"` sur chaque point dans le HTML, et `animation-delay: calc(var(--i) * .15s)` dans le CSS.
- Faire changer les points de couleur pendant le saut.
- Un autre loader : un cercle dont seul un quart de la bordure est coloré, qui tourne (`border-top-color`, `rotate`).
