package fr.cesi.demo;

import org.apache.commons.lang3.StringUtils;

/**
 * Point d'entrée unique vers la bibliothèque commons-lang3 pour le
 * formatage de texte. Si la bibliothèque change un jour, seule cette
 * classe est à modifier.
 */
public class TextService {

    public String formatText(String text) {
        return StringUtils.capitalize(text);
    }
}
