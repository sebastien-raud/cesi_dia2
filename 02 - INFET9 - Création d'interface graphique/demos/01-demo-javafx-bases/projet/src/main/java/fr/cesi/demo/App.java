package fr.cesi.demo;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) {
        Label label = new Label("Bienvenue dans JavaFX");

        Button button = new Button("Cliquer");
        VBox root = new VBox(10, label, button);
        Scene scene = new Scene(root, 300, 200);
        stage.setTitle("Démo JavaFX");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
