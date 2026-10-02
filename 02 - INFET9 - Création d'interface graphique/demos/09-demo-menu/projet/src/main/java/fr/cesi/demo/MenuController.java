package fr.cesi.demo;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

public class MenuController {

    private Scene scene;

    public void setScene(Scene scene) {
        this.scene = scene;
    }

    @FXML
    private void handleGoToC() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("screen-c.fxml"));
        Parent root = loader.load();

        ScreenCController controller = loader.getController();
        controller.setScene(scene);

        scene.setRoot(root);
    }

    @FXML
    private void handleGoToD() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("screen-d.fxml"));
        Parent root = loader.load();

        ScreenDController controller = loader.getController();
        controller.setScene(scene);

        scene.setRoot(root);
    }
}
