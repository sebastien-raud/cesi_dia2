# Démo : JavaFX : les concepts de base

## Objectif
Montrer en direct la chaîne `Application` → `Stage` → `Scene` → `Node` sur une fenêtre minimale, avant le TP1.

## Points clés à faire passer
- `Application.start(Stage)` est le point d'entrée ;
- `Stage` = la fenêtre, `Scene` = ce qu'elle affiche, `Node` = tout composant affichable ;
- un layout (`VBox`) organise les `Node` entre eux.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

Lancer l'application avec le plugin Maven JavaFX :

```bash
mvn javafx:run
```

(Premier lancement plus lent : téléchargement de JavaFX et du plugin.)

## Déroulé détaillé

### 1. Fenêtre minimale : un `Label` dans une `Scene`

État de départ du projet : `App.java` affiche un `Label` seul dans une `Scene` de 300x200.

```bash
mvn javafx:run
```
→ Une fenêtre « Démo JavaFX » s'ouvre avec le texte « Bienvenue dans JavaFX ».

Commenter la chaîne : `Application.start(Stage)` reçoit le `Stage` (fenêtre) fourni par JavaFX ; on lui attache une `Scene`, elle-même construite à partir d'un `Node` racine (ici directement le `Label`).

### 2. Redimensionner la fenêtre

Fermer la fenêtre, agrandir manuellement la fenêtre à l'écran (glisser un bord).

→ Observer que le `Stage` (la fenêtre) peut grandir, mais que le contenu (`Scene`/`Node`) ne remplit pas forcément tout l'espace disponible sans layout adapté : bonne transition vers la notion de layout.

### 3. Ajouter un `Button` dans un `VBox`

Remplacer le contenu de `start(Stage)` par le bloc commenté en bas du fichier (`Button` + `VBox` contenant le `Label` et le `Button`).

```bash
mvn javafx:run
```
→ La fenêtre affiche maintenant le `Label` et un bouton « Cliquer », empilés verticalement (`VBox`).

## Piège à éviter
Ne pas ajouter de gestion d'événement (`setOnAction`) sur le bouton ici : elle est volontairement laissée pour le TP1, que les apprenants découvrent par eux-mêmes.

## Remarque
Fenêtre testée et capturée visuellement (les deux états : `Label` seul, puis `VBox` avec `Label` + `Button`) dans l'environnement Docker avec affichage X11 avant rédaction de cette démo.
