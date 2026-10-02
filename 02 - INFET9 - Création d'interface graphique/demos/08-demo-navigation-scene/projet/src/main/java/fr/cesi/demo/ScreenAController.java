package fr.cesi.demo;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

public class ScreenAController {

    private Scene scene;

    public void setScene(Scene scene) {
        this.scene = scene;
    }

    @FXML
    private void handleGoToB() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("screen-b.fxml"));
        Parent root = loader.load();

        ScreenBController controller = loader.getController();
        controller.setScene(scene);

        // Navigation : on remplace le root de la Scene existante, on
        // n'ouvre pas un nouveau Stage.
        scene.setRoot(root);
    }
}
