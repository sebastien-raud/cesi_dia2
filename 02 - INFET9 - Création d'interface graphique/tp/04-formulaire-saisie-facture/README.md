# TP4 : Formulaire de saisie de facture

## Contexte

> **De :** Guy Mauve, stagiaire comptable · **Objet :** Un zéro de trop
>
> Bonjour,
>
> Hier, j'ai saisi une facture de 4 500 € au lieu de 450 €. Ella l'a vue avant l'envoi, heureusement. Est-ce qu'on pourrait avoir un vrai formulaire, qui m'empêche d'enregistrer une facture à moitié remplie ?
>
> (Pour les zéros en trop, je fais attention, promis.)
>
> Guy

Reprise du besoin client : saisir une facture (client, date, description, montant : une seule ligne) depuis un écran.

## Objectif

Construire l'écran de saisie d'une facture avec data binding et validation simple.

## Prérequis

- Séquence théorique « Conception d'un formulaire » (JavaFX Properties, `bindBidirectional`) ;
- TP2/TP3 (pattern FXML + Controller déjà pratiqué).

## Travail demandé

1. Créer `invoice-form.fxml` : quatre `TextField` (client, date au format `jj/mm/aaaa`, description, montant), une seule ligne de facture.
2. Créer le Controller associé.
3. Relier les champs à un modèle via data binding.
4. Ajouter une validation minimale (client et montant obligatoires).
5. Désactiver le bouton « Enregistrer » tant que le formulaire n'est pas valide.
6. Afficher, pour l'instant, les données saisies dans la console (l'enregistrement réel via les services métier sera fait au TP5).

<details>
<summary>💡 À quoi sert le modèle (InvoiceFormModel) ?</summary>

Il contient une `StringProperty` par champ. Avec `bindBidirectional`, le champ et la propriété restent synchronisés dans les deux sens : le Controller lit le modèle, pas les `TextField`.

</details>

<details>
<summary>💡 Comment désactiver « Enregistrer » ?</summary>

Même principe qu'au TP2 : `disableProperty()` du bouton, lié à `isEmpty()` des propriétés du modèle.

<details>
<summary>🆘 Toujours coincé ?</summary>

```java
saveButton.disableProperty().bind(
        model.clientProperty().isEmpty().or(model.amountProperty().isEmpty()));
```

</details>
</details>

## Points de vigilance

- Bien distinguer la propriété du modèle (`StringProperty` par exemple) du composant graphique (`TextField`) qui s'y lie ;
- ne pas dupliquer la logique de validation entre plusieurs champs sans factoriser ;
- l'enregistrement réel n'est pas attendu ici : uniquement l'affichage console.

## Résultat attendu

Un formulaire fonctionnel, avec binding et validation, prêt à être connecté aux services métier.
