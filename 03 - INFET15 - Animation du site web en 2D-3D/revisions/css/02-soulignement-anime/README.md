[← Défis CSS](../README.md)

# 02 : le soulignement animé

Des liens de menu dont le soulignement se dessine de gauche à droite au survol.

**Ce que tu vas utiliser** : `::after`, `position: absolute`, `transform: scaleX()`, `transform-origin`, `transition`, `:focus-visible`.

## Démarrer

1. Ouvrir [`cible.html`](cible.html) dans le navigateur : c'est le **résultat attendu**. Observe-le bien (survol, clic, clavier).
2. Ouvrir [`index.html`](index.html) : la même page, sans animation.
3. Écrire ton CSS dans [`style.css`](style.css), sous le commentaire « À toi », et recharger `index.html` pour comparer avec la cible.

Le HTML est terminé, il n'y a rien à y modifier. La correction est dans [`correction.css`](correction.css) : `cible.html` l'utilise. On pourrait l'inspecter pour tricher… mais cherche d'abord par toi-même !

---

## Étape 1 : le lien sert de repère

Le trait sera un **pseudo-élément** `::after`, positionné en absolu. Un élément en `position: absolute` se place par rapport à son ancêtre positionné le plus proche.

**À faire** : donner `position: relative` aux liens du menu.

## Étape 2 : dessiner le trait

**À faire** : créer un `::after` sur les liens, avec :

- `content: ''` (sans lui, un pseudo-élément n'existe pas) ;
- `position: absolute`, collé en bas à gauche (`left: 0; bottom: 0`) ;
- toute la largeur du lien, 3 pixels de haut, une couleur de fond (`#B10DC9`).

**Résultat attendu** : tous les liens sont soulignés d'un trait violet, en permanence.

## Étape 3 : cacher le trait

`transform: scaleX(0)` écrase un élément horizontalement jusqu'à une largeur nulle ; `scaleX(1)` lui rend sa taille. L'avantage : ça s'anime très bien.

**À faire** : écraser le trait (`scaleX(0)`) et ajouter une transition de 0,3 s sur `transform`.

**Résultat attendu** : plus aucun trait visible.

## Étape 4 : le dessiner au survol

**À faire** : au survol du lien, et quand il a le focus au clavier (`:focus-visible`), remettre le trait à `scaleX(1)`.

**Résultat attendu** : au survol, le trait grandit… depuis le milieu. C'est joli, mais on veut qu'il parte de la gauche : c'est l'étape suivante.

## Étape 5 : de gauche à droite

`transform-origin` choisit le point fixe d'une transformation : `left` pour la gauche, `right` pour la droite. Par défaut, c'est le centre.

**À faire** : au survol, `transform-origin: left` ; au repos, `transform-origin: right`.

**Résultat attendu** : au survol, le trait se dessine de gauche à droite ; quand la souris s'en va, il s'efface vers la droite, comme s'il continuait son chemin.

<details>
<summary>💡 Un indice ?</summary>

L'origine utilisée est celle de l'état **d'arrivée** : `left` dans `:hover::after` pour l'aller, `right` dans `::after` pour le retour.

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

- Un trait qui part du centre et s'étend des deux côtés (`transform-origin: center`).
- Un fond qui remplit le lien de bas en haut (`scaleY` au lieu de `scaleX`, sur toute la hauteur, avec `z-index: -1`).
