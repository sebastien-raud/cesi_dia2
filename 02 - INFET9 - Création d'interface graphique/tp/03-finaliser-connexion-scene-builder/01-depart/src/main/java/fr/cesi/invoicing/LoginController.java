package fr.cesi.invoicing;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
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
    private void initialize() {
        loginButton.disableProperty().bind(
                usernameField.textProperty().isEmpty()
                        .or(passwordField.textProperty().isEmpty())
        );
    }

    @FXML
    private void handleLogin() {
        System.out.println("Identifiant saisi : " + usernameField.getText());
        System.out.println("Mot de passe saisi : " + passwordField.getText());
    }
}
