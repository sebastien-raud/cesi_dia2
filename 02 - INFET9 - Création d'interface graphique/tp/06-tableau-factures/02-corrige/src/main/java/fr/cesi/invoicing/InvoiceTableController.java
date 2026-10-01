package fr.cesi.invoicing;

import java.time.format.DateTimeFormatter;

import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

public class InvoiceTableController {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

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
    }

    private void loadInvoices() {
        ObservableList<Invoice> invoices = FXCollections.observableArrayList(invoiceRepository.findAll());
        tableView.setItems(invoices);
    }
}
