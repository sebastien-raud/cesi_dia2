# Démo : Mapping de données

## Objectif
Montrer comment transformer les valeurs saisies dans un formulaire en objet métier, sur un exemple générique (`Person`), pas la `Invoice`.

## Points clés à faire passer
- le Controller ne doit pas connaître les détails métier au-delà de la construction de l'objet ;
- lire les champs à la fin (au clic), pas au fil de la saisie : contrairement au binding vu en démo 03 ;
- le mapping inverse (objet → champs) sert à pré-remplir un formulaire (ex. écran d'édition).

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. Montrer la classe métier

`Person.java` : `lastName`, `firstName`, `age`, avec un `toString()` lisible pour l'affichage.

### 2. Montrer le formulaire

`main.fxml` : trois `TextField` (nom, prénom, âge), deux boutons (« Construire », « Pré-remplir »), un `Label` de résultat.

```bash
mvn javafx:run
```
→ Fenêtre avec 3 champs vides (placeholders visibles) et les 2 boutons.

### 3. Mapping objet → formulaire (« Pré-remplir »)

Cliquer sur « Pré-remplir » (`handlePrefill` crée une `Person` fixe et remplit les 3 champs à partir de ses accesseurs).

→ Les champs affichent « Curie », « Marie », « 66 ».

### 4. Mapping formulaire → objet (« Construire »)

Cliquer sur « Construire » (`handleBuild` lit les 3 champs, construit une nouvelle `Person`, affiche son `toString()`).

→ Le label affiche « Marie Curie, 66 ans ».

Faire remarquer que l'ordre choisi ici (pré-remplir puis construire) permet d'enchaîner les deux démonstrations sans re-saisir les champs à la main, mais les deux boutons sont indépendants : « Construire » fonctionne aussi bien à partir d'une saisie manuelle.

## Piège à éviter
Ne pas ajouter de validation ici (champs vides, âge non numérique) : ce n'est pas l'objet de cette démo (déjà vu au TP4). `Integer.parseInt` sur un champ vide lèverait une exception, rester sur le scénario nominal pendant la démo.

## Remarque
Les deux sens du mapping ont été testés réellement (Docker + X11, clic sur chaque bouton, capture d'écran) avant rédaction de cette démo.
