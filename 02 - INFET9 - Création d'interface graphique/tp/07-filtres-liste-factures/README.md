# TP7 : Filtres sur la liste des factures

## Contexte

> **De :** Ella Lavisse, comptable · **Objet :** Retrouver une facture sans faire défiler
>
> Bonjour,
>
> Le tableau est parfait. Maintenant, j'aimerais retrouver en deux secondes les factures de Martin SARL depuis la rentrée, sans les chercher à l'œil. Et pouvoir trier par montant, pour commencer les relances par les plus grosses.
>
> Ella

Le client souhaite pouvoir rechercher et filtrer ses factures dans la liste construite au TP6. Deux factures d'exemple de plus sont ajoutées aux données de démarrage (dont une en octobre, à plus de 1 000 €) pour que le filtrage et le tri soient visibles.

## Objectif

Ajouter des filtres et un tri à l'écran « Liste des factures ».

## Prérequis

- Séquence théorique « Gestion des listes et des filtres » (`FilteredList`, `SortedList`) ;
- TP6 (`TableView` des factures existant).

## Travail demandé

1. Ajouter un champ de recherche filtrant par nom de client.
2. Ajouter un filtre par date (`DatePicker` "depuis le...").
3. Combiner les filtres (texte + date).
4. Activer le tri par colonne (déjà géré par `TableView`, à relier via `SortedList`).
5. Vérifier le comportement avec un jeu de données varié.

<details>
<summary>💡 Où appliquer le filtre ?</summary>

Garde une référence à la `FilteredList`, et appelle `setPredicate(...)` dans un listener sur `textProperty()` du champ de recherche (et sur `valueProperty()` du `DatePicker`).

</details>

<details>
<summary>🆘 Le filtre marche, mais plus le tri ?</summary>

On ne trie pas une `FilteredList` : enveloppe-la dans une `SortedList`, lie `sortedList.comparatorProperty()` à `tableView.comparatorProperty()`, puis donne la `SortedList` au tableau avec `setItems(...)`.

</details>

<details>
<summary>🔑 Pour aller plus loin : « hier » tapé dans le DatePicker</summary>

Un texte qui n'est pas une date lève une exception. Le corrigé installe un convertisseur tolérant, qui renvoie `null` (pas de filtre) au lieu de planter :

```java
fromDateField.setConverter(new StringConverter<>() {
    @Override
    public String toString(LocalDate date) {
        return date == null ? "" : date.format(DATE_FORMAT);
    }

    @Override
    public LocalDate fromString(String text) {
        try {
            return text == null || text.isBlank() ? null : LocalDate.parse(text.trim(), DATE_FORMAT);
        } catch (DateTimeParseException e) {
            return null;
        }
    }
});
```

</details>

## Points de vigilance

- Bien enchaîner `ObservableList` → `FilteredList` → `SortedList` → `TableView` (chaque étape encapsule la précédente) ;
- mettre à jour le filtre par un listener sur la saisie, pas en rechargeant toutes les données à chaque frappe ;
- lier le `comparatorProperty` de la `SortedList` à celui du `TableView` pour que le tri par colonne fonctionne ;
- les colonnes Date et Total affichent des `String` formatées : leurs comparateurs (`setComparator(...)`) sont **fournis** dans `InvoiceTableController`, sinon le tri serait alphabétique (« 05/10/2026 » avant « 10/09/2026 »).

## Résultat attendu

Une liste de factures filtrable et triable, sans rechargement complet des données à chaque changement de critère.
