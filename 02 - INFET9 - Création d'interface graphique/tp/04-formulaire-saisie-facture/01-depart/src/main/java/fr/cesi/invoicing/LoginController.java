package fr.cesi.invoicing;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

public class LoginController {

    @FXML
    private TextField usernameField;

    @FXML
    private PasswordField passwordField;

    @FXML
    private Button loginButton;

    @FXML
    private Label errorLabel;

    @FXML
    private void initialize() {
        loginButton.disableProperty().bind(
                usernameField.textProperty().isEmpty()
                        .or(passwordField.textProperty().isEmpty())
        );
    }

    @FXML
    private void handleLogin() {
        // La vérification réelle (via AuthService) sera branchée au TP5 ;
        // errorLabel est déjà prêt à être affiché à ce moment-là.
        System.out.println("Identifiant saisi : " + usernameField.getText());
        System.out.println("Mot de passe saisi : " + passwordField.getText());
    }
}
