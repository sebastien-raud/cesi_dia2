package fr.cesi.tp5;

import java.util.Optional;

public class Main {

    public static void main(String[] args) {
        AuthRepository repository = new AuthRepository("invoices.db");
        AuthService authService = new AuthService();

        String initialPassword = "S3basti3n!";
        String hash = authService.hash(initialPassword);
        repository.save(new User("admin", hash));

        System.out.println("Utilisateur \"admin\" créé, mot de passe haché : " + hash);

        Optional<User> user = repository.findByUsername("admin");

        boolean correctPassword = authService.verify(initialPassword, user.get().getPasswordHash());
        boolean wrongPassword = authService.verify("mauvais-mot-de-passe", user.get().getPasswordHash());

        System.out.println("Vérification avec le bon mot de passe : " + correctPassword);
        System.out.println("Vérification avec un mauvais mot de passe : " + wrongPassword);
    }
}
