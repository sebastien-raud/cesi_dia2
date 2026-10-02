package fr.cesi.demo;

import java.io.IOException;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) throws IOException {
        // Point d'entrée unique : l'application démarre toujours sur
        // l'écran de connexion, aucun autre chemin ne mène au menu.
        FXMLLoader loader = new FXMLLoader(getClass().getResource("login.fxml"));
        Parent root = loader.load();

        Scene scene = new Scene(root, 300, 220);

        LoginController controller = loader.getController();
        controller.setScene(scene);

        stage.setTitle("Démo menu");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
