# Démo : Encapsuler une bibliothèque

## Objectif
Montrer pourquoi isoler l'usage d'une bibliothèque derrière un service plutôt que d'appeler son API partout dans le code. Réutilise la bibliothèque `commons-lang3` de la démo 01, déjà connue du groupe.

## Points clés à faire passer
- appel direct de l'API d'une bibliothèque dans plusieurs classes = couplage fort, difficile à faire évoluer ;
- un service dédié (`TextService`) expose une méthode métier simple, cache les détails de la bibliothèque ;
- remplacer la bibliothèque plus tard ne touche qu'une seule classe ;
- le comportement observable ne change pas : seule la structure interne change.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

## Déroulé détaillé

### 1. État "avant" : appel direct dans plusieurs classes

`Report.java` et `Notification.java` appellent chacune directement `StringUtils.capitalize(...)`. `TextService.java` existe déjà dans le projet mais n'est pas encore utilisé.

```bash
mvn -q compile
```
→ `BUILD SUCCESS` (silencieux avec `-q`).

Exécuter le programme :

```bash
mvn -q dependency:build-classpath -Dmdep.outputFile=cp.txt
java -cp "target/classes:$(cat cp.txt)" fr.cesi.demo.App
```
→ Affiche :
```
Bilan mensuel
Nouvelle facture disponible
```

### 2. Poser la question au groupe

> Que se passe-t-il si on doit remplacer `commons-lang3` par une autre bibliothèque ? Combien de classes faut-il modifier ?

Réponse attendue : toutes les classes qui appellent `StringUtils` directement, potentiellement beaucoup dans une vraie application.

### 3. État "après" : passer par `TextService`

Montrer le contenu de `TextService.java` (déjà écrit) : une seule méthode `formatText(String text)`, qui encapsule l'appel à `StringUtils.capitalize`.

Dans `Report.java` et `Notification.java`, remplacer l'appel direct par les deux lignes commentées juste en dessous (déjà présentes dans le fichier, à décommenter) :

```java
TextService textService = new TextService();
return textService.formatText(title); // ou contenu, selon la classe
```

```bash
mvn -q compile
java -cp "target/classes:$(cat cp.txt)" fr.cesi.demo.App
```
→ Même sortie que l'étape 1 :
```
Bilan mensuel
Nouvelle facture disponible
```

C'est le point à souligner : **le résultat affiché est identique**, seule la structure interne a changé.

### 4. Conclusion

Un seul remplacement (`TextService`) suffirait désormais si on changeait de bibliothèque, au lieu de modifier chaque classe appelante.

## Piège à éviter
Rester sur un exemple simple (2-3 classes) : le but est de faire ressentir le couplage, pas de construire une architecture complète. Ne pas introduire l'injection de dépendance ici (`new TextService()` en dur reste volontaire), elle sera vue plus tard en INFET9.
