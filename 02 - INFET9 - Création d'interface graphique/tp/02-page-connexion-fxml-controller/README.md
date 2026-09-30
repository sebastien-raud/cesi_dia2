# TP2 : La page de connexion en FXML + Controller

## Contexte

> **De :** Paul Hissage, secrétaire · **Objet :** Un écran pour entrer
>
> Bonjour,
>
> J'aimerais que chaque matin, l'application me demande mon identifiant et mon mot de passe, comme le site de la banque (en moins stressant, si possible).
>
> Et si je n'ai rien tapé, que le bouton ne me laisse pas cliquer pour rien.
>
> Paul

Construire toute une interface en code devient vite difficile à lire et à faire évoluer. On introduit ici la séparation structure (FXML) / comportement (Controller), sur le premier écran concret du fil rouge : la connexion.

## Objectif

Construire l'écran de connexion de l'application (identifiant, mot de passe, bouton), en séparant structure et comportement.

## Prérequis

- TP1 (bases JavaFX en code) ;
- séquence théorique « De code à FXML » (pattern MVC, contrat FXML ↔ Controller).

## Travail demandé

1. Créer un fichier FXML pour l'écran de connexion : un champ identifiant (`TextField`), un champ mot de passe (`PasswordField`), un bouton « Se connecter ».
2. Créer un `LoginController` associé.
3. Lier les composants (`fx:id`) au Controller.
4. Gérer le clic sur le bouton dans une méthode `@FXML` (pour l'instant, afficher les valeurs saisies dans la console : la vérification réelle via `AuthService` se fera au TP5).
5. Ajouter une validation minimale : le bouton reste inactif tant que les deux champs ne sont pas remplis.
6. Charger le FXML depuis la classe `Application` (`FXMLLoader`).

<details>
<summary>💡 NullPointerException sur un champ du Controller ?</summary>

Le champ n'a pas été relié : vérifie que le `fx:id` du FXML porte **exactement** le nom de l'attribut, et que l'attribut est bien annoté `@FXML`.

</details>

<details>
<summary>💡 Comment garder le bouton inactif tant que les champs sont vides ?</summary>

Regarde du côté de `disableProperty()` du bouton et de `textProperty().isEmpty()` des champs : un binding suffit, pas besoin de listener.

<details>
<summary>🆘 Toujours coincé ?</summary>

Dans `initialize()` du Controller :

```java
loginButton.disableProperty().bind(
        usernameField.textProperty().isEmpty()
                .or(passwordField.textProperty().isEmpty()));
```

</details>
</details>

## Points de vigilance

- Pas de logique métier réelle à ce stade : l'authentification effective (`AuthService`) n'arrive qu'au TP5 ;
- bien faire correspondre chaque `fx:id` du FXML à un attribut annoté `@FXML` dans le Controller (source d'erreur fréquente : `NullPointerException` sur un champ non lié).

## Résultat attendu

Un écran de connexion fonctionnel (sans logique métier réelle pour l'instant), structuré selon le pattern FXML + Controller.
