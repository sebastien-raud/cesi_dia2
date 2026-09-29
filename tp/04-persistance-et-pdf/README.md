# TP4 : Enregistrer la facture en base et générer le PDF

## Contexte

> **De :** Guy Mauve, stagiaire comptable · **Objet :** Mes factures ont disparu (encore)
>
> Bonjour,
>
> Je relance le programme, et toutes les factures d'hier ont disparu. J'ai donc recréé la même trois fois, pour être sûr. Ella dit que ce n'est « pas une méthode ». Est-ce qu'on pourrait les garder quelque part, et avoir le PDF qui va avec ?
>
> Guy (en copie : Ella Lavisse)

Toujours en ligne de commande (pas encore d'interface graphique, ce sera INFET9) : la facture est construite en code, pas saisie via un formulaire. Sans persistance, chaque exécution repart de zéro, le client a besoin de retrouver ses factures d'une exécution à l'autre.

Un petit repository SQLite (`InvoiceRepository`) est fourni pour ne pas passer le créneau à apprendre JDBC.

Le TP se découpe en deux sous-parties : d'abord l'encapsulation et la génération PDF (dans la continuité immédiate de la démo d'encapsulation), puis la persistance.

## Objectif

Reprendre le POC PDF du TP3, l'appliquer à une vraie `Invoice`, en encapsulant l'appel à la bibliothèque dans un `InvoicePdfService`, puis persister la facture en base et régénérer son PDF à partir des données relues.

## Prérequis

- TP3 (POC PDF fonctionnel) ;
- séquence théorique « Encapsuler l'utilisation d'une bibliothèque » (notion de `InvoicePdfService`, encapsulation).

## Sous-partie A : Encapsulation et génération PDF

1. Découvrir les classes `Invoice` et `InvoiceLine` fournies (jeu de données déjà présent dans `Main`).
2. Créer la classe `InvoicePdfService` et y déplacer l'appel à la bibliothèque PDF (reprendre le POC du TP3, ajouter la dépendance au `pom.xml`).
3. Générer le PDF de la facture construite en code (titre, date, client, tableau des lignes, total).
4. Tester le résultat (ouvrir le PDF généré, vérifier la mise en page et les accents).

<details>
<summary>💡 Que doit contenir InvoicePdfService ?</summary>

Une seule méthode publique, par exemple `generate(Invoice invoice, String filePath)`, qui cache tout le reste : construction du HTML (ou du document), appel à la bibliothèque, écriture du fichier. Le reste du code ne doit jamais voir une classe de la bibliothèque PDF.

</details>

## Sous-partie B : Persistance

5. Découvrir le schéma SQLite et le `InvoiceRepository` fournis.
6. Persister la facture avec `repository.save(invoice)` : le repository lui attribue son numéro (`F-2026-001`, puis `F-2026-002`…) et renvoie la facture numérotée.
7. Vérifier le contenu de la base (ex. via un client SQLite) et relire les factures avec `repository.findAll()`.
8. Générer le PDF d'une facture relue depuis la base (et non plus celle construite directement en code).

<details>
<summary>💡 Comment voir ce qu'il y a dans la base ?</summary>

Avec le client en ligne de commande `sqlite3` (voir les commandes plus bas), ou un outil graphique comme DB Browser for SQLite. La base est le fichier `invoices.db`, à côté du projet.

</details>

<details>
<summary>💡 D'où vient le numéro de la facture ?</summary>

De `InvoiceRepository.save()`, méthode `nextNumber` : elle cherche le plus grand numéro de l'année de la facture (`SELECT MAX(number) FROM invoices WHERE number LIKE 'F-2026-%'`) et ajoute 1. Le compteur repart à `001` chaque année. Chaque lancement du programme ajoute donc une facture, avec le numéro suivant.

</details>

## Points de vigilance

- L'appel à l'API de la bibliothèque PDF doit passer uniquement par `InvoicePdfService`, pas être dispersé dans le code ;
- vérifier la cohérence entre les données persistées et les données relues (types, arrondis de montants) ;
- ne pas réécrire `InvoiceRepository` : il est fourni tel quel ;
- chaque lancement ajoute une nouvelle facture (numéro suivant) : c'est normal, le PDF généré reste celui de la première facture relue ;
- nommer le PDF d'après le numéro de la facture (ex. `facture-F-2026-001.pdf`), réutilisé au TP6 ;
- ne pas oublier le binding SLF4J (`slf4j-simple`) si la bibliothèque choisie en TP2/TP3 en a besoin (cas d'`openpdf-html`), sinon plantage au premier appel du moteur de rendu.

## Commandes utiles

```bash
mvn compile

# Exemple d'inspection de la base SQLite
sqlite3 invoices.db ".tables"
sqlite3 invoices.db "SELECT * FROM invoices;"
sqlite3 invoices.db "SELECT * FROM invoice_lines;"
```

## Résultat attendu

Une facture créée en code, générée en PDF via `InvoicePdfService` (sous-partie A), puis persistée dans SQLite, relue et exportée en PDF depuis les données relues (sous-partie B).
