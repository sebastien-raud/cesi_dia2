# TP10 : Finalisation en autonomie (créneau tampon)

## Contexte

> **De :** Sarah Bote, gérante · **Objet :** Une dernière chose (ou deux)
>
> Bonjour,
>
> Bravo, l'application est vraiment utilisable. Petit souci : Guy a créé une facture « test test » que personne n'arrive à supprimer. Et puis, si vous avez une idée qui nous simplifierait la vie, surprenez-nous.
>
> Sarah

Créneau tampon : si la navigation du TP9 est déjà fonctionnelle, le client demande une amélioration complémentaire, au choix des apprenants.

## Objectif

Implémenter une amélioration fonctionnelle en réutilisant les notions vues sur les 3 jours (binding, injection de dépendance, navigation).

## Prérequis

- TP9 (navigation complète fonctionnelle).

## Travail demandé

1. Choisir une amélioration, par exemple :
   - suppression d'une facture (avec confirmation) ;
   - affichage d'un message de confirmation après enregistrement (plutôt qu'en console) ;
   - amélioration de l'ergonomie d'un écran (raccourcis, retour visuel) ;
   - tri ou filtre supplémentaire sur la liste des factures ;
   - export ou action complémentaire au choix.
2. L'implémenter en réutilisant les notions vues sur les 3 jours.
3. Veiller à la cohérence avec le reste de l'application (bonnes pratiques UX du Jour 1).

> [!CAUTION]
> **Supprimer une facture : c'est encadré par la loi.**
>
> - **Interdiction légale** : aucune suppression de facture validée n'est tolérée, pour éviter toute fraude ou modification de l'historique comptable. Une facture erronée se corrige par un avoir.
> - **Exception (brouillon)** : seule une facture restée au statut de brouillon peut être supprimée.
> - **La numérotation** : ce brouillon ne doit pas encore avoir reçu de numéro de facture officiel (ex. `F-2026-001`). La chronologie des numéros des factures validées doit rester continue et sans aucun trou.
>
> C'est réglementaire (article 242 nonies A de l'annexe II du Code général des impôts). En tant que développeur, on prend en compte la réglementation, même quand le client ne la mentionne pas : ici, Sarah demande une suppression que la loi interdit.
>
> Dans notre application, toute facture enregistrée reçoit son numéro : il faudrait une notion de **brouillon** (sans numéro, supprimable) et de facture **validée** (numérotée, jamais supprimée). On ne la met pas en place dans ce TP : la suppression sert ici à pratiquer la confirmation avant une action irréversible, elle ne serait pas conforme dans une vraie application.

<details>
<summary>💡 Une confirmation avant de supprimer ?</summary>

Une boîte de dialogue `Alert` de type `CONFIRMATION` : `showAndWait()` renvoie le bouton choisi, on ne supprime que si c'est `ButtonType.OK`.

</details>

<details>
<summary>💡 Supprimer en base ?</summary>

`InvoiceRepository` n'a pas de `delete` : écris-le sur le modèle d'`update` (supprimer d'abord les lignes de la facture, puis la facture). Relis l'encadré sur la loi : dans une vraie application, seul un brouillon se supprimerait.

</details>

## Points de vigilance

- Créneau court : privilégier une amélioration terminée plutôt que plusieurs inachevées ;
- pas de corrigé unique possible ici, le résultat dépend du choix de chacun. Le `02-corrige/` fourni traite **une seule piste à titre d'exemple** (suppression d'une facture, avec une boîte de dialogue de confirmation `Alert` avant l'action irréversible ; non conforme à la réglementation faute de brouillons, voir l'encadré) : ce n'est pas "la" bonne réponse, d'autres pistes de la liste ci-dessus sont tout aussi valables.

## Résultat attendu

Une amélioration fonctionnelle, intégrée à l'application, démontrable en fin de journée.
