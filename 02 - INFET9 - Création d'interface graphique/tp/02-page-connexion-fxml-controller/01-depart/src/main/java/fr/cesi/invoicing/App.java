package fr.cesi.invoicing;

import javafx.application.Application;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) {
        stage.setTitle("TP2 - Page de connexion");
        stage.show();

        // Étapes du TP :
        // 1. créer src/main/resources/fr/cesi/invoicing/login.fxml
        //    (TextField identifiant, PasswordField mot de passe, Button
        //    "Se connecter") ;
        // 2. créer LoginController ;
        // 3. lier les composants (fx:id) au Controller ;
        // 4. gérer le clic (@FXML, afficher les valeurs saisies en console) ;
        // 5. ajouter une validation minimale (bouton inactif si champs vides) ;
        // 6. charger login.fxml ici avec FXMLLoader, à la place de ce Stage
        //    vide.
    }

    public static void main(String[] args) {
        launch(args);
    }
}
