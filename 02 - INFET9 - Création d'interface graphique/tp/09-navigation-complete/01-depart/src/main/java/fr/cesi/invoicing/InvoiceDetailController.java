package fr.cesi.invoicing;

import java.time.format.DateTimeFormatter;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;

// Écran de détail fourni (invoice-detail.fxml) : il reste à afficher la facture
// et à brancher les deux boutons sur le ShellController.
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
        // À faire : remplir numberLabel, dateLabel (DATE_FORMAT), clientLabel,
        // une ligne par InvoiceLine dans linesBox, puis totalLabel.
    }

    @FXML
    private void handleEdit() {
        // À faire : ouvrir le formulaire pré-rempli avec cette facture (shell.showForm(invoice)).
    }

    @FXML
    private void handleBackToMenu() {
        // À faire : revenir à l'accueil de la coquille (shell.showHome()).
    }
}
