package fr.cesi.demo;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

public class LoginController {

    private Scene scene;

    public void setScene(Scene scene) {
        this.scene = scene;
    }

    @FXML
    private void handleLogin() throws IOException {
        // Verrou : le Menu n'est chargé qu'à partir d'ici. Il n'existe
        // aucun autre chemin dans l'application pour l'atteindre.
        FXMLLoader loader = new FXMLLoader(getClass().getResource("menu.fxml"));
        Parent root = loader.load();

        MenuController controller = loader.getController();
        controller.setScene(scene);

        scene.setRoot(root);
    }
}
