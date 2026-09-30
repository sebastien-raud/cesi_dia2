# TP6 : Rechercher et intégrer une bibliothèque d'e-mail

## Contexte

> **De :** Paul Hissage, secrétaire · **Objet :** Imprimer, scanner, envoyer…
>
> Bonjour,
>
> Pour chaque facture, aujourd'hui, j'imprime le PDF, je le scanne (oui), puis je l'envoie par e-mail au client. Ça fait beaucoup de papier pour un fichier qui était déjà un fichier. Est-ce que l'application pourrait envoyer directement la facture au client, en pièce jointe ?
>
> Paul

Troisième besoin client : envoyer la facture au client par e-mail, avec le PDF en pièce jointe.

Le cycle veille → choix → installation → POC → intégration a déjà été parcouru deux fois (PDF + persistance au TP4, authentification au TP5) : cette recherche se fait davantage en autonomie.

## Objectif

Rechercher, choisir et intégrer une bibliothèque d'envoi d'e-mail, avec pièce jointe PDF.

## Prérequis

- TP4 et TP5 (cycle veille → choix → intégration déjà pratiqué deux fois) ;
- notions SMTP / TLS / pièce jointe / MIME vues en introduction du Jour 1 ;
- séquence théorique « Sécurité des dépendances » (juste avant ce TP).

Une facture déjà générée (`facture-F-2026-001.pdf`, issue du TP4) est fournie dans le projet, pour se concentrer sur l'envoi plutôt que sur la régénération du PDF.

## Travail demandé

- Rechercher plusieurs solutions.
- Comparer les solutions.
- Choisir une bibliothèque.
- L'ajouter au projet.
- Réaliser un POC : envoyer un e-mail (destinataire, sujet, corps).
- Ajouter `facture-F-2026-001.pdf` en pièce jointe.
- Tester l'envoi sans vraie boîte e-mail (ex. un faux serveur SMTP local, démarré en standalone dans le code, sans JUnit) et vérifier ce qui a été réellement reçu (sujet, présence de la pièce jointe).
- Intégrer la fonctionnalité dans l'application (encapsuler dans un service dédié, sur le même principe que `InvoicePdfService`/`AuthService`).

<details>
<summary>💡 Comment tester sans envoyer de vrais e-mails ?</summary>

Avec un faux serveur SMTP qui tourne dans ton programme : il reçoit les messages et te permet de vérifier ce qui est arrivé. Cherche « fake SMTP server java » ou « embedded SMTP server java ».

<details>
<summary>🆘 Toujours coincé ?</summary>

GreenMail en est un : démarré dans le `main` (`new GreenMail(ServerSetupTest.SMTP)`), il écoute sur `localhost`, et `getReceivedMessages()` donne ce qui a été reçu (sujet, pièces jointes).

</details>
</details>

### Capsule : analyser les dépendances (15-20 min, pendant le TP)

Sur la bibliothèque e-mail tout juste choisie :

1. afficher son arbre de dépendances (`mvn dependency:tree`) ;
2. rechercher d'éventuelles vulnérabilités connues ;
3. identifier si une version corrigée existe.

## Pour aller plus loin : authentification SMTP et erreurs d'envoi

Un vrai serveur SMTP demande un identifiant et un mot de passe, et un envoi peut échouer (serveur injoignable, authentification refusée). Faire en sorte que :

- les identifiants ne soient **jamais écrits dans le code** ;
- une erreur d'envoi remonte avec un message clair, sans faire planter l'application.

<details>
<summary>🔑 La réponse (avec Simple Java Mail et GreenMail, comme dans le corrigé)</summary>

Les identifiants viennent de variables d'environnement, avec des valeurs réservées au serveur de test :

```java
String user = System.getenv().getOrDefault("SMTP_USER", "facturation");
String password = System.getenv().getOrDefault("SMTP_PASSWORD", "mot-de-passe-de-test");
```

Le service les reçoit par son constructeur, s'authentifie, et traduit l'échec en une exception à nous :

```java
Mailer mailer = MailerBuilder
        .withSMTPServer(host, port, user, password)
        .buildMailer();
try {
    mailer.sendMail(email).join();
} catch (RuntimeException e) {
    throw new EmailSendingException("Échec de l'envoi de la facture " + invoiceNumber, e);
}
```

Pour le tester, GreenMail peut exiger une authentification : `.withConfiguration(GreenMailConfiguration.aConfig().withUser(user, password))`. Un envoi avec un mauvais mot de passe doit alors lever `EmailSendingException`.

</details>

## Points de vigilance

- Tester sans vraie boîte e-mail (ex. serveur SMTP de test local) ;
- ne pas oublier le binding SLF4J (`slf4j-simple`) si la bibliothèque choisie en a besoin (déjà rencontré en TP3/TP4).

## Commandes utiles

```bash
mvn dependency:tree
```

## Résultat attendu

Une fonctionnalité d'envoi d'e-mail intégrée, accompagnée d'un premier réflexe d'analyse des dépendances sur une bibliothèque récemment choisie.
