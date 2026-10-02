package fr.cesi.invoicing;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.layout.BorderPane;

public class ShellController {

    @FXML
    private BorderPane rootPane;

    private InvoiceRepository invoiceRepository;
    private InvoicePdfService invoicePdfService;

    public void setInvoiceRepository(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public void setInvoicePdfService(InvoicePdfService invoicePdfService) {
        this.invoicePdfService = invoicePdfService;
    }

    @FXML
    private void handleNewInvoice() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-form.fxml"));
        Parent form = loader.load();

        InvoiceFormController controller = loader.getController();
        controller.setInvoiceRepository(invoiceRepository);
        controller.setInvoicePdfService(invoicePdfService);

        // On ne remplace que le centre : la MenuBar en haut reste affichée.
        rootPane.setCenter(form);
    }

    @FXML
    private void handleViewInvoices() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-table.fxml"));
        Parent table = loader.load();

        InvoiceTableController controller = loader.getController();
        controller.setInvoiceRepository(invoiceRepository);

        rootPane.setCenter(table);
    }

    // Étapes du TP :
    // 1. donner à InvoiceFormController et InvoiceTableController une méthode
    //    setShell(ShellController) pour qu'ils puissent naviguer eux-mêmes
    //    (voir demos/... ou le corrigé du TP8 pour l'injection par setter) ;
    // 2. ajouter ici une méthode showDetail(Invoice) qui charge
    //    invoice-detail.fxml (fourni, avec InvoiceDetailController à compléter)
    //    et fait rootPane.setCenter(...) ;
    // 3. ajouter une méthode showForm(Invoice invoiceToEdit) :
    //    invoiceToEdit == null pour une nouvelle facture, sinon on
    //    pré-remplit le formulaire (mode édition) ; handleNewInvoice()
    //    peut alors simplement appeler showForm(null) ;
    // 4. ajouter une méthode showHome() qui repose un contenu neutre
    //    dans le center (ex. un Label), pour le bouton "Retour au menu" de
    //    chaque écran ;
    // 5. dans InvoiceTableController, détecter un double-clic sur une ligne du
    //    TableView (setOnMouseClicked, event.getClickCount() == 2) et
    //    appeler shell.showDetail(selectedInvoice) ;
    // 6. en édition, enregistrer avec invoiceRepository.update(invoice) (fourni)
    //    au lieu de save(), pour que "Modifier" ne duplique pas la facture.
}
