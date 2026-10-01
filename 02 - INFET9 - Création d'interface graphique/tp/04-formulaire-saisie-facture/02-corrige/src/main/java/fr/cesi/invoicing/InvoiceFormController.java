package fr.cesi.invoicing;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class InvoiceFormController {

    @FXML
    private TextField clientField;

    @FXML
    private TextField dateField;

    @FXML
    private TextField descriptionField;

    @FXML
    private TextField amountField;

    @FXML
    private Button saveButton;

    private final InvoiceFormModel model = new InvoiceFormModel();

    @FXML
    private void initialize() {
        clientField.textProperty().bindBidirectional(model.clientProperty());
        dateField.textProperty().bindBidirectional(model.dateProperty());
        descriptionField.textProperty().bindBidirectional(model.descriptionProperty());
        amountField.textProperty().bindBidirectional(model.amountProperty());

        saveButton.disableProperty().bind(
                model.clientProperty().isEmpty().or(model.amountProperty().isEmpty())
        );
    }

    @FXML
    private void handleSave() {
        // L'enregistrement réel via les services métier (InvoiceRepository,
        // InvoicePdfService) sera branché au TP5.
        System.out.println("Client : " + model.clientProperty().get());
        System.out.println("Date : " + model.dateProperty().get());
        System.out.println("Description : " + model.descriptionProperty().get());
        System.out.println("Montant : " + model.amountProperty().get());
    }
}
