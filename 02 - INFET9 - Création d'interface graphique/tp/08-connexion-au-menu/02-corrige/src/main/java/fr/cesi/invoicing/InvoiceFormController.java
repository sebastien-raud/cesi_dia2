package fr.cesi.invoicing;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class InvoiceFormController {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

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
    private void handleSave() throws Exception {
        LocalDate date;
        try {
            date = LocalDate.parse(model.dateProperty().get(), DATE_FORMAT);
        } catch (Exception e) {
            date = LocalDate.now();
        }

        double amount = Double.parseDouble(model.amountProperty().get().replace(",", "."));

        InvoiceLine line = new InvoiceLine(model.descriptionProperty().get(), 1, amount);
        // save() attribue le numéro (F-{année}-{NNN}) et renvoie la facture numérotée.
        Invoice invoice = invoiceRepository.save(new Invoice(date, model.clientProperty().get(), List.of(line)));
        String file = "facture-" + invoice.getNumber() + ".pdf";
        invoicePdfService.generate(invoice, file);

        System.out.println("Facture enregistrée et PDF généré : " + file);
    }
}
