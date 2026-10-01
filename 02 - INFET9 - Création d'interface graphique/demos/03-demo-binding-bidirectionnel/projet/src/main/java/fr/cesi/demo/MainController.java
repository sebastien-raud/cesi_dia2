package fr.cesi.demo;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class MainController {

    @FXML
    private TextField nameField;

    @FXML
    private Label echoLabel;

    private final PersonModel model = new PersonModel();

    @FXML
    private void initialize() {
        // Binding bidirectionnel : taper dans le champ met à jour le modèle,
        // et modifier le modèle par code met à jour le champ.
        nameField.textProperty().bindBidirectional(model.nameProperty());

        // Binding à sens unique, juste pour visualiser en direct la valeur
        // réelle du modèle, indépendamment du champ.
        echoLabel.textProperty().bind(model.nameProperty());
    }

    @FXML
    private void handleChangeFromCode() {
        model.setName("Ada Lovelace");
    }
}
