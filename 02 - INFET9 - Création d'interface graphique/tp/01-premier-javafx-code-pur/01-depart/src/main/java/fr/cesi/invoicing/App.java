package fr.cesi.invoicing;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) {
        Label title = new Label("Application de facturation");

        TextField customerNameField = new TextField();
        customerNameField.setPromptText("Nom du client");

        VBox root = new VBox(10, title, customerNameField);
        root.setPadding(new Insets(20));

        stage.setTitle("TP1 - JavaFX en code pur");
        stage.setScene(new Scene(root, 320, 220));
        stage.show();

        // Étapes 2 et 3 : ajouter un Button "Ajouter" et un Label de message,
        // gérer le clic avec setOnAction pour afficher un message.
        //
        // Étape 5 (variante) : ajouter un second champ, un HBox pour
        // aligner deux boutons, ajuster l'espacement.
    }

    public static void main(String[] args) {
        launch(args);
    }
}
