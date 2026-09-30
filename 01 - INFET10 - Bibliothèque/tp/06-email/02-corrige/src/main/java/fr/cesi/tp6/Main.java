package fr.cesi.tp6;

import java.io.File;

import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetupTest;
import jakarta.mail.internet.MimeMessage;

public class Main {

    public static void main(String[] args) throws Exception {
        // Identifiants SMTP lus dans l'environnement ; valeurs par défaut réservées au serveur de test.
        String user = System.getenv().getOrDefault("SMTP_USER", "facturation");
        String password = System.getenv().getOrDefault("SMTP_PASSWORD", "mot-de-passe-de-test");

        // Faux serveur SMTP local, qui exige une authentification.
        GreenMail greenMail = new GreenMail(ServerSetupTest.SMTP)
                .withConfiguration(GreenMailConfiguration.aConfig().withUser(user, password));
        greenMail.start();

        try {
            File pdf = new File("facture-F-2026-001.pdf");

            EmailService emailService = new EmailService("localhost", ServerSetupTest.SMTP.getPort(), user, password);
            emailService.sendInvoiceByEmail("client@example.com", "F-2026-001", pdf);

            MimeMessage[] messages = greenMail.getReceivedMessages();
            System.out.println(messages.length + " message(s) reçu(s) par GreenMail.");

            MimeMessage message = messages[0];
            System.out.println("Sujet : " + message.getSubject());
            System.out.println("Contient une pièce jointe : " + GreenMailUtil.hasNonTextAttachments(message));

            // Gestion d'erreur : un mauvais mot de passe est refusé par le serveur.
            EmailService wrongCredentials = new EmailService("localhost", ServerSetupTest.SMTP.getPort(), user, "mauvais");
            try {
                wrongCredentials.sendInvoiceByEmail("client@example.com", "F-2026-001", pdf);
                System.out.println("Anomalie : envoi accepté avec un mauvais mot de passe.");
            } catch (EmailSendingException e) {
                System.out.println("Erreur attendue : " + e.getMessage());
            }
        } finally {
            greenMail.stop();
        }
    }
}
