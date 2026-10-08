// Démo : des balles qui rebondissent, avec Phaser (physique arcade)
// La boucle, la gravité, les rebonds et les collisions : Phaser s'en charge.

class BallsScene extends Phaser.Scene {
    constructor() {
        super('balls');
    }

    // Rien à charger : les balles sont des cercles dessinés par Phaser
    preload() {}

    create() {
        // Un groupe physique : toutes les balles, qui se cognent entre elles
        this.balls = this.physics.add.group();
        this.physics.add.collider(this.balls, this.balls);

        this.addBall(100, 50);

        // Un clic ajoute une balle à l'endroit du clic
        this.input.on('pointerdown', (pointer) => {
            this.addBall(pointer.x, pointer.y);
        });

        this.countText = this.add.text(16, 16, '', { fontSize: '20px', color: '#ffffff' });
    }

    // À chaque image : ici, seulement afficher le nombre de balles
    update() {
        this.countText.setText('Balles : ' + this.balls.getLength());
    }

    addBall(x, y) {
        const color = Phaser.Display.Color.RandomRGB().color;
        const ball = this.add.circle(x, y, 20, color);

        this.balls.add(ball);           // le groupe physique lui donne un corps (body)
        //ball.body.setCircle(20);        // corps physique rond (par défaut : un carré de 40 × 40, les balles se cogneraient par les coins)
        ball.body.setBounce(0.8);       // garde 80 % de sa vitesse à chaque rebond
        ball.body.setCollideWorldBounds(true); // rebondit sur les bords du jeu au lieu de sortir de l'écran
        ball.body.setVelocityX(Phaser.Math.Between(-200, 200)); // vitesse horizontale au hasard, en pixels par seconde (négative : vers la gauche)
    }
}

const config = {
    type: Phaser.AUTO,    // WebGL si le navigateur le permet, sinon canvas 2D
    width: 800,
    height: 400,
    parent: 'game',       // id de l'élément HTML qui accueille le jeu
    backgroundColor: '#1f2933',
    physics: {
        default: 'arcade', // moteur physique simple : corps rectangles ou cercles, sans rotation
        arcade: {          // réglages du moteur arcade
            gravity: { y: 400 },  // la gravité, pour tous les objets
            debug: true,       // étape de la démo : afficher les corps physiques
        },
    },
    scene: BallsScene,
};

const game = new Phaser.Game(config);
