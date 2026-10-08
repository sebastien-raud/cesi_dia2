// L'Atelier du Meuble : showroom 3D (Three.js)
// Une scène 3D, c'est : une scène (le monde), des objets (mesh = forme + matière),
// des lumières, une caméra (le point de vue) et un renderer (qui dessine le tout).

import * as THREE from 'three';

// La div qui accueille la scène : on prend sa taille pour le dessin
const container = document.querySelector('#showroom-view');

// ---------- La scène, la caméra, le renderer (fournis) ----------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3e9dc); // même fond que le site

// Caméra en perspective : angle de vue (degrés), proportions, distance mini et maxi de vision
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(0, 2, 5);  // x : droite, y : haut, z : vers nous
camera.lookAt(0, 0.6, 0);      // la caméra regarde le centre de la table

// Le renderer dessine la scène dans un <canvas>, ajouté dans la div
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// ---------- La table ----------

// Un groupe réunit plusieurs objets : on pourra tourner la table entière d'un coup
const table = new THREE.Group();
scene.add(table);

// La matière du bois, partagée par le plateau et les pieds
const wood = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });

// Étape 1 : le plateau
// TODO

// Étape 2 : les quatre pieds
// TODO

// Étape 3 : les lumières
// TODO

// ---------- La boucle de rendu ----------

// Appelée avant chaque image (environ 60 fois par seconde)
renderer.setAnimationLoop(() => {
    // Étape 4 : faire tourner la table
    // TODO

    renderer.render(scene, camera);
});

// Étape 5 : animer la caméra avec GSAP au clic sur le bouton
// TODO

// ---------- Adapter la scène quand la fenêtre change de taille (fourni) ----------

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix(); // à appeler après chaque changement de la caméra
    renderer.setSize(container.clientWidth, container.clientHeight);
});
