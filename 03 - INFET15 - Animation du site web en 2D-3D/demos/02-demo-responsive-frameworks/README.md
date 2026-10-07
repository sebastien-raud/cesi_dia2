# Démo : Responsive et frameworks

## Objectif

Rappeler la démarche responsive (mobile first, flexbox, grid, media queries) et montrer ce qu'apporte une bibliothèque CSS toute faite (Animate.css), avant le TP1.

## Points clés à faire passer

- `<meta name="viewport">` : sans elle, pas de responsive sur téléphone ;
- mobile first : le CSS de base vise le mobile, les media queries `min-width` **ajoutent** pour les grands écrans ;
- flexbox pour une dimension (une ligne de liens), grid pour deux (une grille de cartes) ;
- un framework fait gagner du temps, mais il faut comprendre le CSS en dessous pour l'adapter.

## Projet

Le projet est dans `projet/` : `index.html` et `style.css`. L'ouvrir dans le navigateur (double-clic), avec une connexion Internet (Animate.css est chargé par CDN).

## Déroulé détaillé

### 1. Le mobile d'abord

Ouvrir la page, puis le mode responsive des outils de développement (`Ctrl + Maj + M`), à 390 px de large.

→ Une colonne de cartes, les liens sous le titre. Dans `style.css`, montrer l'étape 1 : aucune media query.

### 2. Élargir

Faire glisser la largeur de 390 px à 1200 px.

→ À 600 px, deux colonnes ; à 960 px, trois colonnes et l'en-tête sur une ligne. Montrer les deux media queries (étapes 2 et 3).

Commenter la balise `viewport` dans `index.html`, recharger en mode téléphone : la page est minuscule. La remettre.

### 3. Sans media query

Décommenter le bloc « Pour aller plus loin » en fin de `style.css`, recharger et refaire glisser la largeur.

→ La grille choisit seule son nombre de colonnes (`auto-fill`, `minmax`). Le recommenter.

### 4. Animate.css

Recharger la page : le titre descend, les cartes montent, les trois dernières une seconde après.

→ Aucune ligne de CSS écrite : deux classes dans le HTML (`animate__animated animate__fadeInUp`), une troisième pour le délai. Ouvrir [animate.style](https://animate.style/) et changer `fadeInUp` pour une autre animation sur une carte.

### 5. Et les frameworks de mise en page ?

Ouvrir rapidement les sites de [Bootstrap](https://getbootstrap.com/) (composants prêts à l'emploi, grille) et de [Tailwind](https://tailwindcss.com/) (classes utilitaires) : même principe que Animate.css, des classes à ajouter dans le HTML.

## Piège à éviter

Ne pas utiliser Animate.css dans les TP : le TP1 fait écrire les animations à la main, pour comprendre ce que la bibliothèque cache. La démo montre l'outil, pas le raccourci.
