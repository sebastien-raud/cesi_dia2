# Démo : Boucle de jeu et Phaser

## Objectif

Faire comprendre la boucle de jeu en l'écrivant à la main (canvas 2D, `requestAnimationFrame`), puis montrer tout ce qu'un moteur comme Phaser prend en charge, avant le TP4.

## Points clés à faire passer

- un canvas est une surface de pixels : on efface et on redessine tout, à chaque image ;
- la boucle : lire les entrées → mettre à jour → dessiner, environ 60 fois par seconde (`requestAnimationFrame`) ;
- la « physique » à la main, c'est quelques additions (vitesse, gravité, rebond), mais tout est à écrire ;
- Phaser fournit la boucle (`update`), la physique (gravité, rebonds, collisions), les entrées et le chargement des images ;
- une Scene Phaser : `preload`, `create`, `update`.

## Projet

Le projet est dans `projet/` : `boucle.html` (sans bibliothèque) et `phaser.html` (Phaser par CDN). Les deux s'ouvrent dans le navigateur (double-clic) : aucune image n'est chargée, Live Server n'est pas nécessaire ici.

## Déroulé détaillé

### 1. La boucle à la main

Ouvrir `boucle.html` : la balle tombe et rebondit ; les flèches ← → la poussent.

Ouvrir `boucle.js` et suivre les trois fonctions : `update` (vitesses, gravité, rebonds), `draw` (effacer, redessiner), `loop` (les deux, puis `requestAnimationFrame(loop)`).

→ Commenter `ctx.clearRect(...)` et recharger : la balle laisse une traînée, preuve qu'on redessine tout à chaque image. Remettre la ligne.

Changer `GRAVITY` (0.1 puis 1) et `BOUNCE` (1 puis 0.3) : tout le « comportement » tient dans ces nombres.

### 2. La même chose avec Phaser

Ouvrir `phaser.html` et cliquer plusieurs fois dans le cadre : chaque clic ajoute une balle, qui rebondit et **se cogne aux autres**.

Ouvrir `phaser.js` : pas de `requestAnimationFrame`, pas de calcul de rebond ; la gravité est dans la configuration, les collisions en une ligne (`this.physics.add.collider`).

→ Décommenter `debug: true` dans la configuration et recharger : Phaser affiche les corps physiques et leur vitesse.

### 3. Faire le lien avec le TP4

Montrer les trois méthodes de la Scene : le TP4 utilisera `preload` pour les images, `create` pour placer le chariot, `update` pour le déplacer au clavier.

## Piège à éviter

Ne pas entrer dans le détail de l'API Phaser : le TP4 fournit la structure et des aides graduées. L'objectif ici est de comprendre **pourquoi** un moteur de jeu existe, pas de l'apprendre en entier.
