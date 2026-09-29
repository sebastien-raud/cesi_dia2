package fr.cesi.tp4;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class InvoiceRepository {

    private final String url;

    public InvoiceRepository(String databasePath) {
        this.url = "jdbc:sqlite:" + databasePath;
        createSchema();
    }

    private void createSchema() {
        String sqlInvoices = """
                CREATE TABLE IF NOT EXISTS invoices (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    number TEXT NOT NULL,
                    date TEXT NOT NULL,
                    client TEXT NOT NULL
                )
                """;
        String sqlLines = """
                CREATE TABLE IF NOT EXISTS invoice_lines (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    invoice_id INTEGER NOT NULL,
                    description TEXT NOT NULL,
                    quantity INTEGER NOT NULL,
                    unit_price REAL NOT NULL,
                    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
                )
                """;
        try (Connection connection = DriverManager.getConnection(url);
             Statement statement = connection.createStatement()) {
            statement.execute(sqlInvoices);
            statement.execute(sqlLines);
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de créer le schéma SQLite", e);
        }
    }

    // Enregistre une nouvelle facture et lui attribue son numéro : renvoie la facture numérotée.
    public Invoice save(Invoice invoice) {
        String sqlInvoice = "INSERT INTO invoices (number, date, client) VALUES (?, ?, ?)";
        String sqlLine = "INSERT INTO invoice_lines (invoice_id, description, quantity, unit_price) VALUES (?, ?, ?, ?)";

        try (Connection connection = DriverManager.getConnection(url)) {
            String number = nextNumber(connection, invoice.getDate().getYear());
            long invoiceId;
            try (PreparedStatement statement = connection.prepareStatement(sqlInvoice, Statement.RETURN_GENERATED_KEYS)) {
                statement.setString(1, number);
                statement.setString(2, invoice.getDate().toString());
                statement.setString(3, invoice.getClient());
                statement.executeUpdate();

                try (ResultSet keys = statement.getGeneratedKeys()) {
                    keys.next();
                    invoiceId = keys.getLong(1);
                }
            }

            try (PreparedStatement statement = connection.prepareStatement(sqlLine)) {
                for (InvoiceLine line : invoice.getLines()) {
                    statement.setLong(1, invoiceId);
                    statement.setString(2, line.getDescription());
                    statement.setInt(3, line.getQuantity());
                    statement.setDouble(4, line.getUnitPrice());
                    statement.addBatch();
                }
                statement.executeBatch();
            }
            return new Invoice(number, invoice.getDate(), invoice.getClient(), invoice.getLines());
        } catch (SQLException e) {
            throw new RuntimeException("Impossible d'enregistrer la facture", e);
        }
    }

    // Prochain numéro de l'année de la facture : F-{année}-{NNN}, NNN repartant à 001 chaque année.
    // MAX(number) fonctionne car NNN est complété par des zéros (F-2026-009 < F-2026-010).
    private String nextNumber(Connection connection, int year) throws SQLException {
        String prefix = "F-" + year + "-";
        try (PreparedStatement statement = connection.prepareStatement("SELECT MAX(number) FROM invoices WHERE number LIKE ?")) {
            statement.setString(1, prefix + "%");
            try (ResultSet rs = statement.executeQuery()) {
                String last = rs.next() ? rs.getString(1) : null;
                int next = last == null ? 1 : Integer.parseInt(last.substring(prefix.length())) + 1;
                return prefix + "%03d".formatted(next);
            }
        }
    }

    public List<Invoice> findAll() {
        String sqlInvoices = "SELECT id, number, date, client FROM invoices";
        String sqlLines = "SELECT description, quantity, unit_price FROM invoice_lines WHERE invoice_id = ?";

        List<Invoice> invoices = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(url);
             Statement statement = connection.createStatement();
             ResultSet rs = statement.executeQuery(sqlInvoices)) {

            while (rs.next()) {
                long id = rs.getLong("id");
                List<InvoiceLine> lines = new ArrayList<>();

                try (PreparedStatement linesStatement = connection.prepareStatement(sqlLines)) {
                    linesStatement.setLong(1, id);
                    try (ResultSet linesRs = linesStatement.executeQuery()) {
                        while (linesRs.next()) {
                            lines.add(new InvoiceLine(
                                    linesRs.getString("description"),
                                    linesRs.getInt("quantity"),
                                    linesRs.getDouble("unit_price")
                            ));
                        }
                    }
                }

                invoices.add(new Invoice(
                        rs.getString("number"),
                        LocalDate.parse(rs.getString("date")),
                        rs.getString("client"),
                        lines
                ));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de lire les factures", e);
        }

        return invoices;
    }
}
