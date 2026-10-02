---
title: Formulaires et tableaux
---

# Formulaires et tableaux

Saisir une facture, afficher la liste

---

## Les champs principaux

| Composant | Pour saisir |
| --- | --- |
| `TextField` | un texte court : client, montant |
| `PasswordField` | un mot de passe, masqué |
| `TextArea` | un texte long : description |
| `DatePicker` | une date, avec calendrier |
| `ComboBox`, `ChoiceBox` | un choix dans une liste |
| `CheckBox`, `RadioButton` | oui / non, une option parmi plusieurs |

[Composants](https://openjfx.io/javadoc/21/javafx.controls/javafx/scene/control/package-summary.html)

<!-- Aussi : `Spinner` (un nombre, avec flèches), `Slider`, `ColorPicker`. -->

---

## Le formulaire de facture

<v-switch>
<template #0>
<img class="h-100" src="./public/app-formulaire.png" alt="Formulaire vide">
<p class="credit">Des champs avec texte d'aide (promptText), « Enregistrer » inactif</p>
</template>
<template #1>
<img class="h-100" src="./public/app-formulaire-rempli.png" alt="Formulaire rempli">
<p class="credit">Formulaire rempli : le bouton s'active</p>
</template>
</v-switch>

---

## En FXML

```xml
<VBox spacing="10" fx:controller="fr.cesi.invoicing.InvoiceFormController">
    <Label text="Nouvelle facture" />
    <TextField fx:id="clientField" promptText="Client" />
    <TextField fx:id="dateField" promptText="Date (jj/mm/aaaa)" />
    <TextField fx:id="descriptionField" promptText="Description" />
    <TextField fx:id="amountField" promptText="Montant" />
    <Button fx:id="saveButton" text="Enregistrer" onAction="#handleSave" />
</VBox>
```

<!-- `invoice-form.fxml` du TP 4, sans les imports ni le padding. -->

---

## Valider la saisie

- Champs **obligatoires** : client, montant
- **Formats** attendus : un montant numérique, une date `jj/mm/aaaa`
- **Retour visuel** immédiat : bordure, message près du champ
- Bouton d'enregistrement **inactif** tant que le formulaire n'est pas valide

```java
saveButton.disableProperty().bind(
        model.clientProperty().isEmpty().or(model.amountProperty().isEmpty()));
```

---

## Le tableau des factures

<img class="h-110" src="./public/app-tableau.png" alt="TableView des factures : numéro, date, client, total">

<p class="credit">Corrigé des TP : TableView alimenté par FactureRepository</p>

---

## TableView et colonnes

```text
TableView<Invoice>
      ├── TableColumn<Invoice, String>  "Numéro"
      ├── TableColumn<Invoice, String>  "Date"
      ├── TableColumn<Invoice, String>  "Client"
      └── TableColumn<Invoice, String>  "Total"
```

Un tableau d'**objets** : chaque ligne est une `Invoice`

---

## Remplir les colonnes

```java {1-2|3-4|5-6|all}
clientColumn.setCellValueFactory(data ->
        new SimpleStringProperty(data.getValue().getClient()));
dateColumn.setCellValueFactory(data ->
        new SimpleStringProperty(data.getValue().getDate().format(DATE_FORMAT)));
totalColumn.setCellValueFactory(data ->
        new SimpleStringProperty("%.2f €".formatted(data.getValue().getTotal())));
```

`cellValueFactory` : **que** mettre dans la cellule, pour une ligne donnée

<!-- `data.getValue()` : la Facture de la ligne.

Formatage des dates et montants directement ici. -->

---

## Alimenter le tableau

```java
ObservableList<Invoice> invoices =
        FXCollections.observableArrayList(invoiceRepository.findAll());
tableView.setItems(invoices);
```

Une `ObservableList` : ajouter ou retirer une facture **met à jour le tableau** tout seul

---

## Pour aller plus loin

---

## Personnaliser une cellule

```java
totalColumn.setCellFactory(colonne -> new TableCell<>() {
    @Override
    protected void updateItem(String total, boolean vide) {
        super.updateItem(total, vide);
        setText(vide ? null : total);
        setStyle("-fx-alignment: CENTER-RIGHT;");
    }
});
```

`cellValueFactory` : la **valeur**, `cellFactory` : l'**affichage**

---

## Des questions ?

---

## Sources

- [Documentation JavaFX 21](https://openjfx.io/javadoc/21/) : `javafx.scene.control` (champs, `TableView`, `TableColumn`)
