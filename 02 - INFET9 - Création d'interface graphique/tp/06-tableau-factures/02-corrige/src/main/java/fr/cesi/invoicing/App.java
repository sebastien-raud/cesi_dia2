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
        InvoiceRepository invoiceRepository = new InvoiceRepository("invoices.db");

        // Données d'exemple, pour ne pas dépendre de l'exécution du TP5.
        if (invoiceRepository.findAll().isEmpty()) {
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 20), "Martin SARL",
                    List.of(new InvoiceLine("Développement", 1, 890.0))));
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 22), "Dupont & Fils",
                    List.of(new InvoiceLine("Formation", 2, 350.0))));
        }

        // Chargement temporaire du tableau pour le tester isolément : la
        // vraie navigation (menu -> tableau) sera mise en place au TP8.
        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-table.fxml"));
        Parent root = loader.load();

        InvoiceTableController controller = loader.getController();
        controller.setInvoiceRepository(invoiceRepository);

        stage.setTitle("TP6 - Tableau des factures");
        stage.setScene(new Scene(root, 450, 250));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
