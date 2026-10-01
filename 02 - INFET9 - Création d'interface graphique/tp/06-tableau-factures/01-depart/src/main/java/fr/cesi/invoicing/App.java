package fr.cesi.invoicing;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) throws IOException {
        AuthService authService = new AuthService();
        AuthRepository authRepository = new AuthRepository("invoices.db");
        InvoiceRepository invoiceRepository = new InvoiceRepository("invoices.db");
        InvoicePdfService invoicePdfService = new InvoicePdfService();

        // Utilisateur de démonstration, créé au premier lancement si absent.
        if (authRepository.findByUsername("admin").isEmpty()) {
            authRepository.save(new User("admin", authService.hash("S3basti3n!")));
        }

        // Données d'exemple, pour ne pas dépendre de l'exécution du TP5.
        if (invoiceRepository.findAll().isEmpty()) {
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 20), "Martin SARL",
                    List.of(new InvoiceLine("Développement", 1, 890.0))));
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 22), "Dupont & Fils",
                    List.of(new InvoiceLine("Formation", 2, 350.0))));
        }

        FXMLLoader loader = new FXMLLoader(getClass().getResource("login.fxml"));
        Parent root = loader.load();

        Scene scene = new Scene(root, 320, 260);

        LoginController controller = loader.getController();
        controller.setScene(scene);
        controller.setAuthService(authService);
        controller.setAuthRepository(authRepository);
        controller.setInvoiceRepository(invoiceRepository);
        controller.setInvoicePdfService(invoicePdfService);

        stage.setTitle("TP6 - Connexion et formulaire (tableau à construire)");
        stage.setScene(scene);
        stage.show();

        // Étapes du TP :
        // 1. créer invoice-table.fxml (TableView avec 4 TableColumn : numéro,
        //    date, client, total) ;
        // 2. créer InvoiceTableController, câbler les cellValueFactory en
        //    lambda dans initialize() ;
        // 3. ajouter un setInvoiceRepository(InvoiceRepository) qui
        //    alimente le TableView via invoiceRepository.findAll() ;
        // 4. pour tester, remplacer temporairement le chargement de
        //    "login.fxml" ci-dessus par "invoice-table.fxml" (voir le corrigé
        //    du TP6 pour l'exemple d'un App.java de test isolé).
    }

    public static void main(String[] args) {
        launch(args);
    }
}
