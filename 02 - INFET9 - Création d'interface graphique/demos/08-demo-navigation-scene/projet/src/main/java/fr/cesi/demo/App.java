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
        FXMLLoader loader = new FXMLLoader(getClass().getResource("screen-a.fxml"));
        Parent root = loader.load();

        Scene scene = new Scene(root, 300, 150);

        ScreenAController controller = loader.getController();
        controller.setScene(scene);

        stage.setTitle("Démo navigation multi-page");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
