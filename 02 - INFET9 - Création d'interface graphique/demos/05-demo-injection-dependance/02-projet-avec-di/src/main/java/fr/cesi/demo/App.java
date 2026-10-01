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
        FXMLLoader loader = new FXMLLoader(getClass().getResource("main.fxml"));
        Parent root = loader.load();

        // Étape "après" (une fois le setter ajouté à GreetingController) :
        // récupérer le Controller après le chargement du FXML et lui
        // injecter le service depuis l'extérieur.
        
        GreetingController controller = loader.getController();
        controller.setGreetingService(new ShoutingGreetingService());

        stage.setTitle("Démo injection de dépendance");
        stage.setScene(new Scene(root, 300, 150));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
