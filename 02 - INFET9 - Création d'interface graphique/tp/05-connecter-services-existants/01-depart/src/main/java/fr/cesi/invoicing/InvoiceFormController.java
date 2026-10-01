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

    private InvoiceRepository invoiceRepository;
    private InvoicePdfService invoicePdfService;

    public void setInvoiceRepository(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public void setInvoicePdfService(InvoicePdfService invoicePdfService) {
        this.invoicePdfService = invoicePdfService;
    }

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
        // La connexion (LoginController) est déjà câblée à AuthService : à
        // toi de faire pareil ici, en t'appuyant sur invoiceRepository et
        // invoicePdfService (déjà injectés par LoginController) :
        //
        // 1. parser la date saisie (java.time.LocalDate.parse avec un
        //    DateTimeFormatter "dd/MM/yyyy"), avec un repli sur
        //    LocalDate.now() si le champ est vide ou mal formé ;
        // 2. construire une InvoiceLine (description, quantité 1, montant
        //    parsé en double) puis une Invoice, sans numéro ;
        // 3. invoice = invoiceRepository.save(invoice) : save() attribue le
        //    numéro et renvoie la facture numérotée ;
        // 4. invoicePdfService.generate(invoice, "facture-" + invoice.getNumber() + ".pdf").
        System.out.println("Client : " + model.clientProperty().get());
        System.out.println("Date : " + model.dateProperty().get());
        System.out.println("Description : " + model.descriptionProperty().get());
        System.out.println("Montant : " + model.amountProperty().get());
    }
}
