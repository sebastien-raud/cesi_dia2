# TP1 : Page d'accueil animée et responsive

## Contexte

> **De :** Sarah Bote, gérante · **Objet :** Notre site sur grand écran
>
> Bonjour,
>
> J'ai montré notre site à un client sur l'ordinateur de l'atelier. Notre table en chêne occupait tout l'écran, il a cru que c'était une table de banquet.
>
> Sur mon téléphone, en revanche, c'est très bien. Pourriez-vous le rendre agréable sur tous les écrans ? Et, si possible, un peu plus vivant : aujourd'hui, rien ne bouge.
>
> Sarah

Le site existe déjà : HTML complet, CSS pensé pour le mobile. Il reste à l'adapter aux grands écrans et à lui ajouter quelques animations utiles.

## Objectif

Rendre la page d'accueil responsive, puis ajouter des animations CSS : au survol des cartes et à l'arrivée sur la page.

## Prérequis

- Séquences « Rappel CSS : animer une page » et « Rappel CSS : responsive et frameworks » ;
- un navigateur avec ses outils de développement (`F12`).

## Ce qui est fourni

Le dossier `01-depart/` :

```text
01-depart/
  index.html      la page, à ne pas modifier dans ce TP
  css/style.css   le style, mobile uniquement : c'est ici que vous travaillez
  js/main.js      vide pour l'instant
  images/         les illustrations des meubles
```

Le HTML est **sémantique** : chaque balise dit ce que contient la zone.

| Balise | Rôle dans la page |
| --- | --- |
| `header` | en-tête : logo et navigation |
| `nav` | navigation principale (nommée par `aria-label`) |
| `main` | contenu principal, un seul par page |
| `section` | une partie de la page, avec son titre `h2` |
| `article` | un contenu autonome : ici, une carte produit |
| `ol` | liste ordonnée : les étapes du savoir-faire se suivent |
| `footer`, `address` | pied de page et coordonnées |

Il est aussi **accessible** :

- `lang="fr"` : la langue, pour la prononciation des lecteurs d'écran ;
- un seul `h1`, puis des `h2` et des `h3` : un plan de page lisible ;
- `alt` sur chaque image : sa description, pour ceux qui ne la voient pas ;
- lien « Aller au contenu » : visible au premier appui sur `Tab`, il saute la navigation ;
- focus visible : on voit toujours où l'on est au clavier ;
- couleurs contrastées.

Le fichier `style.css` est commenté et utilise des **variables** (`--color-wood`, `--spacing`...) : réutilisez-les.

## Travail demandé

1. Ouvrir `01-depart/index.html` dans le navigateur, puis passer en mode responsive (`Ctrl + Maj + M`) : comparer l'affichage à 390 px et à 1280 px de large.
2. Limiter la largeur du contenu des sections « Nos meubles » et « Notre savoir-faire » à `1100px`, centré.
3. Afficher la grille des meubles sur **2 colonnes** à partir de 600 px de large, puis sur **3 colonnes** à partir de 960 px.
4. À partir de 960 px : mettre l'en-tête sur une ligne (logo à gauche, navigation à droite) et les trois étapes du savoir-faire côte à côte.
5. Au survol d'une carte produit : la soulever légèrement et agrandir son ombre, avec une transition de 0,3 s.
6. Faire apparaître le titre, le slogan puis le bouton du bandeau d'accueil l'un après l'autre, au chargement de la page (fondu + léger mouvement vers le haut).

<details>
<summary>💡 Par où commencer pour le responsive ?</summary>

Le CSS actuel est écrit pour le mobile. On ne le modifie pas : on **ajoute** des règles pour les grands écrans, dans des media queries en fin de fichier.

```css
@media (min-width: 600px) {
    /* règles appliquées à partir de 600px de large */
}
```

<details>
<summary>🆘 Toujours coincé ?</summary>

La grille est déjà en `display: grid`. Il suffit de changer son nombre de colonnes :

```css
@media (min-width: 600px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

Pour l'en-tête sur une ligne : `display: flex`, `justify-content: space-between`, `align-items: center`.

</details>
</details>

<details>
<summary>💡 La carte se soulève d'un coup, sans douceur ?</summary>

La `transition` se déclare sur l'état **normal** (`.product-card`), pas sur `:hover`. Sinon, l'animation ne joue que dans un sens.

<details>
<summary>🆘 Toujours coincé ?</summary>

```css
.product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
```

Pourquoi `transform` plutôt que `margin-top` : la carte bouge sans décaler ses voisines, et l'animation reste fluide.

</details>
</details>

<details>
<summary>💡 Mon titre apparaît, disparaît, puis rejoue son animation ?</summary>

Avec un délai (`animation-delay`), l'élément est affiché normalement **avant** le début de l'animation. La valeur `both` (`animation-fill-mode`) le garde dans l'état de départ pendant le délai, puis dans l'état final à la fin.

<details>
<summary>🆘 Toujours coincé ?</summary>

```css
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero h1 {
    animation: fade-in-up 0.6s ease-out both;
}

.hero-tagline {
    animation: fade-in-up 0.6s ease-out 0.2s both; /* 0.2s : le délai */
}
```

</details>
</details>

### Pour aller plus loin

7. Au clavier, la carte ne se soulève pas quand son bouton a le focus : corriger avec `:focus-within`.
8. Faire « respirer » le bouton « Découvrir nos meubles » en boucle (léger agrandissement, puis retour), après son apparition.
9. Couper toutes les animations pour les personnes qui le demandent.

<details>
<summary>🔑 La réponse (point 9)</summary>

Certaines personnes sont gênées par le mouvement (vertiges, troubles de l'attention) et le signalent dans les réglages de leur système. Le CSS le détecte :

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation: none !important;
        transition: none !important;
    }
}
```

Pour tester sans changer les réglages du système :

- **Firefox** : `about:config` › chercher `ui.prefersReducedMotion` › s'il n'existe pas, le créer en type **Nombre** › valeur `1` (réduire), puis recharger la page. Pour revenir à la normale, supprimer la préférence (ou valeur `0`) ;
- **Chrome, Edge** : outils de développement › `Ctrl + Maj + P` › « Emulate CSS prefers-reduced-motion ».

</details>

## Points de vigilance

- Ne pas toucher au HTML : tout se fait dans `style.css` ;
- animer `transform` et `opacity`, pas `width`, `top` ou `margin` (moins fluide, et ça décale les voisins) ;
- une animation doit servir : attirer l'œil sur l'essentiel, montrer qu'un élément réagit ; trois animations bien choisies valent mieux que dix ;
- après chaque modification, recharger la page (`F5`) et vérifier à plusieurs largeurs.

## Résultat attendu

- À 390 px : une colonne, comme au départ ;
- à 700 px : deux colonnes de meubles ;
- à 1280 px : en-tête sur une ligne, trois colonnes de meubles centrées, trois étapes côte à côte ;
- les cartes se soulèvent au survol, en douceur ;
- au chargement, le titre, le slogan et le bouton arrivent l'un après l'autre ;
- aucune erreur dans la console.
