# TP5 : Un meuble en 3D dans la page

## Contexte

> **De :** Ella Lavisse, comptable · **Objet :** Les retours de marchandise
>
> Bonjour,
>
> Ce trimestre, trois clients nous ont renvoyé une table : « elle ne ressemblait pas à la photo ». Chaque retour nous coûte le transport aller et retour.
>
> Sarah me dit qu'on peut montrer un meuble en 3D sur un site, et le faire tourner. Si les clients voient la table sous tous les angles avant d'acheter, je suis preneuse. Je ferai le calcul des économies moi-même.
>
> Ella

Une section « Showroom 3D » est prête en bas de la page d'accueil. Elle contient déjà une scène 3D vide : le fond s'affiche, mais il n'y a rien dedans.

## Objectif

Construire une scène 3D simple avec Three.js (un meuble, des lumières), l'animer, puis animer la caméra avec GSAP.

## Prérequis

- Séquence « Three.js : créer une scène 3D » ;
- TP3 (GSAP) ;
- VS Code et l'extension **Live Server** : obligatoire pour ce TP ;
- une connexion Internet (Three.js est chargé depuis un CDN).

## Ce qui est fourni

```text
01-depart/
  index.html        la page, avec la section #showroom, l'import map et js/showroom.js
  css/style.css     le style, dont celui de la section showroom
  js/showroom.js    la scène 3D : c'est ici que vous travaillez
```

Dans `showroom.js`, la scène, la caméra, le renderer, la boucle de rendu et l'adaptation à la taille de la fenêtre sont en place. Un groupe `table` et une matière `wood` sont prêts. Chaque endroit à compléter est marqué `// Étape N` puis `// TODO`.

Le repère 3D, en mètres :

```text
        y (haut)
        │
        │
        └────── x (droite)
       ╱
      z (vers nous)
```

## Travail demandé

1. Ouvrir `index.html` **avec Live Server** et descendre jusqu'au showroom : un rectangle beige, sans erreur dans la console.
2. **Étape 1 : le plateau.** Créer une boîte de 2 m de large, 0,1 m d'épaisseur et 1,2 m de profondeur, avec la matière `wood`, placée à 1 m de haut. L'ajouter au groupe `table`.
3. **Étape 2 : les pieds.** Créer quatre boîtes fines (0,1 × 0,95 × 0,1 m), une sous chaque coin du plateau, posées au sol.
4. **Étape 3 : les lumières.** Ajouter une lumière ambiante et une lumière directionnelle.
5. **Étape 4 : la rotation.** Dans la boucle de rendu, faire tourner doucement le groupe `table` autour de l'axe vertical.
6. **Étape 5 : la caméra.** Au clic sur « Voir de près », rapprocher la caméra de la table avec GSAP ; un second clic la ramène à sa place. Le texte du bouton suit : « Voir de près » ou « Vue d'ensemble ».

<details>
<summary>💡 Étape 1 : un objet 3D, c'est quoi ?</summary>

Un `Mesh` = une forme (`BoxGeometry(largeur, hauteur, profondeur)`) + une matière. Sa position est celle de son **centre**.

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
const top = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 1.2), wood);
top.position.y = 1;
table.add(top);
```

</details>
</details>

<details>
<summary>💡 Étape 1 faite, mais je ne vois rien, ou une forme noire ?</summary>

C'est normal : `MeshStandardMaterial` réagit à la lumière, et il n'y en a pas encore. Passez à l'étape 3, puis revenez.

</details>

<details>
<summary>💡 Étape 2 : où placer les pieds ?</summary>

Le plateau fait 2 m de large et 1,2 m de profondeur, centré sur 0 : ses coins sont vers x = ±1 et z = ±0,6. On place les pieds un peu à l'intérieur (±0,9 et ±0,5). Un pied fait 0,95 m de haut : pour qu'il touche le sol (y = 0), son centre est à mi-hauteur.

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
const legPositions = [
    [-0.9, -0.5],
    [0.9, -0.5],
    [-0.9, 0.5],
    [0.9, 0.5],
];

legPositions.forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.95, 0.1), wood);
    leg.position.set(x, 0.475, z);
    table.add(leg);
});
```

`[x, z]` dans les paramètres récupère directement les deux valeurs de chaque petit tableau.

</details>
</details>

<details>
<summary>💡 Étape 3 : quelles lumières ?</summary>

`AmbientLight` éclaire tout, un peu, de partout. `DirectionalLight` éclaire depuis une direction, comme le soleil : elle donne des faces claires et d'autres sombres, et c'est ce qui fait « 3D ».

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
scene.add(new THREE.AmbientLight(0xffffff, 1));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(3, 5, 4);
scene.add(sun);
```

</details>
</details>

<details>
<summary>💡 Étape 5 : GSAP sur une caméra ?</summary>

GSAP n'anime pas seulement du CSS : il anime n'importe quelle propriété numérique d'un objet JavaScript. `gsap.to(camera.position, { z: 2 })` fait avancer la caméra.

<details>
<summary>🆘 Toujours coincé ?</summary>

GSAP est déjà chargé par la page (TP3). Pendant le mouvement, la caméra doit continuer à regarder la table (`onUpdate`) :

```js
const zoomButton = document.querySelector('.showroom-button');
let isClose = false;

zoomButton.addEventListener('click', () => {
    isClose = !isClose;

    gsap.to(camera.position, {
        x: isClose ? 1.2 : 0,
        y: isClose ? 1.6 : 2,
        z: isClose ? 2 : 5,
        duration: 1.5,
        onUpdate: () => camera.lookAt(0, 0.6, 0),
    });

    zoomButton.textContent = isClose ? "Vue d'ensemble" : 'Voir de près';
});
```

</details>
</details>

### Pour aller plus loin

7. Laisser le visiteur tourner autour de la table à la souris, avec l'addon `OrbitControls` (déjà déclaré dans l'import map, `three/addons/`).
8. Ne pas faire tourner la table si l'utilisateur a demandé à réduire les animations.
9. Remplacer la table par un autre meuble du catalogue : tabouret, bibliothèque...

<details>
<summary>🔑 La réponse (point 7)</summary>

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.6, 0);  // le point autour duquel on tourne
controls.enableZoom = false;     // la molette continue à faire défiler la page
```

Puis, dans la boucle de rendu : `controls.update();`. Dans le `onUpdate` de GSAP, `camera.lookAt(controls.target)` remplace `camera.lookAt(0, 0.6, 0)`.

</details>

## Points de vigilance

- `showroom.js` est un **module** (`type="module"`) : il peut utiliser `import`, mais ne fonctionne pas en `file://` ; d'où Live Server ;
- les dimensions sont en mètres, les angles en radians : un tour complet vaut `2 * Math.PI`, soit environ 6,28 ;
- la rotation se fait sur le groupe `table`, pas sur chaque pièce : sinon, chaque pied tourne sur lui-même ;
- si la page devient lente, vérifier que rien n'est **créé** dans la boucle de rendu : on y déplace, on n'y fabrique pas.

## Résultat attendu

- Une table éclairée (plateau et quatre pieds), qui tourne lentement dans le showroom ;
- « Voir de près » rapproche la caméra en douceur, « Vue d'ensemble » la ramène ;
- l'intro du TP3, le menu du TP2 et le lien vers le jeu du TP4 fonctionnent toujours ;
- aucune erreur dans la console.
