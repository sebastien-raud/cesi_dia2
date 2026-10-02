package fr.cesi.demo;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.layout.BorderPane;

public class ShellController {

    @FXML
    private BorderPane rootPane;

    @FXML
    private void handleGoToC() throws IOException {
        Parent content = FXMLLoader.load(getClass().getResource("content-c.fxml"));
        // On ne touche qu'au centre : la MenuBar en haut ne bouge pas.
        rootPane.setCenter(content);
    }

    @FXML
    private void handleGoToD() throws IOException {
        Parent content = FXMLLoader.load(getClass().getResource("content-d.fxml"));
        rootPane.setCenter(content);
    }
}
