package fr.cesi.tp1;

public class Invoice {

    private final String number;
    private final String client;
    private final double amount;

    public Invoice(String number, String client, double amount) {
        this.number = number;
        this.client = client;
        this.amount = amount;
    }

    public String getNumber() {
        return number;
    }

    public String getClient() {
        return client;
    }

    public double getAmount() {
        return amount;
    }
}
