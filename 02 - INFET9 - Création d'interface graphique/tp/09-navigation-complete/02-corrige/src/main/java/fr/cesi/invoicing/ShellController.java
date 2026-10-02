package fr.cesi.invoicing;

import java.io.IOException;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.control.Label;
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
        showForm(null);
    }

    @FXML
    private void handleViewInvoices() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-table.fxml"));
        Parent table = loader.load();

        InvoiceTableController controller = loader.getController();
        controller.setInvoiceRepository(invoiceRepository);
        controller.setShell(this);

        rootPane.setCenter(table);
    }

    void showDetail(Invoice invoice) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-detail.fxml"));
        Parent detail = loader.load();

        InvoiceDetailController controller = loader.getController();
        controller.setShell(this);
        controller.setInvoice(invoice);

        rootPane.setCenter(detail);
    }

    void showForm(Invoice invoiceToEdit) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-form.fxml"));
        Parent form = loader.load();

        InvoiceFormController controller = loader.getController();
        controller.setInvoiceRepository(invoiceRepository);
        controller.setInvoicePdfService(invoicePdfService);
        controller.setShell(this);
        if (invoiceToEdit != null) {
            controller.loadInvoice(invoiceToEdit);
        }

        rootPane.setCenter(form);
    }

    void showHome() {
        Label home = new Label("Bienvenue, choisissez une action dans le menu Facture.");
        home.setStyle("-fx-padding: 20;");
        rootPane.setCenter(home);
    }
}
