package fr.cesi.tp5;

public class Main {

    public static void main(String[] args) {
        AuthRepository repository = new AuthRepository("invoices.db");

        System.out.println("AuthRepository prêt (table utilisateurs créée si besoin).");

        // Étapes 2 à 5 : rechercher, comparer, choisir une bibliothèque de
        // hachage (bcrypt, Argon2...), l'ajouter au pom.xml.
        //
        // Étape 6 : réaliser un POC : hacher un mot de passe, vérifier une
        // saisie par rapport au hash stocké.
        //
        // Étape 7 : encapsuler cette logique dans un AuthService.
        //
        // Étapes 8 et 9 : persister un utilisateur (ex. "admin") avec
        // repository.save(...), puis vérifier une saisie correcte et une
        // saisie incorrecte via AuthService.
    }
}
