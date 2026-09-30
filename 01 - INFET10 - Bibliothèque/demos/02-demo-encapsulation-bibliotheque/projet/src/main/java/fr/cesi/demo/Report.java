package fr.cesi.demo;

//import org.apache.commons.lang3.StringUtils;

public class Report {

    public String generateSummary(String title) {
        // État "avant" : appel direct à l'API de la bibliothèque.
        //return StringUtils.capitalize(title);

        // État "après" (une fois TextService en place) : remplacer la ligne
        // ci-dessus par les deux lignes suivantes.
        //
        TextService textService = new TextService();
        return textService.formatText(title);
    }
}
