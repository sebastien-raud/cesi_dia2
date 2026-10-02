# Démo : MenuBar / Menu / MenuItem

## Objectif
Montrer une vraie barre de menu (`MenuBar`), avec plusieurs menus et sous-éléments (dont certains inactifs), qui distribue vers plusieurs écrans : marqueur fort du client lourd (Jour 1), complément à la démo 08 qui ne montrait qu'un aller-retour entre deux écrans.

## Points clés à faire passer
- `MenuBar` contient des `Menu` (les entrées « Facture », « Aide »...), chaque `Menu` contient des `MenuItem` (les actions) ;
- un `MenuItem` peut être désactivé (`disable="true"`) sans être retiré de l'interface ;
- côté navigation, on reste sur la même mécanique que la démo 08 (`scene.setRoot(...)`) : seul le déclencheur change (un clic de `MenuItem` au lieu d'un `Button`) ;
- (bonus) un écran de menu peut être protégé par un verrou d'accès : ici, l'application démarre toujours sur l'écran de connexion, il n'existe aucun autre chemin de code vers le menu.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. Écran de connexion (verrou, bonus)

`App.java` charge toujours `login.fxml` en premier. `LoginController.handleLogin()` charge le menu : c'est le seul endroit du code qui y mène.

```bash
mvn javafx:run
```
→ Fenêtre « Connexion » avec un bouton « Se connecter ».

### 2. La MenuBar

Cliquer sur « Se connecter ».

→ Écran « Menu » : une `MenuBar` avec deux entrées, « Facture » et « Aide ».

Cliquer sur « Facture ».

→ Le menu se déroule : « Aller à C », « Aller à D » (actifs), « Option 3 (bientôt) » (grisé, non cliquable).

### 3. Naviguer vers C, puis revenir

Cliquer sur « Aller à C ».

→ Écran « Écran C », avec un bouton « Retour au menu ».

Cliquer sur « Retour au menu ».

→ Retour à l'écran « Menu » (la `MenuBar` est rechargée, comme le reste de l'écran).

### 4. Naviguer vers D

Menu « Facture » → « Aller à D ».

→ Écran « Écran D » (même mécanique, symétrique).

## Piège à éviter
Ne pas complexifier avec une vraie authentification : l'écran de connexion ne vérifie rien, il illustre uniquement le principe du verrou d'accès. Ne pas non plus introduire ici le `BorderPane` persistant (menu qui reste affiché pendant qu'on change d'écran) : c'est l'objet de la démo 10, qui est une mécanique de navigation différente.

## Remarque
MenuBar, sous-menu désactivé, les deux branches (C et D) et le point d'entrée unique (connexion) ont été vérifiés réellement (Docker + X11, clics simulés dont l'ouverture du menu déroulant, capture d'écran à chaque étape).
