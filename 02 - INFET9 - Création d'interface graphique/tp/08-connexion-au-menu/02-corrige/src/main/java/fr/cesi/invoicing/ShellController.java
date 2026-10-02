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
}
