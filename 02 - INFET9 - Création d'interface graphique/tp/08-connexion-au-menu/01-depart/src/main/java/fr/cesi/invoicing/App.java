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

        stage.setTitle("TP8 - De la connexion au menu");
        stage.setScene(scene);
        stage.show();

        // Étapes du TP :
        // 1. créer shell.fxml (BorderPane, MenuBar en "top" avec un menu
        //    "Facture" -> MenuItem "Nouvelle facture" / "Consulter les
        //    factures"), voir demos/10-demo-borderpane-persistant/ ;
        // 2. créer ShellController : setInvoiceRepository/setInvoicePdfService,
        //    handleNewInvoice()/handleConsulterFactures() chargent
        //    invoice-form.fxml / invoice-table.fxml et les posent dans
        //    rootPane.setCenter(...) (la MenuBar ne bouge pas) ;
        // 3. dans LoginController.handleLogin(), remplacer le chargement de
        //    invoice-form.fxml par shell.fxml (verrou d'accès : on n'y arrive
        //    qu'après authService.verify(...) réussi, voir demos/09-demo-menu/) ;
        // 5. semer quelques factures d'exemple ici, comme aux TP6/TP7, pour que
        //    "Consulter les factures" ne soit pas vide au premier lancement.
    }

    public static void main(String[] args) {
        launch(args);
    }
}
