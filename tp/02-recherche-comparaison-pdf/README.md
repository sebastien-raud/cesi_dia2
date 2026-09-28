# TP2 : Rechercher et comparer des bibliothèques PDF

## Contexte

> **De :** Ella Lavisse, comptable · **Objet :** Nos factures méritent mieux
>
> Bonjour,
>
> Aujourd'hui, j'exporte nos factures depuis un tableur et je les imprime en PDF à la main. Les clients reçoivent des mises en page toutes différentes, et une fois, le total était sur une deuxième page, tout seul. Pourriez-vous nous proposer une vraie solution ? Idéalement gratuite, et qui ne nous posera pas de problème de licence.
>
> Ella

Le client souhaite générer ses factures au format PDF. Plusieurs bibliothèques Java peuvent répondre à ce besoin : il faut les rechercher et les comparer avant de choisir.

## Objectif

Identifier plusieurs bibliothèques Java de génération PDF et les comparer sur des critères objectifs, en vue d'un choix argumenté.

## Prérequis

- TP1 (savoir lire un `pom.xml`, ajouter une dépendance) ;
- critères d'évaluation d'une bibliothèque vus en séquence théorique (« Comment trouver une bibliothèque pertinente ? »).

## Travail demandé

Pour chaque solution étudiée :

- identifier la bibliothèque ;
- consulter sa documentation ;
- vérifier la compatibilité avec Java ;
- identifier la licence ;
- observer l'activité du projet ;
- identifier les dépendances ;
- rechercher les éventuelles vulnérabilités ;
- réaliser un premier test lorsque possible.

<details>
<summary>💡 Par où commencer la recherche ?</summary>

Des mots-clés simples (« java pdf library », « java html to pdf ») sur Maven Central et GitHub, puis garde trois ou quatre candidats sérieux. Inutile d'en comparer dix.

</details>

<details>
<summary>💡 Comment juger qu'un projet est vivant ?</summary>

Regarde la date de la dernière version et du dernier commit, le nombre d'issues ouvertes (et si elles reçoivent des réponses), le nombre de contributeurs. Un projet sans version depuis trois ans mérite un point d'interrogation dans ton tableau.

<details>
<summary>🆘 Et la licence, ça change quoi ?</summary>

MIT ou Apache 2.0 : on peut l'utiliser dans un logiciel commercial sans publier notre code. GPL ou AGPL : l'obligation de partager le code peut s'étendre à notre application. Pour L'Atelier du Meuble, une licence permissive est le choix prudent.

</details>
</details>

## Points de vigilance

- Ne pas se limiter à la documentation officielle : croiser avec le dépôt Git (activité, issues) ;
- vérifier la version Java minimale requise par la bibliothèque (compatibilité avec Java 21) ;
- distinguer licence permissive (MIT, Apache 2.0) et licence copyleft (GPL, AGPL) : impact sur un usage commercial ;
- une bibliothèque « populaire » n'est pas automatiquement la plus adaptée au besoin.

## Résultat attendu

Un tableau comparatif rempli (voir `tableau-comparatif.md`) et une bibliothèque présélectionnée pour le TP3.
