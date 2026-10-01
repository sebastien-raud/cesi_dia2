# TP6 : Tableau des factures

## Contexte

> **De :** Ella Lavisse, comptable · **Objet :** Toutes nos factures, d'un coup d'œil
>
> Bonjour,
>
> Pour préparer les relances de fin de mois, j'aimerais voir toutes nos factures dans un tableau : numéro, date, client, total. Aujourd'hui, j'ouvre les PDF un par un.
>
> Ella

Le client souhaite consulter la liste de ses factures. Les données existent déjà côté métier (`InvoiceRepository`, INFET10) ; il s'agit de les afficher.

Pour ne pas dépendre de l'exécution du TP5, le projet insère automatiquement deux factures d'exemple au démarrage si la base est vide.

## Objectif

Afficher la liste des factures existantes dans un `TableView`.

## Prérequis

- Séquence théorique « Ajout de tableaux » (`TableView`, `TableColumn`, `cellValueFactory`, `cellFactory`, `ObservableList`) ;
- `InvoiceRepository` (INFET10), injection de dépendance (TP5).

## Travail demandé

1. Créer l'écran « Liste des factures » (`invoice-table.fxml` + `InvoiceTableController`).
2. Créer un `TableView<Invoice>` avec 4 colonnes (numéro, date, client, total).
3. Câbler les `cellValueFactory` en lambda dans `initialize()`.
4. Ajouter un `setInvoiceRepository(InvoiceRepository)` qui alimente le tableau via `invoiceRepository.findAll()`.
5. Pour tester l'écran, remplacer temporairement le chargement de `login.fxml` dans `App.java` par `invoice-table.fxml` (comme au TP4 pour le formulaire) : à annuler avant de continuer.
6. Vérifier l'affichage avec les factures d'exemple (et celles créées au TP5 si la base n'a pas été réinitialisée).

<details>
<summary>💡 Que doit renvoyer la lambda du cellValueFactory ?</summary>

Une valeur observable, pas une simple `String` : `data -> new SimpleStringProperty(data.getValue().getClient())`. `data.getValue()` est la facture de la ligne.

</details>

<details>
<summary>🆘 Le tableau reste vide ?</summary>

`initialize()` s'exécute au chargement du FXML, **avant** que tu injectes le repository. Remplis donc le tableau dans `setInvoiceRepository(...)`, pas dans `initialize()`.

</details>

## Points de vigilance

- Bien distinguer le rôle de `cellValueFactory` (quelle donnée afficher) de `cellFactory` (comment l'afficher, non utilisé ici) ;
- garder un format de date/montant cohérent avec le reste de l'application (`dd/MM/yyyy`, `%.2f €`) ;
- alimenter le tableau via une `ObservableList`, pas une simple `List`.

## Commandes utiles

```bash
sqlite3 invoices.db "SELECT * FROM invoices;"
```

## Résultat attendu

Un tableau affichant l'ensemble des factures (numéro, date, client, total), alimenté par les données métier réelles de l'application.
