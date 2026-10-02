package fr.cesi.invoicing;

import java.io.IOException;
import java.util.Optional;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
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

    private Scene scene;
    private AuthService authService;
    private AuthRepository authRepository;
    private InvoiceRepository invoiceRepository;
    private InvoicePdfService invoicePdfService;

    public void setScene(Scene scene) {
        this.scene = scene;
    }

    public void setAuthService(AuthService authService) {
        this.authService = authService;
    }

    public void setAuthRepository(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    public void setInvoiceRepository(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public void setInvoicePdfService(InvoicePdfService invoicePdfService) {
        this.invoicePdfService = invoicePdfService;
    }

    @FXML
    private void initialize() {
        loginButton.disableProperty().bind(
                usernameField.textProperty().isEmpty()
                        .or(passwordField.textProperty().isEmpty())
        );
    }

    @FXML
    private void handleLogin() throws IOException {
        Optional<User> user = authRepository.findByUsername(usernameField.getText());
        boolean valid = user.isPresent()
                && authService.verify(passwordField.getText(), user.get().getPasswordHash());

        if (!valid) {
            errorLabel.setVisible(true);
            errorLabel.setManaged(true);
            return;
        }

        FXMLLoader loader = new FXMLLoader(getClass().getResource("invoice-form.fxml"));
        Parent root = loader.load();

        InvoiceFormController controller = loader.getController();
        controller.setInvoiceRepository(invoiceRepository);
        controller.setInvoicePdfService(invoicePdfService);

        scene.setRoot(root);
    }
}
