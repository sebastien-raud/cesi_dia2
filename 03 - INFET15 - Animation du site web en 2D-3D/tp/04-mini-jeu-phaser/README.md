# TP4 : Mini-jeu Phaser

## Contexte

> **De :** Guy Mauve, stagiaire comptable · **Objet :** Une idée (géniale)
>
> Bonjour,
>
> J'ai une idée pour faire venir du monde sur le site : un jeu-concours ! Des meubles tombent du ciel, on les attrape avec le chariot de l'atelier, et le meilleur score du mois gagne un tabouret.
>
> Sarah a dit « pourquoi pas, si ça ne coûte rien ». J'ai dessiné le chariot moi-même.
>
> Guy
>
> PS : attention aux chaises cassées, elles ne comptent pas.

Une page `jeu.html` est prête, avec un lien depuis le pied de page du site. Le jeu utilise **Phaser**, un moteur de jeu 2D : il dessine dans un `<canvas>`, et non plus avec des éléments HTML.

## Objectif

Compléter un petit jeu Phaser déjà structuré : déplacer un objet, en faire apparaître d'autres, détecter une collision, compter les points.

## Prérequis

- Séquence « Du DOM au canvas : les moteurs de jeu » ;
- VS Code et l'extension **Live Server** : obligatoire pour ce TP ;
- une connexion Internet (Phaser est chargé depuis un CDN).

## Ce qui est fourni

```text
01-depart/
  index.html          le site (TP3), avec un lien vers le jeu en pied de page
  jeu.html            la page du jeu : Phaser, puis js/game.js
  css/game.css        le style de la page du jeu
  js/game.js          le jeu : c'est ici que vous travaillez
  images/game/        le chariot et les meubles du jeu
```

Dans `game.js`, tout est en place sauf le jeu lui-même : la configuration, le chargement des images, le chariot et le score. Chaque endroit à compléter est marqué `// Étape N` puis `// TODO`.

## Travail demandé

1. Ouvrir `jeu.html` **avec Live Server** : le chariot et le score s'affichent, rien ne bouge.
2. **Étape 1 : déplacer le chariot.** Dans `create()`, récupérer les flèches du clavier ; dans `update()`, donner au chariot une vitesse vers la gauche, vers la droite, ou nulle, selon la flèche enfoncée.
3. **Étape 2 : faire tomber des meubles.** Dans `create()`, créer un groupe physique pour les meubles et un minuteur qui appelle `dropFurniture()` toutes les secondes. Dans `dropFurniture()`, créer un meuble (clé `'chair'`, `'stool'` ou `'table'`, au hasard) en haut de l'écran, à une position horizontale au hasard, et lui donner une vitesse vers le bas.
4. **Étape 3 : attraper les meubles.** Dans `create()`, demander à Phaser d'appeler `catchFurniture()` quand le chariot chevauche un meuble. Dans `catchFurniture()`, détruire le meuble, ajouter un point et mettre à jour le texte du score.

<details>
<summary>💡 Pourquoi Live Server ?</summary>

Phaser charge les images par le réseau. En ouvrant `jeu.html` en double-cliquant (adresse en `file://`), le navigateur bloque ces chargements par sécurité : écran vide ou erreur dans la console. Live Server sert la page par une adresse en `http://`, comme un vrai site.

</details>

<details>
<summary>💡 Étape 1 : le clavier</summary>

`this.input.keyboard.createCursorKeys()` renvoie un objet avec les quatre flèches : `left`, `right`, `up`, `down`. Chacune a une propriété `isDown`, vraie tant que la touche est enfoncée. On la teste dans `update()`, donc à chaque image.

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
// dans create()
this.cursors = this.input.keyboard.createCursorKeys();

// dans update()
if (this.cursors.left.isDown) {
    this.cart.setVelocityX(-CART_SPEED);
} else if (this.cursors.right.isDown) {
    this.cart.setVelocityX(CART_SPEED);
} else {
    this.cart.setVelocityX(0);
}
```

</details>
</details>

<details>
<summary>💡 Étape 2 : le hasard et le minuteur</summary>

Phaser fournit des outils pour le hasard : `Phaser.Math.Between(min, max)` (un nombre entier) et `Phaser.Utils.Array.GetRandom(tableau)` (un élément au hasard). Le minuteur : `this.time.addEvent({ delay, loop, callback, callbackScope })`.

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
// dans create()
this.furniture = this.physics.add.group();

this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: this.dropFurniture,
    callbackScope: this,
});

// dans dropFurniture()
const key = Phaser.Utils.Array.GetRandom(['chair', 'stool', 'table']);
const x = Phaser.Math.Between(50, GAME_WIDTH - 50);
const item = this.furniture.create(x, -50, key);
item.setVelocityY(FALL_SPEED);
```

`callbackScope: this` garde la scène comme `this` à l'intérieur de `dropFurniture()` : sans lui, `this.furniture` n'existerait pas.

</details>
</details>

<details>
<summary>💡 Étape 3 : le chevauchement</summary>

`this.physics.add.overlap(objetA, objetB, fonction, null, this)` appelle la fonction à chaque fois que les deux objets se chevauchent. Un groupe peut remplacer un objet : Phaser teste alors chaque meuble du groupe.

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
// dans create()
this.physics.add.overlap(this.cart, this.furniture, this.catchFurniture, null, this);

// dans catchFurniture(cart, item)
item.destroy();
this.score++;
this.scoreText.setText('Score : ' + this.score);
```

</details>
</details>

### Pour aller plus loin

5. Faire rebondir le chariot à chaque meuble attrapé : Phaser a ses propres animations, les *tweens* (`this.tweens.add({ targets, scaleY, duration, yoyo })`), très proches de GSAP.
6. Ajouter la chaise cassée de Guy (clé `'broken-chair'`, déjà chargée) : elle fait perdre un point.
7. Compter les meubles ratés (sortis par le bas de l'écran) ; au troisième, afficher « Partie terminée », arrêter le jeu et proposer de rejouer d'un clic (`this.scene.restart()`).

<details>
<summary>🔑 La réponse (point 7, détecter un meuble raté)</summary>

Dans `update()`, parcourir les meubles et tester leur position :

```js
this.furniture.getChildren().forEach((item) => {
    if (item.y > GAME_HEIGHT + 50) {
        this.missed++;
        item.destroy();
    }
});
```

Pour arrêter le jeu : `this.physics.pause()` et supprimer le minuteur (`remove()` sur l'objet renvoyé par `addEvent`).

</details>

## Points de vigilance

- Dans une scène, tout passe par `this` : `this.cart`, `this.score`, `this.physics`... Un oubli de `this.` donne une erreur `is not defined` ;
- `create()` n'est appelée qu'une fois, `update()` environ 60 fois par seconde : on crée dans `create()`, on teste et on déplace dans `update()` ;
- la console est votre meilleure amie : taper `game.scene.getScene('game').score` affiche le score en cours ;
- on ne recharge pas la page à la main : Live Server le fait à chaque enregistrement.

## Résultat attendu

- Le chariot se déplace avec les flèches et s'arrête aux bords ;
- un meuble tombe chaque seconde, à une position au hasard ;
- un meuble attrapé disparaît et le score augmente ;
- aucune erreur dans la console.
