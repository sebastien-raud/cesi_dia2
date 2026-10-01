# Démo : TableView

## Objectif
Montrer la mise en place d'un `TableView` minimal sur une liste générique (produits), pas les factures.

## Points clés à faire passer
- `TableView` et `TableColumn` sont des `Node` comme les autres : ils se déclarent en FXML, au même titre qu'un `Button` ou un `Label` ;
- le `cellValueFactory` (lambda Java) ne peut pas s'exprimer proprement en FXML : il se câble dans le Controller, typiquement dans `initialize()` ;
- alimentation depuis une `ObservableList`, pas une simple `List`.

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

`Product.java` : `name`, `price`.

### 2. Montrer la structure FXML et le câblage dans le Controller

`main.fxml` : un `TableView` avec deux `TableColumn` (« Nom », « Prix »), déclarés en FXML (juste la structure, pas de logique).

`MainController.java`, méthode `initialize()` : câblage du `cellValueFactory` de chaque colonne (lambda qui lit la propriété correspondante de `Product`) et alimentation du `TableView` avec une `ObservableList<Product>`.

```bash
mvn javafx:run
```
→ Un tableau avec 2 lignes : Clavier (29.9), Souris (14.9).

### 3. Ajouter un produit en direct

Dans `MainController.java`, décommenter la ligne `products.add(new Product("Écran", 149.0));`.

```bash
mvn javafx:run
```
→ Le tableau affiche désormais 3 lignes, sans code supplémentaire pour rafraîchir l'affichage : la 3ᵉ ligne (Écran, 149.0) apparaît automatiquement.

→ Souligner que c'est parce que `products` est une `ObservableList` : le `TableView` observe la liste et se redessine seul à chaque changement.

## Piège à éviter
Ne pas aborder le formatage ici (ex. affichage `29,90 €`) : cette démo reste sur l'affichage brut des valeurs. Au TP6, le formatage se fait dans le `cellValueFactory` (une `String` déjà formatée) ; `cellFactory` (rendu personnalisé d'une cellule) n'est pas utilisé dans le module.

## Remarque
Version initiale de cette démo écrite en code pur (sans FXML), corrigée pour rester cohérente avec le pattern FXML + Controller utilisé partout ailleurs dans le module. Les deux états (2 puis 3 lignes) ont été testés réellement (Docker + X11) après correction.
