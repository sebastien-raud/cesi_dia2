# TP5 : Sécuriser l'application avec une authentification

## Contexte

> **De :** Sarah Bote, gérante · **Objet :** Un post-it de trop
>
> Bonjour,
>
> Ce matin, j'ai trouvé le mot de passe de notre ordinateur de comptabilité sur un post-it collé à l'écran de Guy. Il m'a expliqué que c'était « pour ne pas l'oublier ». Je veux que l'accès à l'application de facturation soit protégé par un identifiant et un mot de passe, et que ces mots de passe ne soient lisibles par personne, même pas par vous.
>
> Sarah

Deuxième besoin client : un accès protégé par identifiant et mot de passe. Un mot de passe ne se stocke jamais en clair.

Un petit repository SQLite (`AuthRepository`) est fourni, sur le même principe que `InvoiceRepository` (TP4), pour ne pas passer le créneau à apprendre JDBC.

## Objectif

Encapsuler dans un `AuthService` la création et la vérification d'un mot de passe haché, puis persister un utilisateur via `AuthRepository`.

## Prérequis

- Notions de hachage de mot de passe (bcrypt, Argon2...) ;
- pattern d'encapsulation déjà appliqué avec `InvoicePdfService` (TP4).

## Travail demandé

1. Découvrir la classe `User` et le `AuthRepository` fournis (schéma SQLite, table `users`).
2. Rechercher plusieurs bibliothèques de hachage de mot de passe.
3. Comparer les solutions (sécurité, activité du projet, documentation).
4. Choisir une bibliothèque.
5. L'installer avec Maven.
6. Réaliser un POC : hacher un mot de passe, vérifier une saisie par rapport au hash stocké.
7. Encapsuler cette logique dans un `AuthService`, sur le même principe que `InvoicePdfService`.
8. Persister un utilisateur (ex. `"admin"`) avec `repository.save(...)`, en stockant le mot de passe haché (jamais en clair).
9. Vérifier une saisie correcte et une saisie incorrecte via `AuthService`, contre le hash relu depuis `AuthRepository`.

<details>
<summary>💡 Hacher ou chiffrer ?</summary>

Hacher : on ne peut pas revenir au mot de passe, et c'est exactement ce qu'on veut. Chiffrer : on peut déchiffrer avec la clé, donc quelqu'un qui vole la clé lit tous les mots de passe. Pour des mots de passe, on hache, avec un algorithme **lent** et **salé**.

</details>

<details>
<summary>🆘 La vérification renvoie toujours false ?</summary>

Deux hash du même mot de passe sont différents : chacun a son sel. Il ne faut donc pas hacher la saisie et comparer les deux chaînes, mais passer la saisie **et** le hash stocké à la méthode de vérification de ta bibliothèque, qui relit le sel dans le hash.

</details>

## Points de vigilance

- Ne jamais stocker un mot de passe en clair, même temporairement ;
- écarter les algorithmes de hachage génériques non adaptés aux mots de passe (MD5, SHA-1 seuls, sans sel/coût) ;
- ne pas réinventer l'algorithme de hachage soi-même ;
- ne pas réécrire `AuthRepository` : il est fourni tel quel ;
- `AuthService` sera réutilisé tel quel en INFET9 pour l'écran de connexion : l'API doit rester simple et stable.

## Commandes utiles

```bash
mvn dependency:tree

# Exemple d'inspection de la base SQLite
sqlite3 invoices.db "SELECT * FROM users;"
```

## Résultat attendu

Un `AuthService` capable de créer et de vérifier un mot de passe haché, un utilisateur persisté via `AuthRepository`, et une vérification de connexion (correcte et incorrecte) fonctionnelle contre les données relues.
