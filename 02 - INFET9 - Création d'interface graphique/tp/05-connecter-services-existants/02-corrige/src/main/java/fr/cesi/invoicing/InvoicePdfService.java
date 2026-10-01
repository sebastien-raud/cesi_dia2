package fr.cesi.invoicing;

import java.io.FileOutputStream;
import java.time.format.DateTimeFormatter;

import org.openpdf.pdf.ITextRenderer;

public class InvoicePdfService {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public void generate(Invoice invoice, String filePath) throws Exception {
        StringBuilder linesHtml = new StringBuilder();
        for (InvoiceLine line : invoice.getLines()) {
            linesHtml.append("<tr>")
                    .append("<td>").append(line.getDescription()).append("</td>")
                    .append("<td>").append(line.getQuantity()).append("</td>")
                    .append("<td>").append("%.2f €".formatted(line.getUnitPrice())).append("</td>")
                    .append("<td>").append("%.2f €".formatted(line.getAmount())).append("</td>")
                    .append("</tr>");
        }

        String html = """
                <html>
                  <head>
                    <style>
                      body { font-family: sans-serif; }
                      h1 { color: navy; }
                      table { width: 100%%; border-collapse: collapse; margin-top: 20px; }
                      th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
                      .total { font-weight: bold; text-align: right; }
                    </style>
                  </head>
                  <body>
                    <h1>Facture n°%s</h1>
                    <p>Date : %s</p>
                    <p>Client : %s</p>
                    <table>
                      <tr><th>Désignation</th><th>Quantité</th><th>Prix unitaire</th><th>Montant</th></tr>
                      %s
                    </table>
                    <p class="total">Total : %s</p>
                  </body>
                </html>
                """.formatted(
                        invoice.getNumber(),
                        invoice.getDate().format(DATE_FORMAT),
                        invoice.getClient(),
                        linesHtml,
                        "%.2f €".formatted(invoice.getTotal())
                );

        try (FileOutputStream output = new FileOutputStream(filePath)) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(output);
        }
    }
}
