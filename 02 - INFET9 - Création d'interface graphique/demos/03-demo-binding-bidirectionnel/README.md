# Démo : Binding bidirectionnel

## Objectif
Montrer le data binding bidirectionnel entre un `TextField` et une propriété JavaFX (`StringProperty`), sur un exemple générique (une seule propriété "nom"), avant le TP4 (formulaire de facture, qui réutilise cette technique).

## Points clés à faire passer
- une `StringProperty` (JavaFX) est une valeur observable, pas un simple champ ;
- `bindBidirectional` synchronise dans les deux sens : taper dans le champ change le modèle, changer le modèle par code change le champ ;
- un binding à sens unique (`bind`) permet d'observer une propriété sans pouvoir la modifier depuis la vue.

## Projet

Le projet est dans `projet/`. Se placer dedans avant de lancer les commandes :

```bash
cd projet
```

```bash
mvn javafx:run
```

## Déroulé détaillé

### 1. État initial

`PersonModel` a une `StringProperty name` initialisée à `"Jean"`. Le `Controller` lie :
- `nameField.textProperty()` ↔ `model.nameProperty()` (bidirectionnel) ;
- `echoLabel.textProperty()` ← `model.nameProperty()` (sens unique, juste pour visualiser la valeur réelle du modèle).

```bash
mvn javafx:run
```
→ Fenêtre avec un champ texte contenant « Jean », et un label juste en dessous affichant aussi « Jean ».

### 2. Sens champ → modèle → label

Cliquer dans le champ, tout sélectionner, taper un nouveau nom (ex. « Marie »).

→ Le label en dessous se met à jour **en direct**, à chaque frappe, sans bouton ni validation : la preuve que le champ et le modèle sont la même donnée.

### 3. Sens modèle → champ (bouton)

Cliquer sur « Changer le nom par code » (qui appelle `model.setName("Ada Lovelace")`, sans toucher au champ directement).

→ Le champ **et** le label affichent tous les deux « Ada Lovelace » : la modification du modèle par code se répercute automatiquement sur le champ, preuve du sens retour.

## Piège à éviter
Ne pas confondre avec la démo « Mapping de données » (plus tard) : ici la synchronisation est automatique et permanente (binding), alors que le mapping est une conversion ponctuelle déclenchée par une action (ex. un clic sur "Enregistrer").

## Remarque
Les deux sens du binding ont été testés réellement (Docker + X11 : saisie simulée avec `xdotool type`, clic sur le bouton) avant rédaction de cette démo.
