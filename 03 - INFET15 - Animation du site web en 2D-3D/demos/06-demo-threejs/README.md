# Démo : Three.js

## Objectif

Montrer les briques d'une scène 3D (scène, caméra, renderer, mesh, lumière, boucle de rendu) et le lien avec GSAP, avant le TP5.

## Points clés à faire passer

- un objet 3D (`Mesh`) = une forme (`Geometry`) + une matière (`Material`) ;
- `MeshBasicMaterial` ignore la lumière (aucun relief) ; `MeshStandardMaterial` y réagit, et reste **noir sans lumière** ;
- la caméra, c'est le point de vue : position, direction (`lookAt`), angle ;
- la boucle de rendu redessine la scène avant chaque image : on y déplace, on n'y crée rien ;
- GSAP anime n'importe quelle propriété d'un objet JavaScript, donc aussi `mesh.position`.

## Projet

Le projet est dans `projet/` : `index.html`, `style.css` et `scene.js` (un module ES). L'ouvrir avec **Live Server** : un module ne se charge pas en `file://`. Connexion Internet nécessaire (Three.js et GSAP par CDN).

## Déroulé détaillé

### 1. Les briques

Ouvrir la page : deux cubes bleus tournent au-dessus d'une grille. Parcourir `scene.js` dans l'ordre : scène, caméra, renderer, cubes, lumières, sol, boucle.

→ Les deux cubes ont la même forme (`geometry` partagée) et la même couleur : seule la matière change. À gauche, un aplat ; à droite, du relief.

### 2. Sans lumière

Dans `scene.js`, passer `WITH_LIGHTS` à `false` et enregistrer.

→ Le cube de droite devient noir, celui de gauche ne change pas. C'est le piège le plus fréquent du TP5. Remettre `true`.

### 3. La caméra, en direct

Dans la console, taper `demo.camera.position.z = 3`, puis `demo.camera.position.y = 5` : la caméra se rapproche, puis monte. Taper `demo.camera.lookAt(0, 0, 0)` pour qu'elle regarde de nouveau le centre.

Passer `WITH_ROTATION` à `false` : la scène est figée, mais toujours redessinée à chaque image. Remettre `true`.

### 4. GSAP et la 3D

Cliquer dans la scène : les deux cubes sautent l'un après l'autre.

→ Dans `scene.js`, montrer le `gsap.to` sur `position` : les mêmes options qu'au TP3 (`yoyo`, `repeat`, `stagger`). C'est exactement ce que le TP5 fait avec la caméra.

## Piège à éviter

Ne pas construire de meuble dans la démo : c'est le TP5. Rester sur des cubes, pour que la démo reste courte et que le TP garde sa découverte.
