package fr.cesi.tp6;

// Erreur d'envoi d'e-mail, indépendante de la bibliothèque utilisée.
public class EmailSendingException extends RuntimeException {

    public EmailSendingException(String message, Throwable cause) {
        super(message, cause);
    }
}
