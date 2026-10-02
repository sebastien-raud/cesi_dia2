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
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 9, 10), "Martin SARL",
                    List.of(new InvoiceLine("Maintenance", 1, 210.0))));
            // Octobre et plus de 1000 € : révèle un tri alphabétique sur les colonnes Date et Total.
            invoiceRepository.save(new Invoice(LocalDate.of(2026, 10, 5), "Atelier Durand",
                    List.of(new InvoiceLine("Audit", 1, 1200.0))));
        }

        // Chargement temporaire du tableau pour le tester isolément : la
        // vraie navigation (menu -> tableau) sera mise en place au TP8.
        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-table.fxml"));
        Parent root = loader.load();

        InvoiceTableController controller = loader.getController();
        controller.setInvoiceRepository(invoiceRepository);

        stage.setTitle("TP7 - Filtres sur la liste des factures");
        stage.setScene(new Scene(root, 450, 250));
        stage.show();

        // Étapes du TP :
        // 1. ajouter un TextField de recherche (client) au-dessus du
        //    TableView dans invoice-table.fxml ;
        // 2. dans InvoiceTableController, envelopper la liste dans une
        //    FilteredList, mettre à jour le Predicate à chaque frappe
        //    (listener sur textProperty()) ;
        // 3. envelopper la FilteredList dans une SortedList, lier son
        //    comparatorProperty à celui du TableView (tri par colonne) ;
        // 4. ajouter un DatePicker "depuis le..." et combiner
        //    les deux filtres (texte + date) dans le même Predicate.
    }

    public static void main(String[] args) {
        launch(args);
    }
}
