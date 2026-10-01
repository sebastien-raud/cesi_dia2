package fr.cesi.invoicing;

import java.io.IOException;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) throws IOException {
        // Chargement temporaire du formulaire pour le tester isolément :
        // le TP5 rétablira le vrai parcours (connexion -> formulaire).
        Parent root = FXMLLoader.load(getClass().getResource("invoice-form.fxml"));

        stage.setTitle("TP4 - Formulaire de saisie de facture");
        stage.setScene(new Scene(root, 320, 300));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
