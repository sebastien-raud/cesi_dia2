# TP9 : Navigation complète

## Contexte

> **De :** Guy Mauve, stagiaire comptable · **Objet :** J'ai fait une faute (dans le nom d'un client)
>
> Bonjour,
>
> J'ai mal écrit le nom d'un client. Pour corriger, j'ai recréé la facture. Maintenant il y a deux factures identiques, F-2026-002 et F-2026-005, et Ella me regarde bizarrement.
>
> Est-ce qu'on pourrait ouvrir une facture depuis la liste, voir son détail, et la modifier ?
>
> Guy

Finaliser le parcours de navigation sur le fil rouge : connexion → menu → liste ↔ détail ↔ formulaire.

## Objectif

Obtenir un parcours de navigation complet et cohérent sur l'ensemble de l'application.

## Prérequis

- TP8 (connexion → menu fonctionnel) ;
- TP6/TP7 (liste des factures, avec filtres).

## Travail demandé

Fournis dans le projet : l'écran de détail (`invoice-detail.fxml` et un squelette de `InvoiceDetailController`) et la méthode `InvoiceRepository.update(Invoice)`.

1. Compléter `InvoiceDetailController.setInvoice(...)` : afficher le numéro, la date, le client, les lignes et le total.
2. Permettre le passage de la liste au détail (**double-clic** sur une ligne du `TableView` : `setOnMouseClicked`, `event.getClickCount() == 2`), avec une méthode `showDetail(Invoice)` dans `ShellController`.
3. Transmettre la facture sélectionnée à l'écran de détail.
4. Permettre le passage du détail vers le formulaire d'édition (pré-rempli via `loadInvoice(invoice)`) ; en édition, enregistrer avec `update(...)` au lieu de `save(...)`.
5. Permettre le retour au menu depuis chaque écran.
6. Vérifier l'ensemble du parcours utilisateur, de la connexion jusqu'à la modification d'une facture.

<details>
<summary>💡 Comment détecter un double-clic sur une ligne ?</summary>

Avec `tableView.setOnMouseClicked(event -> ...)` : teste `event.getClickCount() == 2`, puis récupère la facture avec `tableView.getSelectionModel().getSelectedItem()` (elle peut être `null` si on double-clique dans le vide).

</details>

<details>
<summary>🆘 Comment passer la facture à l'écran de détail ?</summary>

Comme pour l'injection des services : charge le FXML avec un `FXMLLoader`, récupère le Controller avec `loader.getController()`, puis appelle `setInvoice(invoice)` avant `rootPane.setCenter(...)`.

</details>

## Points de vigilance

- Soigner la transmission de données entre écrans (éviter un couplage statique fragile, ex. champ statique partagé) ;
- garder un bouton/mécanisme de retour cohérent sur tous les écrans : à l'intérieur de la coquille du TP8, un retour au menu est un `BorderPane.setCenter(...)` vers un contenu neutre, jamais un `scene.setRoot(...)` (qui sortirait de la coquille et perdrait la `MenuBar`) ;
- vérifier le pré-remplissage du formulaire d'édition (ne pas repartir d'un formulaire vide).

## Résultat attendu

Un parcours de navigation complet et cohérent, de la connexion aux écrans principaux de l'application.
