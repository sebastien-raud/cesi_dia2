# Démo : Contrat FXML ↔ Controller

## Objectif
Montrer le lien entre un fichier FXML et sa classe Controller, sur un écran générique (pas la page de connexion, réservée au TP2).

## Points clés à faire passer
- `fx:controller` dans le FXML désigne la classe Java ;
- `fx:id` relie un composant FXML à un attribut `@FXML` du Controller ;
- `onAction="#methode"` relie un événement à une méthode `@FXML` ;
- le `FXMLLoader` fait l'assemblage au chargement.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

Lancer l'application :

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. Montrer le FXML

`main.fxml` : un `VBox` avec `fx:controller="fr.cesi.demo.MainController"`, un `Label` (`fx:id="messageLabel"`) et un `Button` (`onAction="#handleClick"`).

### 2. Montrer le Controller

`MainController.java` : un attribut `@FXML private Label messageLabel` (même nom que le `fx:id`), et une méthode `@FXML private void handleClick()` qui modifie le texte du label.

### 3. Charger le FXML depuis `Application`

`App.java` : `FXMLLoader` charge `main.fxml`, la `Scene` est construite à partir de la racine chargée (`Parent`).

```bash
mvn javafx:run
```
→ Une fenêtre « Démo FXML + Controller » s'ouvre, avec le texte « Bonjour » et un bouton « Cliquer ».

### 4. Cliquer sur le bouton

Cliquer sur « Cliquer ».

→ Le texte du `Label` devient « Bouton cliqué ! ».

### 5. Retirer un `fx:id` (piège)

Fermer la fenêtre. Dans `main.fxml`, retirer temporairement `fx:id="messageLabel"` du `Label` (ne pas modifier `onAction`).

```bash
mvn javafx:run
```
→ La fenêtre s'ouvre normalement (le FXML reste valide sans `fx:id`, `messageLabel` reste simplement `null` dans le Controller). C'est au clic sur le bouton que l'erreur apparaît : `handleClick()` appelle `messageLabel.setText(...)` sur une référence `null`, d'où une `NullPointerException` affichée dans la console au moment du clic, pas au lancement.

Remettre `fx:id="messageLabel"` avant de continuer.

## Piège à éviter
L'étape 5 (erreur volontaire) doit rester courte : le but est de montrer le symptôme (et surtout le moment où il apparaît, au clic, pas au chargement), pas de déboguer longuement.
