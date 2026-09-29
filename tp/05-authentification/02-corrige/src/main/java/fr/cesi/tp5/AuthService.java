package fr.cesi.tp5;

import at.favre.lib.crypto.bcrypt.BCrypt;

public class AuthService {

    private static final int COST = 12;

    public String hash(String password) {
        return BCrypt.withDefaults().hashToString(COST, password.toCharArray());
    }

    public boolean verify(String enteredPassword, String passwordHash) {
        return BCrypt.verifyer().verify(enteredPassword.toCharArray(), passwordHash).verified;
    }
}
