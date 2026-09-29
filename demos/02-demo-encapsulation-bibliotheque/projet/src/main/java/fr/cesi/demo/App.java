package fr.cesi.demo;

public class App {

    public static void main(String[] args) {
        Report report = new Report();
        Notification notification = new Notification();

        System.out.println(report.generateSummary("bilan mensuel"));
        System.out.println(notification.generateMessage("nouvelle facture disponible"));
    }
}
