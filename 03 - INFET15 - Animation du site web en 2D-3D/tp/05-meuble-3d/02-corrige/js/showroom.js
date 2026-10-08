// L'Atelier du Meuble : showroom 3D (Three.js)
// Une scène 3D, c'est : une scène (le monde), des objets (mesh = forme + matière),
// des lumières, une caméra (le point de vue) et un renderer (qui dessine le tout).

import * as THREE from 'three';
// Tourner autour de la table à la souris (un « addon » de Three.js)
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

// Étape 1 : le plateau, une boîte large (x), fine (y) et profonde (z), en mètres
const top = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 1.2), wood);
top.position.y = 1; // la position est celle du CENTRE de la boîte
table.add(top);

// Étape 2 : les quatre pieds, un par coin (x et z positifs ou négatifs)
const legPositions = [
    [-0.9, -0.5],
    [0.9, -0.5],
    [-0.9, 0.5],
    [0.9, 0.5],
];

legPositions.forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.95, 0.1), wood);
    leg.position.set(x, 0.475, z); // centre à mi-hauteur : le pied touche le sol (y = 0)
    table.add(leg);
});

// Étape 3 : les lumières. Sans lumière, un MeshStandardMaterial reste noir.
// Lumière ambiante : éclaire tout, un peu, de partout
scene.add(new THREE.AmbientLight(0xffffff, 1));
// Lumière directionnelle : comme le soleil, elle crée des faces claires et sombres
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(3, 5, 4);
scene.add(sun);

// ---------- Pour aller plus loin ----------

// Pas de rotation automatique si l'utilisateur préfère moins de mouvement
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tourner autour de la table en glissant avec la souris
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.6, 0); // le point autour duquel on tourne : le centre de la table
controls.enableZoom = false;    // la molette continue à faire défiler la page

// ---------- La boucle de rendu ----------

// Appelée avant chaque image (environ 60 fois par seconde)
renderer.setAnimationLoop(() => {
    // Étape 4 : faire tourner la table (angle en radians : 2 * Math.PI = un tour)
    if (!reduceMotion) {
        table.rotation.y += 0.005;
    }

    // Pour aller plus loin : les contrôles à la souris se mettent à jour à chaque image
    controls.update();

    renderer.render(scene, camera);
});

// Étape 5 : animer la caméra avec GSAP au clic sur le bouton.
// GSAP anime n'importe quelle propriété d'un objet JavaScript : ici camera.position.
const zoomButton = document.querySelector('.showroom-button');
let isClose = false;

zoomButton.addEventListener('click', () => {
    isClose = !isClose; // on inverse : de près ↔ vue d'ensemble

    gsap.to(camera.position, {
        x: isClose ? 1.2 : 0,
        y: isClose ? 1.6 : 2,
        z: isClose ? 2 : 5,
        duration: reduceMotion ? 0 : 1.5,
        ease: 'power2.inOut',
        // à chaque étape de l'animation, la caméra continue de regarder la table
        onUpdate: () => camera.lookAt(controls.target),
    });

    zoomButton.textContent = isClose ? "Vue d'ensemble" : 'Voir de près';
});

// ---------- Adapter la scène quand la fenêtre change de taille (fourni) ----------

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix(); // à appeler après chaque changement de la caméra
    renderer.setSize(container.clientWidth, container.clientHeight);
});
