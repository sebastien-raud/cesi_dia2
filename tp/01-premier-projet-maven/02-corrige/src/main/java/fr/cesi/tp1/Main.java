package fr.cesi.tp1;

import com.google.gson.Gson;

public class Main {

    public static void main(String[] args) {
        Invoice invoice = new Invoice("F-2026-001", "Sébastien Général & Associés", 149.90);

        System.out.println("Facture n°" + invoice.getNumber());

        Gson gson = new Gson();
        String json = gson.toJson(invoice);
        System.out.println("JSON : " + json);
    }
}
