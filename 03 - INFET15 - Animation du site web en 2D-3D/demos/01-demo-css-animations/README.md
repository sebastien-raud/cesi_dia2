# Démo : Animer en CSS

## Objectif

Réactiver, en quelques minutes et en direct, les trois outils d'animation du CSS (`transform`, `transition`, `@keyframes`) et `prefers-reduced-motion`, avant le TP1.

## Points clés à faire passer

- `transform` déplace, agrandit, tourne, sans décaler les éléments voisins ; l'ordre des fonctions compte ;
- `transition` fait passer d'un état à un autre : il faut un déclencheur (`:hover`, une classe) ; elle se déclare sur l'état normal ;
- l'easing change la sensation, pas la durée ;
- `@keyframes` + `animation` : une animation qui se joue seule, en boucle ou non ;
- animer `transform` et `opacity` : fluide ; animer `width`, `top`, `margin` : à éviter ;
- `prefers-reduced-motion` : respecter les personnes gênées par le mouvement.

## Projet

Le projet est dans `projet/` : une page `index.html` et sa feuille `style.css`. L'ouvrir directement dans le navigateur (double-clic), puis ouvrir `style.css` à côté, dans VS Code.

## Déroulé détaillé

### 1. transform

Survoler les quatre carrés bleus : `translate`, `scale`, `rotate`, `skew`.

→ Faire remarquer que les voisins ne bougent pas : `transform` ne change pas la mise en page.

Montrer les deux carrés « L'ordre compte » : mêmes fonctions, ordre inversé, positions différentes. Dans `style.css`, inverser l'ordre sur l'un des deux et recharger.

### 2. transition

Survoler « sans transition » puis « avec transition » : même état final, l'un saute, l'autre glisse.

Dans `style.css`, déplacer la `transition` de `.box-with-transition` vers `.box-with-transition:hover`, recharger, survoler puis quitter le carré.

→ L'animation ne joue plus qu'à l'aller : la transition se déclare sur l'état normal. Remettre la règle en place.

Survoler la piste « Easing » : les quatre balles partent et arrivent en même temps, mais n'accélèrent pas de la même façon ; `cubic-bezier` dépasse puis revient.

### 3. @keyframes

Montrer les trois animations qui tournent seules : chargement (`spin`, `linear`), balle (`bounce`, étapes en pourcentage), carré (`pulse`, propriétés `animation-*` détaillées).

Dans `style.css`, changer `infinite` en `3` sur la balle (elle s'arrête après trois rebonds), puis `linear` en `ease-in-out` sur le chargement (il hésite à chaque tour : pour une rotation continue, `linear`).

### 4. prefers-reduced-motion

Activer le réglage dans le navigateur :

- **Firefox** : `about:config` › chercher `ui.prefersReducedMotion` › s'il n'existe pas, le créer en type **Nombre** › valeur `1` (réduire), puis recharger la page. Pour revenir à la normale, supprimer la préférence (ou valeur `0`) ;
- **Chrome, Edge** : outils de développement › `Ctrl + Maj + P` › « Emulate CSS prefers-reduced-motion: reduce ».

→ Tout s'arrête, y compris les transitions au survol. Montrer la règle en fin de `style.css`.

## Piège à éviter

Ne pas refaire un cours complet de CSS : c'est un rappel des jours 1 et 2, à caler sur les résultats du quiz diagnostic. Si le groupe est à l'aise, aller vite sur les parties 1 et 2 et passer du temps sur `@keyframes` et l'easing.
