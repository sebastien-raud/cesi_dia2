package fr.cesi.demo;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class MainController {

    @FXML
    private TextField lastNameField;

    @FXML
    private TextField firstNameField;

    @FXML
    private TextField ageField;

    @FXML
    private Label resultLabel;

    @FXML
    private void handleBuild() {
        // Mapping formulaire -> objet métier : lecture ponctuelle des
        // champs, déclenchée par une action (pas de synchronisation live).
        Person person = new Person(
                lastNameField.getText(),
                firstNameField.getText(),
                Integer.parseInt(ageField.getText())
        );
        resultLabel.setText(person.toString());
    }

    @FXML
    private void handlePrefill() {
        // Mapping objet métier -> formulaire (sens inverse), par exemple
        // pour préremplir un écran d'édition.
        Person person = new Person("Curie", "Marie", 66);
        lastNameField.setText(person.getLastName());
        firstNameField.setText(person.getFirstName());
        ageField.setText(String.valueOf(person.getAge()));
        resultLabel.setText(person.toString());
    }
}
