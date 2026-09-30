# TP1 : Premier JavaFX en code pur

## Contexte

> **De :** Sarah Bote, gérante · **Objet :** Fini l'écran noir
>
> Bonjour,
>
> Grâce à vous, l'application sait faire des PDF, des e-mails et elle est protégée par un mot de passe. Seul problème : pour s'en servir, Guy tape des commandes dans une fenêtre noire, et il en a des sueurs froides. Nous aimerions de vraies fenêtres, avec des boutons.
>
> On commence doucement ?
>
> Sarah

Première prise en main de JavaFX, entièrement en code, sans aucun outil ni fichier déclaratif : pour comprendre le modèle objet avant d'introduire le déclaratif (FXML) au TP2.

## Objectif

Construire une fenêtre JavaFX fonctionnelle en code pur, avec un événement géré.

## Prérequis

- Séquence théorique « JavaFX : les concepts de base » (`Application`, `Stage`, `Scene`, `Node`) ;
- projet Maven fourni avec la dépendance JavaFX déjà configurée.

## Travail demandé

1. Ouvrir `App.java` fourni : classe `Application`, méthode `start`, `VBox` avec un titre et un champ « Nom du client » déjà en place.
2. Ajouter un bouton « Ajouter » et un `Label` de message dans le `VBox`.
3. Ajouter un gestionnaire d'événement sur le bouton (`setOnAction`) affichant un message.
4. Lancer l'application et observer le comportement.
5. Variante : ajouter un second champ, un `HBox` pour aligner deux boutons, changer l'espacement.

<details>
<summary>💡 La fenêtre refuse de s'ouvrir (« JavaFX runtime components are missing ») ?</summary>

Lance l'application avec `mvn javafx:run` : le plugin JavaFX configure les modules à ta place. Le bouton « Run » de l'IDE sur `App.java` ne le fait pas forcément.

</details>

<details>
<summary>💡 Comment écrire le gestionnaire de clic ?</summary>

Avec une lambda : `bouton.setOnAction(e -> message.setText("..."));`. Le code entre les accolades ne s'exécute qu'au clic.

</details>

## Points de vigilance

- Bien faire comprendre l'enchaînement `Application` → `Stage` → `Scene` → `Node` avant d'aller plus loin ;
- erreurs classiques de lancement JavaFX (configuration du plugin Maven, options VM/modules) ;
- créneau volontairement long : laisser le temps de manipuler et de se tromper, ne pas accélérer.

## Commandes utiles

```bash
mvn compile
mvn javafx:run
```

## Résultat attendu

Une fenêtre JavaFX fonctionnelle, entièrement construite en code, avec un événement géré, et une première aisance avec `VBox`/`HBox`.
