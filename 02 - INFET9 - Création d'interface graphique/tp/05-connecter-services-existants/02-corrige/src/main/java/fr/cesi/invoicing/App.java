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
        AuthService authService = new AuthService();
        AuthRepository authRepository = new AuthRepository("invoices.db");
        InvoiceRepository invoiceRepository = new InvoiceRepository("invoices.db");
        InvoicePdfService invoicePdfService = new InvoicePdfService();

        // Utilisateur de démonstration, créé au premier lancement si absent.
        if (authRepository.findByUsername("admin").isEmpty()) {
            authRepository.save(new User("admin", authService.hash("S3basti3n!")));
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

        stage.setTitle("TP5 - Connexion et formulaire connectés");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
