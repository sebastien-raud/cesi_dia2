# Démo : Injection de dépendance

## Objectif
Montrer le passage d'un couplage direct à une injection par setter, sur un service générique (pas `AuthService`).

## Points clés à faire passer
- `new XxxService()` dans un Controller = couplage fort, difficile à remplacer/tester ;
- une méthode `setXxxService(...)` permet de fournir la dépendance depuis l'extérieur ;
- avec `FXMLLoader`, l'injection se fait après `loader.load()`, via `loader.getController()`.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. État "avant" : couplage direct

`GreetingController` fait `new FriendlyGreetingService()` en dur.

```bash
mvn javafx:run
```
→ Taper un nom (ex. « Alan »), cliquer « Saluer ».
→ Le label affiche « Bonjour Alan ! ».

### 2. Poser la question au groupe

> Comment tester ce Controller avec un faux service ? Comment changer de comportement sans modifier `GreetingController` ?

### 3. Refactorer : ajouter le setter

Remplacer dans `GreetingController` le champ `final` instancié en dur par un champ simple, et ajouter `setGreetingService(GreetingService)` (bloc déjà en commentaire dans le fichier, à activer).

### 4. Injecter depuis `Application`

Dans `App.java`, décommenter le bloc qui récupère le Controller (`loader.getController()`) et lui injecte `new ShoutingGreetingService()` (implémentation alternative déjà écrite dans le projet, fournie « toute faite » pour la démo).

```bash
mvn javafx:run
```
→ Même interaction (taper « Alan », cliquer « Saluer »).
→ Le label affiche maintenant « SALUT ALAN !!! ».

### 5. Conclusion

Faire remarquer que `handleGreet()` n'a pas changé : seul le service injecté a changé, depuis l'extérieur du Controller.

## Piège à éviter
Ne pas introduire `loader.setControllerFactory(...)` ici : c'est mentionné en théorie comme complément « pour aller plus loin », pas dans cette démo.

## Remarque
Les deux états (couplage direct puis injection avec un service alternatif) ont été testés réellement (Docker + X11, saisie + clic, capture d'écran) avant rédaction de cette démo.
