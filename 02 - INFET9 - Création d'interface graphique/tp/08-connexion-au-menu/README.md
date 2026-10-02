# TP8 : De la connexion au menu

## Contexte

> **De :** Paul Hissage, secrétaire · **Objet :** Je me perds
>
> Bonjour,
>
> Pour passer de la saisie d'une facture à la liste, je dois fermer et relancer l'application. Hier, je l'ai relancée onze fois. Est-ce qu'on pourrait avoir un menu, comme dans tous les logiciels ?
>
> Paul

Les écrans de connexion, de formulaire et de tableau (avec filtres) existent, mais fonctionnent chacun de manière isolée. Il faut maintenant les enchaîner dans un vrai parcours de navigation : connexion, puis un menu persistant qui permet de circuler entre les écrans sans jamais revenir à la connexion.

## Objectif

Mettre en place une coquille d'application (`BorderPane` + `MenuBar`) accessible uniquement après connexion, et y brancher le formulaire et le tableau des factures.

## Prérequis

- Séquence théorique « Navigation multi-page » (remplacement du root de la `Scene`, `BorderPane.setCenter(...)`) ;
- écran de connexion (TP2/TP3/TP5), formulaire (TP4/TP5), tableau des factures (TP6/TP7).

## Travail demandé

1. Créer `shell.fxml` : un `BorderPane` avec, en `top`, une `MenuBar` contenant un menu « Facture » et deux `MenuItem` : « Nouvelle facture » et « Consulter les factures ». Laisser le `center` avec un contenu neutre (ex. un `Label` de bienvenue).
2. Créer `ShellController` : il reçoit les services (`InvoiceRepository`, `InvoicePdfService`) par setter, et chaque `MenuItem` déclenche le chargement de l'écran correspondant (`invoice-form.fxml` ou `invoice-table.fxml`) posé dans `rootPane.setCenter(...)`, la `MenuBar` ne doit jamais être remplacée.
3. Dans `LoginController.handleLogin()`, après une connexion réussie (`authService.verify(...)` renvoie vrai), remplacer le root de la `Scene` par `shell.fxml` (et non plus directement par le formulaire).
4. Vérifier qu'il n'existe aucun chemin dans le code qui charge `shell.fxml` sans être passé par une connexion réussie.
5. Dans `App.java`, insérer quelques factures d'exemple si la base est vide (comme aux TP6 et TP7), pour que « Consulter les factures » ne soit pas vide au premier lancement.

<details>
<summary>💡 setRoot ou setCenter ?</summary>

`scene.setRoot(...)` remplace **tout** l'écran : parfait pour passer de la connexion à la coquille, une seule fois. `rootPane.setCenter(...)` ne remplace que le centre : le menu reste. Dans la coquille, c'est toujours `setCenter`.

</details>

<details>
<summary>🆘 Comment le ShellController accède-t-il au BorderPane ?</summary>

Donne un `fx:id="rootPane"` au `BorderPane` de `shell.fxml`, et déclare `@FXML private BorderPane rootPane;` dans le Controller.

</details>

## Points de vigilance

- Deux techniques de navigation cohabitent, chacune à sa place : `scene.setRoot(...)` pour le verrou d'accès (connexion → coquille, un aller simple, pas de retour), `BorderPane.setCenter(...)` pour circuler *à l'intérieur* de la coquille une fois connecté ;
- la `MenuBar` doit rester affichée et cliquable après chaque navigation dans le `center` ;
- réutiliser le même `Stage` plutôt que d'en ouvrir de nouveaux.

## Résultat attendu

Un enchaînement fonctionnel : connexion → coquille avec `MenuBar` → formulaire ou tableau des factures, sans jamais perdre le menu.
