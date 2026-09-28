# TP1 : Premier projet Maven

## Contexte

> **De :** Sarah Bote, gérante · **Objet :** On se lance !
>
> Bonjour,
>
> Comme convenu, notre application de facturation va enfin grandir : des factures en PDF, envoyées par e-mail, et un accès protégé. Avant de tout construire, installez-vous confortablement avec vos outils. Je préfère une équipe bien outillée à un meuble monté sans notice.
>
> Sarah

Vous partez d'un projet Maven fourni pour découvrir concrètement son fonctionnement, avant d'aborder la recherche et l'intégration de bibliothèques pour le fil rouge (facturation).

## Objectif

Découvrir la structure d'un projet Maven, compiler, ajouter et utiliser une première dépendance.

## Prérequis

- Bases Java (classes, packages) ;
- aucun TP précédent (premier TP du module).

## Travail demandé

1. Identifier le `pom.xml`.
2. Identifier la structure du projet.
3. Compiler le projet.
4. Ajouter une première dépendance.
5. Constater le téléchargement de la dépendance.
6. Utiliser une classe de la bibliothèque.
7. Compiler et exécuter l'application.

<details>
<summary>💡 Quelle dépendance ajouter ?</summary>

Le commentaire de `Main.java` te met sur la piste : Gson, pour transformer la facture en JSON. Ses coordonnées (`groupId`, `artifactId`, `version`) se trouvent sur Maven Central.

<details>
<summary>🆘 Toujours coincé ?</summary>

Cherche « gson » sur [central.sonatype.com](https://central.sonatype.com/) : la page donne le bloc `<dependency>` à copier dans `<dependencies>` du `pom.xml`. Ensuite, `new Gson().toJson(invoice)` renvoie le JSON.

</details>
</details>

<details>
<summary>💡 Où est passé le JAR téléchargé ?</summary>

Dans le dépôt local de Maven, `~/.m2/repository/`, rangé selon le `groupId` (`com/google/code/gson/...`). Il est partagé par tous tes projets : il ne sera plus téléchargé.

</details>

<details>
<summary>💡 « package com.google.gson does not exist » ?</summary>

Deux causes fréquentes : l'`import` manque dans `Main.java`, ou l'IDE n'a pas rechargé le `pom.xml` (relance `mvn compile`, ou « Reload Maven project » dans l'IDE).

</details>

## Points de vigilance

- Bien faire identifier la différence entre dépendance déclarée dans le `pom.xml` et JAR effectivement téléchargé dans le `.m2` local ;
- une erreur de compilation après ajout de dépendance vient souvent d'un import manquant ou d'une version incompatible ;
- rappeler l'existence du Maven Wrapper (`./mvnw`, à générer avec `mvn wrapper:wrapper`, non fourni dans le projet) pour éviter les problèmes de version Maven locale.

## Commandes utiles

```bash
mvn --version
mvn compile
mvn package
mvn dependency:tree

mvn wrapper:wrapper   # une fois, génère ./mvnw
./mvnw package
```

## Résultat attendu

Un projet Java utilisant au moins une bibliothèque externe, compilé et exécuté avec succès.
