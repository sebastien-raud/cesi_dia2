# Démo : Navigation multi-page

## Objectif
Montrer la technique de remplacement du `root` de la `Scene` pour naviguer entre deux écrans génériques (« Écran A » / « Écran B »).

## Points clés à faire passer
- un `Stage` garde la même `Scene` tout du long ;
- naviguer = remplacer le `root` de la `Scene`, pas ouvrir un nouveau `Stage` ;
- chaque écran = un FXML chargé à la demande ;
- la `Scene` se transmet d'écran en écran par injection (setter), même technique que la démo 05.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. Montrer les deux écrans

`screen-a.fxml` / `ScreenAController` : un `Label` "Écran A", un bouton "Aller à B".
`screen-b.fxml` / `ScreenBController` : un `Label` "Écran B", un bouton "Retour".

Chaque Controller reçoit la `Scene` par un setter (`setScene(Scene)`), injectée depuis `App` (écran A) ou depuis l'écran précédent (écran B), sur le même principe que l'injection de service vue en démo 05.

### 2. Lancer l'application

```bash
mvn javafx:run
```
→ La fenêtre affiche « Écran A ».

### 3. Naviguer vers l'écran B

Cliquer sur « Aller à B » (`handleGoToB` charge `screen-b.fxml`, injecte la `Scene` dans `ScreenBController`, puis `scene.setRoot(root)`).

→ La fenêtre affiche maintenant « Écran B ».

→ **Point à souligner** : c'est la même fenêtre (même `Stage`) qui a changé de contenu, aucune nouvelle fenêtre ne s'est ouverte.

### 4. Retour vers l'écran A

Cliquer sur « Retour » (même mécanique en sens inverse).

→ La fenêtre revient à « Écran A ».

## Piège à éviter
Ne pas mentionner ici le passage de données entre écrans (ex. transmettre un objet sélectionné) : c'est l'objet du TP9, cette démo reste centrée sur la mécanique de navigation elle-même.

## Remarque
Le cycle complet (A → B → A) a été testé réellement (Docker + X11 : clic sur chaque bouton, capture d'écran à chaque étape), avec vérification explicite que l'identifiant de fenêtre reste inchangé tout du long (pas de nouveau `Stage`).
