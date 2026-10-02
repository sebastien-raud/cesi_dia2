package fr.cesi.invoicing;

import java.time.LocalDate;
import java.util.List;

public class Invoice {

    private final String number;
    private final LocalDate date;
    private final String client;
    private final List<InvoiceLine> lines;

    public Invoice(String number, LocalDate date, String client, List<InvoiceLine> lines) {
        this.number = number;
        this.date = date;
        this.client = client;
        this.lines = lines;
    }

    // Nouvelle facture, pas encore numérotée : InvoiceRepository.save() lui attribue son numéro.
    public Invoice(LocalDate date, String client, List<InvoiceLine> lines) {
        this(null, date, client, lines);
    }

    public String getNumber() {
        return number;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getClient() {
        return client;
    }

    public List<InvoiceLine> getLines() {
        return lines;
    }

    public double getTotal() {
        return lines.stream().mapToDouble(InvoiceLine::getAmount).sum();
    }
}
