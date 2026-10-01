# TP5 : Connecter la connexion et le formulaire aux services existants

## Contexte

> **De :** Ella Lavisse, comptable · **Objet :** Enregistrer… et après ?
>
> Bonjour,
>
> Les écrans sont très bien. Mais quand je clique sur « Enregistrer », la facture ne va nulle part : je la cherche encore. J'aimerais qu'elle soit vraiment enregistrée, avec son PDF, comme avant avec la ligne de commande.
>
> Ella

Les écrans de connexion (TP2/TP3) et de formulaire (TP4) sont construits, mais sans logique métier réelle. Il s'agit maintenant d'appeler les services métier développés en INFET10 (`AuthService`, `AuthRepository`, `InvoiceRepository`, `InvoicePdfService`), via injection de dépendance.

**Point de départ** : dans `01-depart/`, la connexion est **déjà câblée** (`LoginController` reçoit tous les services, vérifie réellement l'identifiant/mot de passe, affiche une erreur si besoin, puis navigue vers le formulaire). Reste à câbler le **formulaire** : `InvoiceFormController` reçoit déjà `invoiceRepository` et `invoicePdfService` par setter (déjà présents), mais `handleSave()` se contente encore d'un affichage console, à toi de le compléter.

## Objectif

Brancher réellement le bouton « Enregistrer » du formulaire aux services métier existants : construire une `Invoice`, la persister, générer son PDF.

## Prérequis

- Séquence théorique « Injection de dépendance » (injection par setter, adaptée au `FXMLLoader`) ;
- TP2/TP3 (`LoginController`), TP4 (`InvoiceFormController`) ;
- `AuthService`, `AuthRepository`, `InvoiceRepository`, `InvoicePdfService` (INFET10, copiés dans ce projet).

## Travail demandé

1. Lire `LoginController` (déjà câblé) pour comprendre le principe : `AuthRepository.findByUsername(...)` puis `AuthService.verify(...)`, affichage de `errorLabel` si échec, navigation (`scene.setRoot(...)`) vers `invoice-form.fxml` si succès, avec injection de `invoiceRepository`/`invoicePdfService` dans le `InvoiceFormController` chargé.
2. Dans `InvoiceFormController.handleSave()` :
   - parser la date saisie (`LocalDate.parse` avec un `DateTimeFormatter` `"dd/MM/yyyy"`), avec un repli sur `LocalDate.now()` si le champ est vide ou mal formé ;
   - construire une `InvoiceLine` (description, quantité 1, montant parsé en `double`) puis une `Invoice`, sans numéro ;
   - persister avec `invoice = invoiceRepository.save(invoice)` : le repository attribue le numéro (`F-2026-001`…) et renvoie la facture numérotée ;
   - générer le PDF avec `invoicePdfService.generate(invoice, "facture-" + invoice.getNumber() + ".pdf")`.
3. Tester le parcours complet : connexion (identifiant `admin`, mot de passe `S3basti3n!`, créé automatiquement au premier lancement), puis saisie et enregistrement d'une facture.

<details>
<summary>💡 Comment lire la date saisie sans planter ?</summary>

`LocalDate.parse` lève une exception si le texte n'est pas une date : entoure-le d'un `try`/`catch`, avec `LocalDate.now()` comme repli.

<details>
<summary>🆘 Toujours coincé ?</summary>

```java
LocalDate date;
try {
    date = LocalDate.parse(model.dateProperty().get(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
} catch (Exception e) {
    date = LocalDate.now();
}
```

</details>
</details>

<details>
<summary>💡 Où est le PDF généré ?</summary>

Dans le dossier depuis lequel tu as lancé l'application (celui du `pom.xml`), sous le nom `facture-F-00N.pdf`.

</details>

## Points de vigilance

- Un seul point d'assemblage pour les services, dans `App.java` (pas d'instanciation dispersée, jamais `new AuthService()` dans un Controller) ;
- vérifier que l'injection est bien appelée **après** le chargement du FXML (`loader.getController()`) ;
- le mot de passe de démonstration (`admin` / `S3basti3n!`) n'est créé que si l'utilisateur n'existe pas déjà en base (`authRepository.findByUsername("admin").isEmpty()`).

## Commandes utiles

```bash
mvn compile

# Vérifier la persistance après un enregistrement
sqlite3 invoices.db "SELECT * FROM invoices;"
sqlite3 invoices.db "SELECT * FROM invoice_lines;"
```

## Résultat attendu

Un parcours complet fonctionnel : connexion (avec message d'erreur si échec), navigation vers le formulaire, enregistrement d'une facture (persistée en base), génération du PDF correspondant.
