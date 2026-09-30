package fr.cesi.tp5;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;

public class AuthRepository {

    private final String url;

    public AuthRepository(String databasePath) {
        this.url = "jdbc:sqlite:" + databasePath;
        createSchema();
    }

    private void createSchema() {
        String sql = """
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL
                )
                """;
        try (Connection connection = DriverManager.getConnection(url);
             Statement statement = connection.createStatement()) {
            statement.execute(sql);
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de créer le schéma SQLite", e);
        }
    }

    public void save(User user) {
        String sql = "INSERT OR REPLACE INTO users (username, password_hash) VALUES (?, ?)";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getPasswordHash());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Impossible d'enregistrer l'utilisateur", e);
        }
    }

    public Optional<User> findByUsername(String username) {
        String sql = "SELECT username, password_hash FROM users WHERE username = ?";

        try (Connection connection = DriverManager.getConnection(url);
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, username);

            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(new User(
                            rs.getString("username"),
                            rs.getString("password_hash")
                    ));
                }
                return Optional.empty();
            }
        } catch (SQLException e) {
            throw new RuntimeException("Impossible de lire l'utilisateur", e);
        }
    }
}
