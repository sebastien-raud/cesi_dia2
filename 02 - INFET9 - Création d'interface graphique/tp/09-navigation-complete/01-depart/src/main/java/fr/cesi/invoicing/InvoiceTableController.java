package fr.cesi.invoicing;

import javafx.util.StringConverter;
import java.time.format.DateTimeParseException;
import java.util.Comparator;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.collections.transformation.SortedList;
import javafx.fxml.FXML;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;

public class InvoiceTableController {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @FXML
    private TextField searchField;

    @FXML
    private DatePicker fromDateField;

    @FXML
    private TableView<Invoice> tableView;

    @FXML
    private TableColumn<Invoice, String> numberColumn;

    @FXML
    private TableColumn<Invoice, String> dateColumn;

    @FXML
    private TableColumn<Invoice, String> clientColumn;

    @FXML
    private TableColumn<Invoice, String> totalColumn;

    private InvoiceRepository invoiceRepository;
    private FilteredList<Invoice> filteredInvoices;

    public void setInvoiceRepository(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
        loadInvoices();
    }

    @FXML
    private void initialize() {
        numberColumn.setCellValueFactory(data ->
                new SimpleStringProperty(data.getValue().getNumber()));
        dateColumn.setCellValueFactory(data ->
                new SimpleStringProperty(data.getValue().getDate().format(DATE_FORMAT)));
        clientColumn.setCellValueFactory(data ->
                new SimpleStringProperty(data.getValue().getClient()));
        totalColumn.setCellValueFactory(data ->
                new SimpleStringProperty("%.2f €".formatted(data.getValue().getTotal())));
        // Colonnes en String formatées : sans comparateur, le tri serait alphabétique
        // ("20/10/2026" avant "21/09/2026", "1000.00 €" avant "210.00 €").
        dateColumn.setComparator(Comparator.comparing(text -> LocalDate.parse(text, DATE_FORMAT)));
        totalColumn.setComparator(Comparator.comparingDouble(InvoiceTableController::amount));

        searchField.textProperty().addListener((obs, old, value) -> applyFilter());
        // Saisie libre tolérante : un texte qui n'est pas une date (ex. « hier ») est ignoré
        // au lieu de lever une DateTimeParseException.
        fromDateField.setConverter(new StringConverter<>() {
            @Override
            public String toString(LocalDate date) {
                return date == null ? "" : date.format(DATE_FORMAT);
            }

            @Override
            public LocalDate fromString(String text) {
                try {
                    return text == null || text.isBlank() ? null : LocalDate.parse(text.trim(), DATE_FORMAT);
                } catch (DateTimeParseException e) {
                    return null;
                }
            }
        });
        fromDateField.valueProperty().addListener((obs, old, value) -> applyFilter());
    }

    private void loadInvoices() {
        ObservableList<Invoice> invoices = FXCollections.observableArrayList(invoiceRepository.findAll());
        filteredInvoices = new FilteredList<>(invoices, f -> true);

        SortedList<Invoice> sortedInvoices = new SortedList<>(filteredInvoices);
        sortedInvoices.comparatorProperty().bind(tableView.comparatorProperty());

        tableView.setItems(sortedInvoices);
    }

    private void applyFilter() {
        String search = searchField.getText() == null ? "" : searchField.getText().toLowerCase();
        LocalDate fromDate = fromDateField.getValue();

        filteredInvoices.setPredicate(invoice -> {
            boolean matchesClient = invoice.getClient().toLowerCase().contains(search);
            boolean matchesDate = fromDate == null || !invoice.getDate().isBefore(fromDate);
            return matchesClient && matchesDate;
        });
    }

    // "890.00 €" ou "890,00 €" (selon la locale) -> 890.0
    private static double amount(String text) {
        return Double.parseDouble(text.replace("€", "").replace(",", ".").trim());
    }
}
