# Démo : FilteredList / SortedList

## Objectif
Montrer l'enchaînement `ObservableList` → `FilteredList` → `SortedList` sur une liste générique (prénoms), pas les factures.

## Points clés à faire passer
- `FilteredList` applique un `Predicate` dynamique, réévalué à chaque changement ;
- `SortedList` applique un tri, lié au tri natif du `TableView` (`comparatorProperty`) ;
- chaque étape encapsule la précédente, sans dupliquer les données ;
- la liste source (`ObservableList`) ne change jamais : seul l'affichage se transforme.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. État initial

`MainController.initialize()` construit la chaîne : `firstNames` (`ObservableList<String>`, 5 valeurs) → `FilteredList` (prédicat toujours vrai au départ) → `SortedList` (comparateur lié au `TableView`) → `tableView.setItems(sorted)`.

```bash
mvn javafx:run
```
→ Le tableau affiche les 5 prénoms (Alice, Bob, Chloé, David, Emma).

### 2. Filtrage en direct

Taper dans le champ de recherche, par exemple « a ».

→ Le tableau se réduit **en direct**, à chaque frappe, sans bouton : ne restent que les prénoms contenant « a » (Alice, David, Emma). C'est le listener sur `searchField.textProperty()` qui met à jour le `Predicate` de la `FilteredList` à chaque caractère tapé.

### 3. Tri par clic sur l'en-tête

Vider le champ de recherche (les 5 prénoms reviennent). Cliquer sur l'en-tête de colonne « Prénom ».

→ Une flèche de tri apparaît dans l'en-tête : le `TableView` a changé son `comparator`, et comme `sorted.comparatorProperty()` y est lié, la `SortedList` se retrie automatiquement (visible en particulier si les données ne sont pas déjà triées).

## Piège à éviter
Bien montrer que le filtre se met à jour à chaque frappe via un listener, pas en relançant une recherche manuelle (pas de bouton "Rechercher" dans cette démo).

## Remarque
Filtrage et tri testés réellement (Docker + X11 : saisie simulée, clic sur l'en-tête de colonne, capture d'écran) avant rédaction de cette démo.
