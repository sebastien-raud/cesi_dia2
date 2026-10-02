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

        // Données d'exemple, pour que le menu "Consulter les factures" ne soit
        // pas vide dès le premier lancement.
        if (invoiceRepository.findAll().isEmpty()) {
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 20), "Martin SARL",
                    List.of(new InvoiceLine("Développement", 1, 890.0))));
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 22), "Dupont & Fils",
                    List.of(new InvoiceLine("Formation", 2, 350.0))));
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 10), "Martin SARL",
                    List.of(new InvoiceLine("Maintenance", 1, 210.0))));
            // Octobre et plus de 1000 € : révèle un tri alphabétique sur les colonnes Date et Total.
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 10, 5), "Atelier Durand",
                    List.of(new InvoiceLine("Audit", 1, 1200.0))));
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

        stage.setTitle("TP10 - Finalisation en autonomie");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
