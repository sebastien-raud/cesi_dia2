package fr.cesi.demo;

public class FriendlyGreetingService implements GreetingService {

    @Override
    public String greet(String name) {
        return "Bonjour " + name + " !";
    }
}
