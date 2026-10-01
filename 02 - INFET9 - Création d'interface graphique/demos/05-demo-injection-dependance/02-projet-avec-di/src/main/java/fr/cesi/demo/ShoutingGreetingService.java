package fr.cesi.demo;

/**
 * Implémentation alternative, utilisée pour prouver que l'on peut
 * changer de service sans toucher au GreetingController (une fois le
 * couplage direct remplacé par une injection par setter).
 */
public class ShoutingGreetingService implements GreetingService {

    @Override
    public String greet(String name) {
        return ("SALUT " + name + " !!!").toUpperCase();
    }
}
