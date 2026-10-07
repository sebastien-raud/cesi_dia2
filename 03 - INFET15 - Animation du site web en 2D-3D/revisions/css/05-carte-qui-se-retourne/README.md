[← Défis CSS](../README.md)

# 05 : la carte qui se retourne

Des cartes devinettes qui pivotent en 3D pour montrer la réponse.

**Ce que tu vas utiliser** : `perspective`, `transform-style: preserve-3d`, `backface-visibility`, `rotateY()`, `transition`, `:hover`, `:focus-visible`.

## Démarrer

1. Ouvrir [`cible.html`](cible.html) dans le navigateur : c'est le **résultat attendu**. Observe-le bien (survol, clic, clavier).
2. Ouvrir [`index.html`](index.html) : la même page, sans animation.
3. Écrire ton CSS dans [`style.css`](style.css), sous le commentaire « À toi », et recharger `index.html` pour comparer avec la cible.

Le HTML est terminé, il n'y a rien à y modifier. La correction est dans [`correction.css`](correction.css) : `cible.html` l'utilise. On pourrait l'inspecter pour tricher… mais cherche d'abord par toi-même !

---

Une carte est faite d'un bouton (`.card`), qui contient un intérieur (`.card-inner`), qui contient deux faces superposées : le devant (`.front`) et le dos (`.back`). C'est l'intérieur qui va tourner.

## Étape 1 : le retournement, sans 3D

**À faire** : au survol de la carte, faire tourner `.card-inner` d'un demi-tour sur l'axe vertical (`transform: rotateY(180deg)`), avec une transition de 0,6 s.

**Résultat attendu** : la carte tourne… mais à plat, comme si elle s'écrasait puis s'étirait, et on voit la réponse à l'envers. Les étapes suivantes ajoutent la 3D.

## Étape 2 : la perspective

`perspective` place un œil virtuel à une certaine distance : plus elle est petite, plus l'effet 3D est fort. Elle se met sur le **parent** de ce qui tourne.

**À faire** : donner `perspective: 1000px` à `.card`.

**Résultat attendu** : la carte tourne maintenant en profondeur, comme une vraie carte.

## Étape 3 : les deux faces

Pour l'instant, on voit toujours le dessus de la pile. Il faut trois réglages :

- `transform-style: preserve-3d` sur `.card-inner` : ses enfants restent en 3D quand il tourne ;
- `backface-visibility: hidden` sur les deux faces : une face vue de dos devient invisible ;
- `transform: rotateY(180deg)` sur `.back` : le dos est retourné dès le départ, prêt à être vu quand la carte aura fait son demi-tour.

**À faire** : ajouter ces trois réglages.

**Résultat attendu** : au survol, la carte se retourne et montre la réponse, à l'endroit.

## Étape 4 : au clavier aussi

**À faire** : retourner aussi la carte quand elle a le focus au clavier (`.card:focus-visible .card-inner`).

**Résultat attendu** : avec la touche `Tab`, chaque carte se retourne quand elle reçoit le focus.

<details>
<summary>🆘 La carte tourne mais la réponse ne s'affiche pas ?</summary>

Vérifie que `transform-style: preserve-3d` est bien sur `.card-inner` (l'élément qui tourne), et `backface-visibility: hidden` sur **les deux** faces.

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

- Retourner la carte au clic plutôt qu'au survol (une classe ajoutée en JavaScript, comme dans l'[exercice 05](../../js/05-classes-et-animations-css/README.md)).
- Retourner sur l'axe horizontal (`rotateX`), comme une page de calendrier.
- Ajouter une légère ombre qui grandit pendant la rotation.
