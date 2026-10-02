package fr.cesi.demo;

import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.collections.transformation.SortedList;
import javafx.fxml.FXML;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;

public class MainController {

    @FXML
    private TextField searchField;

    @FXML
    private TableView<String> tableView;

    @FXML
    private TableColumn<String, String> firstNameColumn;

    // les données que l'on affiche (des objets)
    private final ObservableList<String> firstNames = FXCollections.observableArrayList(
            "Alice", "Bob", "Chloé", "David", "Emma"
    );

    @FXML
    private void initialize() {
        // comment on affiche la valeur dans une cellule de colonne
        firstNameColumn.setCellValueFactory(data ->
                new SimpleStringProperty(data.getValue()));

        // liste filtrée, issue des données affichées
        FilteredList<String> filtered = new FilteredList<>(firstNames, s -> true);

        // Le filtre est réévalué à chaque frappe (listener sur la saisie),
        // pas via un bouton "Rechercher".
        searchField.textProperty().addListener((obs, oldValue, newValue) ->
                filtered.setPredicate(firstName ->
                        firstName.toLowerCase().contains(newValue.toLowerCase()))
        );

        // liste triée, issue de la liste filtrée
        SortedList<String> sorted = new SortedList<>(filtered);
        // on branche la liste triée sur la TableView
        sorted.comparatorProperty().bind(tableView.comparatorProperty());

        // jeu de données passé à la TableView : la liste triée
        tableView.setItems(sorted);
    }
}
