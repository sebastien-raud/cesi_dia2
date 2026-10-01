package fr.cesi.demo;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class GreetingController {

    @FXML
    private TextField nameField;

    @FXML
    private Label resultLabel;

    private GreetingService greetingService;

    public void setGreetingService(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @FXML
    private void handleGreet() {
        resultLabel.setText(greetingService.greet(nameField.getText()));
    }
}
