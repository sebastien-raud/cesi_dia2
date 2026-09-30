package fr.cesi.invoicing;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) {
        Label title = new Label("Application de facturation");

        TextField customerNameField = new TextField();
        customerNameField.setPromptText("Nom du client");

        TextField cityField = new TextField();
        cityField.setPromptText("Ville");

        Label message = new Label();

        Button addButton = new Button("Ajouter");
        addButton.setOnAction(e ->
                message.setText("Client ajouté : " + customerNameField.getText() + " (" + cityField.getText() + ")"));

        Button clearButton = new Button("Effacer");
        clearButton.setOnAction(e -> {
            customerNameField.clear();
            cityField.clear();
            message.setText("");
        });

        HBox buttons = new HBox(10, addButton, clearButton);

        VBox root = new VBox(10, title, customerNameField, cityField, buttons, message);
        root.setPadding(new Insets(20));

        stage.setTitle("TP1 - JavaFX en code pur");
        stage.setScene(new Scene(root, 320, 260));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
