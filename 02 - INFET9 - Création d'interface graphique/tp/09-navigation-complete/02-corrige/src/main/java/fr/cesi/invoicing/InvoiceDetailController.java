package fr.cesi.invoicing;

import java.io.IOException;
import java.time.format.DateTimeFormatter;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;

public class InvoiceDetailController {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @FXML
    private Label numberLabel;

    @FXML
    private Label dateLabel;

    @FXML
    private Label clientLabel;

    @FXML
    private VBox linesBox;

    @FXML
    private Label totalLabel;

    private ShellController shell;
    private Invoice invoice;

    public void setShell(ShellController shell) {
        this.shell = shell;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;

        numberLabel.setText("Numéro : " + invoice.getNumber());
        dateLabel.setText("Date : " + invoice.getDate().format(DATE_FORMAT));
        clientLabel.setText("Client : " + invoice.getClient());

        for (InvoiceLine line : invoice.getLines()) {
            linesBox.getChildren().add(new Label(
                    "%s : %d x %.2f €".formatted(line.getDescription(), line.getQuantity(), line.getUnitPrice())));
        }

        totalLabel.setText("Total : %.2f €".formatted(invoice.getTotal()));
    }

    @FXML
    private void handleEdit() throws IOException {
        shell.showForm(invoice);
    }

    @FXML
    private void handleBackToMenu() {
        shell.showHome();
    }
}
