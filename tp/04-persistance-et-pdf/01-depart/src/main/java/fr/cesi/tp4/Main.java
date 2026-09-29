package fr.cesi.tp4;

import java.time.LocalDate;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // Nouvelle facture, sans numéro : InvoiceRepository.save() le lui attribuera.
        Invoice invoice = new Invoice(
                LocalDate.of(2026, 9, 23),
                "Sébastien Général & Associés",
                List.of(
                        new InvoiceLine("Développement du module Bibliothèques", 1, 1200.00),
                        new InvoiceLine("Formation à distance", 1, 149.90)
                )
        );

        System.out.println("Facture pour " + invoice.getClient() + " - Total : " + invoice.getTotal() + " €");

        // Sous-partie A : encapsulation et génération PDF
        // Étape 2 : créer la classe InvoicePdfService et y déplacer l'appel
        //           à la bibliothèque PDF (dépendance à ajouter au pom.xml).
        // Étape 3 : générer le PDF de cette facture construite en code.
        // Étape 4 : tester le résultat (mise en page, accents).
        //
        // Sous-partie B : persistance
        // Étape 6 : persister la facture avec InvoiceRepository.save(invoice),
        //           qui renvoie la facture numérotée (F-2026-001, F-2026-002...).
        // Étape 7 : relire les factures avec InvoiceRepository.findAll()
        //           (vérifier aussi le contenu de invoices.db avec un client SQLite).
        // Étape 8 : générer le PDF d'une facture relue depuis la base.
    }
}
