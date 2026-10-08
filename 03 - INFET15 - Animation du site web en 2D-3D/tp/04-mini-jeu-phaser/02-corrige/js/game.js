// L'Atelier du Meuble : jeu-concours « Attrapez les meubles » (Phaser 4)
// Le jeu est une Scene, avec trois méthodes appelées par Phaser :
//   preload() : charger les images, une seule fois au début ;
//   create()  : placer les objets du jeu, une seule fois ;
//   update()  : à chaque image (environ 60 fois par seconde), faire évoluer le jeu.

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const CART_SPEED = 400;  // vitesse du chariot, en pixels par seconde
const FALL_SPEED = 200;  // vitesse de chute des meubles
const MAX_MISSED = 3;    // pour aller plus loin : meubles ratés avant la fin de partie

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
        this.missed = 0;

        // Le chariot : un objet physique (il a une vitesse, il peut toucher d'autres objets)
        this.cart = this.physics.add.image(GAME_WIDTH / 2, GAME_HEIGHT - 40, 'cart');
        this.cart.setCollideWorldBounds(true); // il ne sort pas de l'écran

        // Le score, affiché en haut à gauche
        this.scoreText = this.add.text(16, 16, 'Score : 0', { fontSize: '24px', color: '#5c3a1e' });

        // Étape 1 : les flèches du clavier
        this.cursors = this.input.keyboard.createCursorKeys();

        // Étape 2 : un groupe qui contiendra tous les meubles qui tombent
        this.furniture = this.physics.add.group();

        // Étape 2 : un nouveau meuble toutes les secondes, sans fin (loop)
        this.dropTimer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.dropFurniture,
            callbackScope: this, // dans dropFurniture, « this » reste la scène
        });

        // Étape 3 : quand le chariot touche un meuble, appeler catchFurniture
        this.physics.add.overlap(this.cart, this.furniture, this.catchFurniture, null, this);
    }

    update() {
        if (this.isGameOver) {
            return;
        }

        // Étape 1 : déplacer le chariot selon la flèche enfoncée
        if (this.cursors.left.isDown) {
            this.cart.setVelocityX(-CART_SPEED);
        } else if (this.cursors.right.isDown) {
            this.cart.setVelocityX(CART_SPEED);
        } else {
            this.cart.setVelocityX(0); // aucune flèche : le chariot s'arrête
        }

        // Pour aller plus loin : un meuble sorti par le bas est raté
        this.furniture.getChildren().forEach((item) => {
            if (item.y > GAME_HEIGHT + 50) {
                if (item.texture.key !== 'broken-chair') {
                    this.missed++;
                }
                item.destroy();
            }
        });

        if (this.missed >= MAX_MISSED) {
            this.gameOver();
        }
    }

    // Étape 2 : faire tomber un meuble au hasard, à une position au hasard
    dropFurniture() {
        // Pour aller plus loin : une chance sur cinq d'avoir une chaise cassée
        const keys = ['chair', 'stool', 'table', 'chair', 'broken-chair'];
        const key = Phaser.Utils.Array.GetRandom(keys);
        const x = Phaser.Math.Between(50, GAME_WIDTH - 50);

        const item = this.furniture.create(x, -50, key); // au-dessus de l'écran
        item.setVelocityY(FALL_SPEED);
    }

    // Étape 3 : un meuble attrapé disparaît et rapporte un point
    catchFurniture(cart, item) {
        // Pour aller plus loin : la chaise cassée fait perdre un point
        const points = item.texture.key === 'broken-chair' ? -1 : 1;
        item.destroy();

        this.score += points;
        this.scoreText.setText('Score : ' + this.score);

        // Pour aller plus loin : le chariot rebondit (animation « tween » de Phaser, comme GSAP)
        this.tweens.add({ targets: cart, scaleY: 0.8, duration: 80, yoyo: true });
    }

    // Pour aller plus loin : fin de partie, clic pour rejouer
    gameOver() {
        this.isGameOver = true;
        this.dropTimer.remove();         // plus de nouveaux meubles
        this.physics.pause();            // tout s'arrête
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Partie terminée !\nScore : ' + this.score + '\nCliquez pour rejouer', {
            fontSize: '32px',
            color: '#5c3a1e',
            align: 'center',
        }).setOrigin(0.5); // centré sur sa position

        this.input.once('pointerdown', () => {
            this.isGameOver = false;
            this.scene.restart();        // relance create() depuis le début
        });
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
