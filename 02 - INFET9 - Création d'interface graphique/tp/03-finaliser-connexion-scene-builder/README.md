# TP3 : Finaliser la page de connexion avec Scene Builder

## Contexte

> **De :** Sarah Bote, gérante · **Objet :** Joli, mais…
>
> Bonjour,
>
> L'écran de connexion fonctionne, merci. Par contre, il ressemble un peu à un formulaire administratif de 1998. Pourriez-vous le rendre présentable ? Il sera la première chose que tout le monde verra le matin.
>
> Sarah

Reprendre la page de connexion du TP2 pour la finir/retravailler visuellement avec Scene Builder, afin de prendre en main l'outil sur un écran déjà connu.

## Objectif

Aboutir visuellement la page de connexion avec Scene Builder, sans casser le comportement existant.

## Prérequis

- TP2 (FXML de la page de connexion existant, `LoginController` fonctionnel).

## Travail demandé

1. Ouvrir le FXML du TP2 dans Scene Builder.
2. Soigner la mise en page (alignement, espacement, tailles).
3. Ajouter un titre / logo simple et un message d'erreur (texte, masqué par défaut).
4. Vérifier dans Scene Builder que les `fx:id` et les actions restent bien liés au `LoginController`.
5. Relancer l'application et vérifier que le comportement du TP2 est inchangé.

<details>
<summary>💡 Scene Builder ne propose pas les méthodes du Controller ?</summary>

Indique le Controller dans le panneau **Controller** (en bas à gauche) : `fr.cesi.invoicing.LoginController`. Les `fx:id` et les `onAction` se règlent ensuite dans le panneau **Code**, à droite.

</details>

<details>
<summary>💡 Le FXML a beaucoup changé après la sauvegarde ?</summary>

C'est normal : Scene Builder réécrit le fichier (ordre des attributs, imports). Ouvre-le dans l'éditeur et vérifie surtout que les `fx:id` et `onAction` sont toujours là.

</details>

## Points de vigilance

- Scene Builder peut réorganiser ou modifier le FXML de façon inattendue : toujours vérifier le fichier généré après édition visuelle ;
- ne pas perdre les `fx:id` et les `onAction` existants en manipulant l'arbre de composants ;
- le label d'erreur ajouté reste masqué (`visible="false" managed="false"`) : il ne sera exploité qu'au TP5, une fois `AuthService` branché, inutile d'écrire une logique d'affichage dès maintenant.

## Résultat attendu

Une page de connexion aboutie visuellement, dont le FXML reste lisible et compréhensible après le passage par Scene Builder.
