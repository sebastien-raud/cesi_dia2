package fr.cesi.tp4;

import java.time.LocalDate;
import java.util.List;

public class Main {

    public static void main(String[] args) throws Exception {
        InvoiceRepository repository = new InvoiceRepository("invoices.db");

        Invoice invoice = new Invoice(
                LocalDate.of(2026, 9, 23),
                "Sébastien Général & Associés",
                List.of(
                        new InvoiceLine("Développement du module Bibliothèques", 1, 1200.00),
                        new InvoiceLine("Formation à distance", 1, 149.90)
                )
        );

        // save() attribue le numéro (F-2026-001, puis F-2026-002 au lancement suivant...).
        Invoice saved = repository.save(invoice);
        System.out.println("Facture enregistrée : " + saved.getNumber());

        List<Invoice> invoices = repository.findAll();
        System.out.println(invoices.size() + " facture(s) en base.");

        Invoice firstInvoice = invoices.get(0);

        InvoicePdfService invoicePdfService = new InvoicePdfService();
        String file = "facture-" + firstInvoice.getNumber() + ".pdf";
        invoicePdfService.generate(firstInvoice, file);

        System.out.println("PDF généré : " + file);
    }
}
