package fr.cesi.demo;

import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

public class MainController {

    @FXML
    private TableView<Product> tableView;

    @FXML
    private TableColumn<Product, String> nameColumn;

    @FXML
    private TableColumn<Product, Double> priceColumn;

    private final ObservableList<Product> products = FXCollections.observableArrayList(
            new Product("Clavier", 29.90),
            new Product("Souris", 14.90)
    );

    @FXML
    private void initialize() {
        nameColumn.setCellValueFactory(data ->
                new SimpleStringProperty(data.getValue().getName()));
        priceColumn.setCellValueFactory(data ->
                new SimpleDoubleProperty(data.getValue().getPrice()).asObject());

        tableView.setItems(products);

        products.add(new Product("Écran", 149.0));
    }
}
