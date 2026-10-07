[← Défis CSS](../README.md)

# 01 : le bouton « J'aime »

Un cœur qui bat, un bouton qui se soulève au survol et s'enfonce au clic.

**Ce que tu vas utiliser** : `@keyframes`, `animation`, `transform: scale()`, `transition`, `:hover`, `:active`.

## Démarrer

1. Ouvrir [`cible.html`](cible.html) dans le navigateur : c'est le **résultat attendu**. Observe-le bien (survol, clic, clavier).
2. Ouvrir [`index.html`](index.html) : la même page, sans animation.
3. Écrire ton CSS dans [`style.css`](style.css), sous le commentaire « À toi », et recharger `index.html` pour comparer avec la cible.

Le HTML est terminé, il n'y a rien à y modifier. La correction est dans [`correction.css`](correction.css) : `cible.html` l'utilise. On pourrait l'inspecter pour tricher… mais cherche d'abord par toi-même !

---

## Étape 1 : le battement de cœur

Une animation `@keyframes` décrit des étapes, en pourcentage de sa durée. Un vrai battement de cœur, c'est deux pulsations rapprochées, puis une pause.

**À faire** : écrire une animation `heartbeat` qui agrandit le cœur (`transform: scale(1.3)`) à 10 % et 30 % de sa durée, un peu moins à 20 % (`scale(1.1)`), et le laisse à sa taille normale (`scale(1)`) à 0 %, 40 % et 100 %.

<details>
<summary>💡 Un indice ?</summary>

Plusieurs pourcentages peuvent partager la même étape : `0%, 40%, 100% { transform: scale(1); }`.

</details>

## Étape 2 : faire battre le cœur

**À faire** : appliquer l'animation au `.heart`, avec une durée de 1,4 s, répétée à l'infini.

**Résultat attendu** : le cœur bat… ou pas ! S'il ne bouge pas, lis l'aide.

<details>
<summary>🆘 Le cœur ne bouge pas ?</summary>

Un `<span>` est un élément « en ligne » (`display: inline`), et `transform` ne s'applique pas aux éléments en ligne. Il faut lui donner `display: inline-block`.

</details>

## Étape 3 : le bouton se soulève au survol

**À faire** : au survol, remonter le bouton de 4 pixels (`translateY(-4px)`) et allonger son ombre (`box-shadow: 0 10px 0 #A61E4D`), le tout en douceur (`transition` de 0,2 s).

<details>
<summary>💡 Un indice ?</summary>

La `transition` se déclare sur `.like` (l'état de départ), pas sur `.like:hover` : sinon, l'effet serait doux à l'aller, mais brutal au retour.

</details>

## Étape 4 : le bouton s'enfonce au clic

**À faire** : pendant le clic (`:active`), descendre le bouton de 4 pixels et raccourcir son ombre (`0 2px 0`).

**Résultat attendu** : le bouton se soulève au survol et s'enfonce au clic, comme une vraie touche.

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

- Faire tourner légèrement le cœur pendant ses battements (`rotate`).
- Au clic, faire grossir le cœur d'un coup puis revenir (une seconde animation, déclenchée par une classe ajoutée en JavaScript, comme dans l'[exercice 05](../../js/05-classes-et-animations-css/README.md)).
