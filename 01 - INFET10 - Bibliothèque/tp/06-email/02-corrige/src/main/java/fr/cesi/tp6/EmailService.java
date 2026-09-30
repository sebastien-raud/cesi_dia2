package fr.cesi.tp6;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import jakarta.mail.Message;
import org.simplejavamail.api.email.Email;
import org.simplejavamail.api.email.Recipient;
import org.simplejavamail.api.mailer.Mailer;
import org.simplejavamail.email.EmailBuilder;
import org.simplejavamail.mailer.MailerBuilder;

public class EmailService {

    private final String host;
    private final int port;
    private final String user;
    private final String password;

    // Identifiants SMTP fournis de l'extérieur (variables d'environnement dans Main),
    // jamais écrits en clair dans le code.
    public EmailService(String host, int port, String user, String password) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
    }

    public void sendInvoiceByEmail(String recipient, String invoiceNumber, File pdfAttachment) throws IOException {
        byte[] pdfContent = Files.readAllBytes(pdfAttachment.toPath());

        Email email = EmailBuilder.startingBlank()
                .from("facturation@cesi-demo.fr")
                .withRecipients(new Recipient(null, recipient, Message.RecipientType.TO, null))
                .withSubject("Votre facture n°" + invoiceNumber)
                .withPlainText("Bonjour,\n\nVeuillez trouver ci-joint votre facture n°" + invoiceNumber + ".\n\nCordialement.")
                .withAttachment(pdfAttachment.getName(), pdfContent, "application/pdf")
                .buildEmail();

        Mailer mailer = MailerBuilder
                .withSMTPServer(host, port, user, password)
                .buildMailer();

        try {
            mailer.sendMail(email).join();
        } catch (RuntimeException e) {
            // Serveur injoignable, authentification refusée... : une erreur claire pour l'appelant.
            throw new EmailSendingException("Échec de l'envoi de la facture " + invoiceNumber + " à " + recipient, e);
        }
    }
}
