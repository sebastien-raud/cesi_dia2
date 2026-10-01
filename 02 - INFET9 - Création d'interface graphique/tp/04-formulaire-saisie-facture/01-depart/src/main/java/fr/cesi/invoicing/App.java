package fr.cesi.invoicing;

import java.io.IOException;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) throws IOException {
        Parent root = FXMLLoader.load(getClass().getResource("login.fxml"));

        stage.setTitle("TP4 - Connexion (formulaire à venir)");
        stage.setScene(new Scene(root, 320, 260));
        stage.show();

        // Étapes du TP :
        // 1. créer invoice-form.fxml (TextField client, date, description,
        //    montant) ;
        // 2. créer InvoiceFormModel (StringProperty pour chaque champ) ;
        // 3. créer InvoiceFormController, lier les champs au modèle via
        //    bindBidirectional ;
        // 4. ajouter une validation minimale (bouton "Enregistrer" inactif
        //    si client/montant vides) ;
        // 5. pour tester l'écran, remplacer temporairement "login.fxml" par
        //    "invoice-form.fxml" ci-dessus (à annuler avant de continuer).
    }

    public static void main(String[] args) {
        launch(args);
    }
}
