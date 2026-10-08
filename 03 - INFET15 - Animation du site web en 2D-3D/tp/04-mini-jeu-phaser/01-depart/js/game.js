// L'Atelier du Meuble : jeu-concours « Attrapez les meubles » (Phaser 4)
// Le jeu est une Scene, avec trois méthodes appelées par Phaser :
//   preload() : charger les images, une seule fois au début ;
//   create()  : placer les objets du jeu, une seule fois ;
//   update()  : à chaque image (environ 60 fois par seconde), faire évoluer le jeu.

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const CART_SPEED = 400;  // vitesse du chariot, en pixels par seconde
const FALL_SPEED = 200;  // vitesse de chute des meubles

class GameScene extends Phaser.Scene {
    constructor() {
        super('game'); // nom de la scène
    }

    preload() {
        // Chaque image reçoit une clé, utilisée ensuite pour créer les objets
        this.load.image('cart', 'images/game/cart.svg');
        this.load.image('chair', 'images/game/chair.svg');
        this.load.image('stool', 'images/game/stool.svg');
        this.load.image('table', 'images/game/table.svg');
        this.load.image('broken-chair', 'images/game/broken-chair.svg');
    }

    create() {
        this.score = 0;

        // Le chariot : un objet physique (il a une vitesse, il peut toucher d'autres objets)
        this.cart = this.physics.add.image(GAME_WIDTH / 2, GAME_HEIGHT - 40, 'cart');
        this.cart.setCollideWorldBounds(true); // il ne sort pas de l'écran

        // Le score, affiché en haut à gauche
        this.scoreText = this.add.text(16, 16, 'Score : 0', { fontSize: '24px', color: '#5c3a1e' });

        // Étape 1 : les flèches du clavier
        // TODO

        // Étape 2 : un groupe qui contiendra tous les meubles qui tombent
        // TODO

        // Étape 2 : un nouveau meuble toutes les secondes, sans fin
        // TODO

        // Étape 3 : quand le chariot touche un meuble, appeler catchFurniture
        // TODO
    }

    update() {
        // Étape 1 : déplacer le chariot selon la flèche enfoncée
        // TODO
    }

    // Étape 2 : faire tomber un meuble au hasard, à une position au hasard
    dropFurniture() {
        // TODO
    }

    // Étape 3 : un meuble attrapé disparaît et rapporte un point
    catchFurniture(cart, item) {
        // TODO
    }
}

// Configuration du jeu
const config = {
    type: Phaser.AUTO,           // WebGL si possible, sinon canvas 2D
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game',              // id de la div qui accueille le canvas
    backgroundColor: '#f3e9dc',
    physics: {
        default: 'arcade',       // physique simple : vitesses et chevauchements
    },
    scale: {
        mode: Phaser.Scale.FIT,  // le jeu garde ses proportions et remplit la largeur disponible
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    scene: GameScene,
};

// Lancer le jeu (la variable game permet aussi de l'inspecter dans la console)
const game = new Phaser.Game(config);
