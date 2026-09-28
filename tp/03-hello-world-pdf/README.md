# TP3 : Installation et prise en main (Hello World PDF)

## Contexte

> **De :** Ella Lavisse, comptable · **Objet :** Un premier PDF, même tout simple
>
> Bonjour,
>
> Avant de toucher à nos vraies factures, pourriez-vous me montrer un premier PDF généré par votre solution ? Même une page blanche avec « Bonjour », je veux juste voir que ça marche.
>
> Ella

La bibliothèque PDF a été choisie au TP2. Avant de l'intégrer dans l'application de facturation, on la prend en main isolément : c'est un POC, pas encore une intégration réelle (celle-ci aura lieu au TP4).

## Objectif

Installer la bibliothèque choisie et produire un premier PDF isolé, en dehors de l'application.

## Prérequis

- TP1 (Maven) ;
- TP2 (bibliothèque choisie).

## Travail demandé

1. Choisir une bibliothèque (issue du TP2).
2. Ajouter la dépendance Maven.
3. Consulter la documentation.
4. Réaliser un premier exemple (Hello World PDF).
5. Générer un PDF simple contenant quelques informations (texte, mise en page basique).
6. Noter les difficultés et points d'attention en vue de l'intégration du lendemain.

<details>
<summary>💡 Le programme plante au premier appel, avec un message SLF4J ?</summary>

Certaines bibliothèques (c'est le cas d'`openpdf-html`) journalisent via SLF4J et attendent une implémentation au moment de l'exécution. Ajoute `slf4j-simple` dans le `pom.xml`.

</details>

<details>
<summary>💡 Les accents sont cassés dans le PDF ?</summary>

Vérifie l'encodage du texte (UTF-8, y compris `<meta charset="UTF-8">` si tu génères depuis du HTML) et la police utilisée : toutes les polices ne contiennent pas les caractères accentués.

</details>

## Points de vigilance

- Bien noter les difficultés rencontrées : elles seront réutilisées collectivement le lendemain matin (« Retour d'expérience sur l'installation ») ;
- volontairement, ne pas encore intégrer dans l'application existante : le POC reste isolé ;
- vérifier que la version de la bibliothèque installée correspond bien à celle documentée/testée.

## Commandes utiles

```bash
mvn dependency:tree
mvn compile
```

## Résultat attendu

Un petit programme autonome, indépendant de l'application de facturation, capable de générer un PDF minimal avec la bibliothèque choisie.
