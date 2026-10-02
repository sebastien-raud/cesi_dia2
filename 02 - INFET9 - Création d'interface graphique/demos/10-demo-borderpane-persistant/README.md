# Démo : BorderPane persistant

## Objectif
Montrer une deuxième technique de navigation, différente de la démo 08/09 : une coquille (`BorderPane`) avec une `MenuBar` **fixe** en haut, dont seul le contenu central change, au lieu de remplacer tout le `root` de la `Scene` à chaque écran.

## Points clés à faire passer
- ici, on ne remplace **jamais** le `root` de la `Scene` après le démarrage : le `root` est le `BorderPane`, une fois pour toutes ;
- naviguer = remplacer uniquement `borderPane.setCenter(...)`, pas `scene.setRoot(...)` ;
- conséquence directe : la `MenuBar` reste affichée et fonctionnelle en permanence, elle n'est jamais rechargée ;
- c'est une mécanique **différente** de celle vue en démo 08/09 (remplacement complet du root) : à utiliser quand on veut un élément persistant (menu, barre d'outils...), pas systématiquement.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. La coquille

`shell.fxml` : un `BorderPane` avec une `MenuBar` en `top` (menu « Facture » → « Aller à C », « Aller à D ») et un `Label` "Bienvenue" en `center`. `App.java` charge cette coquille une seule fois, comme unique `root` de la `Scene`.

```bash
mvn javafx:run
```
→ Fenêtre avec la `MenuBar` en haut, « Bienvenue » au centre.

### 2. Naviguer vers C

Menu « Facture » → « Aller à C » (`ShellController.handleGoToC()` charge `content-c.fxml` et appelle `rootPane.setCenter(content)`).

→ Le centre affiche « Contenu C ». **La `MenuBar` n'a pas bougé.**

### 3. Naviguer vers D

Menu « Facture » → « Aller à D ».

→ Le centre affiche « Contenu D », toujours sans que la `MenuBar` ne disparaisse ou ne se recharge.

## Piège à éviter
Ne pas présenter cette technique comme un remplacement de celle de la démo 08/09 : ce sont deux outils différents. Le remplacement complet du `root` reste très bien pour des transitions franches (ex. connexion → application) ; le `BorderPane` persistant convient quand un élément doit rester visible pendant la navigation (menu, barre de statut...).

## Remarque
Les deux navigations (C et D) ont été vérifiées réellement (Docker + X11 : ouverture du menu déroulant, clic sur chaque item, capture d'écran), avec confirmation visuelle explicite que la `MenuBar` reste affichée à l'identique à chaque changement de contenu.
