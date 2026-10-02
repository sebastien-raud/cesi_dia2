package fr.cesi.invoicing;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class InvoiceFormController {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @FXML
    private Label titleLabel;

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
    private ShellController shell;
    private String editedNumber;
    // Quantité de la ligne éditée : conservée pour ne pas transformer « 2 x 350 » en « 1 x 700 ».
    private int editedQuantity = 1;

    public void setInvoiceRepository(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public void setInvoicePdfService(InvoicePdfService invoicePdfService) {
        this.invoicePdfService = invoicePdfService;
    }

    public void setShell(ShellController shell) {
        this.shell = shell;
    }

    public void loadInvoice(Invoice invoice) {
        this.editedNumber = invoice.getNumber();
        titleLabel.setText("Modifier la facture " + invoice.getNumber());

        model.clientProperty().set(invoice.getClient());
        model.dateProperty().set(invoice.getDate().format(DATE_FORMAT));

        InvoiceLine firstLine = invoice.getLines().get(0);
        model.descriptionProperty().set(firstLine.getDescription());
        model.amountProperty().set(String.valueOf(firstLine.getAmount()));
        editedQuantity = firstLine.getQuantity();
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
        // Le champ « Montant » est le total de la ligne : en édition, on garde la quantité d'origine.
        int quantity = editedNumber != null ? editedQuantity : 1;
        InvoiceLine line = new InvoiceLine(model.descriptionProperty().get(), quantity, amount / quantity);

        if (editedNumber != null) {
            Invoice invoice = new Invoice(editedNumber, date, model.clientProperty().get(), List.of(line));
            invoiceRepository.update(invoice);
            invoicePdfService.generate(invoice, "facture-" + editedNumber + ".pdf");
            System.out.println("Facture modifiée et PDF régénéré : facture-" + editedNumber + ".pdf");
        } else {
            // save() attribue le numéro (F-{année}-{NNN}) et renvoie la facture numérotée.
            Invoice invoice = invoiceRepository.save(new Invoice(date, model.clientProperty().get(), List.of(line)));
            String file = "facture-" + invoice.getNumber() + ".pdf";
            invoicePdfService.generate(invoice, file);
            System.out.println("Facture enregistrée et PDF généré : " + file);
        }
    }

    @FXML
    private void handleBackToMenu() {
        shell.showHome();
    }

}
