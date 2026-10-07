[← Défis CSS](../README.md)

# 04 : le menu burger

Trois barres qui se transforment en croix, et un menu qui glisse depuis la gauche.

**Ce que tu vas utiliser** : `transition`, `transform: translateY() rotate()`, `opacity`, `translate` du panneau, sélecteur de classe parente.

## Démarrer

1. Ouvrir [`cible.html`](cible.html) dans le navigateur : c'est le **résultat attendu**. Observe-le bien (survol, clic, clavier).
2. Ouvrir [`index.html`](index.html) : la même page, sans animation.
3. Écrire ton CSS dans [`style.css`](style.css), sous le commentaire « À toi », et recharger `index.html` pour comparer avec la cible.

Le HTML est terminé, il n'y a rien à y modifier. La correction est dans [`correction.css`](correction.css) : `cible.html` l'utilise. On pourrait l'inspecter pour tricher… mais cherche d'abord par toi-même !

---

Le JavaScript est **fourni**, dans `index.html` : au clic sur le burger, il ajoute ou retire la classe `menu-open` sur l'en-tête (`.header`). Tout le reste se fait en CSS, avec des sélecteurs du type `.menu-open .bar`.

## Étape 1 : préparer les barres

**À faire** : ajouter une transition de 0,3 s sur `transform` et `opacity` aux trois barres.

## Étape 2 : la croix

Les barres font 3 pixels de haut, séparées de 7 pixels : du centre d'une barre au centre de la suivante, il y a 10 pixels.

**À faire** : quand l'en-tête a la classe `menu-open` :

- la barre du haut descend de 10 pixels et tourne de 45° ;
- la barre du milieu disparaît (`opacity: 0`) ;
- la barre du bas remonte de 10 pixels et tourne de -45°.

**Résultat attendu** : au clic, le burger se transforme en croix ; au clic suivant, la croix redevient un burger.

<details>
<summary>💡 Un indice ?</summary>

`.menu-open .bar:nth-child(1) { transform: translateY(10px) rotate(45deg); }` : l'ordre compte, on descend d'abord, puis on tourne sur place.

</details>

## Étape 3 : le menu qui glisse

`translate: -100% 0` décale un élément de toute sa largeur vers la gauche : hors de l'écran. `visibility: hidden` le rend en plus inaccessible au clavier tant qu'il est fermé (contrairement à `display: none`, `visibility` s'anime avec une transition).

**À faire** :

- par défaut, cacher le menu à gauche (`translate: -100% 0`) et le rendre invisible (`visibility: hidden`), avec une transition de 0,3 s sur `translate` et `visibility` ;
- quand l'en-tête a la classe `menu-open`, ramener le menu à sa place (`translate: 0 0`) et le rendre visible.

**Résultat attendu** : au clic sur le burger, le menu glisse depuis la gauche pendant que les barres forment la croix ; au clic suivant, il repart.

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

- Faire apparaître les liens du menu un par un, en cascade (`transition-delay` différent pour chaque lien).
- Assombrir le reste de la page quand le menu est ouvert (un `::after` sur `body`, ou un élément dédié).
- Fermer le menu avec la touche `Échap` (une ligne de JavaScript en plus : `keydown`, `event.key === 'Escape'`).
