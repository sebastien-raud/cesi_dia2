package fr.cesi.invoicing;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class InvoiceFormModel {

    private final StringProperty client = new SimpleStringProperty("");
    private final StringProperty date = new SimpleStringProperty("");
    private final StringProperty description = new SimpleStringProperty("");
    private final StringProperty amount = new SimpleStringProperty("");

    public StringProperty clientProperty() {
        return client;
    }

    public StringProperty dateProperty() {
        return date;
    }

    public StringProperty descriptionProperty() {
        return description;
    }

    public StringProperty amountProperty() {
        return amount;
    }
}
