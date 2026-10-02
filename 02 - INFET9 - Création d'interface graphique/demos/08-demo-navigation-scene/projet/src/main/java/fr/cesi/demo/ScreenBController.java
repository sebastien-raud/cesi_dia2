package fr.cesi.demo;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

public class ScreenBController {

    private Scene scene;

    public void setScene(Scene scene) {
        this.scene = scene;
    }

    @FXML
    private void handleBack() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("screen-a.fxml"));
        Parent root = loader.load();

        ScreenAController controller = loader.getController();
        controller.setScene(scene);

        scene.setRoot(root);
    }
}
