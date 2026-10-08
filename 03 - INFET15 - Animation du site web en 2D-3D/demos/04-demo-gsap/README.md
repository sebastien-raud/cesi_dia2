# Démo : GSAP

## Objectif

Montrer ce qu'une bibliothèque d'animation apporte par rapport au CSS : trois méthodes, une timeline qu'on pilote comme une vidéo, le décalage automatique (`stagger`), avant le TP3.

## Points clés à faire passer

- GSAP se charge par CDN, **avant** le script qui l'utilise ;
- `to` (vers), `from` (depuis, jusqu'à l'état du CSS), `fromTo` (les deux) ;
- une timeline enchaîne les animations sans calculer de délai ; le paramètre de position (`'<'`, `'+=0.5'`) règle les chevauchements ;
- une timeline se pilote : `play`, `pause`, `reverse`, `restart`, `progress` ;
- `stagger` décale chaque élément d'une sélection, en une ligne.

## Projet

Le projet est dans `projet/` : `index.html`, `style.css` et `script.js`. L'ouvrir dans le navigateur (double-clic), avec une connexion Internet (GSAP est chargé par CDN).

## Déroulé détaillé

### 1. to, from, fromTo

Montrer `style.css` : aucune animation, seulement l'état normal des éléments. Cliquer sur « Jouer ».

→ `to` part de sa place et va à droite ; `from` arrive de la droite jusqu'à sa place ; `fromTo` part de 0 et tourne.

Cliquer une deuxième fois : `to` ne bouge plus (il est déjà arrivé), `from` et `fromTo` rejouent. Bonne question à poser au groupe : pourquoi ?

Dans la console, taper `gsap.version`, puis `gsap.to('h1', { color: 'red' })` : GSAP s'utilise même sans fichier.

### 2. Timeline

Cliquer sur « Lecture » : le carré monte et tourne, le cercle grossit **en même temps** que la barre s'allonge (`'<'`), une pause, puis les trois formes partent à droite, décalées.

Tester « Pause », « Inverser », « Recommencer », puis faire glisser la barre de progression.

→ Dans `script.js`, montrer qu'aucun délai n'est calculé à la main ; retirer `'<'` et recharger : la barre attend la fin du cercle.

### 3. stagger

Cliquer sur « Jouer » : les points tombent l'un après l'autre.

Dans `script.js`, remplacer `stagger: 0.08` par `stagger: { each: 0.08, from: 'center' }`, recharger : l'animation part du milieu.

## Piège à éviter

Ne pas mélanger une animation CSS et GSAP sur la même propriété d'un même élément (souvent `transform`) : le CSS l'emporte, GSAP semble ne rien faire. C'est le point de vigilance du TP3.
