// Démo : une scène Three.js minimale, puis animée avec GSAP
// Scène (le monde) + objets (forme + matière) + lumières + caméra + renderer.

import * as THREE from 'three';

// Étapes de la démo : passer à false pour voir la scène sans lumière, puis sans rotation
const WITH_LIGHTS = true;
const WITH_ROTATION = true;

const view = document.querySelector('#view'); // le bloc HTML qui accueille la 3D (sa taille vient du CSS)

// ---------- La scène ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f2933); // couleur de fond, en hexadécimal (0x au lieu de #)

// ---------- La caméra : angle de vue, proportions, distances mini et maxi ----------
// 50° d'ouverture ; largeur / hauteur du bloc (sinon l'image est déformée) ; rien n'est dessiné à moins de 0,1 ni au-delà de 100
const camera = new THREE.PerspectiveCamera(50, view.clientWidth / view.clientHeight, 0.1, 100);
camera.position.set(0, 1.5, 6); // x vers la droite, y vers le haut, z vers nous : un peu en hauteur, en recul
camera.lookAt(0, 0, 0);         // elle regarde le centre de la scène

// ---------- Le renderer : il dessine la scène, vue par la caméra, dans un canvas ----------
const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias : bords lissés, sans escaliers
renderer.setSize(view.clientWidth, view.clientHeight);         // le canvas prend la taille du bloc
view.appendChild(renderer.domElement);                         // domElement : le <canvas>, ajouté dans la page

// ---------- Deux cubes : même forme, matières différentes ----------
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5); // la forme : largeur, hauteur, profondeur

// Basic : une couleur unie, sans tenir compte de la lumière (aucune impression de relief)
const basicCube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
basicCube.position.x = -1.5; // à gauche du centre
scene.add(basicCube);        // un objet n'apparaît que s'il est ajouté à la scène

// Standard : réagit à la lumière (faces claires et sombres) ; sans lumière, il est noir
const standardCube = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
standardCube.position.x = 1.5; // à droite du centre
scene.add(standardCube);

// ---------- Les lumières ----------
if (WITH_LIGHTS) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));     // un peu partout
    const sun = new THREE.DirectionalLight(0xffffff, 2);  // depuis une direction
    sun.position.set(2, 4, 3);                            // en haut à droite, devant : éclaire vers le centre
    scene.add(sun);
}

// ---------- Un sol, pour se repérer ----------
const grid = new THREE.GridHelper(10, 10, 0x52606d, 0x3e4c59); // 10 × 10 unités, 10 cases par côté, couleur des lignes centrales, couleur des autres lignes
grid.position.y = -0.75; // sous les cubes : la moitié de leur hauteur (1,5)
scene.add(grid);

// ---------- La boucle de rendu : avant chaque image ----------
// setAnimationLoop : l'équivalent de requestAnimationFrame, géré par Three.js
renderer.setAnimationLoop(() => {
    if (WITH_ROTATION) {
        basicCube.rotation.y += 0.01;     // angles en radians : un tour complet = 2 × Math.PI (environ 6,28)
        standardCube.rotation.y += 0.01;
        standardCube.rotation.x += 0.005;
    }
    renderer.render(scene, camera);       // dessiner la scène, vue par la caméra
});

// ---------- GSAP anime aussi les objets 3D : ce sont des objets JavaScript ----------
view.addEventListener('click', () => {
    // Un tableau de cibles : les positions des deux cubes, animées l'une après l'autre (stagger)
    gsap.to([basicCube.position, standardCube.position], {
        y: 1.5,         // monter à 1,5 au-dessus du centre
        duration: 0.4,
        ease: 'power2.out',
        yoyo: true,     // aller-retour
        repeat: 1,      // l'aller, puis une fois le retour
        stagger: 0.15,  // le second cube saute un peu après le premier
    });
});

// ---------- Pour jouer dans la console : demo.camera.position.z = 3, etc. ----------
window.demo = { scene, camera, basicCube, standardCube };
