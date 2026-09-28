package fr.cesi.tp1;

public class Main {

    public static void main(String[] args) {
        Invoice invoice = new Invoice("F-2026-001", "Sébastien Général & Associés", 149.90);

        System.out.println("Facture n°" + invoice.getNumber());

        // Étapes 4 à 6 du TP : ajouter la dépendance Gson au pom.xml, puis
        // utiliser com.google.gson.Gson pour transformer invoice en JSON
        // et afficher le résultat.
    }
}
