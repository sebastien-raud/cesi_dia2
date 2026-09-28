package fr.cesi.tp3;

import java.io.FileOutputStream;

import org.openpdf.pdf.ITextRenderer;

public class Main {

    public static void main(String[] args) throws Exception {
        String html = """
                <html>
                  <head>
                    <style>
                      body { font-family: sans-serif; }
                      h1 { color: navy; }
                    </style>
                  </head>
                  <body>
                    <h1>Facture n°F-2026-001</h1>
                    <p>Client : Sébastien Général & Associés</p>
                    <p>Montant à régler : 149,90 €</p>
                  </body>
                </html>
                """;

        try (FileOutputStream output = new FileOutputStream("facture-test.pdf")) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(output);
        }

        System.out.println("PDF généré : facture-test.pdf");
    }
}
