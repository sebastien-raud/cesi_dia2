[← Accessibilité](../README.md)

# Accessibilité : les points essentiels à retenir

## Structure de page et sémantique

- Mettre en place une structure de titres (`<h1>`, `<h2>`...) logique et complète.
- Structurer les régions de la page avec les bonnes balises (`<header>`, `<nav>`, `<main>`, `<footer>`, etc.). Les attributs `role` équivalents (`<header role="banner">`, etc.) sont redondants avec ces balises : ils ne servent qu'à la rétrocompatibilité avec de vieux navigateurs.
- Penser au `DOCTYPE`.
- Indiquer la langue principale de la page avec l'attribut lang sur la balise `<html>`.
- Indiquer les changements de langue avec l'attribut lang sur les balises qui contiennent des textes qui ne sont pas dans la langue principale.
- Mettre un `<title>` pertinent sur chaque page (nom de la page et nom du site). Chaque `<title>` doit être unique.
- Écrire un code HTML valide (cf. le validateur du W3C).
- Structurer les listes avec les balises appropriées (`<ul><li>` ou `<ol><li>`).
- Structurer les citations avec les balises `<blockquote>` ou `<q>`.

## Images

- Se demander si l'image est informative, décorative ou image-lien.
- Pour les images intégrées avec des balises `<img>` :
  - Décorative : `<img alt="">`
  - Informative : `<img alt="Information contenue dans l'image">`
  - Image-lien : `<img alt="Destination du lien">`
- Pour les images intégrées avec des balises `<svg>` :
  - Décorative : `<svg aria-hidden="true" focusable="false"></svg>`
  - Informative : `<svg aria-label="Information contenue dans l'image" role="img" focusable="false"></svg>`
  - Image-lien : `<svg aria-label="Destination du lien" role="img" focusable="false"></svg>`
- Pour les images intégrées avec des polices d'icônes (`<i>`) :
  - Décorative : `<i aria-hidden="true"></i>`
  - Informative : `<i aria-hidden="true"></i><span class="sr-only">Information contenue dans l'icone</span>`
  - Image-lien : `<i aria-hidden="true"></i><span class="sr-only">Destination du lien</span>`

Remarque : la classe `.sr-only` doit être créée si elle n'existe pas encore dans le projet. Elle sert à masquer le texte visuellement tout en le laissant accessible aux lecteurs d'écran. Dans certains projets, elle peut aussi s'appeler `.assistive-text`, `.accessible-text`, `.visually-hidden`...
[Exemple de classe `.sr-only`](https://codepen.io/jeanne-a11y/pen/PodGYyd)

- Pour les images qui ont besoin d'une description détaillée (graphiques...) indiquer dans l'alternative de l'image une description courte et où trouver la description détaillée. Ajouter la description détaillée à proximité de l'image sous une forme accessible (en texte HTML).
- Pour les images légendées, utiliser les balises `<figure>` et `<figcaption>`.

## Navigation, liens et boutons

- Vérifier la présence de 2 moyens de navigation parmi les 3 possibles :
  - Menu
  - Recherche globale
  - Plan du site
- Structurer chaque menu de navigation avec une balise `<nav>` et ajouter un attribut `aria-label` pour donner un nom à chaque menu.
- Structurer les menus dans des listes (`<ul><li>`). Lorsqu'il y a plusieurs niveaux, attention à bien imbriquer les listes.
- Ajouter un attribut `aria-current="true"` ou `aria-current="page"` sur l'élément courant dans le menu.
- Les liens et les boutons doivent être explicites. Un intitulé trop générique ne permet pas de connaître la destination du lien (par exemple : "Lire la suite", "En savoir plus"...). Pour rendre un lien explicite, utiliser l'attribut `aria-label` (ou `title`). **Cet attribut doit reprendre l'intitulé visible du lien**, puis le compléter. Exemple : `<a href="#" aria-label="En savoir plus : La migration des hirondelles">En savoir plus</a>`
- Bien faire la différence entre liens et boutons :
  - Lien : navigation vers une autre page ou une zone de la page
  - Bouton : action dans la page
- Dans les liens de téléchargement de fichiers, c'est une bonne pratique d'indiquer le poids et le format du fichier.
- Différencier visuellement les liens qui sont dans des paragraphes de texte grâce au soulignement.

## Navigation au clavier

- S'assurer de la visibilité du focus (en particulier, ne pas masquer l'outline avec `outline: none;`).
- Ne jamais utiliser de `tabindex` positifs.
- S'assurer qu'il n'y ait pas de piège au clavier.
- Mettre en place un lien d'évitement (`skip nav`) permettant d'accéder directement à la zone de contenu principal. Ce lien doit être le premier élément tabulable dans la page.
- S'assurer que chaque élément interactif puisse être atteint et activé au clavier. Pour cela, penser à utiliser les balises appropriées (`<a>` ou `<button>`).
- Faire en sorte que l'ordre de tabulation soit logique (de haut en bas et de gauche à droite le plus souvent). Pour cela, il suffit de mettre les éléments dans le bon ordre dans le HTML.

## Polices et styles

- S'assurer que le site s'affiche correctement jusqu'à un zoom de 200%. Pour cela, utiliser notamment des unités relatives pour les tailles de textes et pour toutes les tailles en général (largeur, padding, margin, etc.)
- S'assurer que les textes puissent être espacés par les utilisateurs sans perte ou chevauchement de contenus. Pour cela, ne pas fixer la hauteur des blocs.
- Lorsque c'est possible, toujours préférer l'intégration de texte en HTML / CSS plutôt que dans des images.
- S'assurer que les textes alternatifs des images restent lisibles quand les images ne s'affichent pas.
- Ne pas obliger l'utilisateur à tourner son écran dans un sens ou dans l'autre.
- Ne pas faire porter de l'information par les CSS (par exemple : une image de fond avec du texte). Vérifier qu'il n'y a pas de perte d'information quand les CSS sont désactivés.
- Le site doit être responsive. On doit pouvoir réduire la taille de l'écran jusqu'à 320px de large sans scroll horizontal. Ne pas supprimer de contenus en version mobile.

## Couleurs

- Vérifier les contrastes entre les textes et leur arrière-plan.
- Vérifier les contrastes entre les éléments graphiques porteurs d'information et leur arrière-plan.
- Vérifier les contrastes entre les éléments d'interface et leur arrière-plan (exemple : les bordures d'un champ).
- L'information ne doit pas être portée uniquement par la couleur.

## Formulaires

- Relier chaque champ à son étiquette avec les attributs `for=""` et `id=""`.
- Positionner les étiquettes à proximité des champs de formulaire.
- Dans des cas très rares, un champ peut ne pas avoir d'étiquette visible (par exemple : champ de recherche). Dans ce cas, utiliser `title=""` pour lui donner une étiquette.
- Utiliser `<fieldset>` pour regrouper :
    - Les boutons radio
    - Les checkbox
    - Les champs qui se répètent (par exemple : adresse de livraison / adresse de facturation, participant 1 / participant 2...)
- Dans chaque `<fieldset>`, prévoir une balise `<legend>` (premier enfant direct du `<fieldset>`).
- Ajouter des attributs `autocomplete` pour tous les champs qui contiennent des données personnelles (voir la liste : https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/autocomplete)
- Pour les champs obligatoires :
    - Ajouter `required` ou `aria-required="true"` sur la balise `<input>` (ou `<textarea>`, `<select>`...)
    - Ajouter une indication visuelle dans l'étiquette du champ. Si c'est un astérisque, ajouter une phrase explicative au début du formulaire.
- Pour les champs qui ont un format spécifique à respecter :
    - Indiquer le format attendu soit dans la balise `<label>`, soit dans un texte relié au champ avec `aria-describedby`.
- Pour les champs en erreur :
    - Ajouter `aria-invalid="true"` sur la balise `<input>` (ou `<textarea>`, `<select>`...)
    - Indiquer dans chaque message d'erreur la cause de l'erreur, le nom du champ en erreur, et si besoin redonner le format et/ou un exemple de valeur attendue.
    - Relier le message d'erreur au champ correspondant avec `aria-describedby`. Il est possible de mettre plusieurs id dans le même attribut `aria-describedby`, on peut donc y mettre l'id du message d'erreur et de l'indication de format.
- Ne pas utiliser `placeholder=""` pour donner des informations (ni étiquette de champ, ni format attendu).

## Tableaux

- Se demander si le tableau est un tableau de données ou un tableau de mise en forme.
- Tableau de mise en forme :
    - `<table role="presentation">`
    - Ne pas utiliser de balises `<thead>`, `<th>` et d'attributs `scope=""`
- Tableaux de données :
    - `<th scope="row">` pour les en-têtes de lignes
    - `<th scope="col">` pour les en-têtes de colonnes
    - Si le tableau a un titre, le mettre dans une balise `<caption>`
- Tableaux de données complexes :
    - À éviter, essayer de simplifier pour obtenir des tableaux de données simples.
    - Sinon, utiliser la technique des `headers=""` et des `id=""`.

## Vidéos

- Un texte (titre ou court paragraphe) doit introduire la vidéo et permettre de comprendre de quoi elle parle.
- La vidéo doit disposer de :
    - Sous-titres (si nécessaire).
    - Audiodescription (si nécessaire).
    - Transcription textuelle (si nécessaire).
- Le player doit fonctionner au clavier et avec un lecteur d'écran.
- Il doit être possible de contrôler la lecture et le son.

## ARIA et composants d'interface riche

- Règle n°1 : ne pas utiliser ARIA.
- Les attributs `role=""` servent à changer la sémantique de base d'un élément HTML. On les utilise principalement pour ajouter de la sémantique quand l'élément HTML n'existe pas. (Exemple : `role="tab"`).
- Les attributs `aria-*` apportent des informations supplémentaires sur les éléments, qui ne sont pas disponibles en HTML (exemple : champ invalide, panneau déplié...)
- ARIA ne change QUE la sémantique, pas le comportement ni l'apparence d'un élément.
- Les éléments non visibles à l'écran doivent être masqués avec `visibility: hidden;` ou `display: none;`
- Pour les composants d'interface riche, il existe des "recettes" pour rendre ces composants accessibles grâce à ARIA. Ces recettes définissent :
    - Les attributs ARIA à utiliser, et les valeurs à leur donner selon l'état du composant.
    - Les comportements attendus au clavier et avec un lecteur d'écran.
- Ces recettes nécessitent d'utiliser du Javascript. Elles doivent être suivies pour s'assurer de l'accessibilité des composants.

## Règles d'or de l'accessibilité

### Règle d'or n°1

L'attribut `alt=""` doit TOUJOURS être présent sur les balises `<img>`. Si l'image est décorative, l'attribut `alt=""` doit être vide.

### Règle d'or n°2

Ne pas mélanger `aria-hidden`, `.sr-only` et `tabindex="-1"`.
- `aria-hidden="true"` : sert à masquer un élément aux lecteurs d'écran. L'élément reste visible et accessible au clavier (s'il est interactif).
- `.sr-only` : sert à masquer un élément à l'écran. L'élément reste perceptible par les lecteurs et accessible au clavier (s'il est interactif).
- `tabindex="-1"` : sert à rendre un élément non tabulable. L'élément reste visible à l'écran et perceptible par les lecteurs d'écran.

### Règle d'or n°3

Pour masquer un contenu à TOUT LE MONDE, utiliser `display: none;` ou `visibility: hidden;`

En particulier, les éléments non visibles à l'écran doivent être masqués avec `display: none;` ou `visibility: hidden;`

Par exemple : le contenu des panneaux dépliants lorsqu'ils sont repliés, le contenu d'une modale quand la modale est fermée, les slides non visibles à l'écran dans un carrousel...

### Règle d'or n°3bis

Ne pas masquer le lien d'évitement avec `display: none;` ou `visibility: hidden;`

Ce lien doit rester focusable. Le masquer avec un positionnement hors écran (du type `.sr-only`).

### Règle d'or n°4

Le focus doit TOUJOURS être visible sur tous les éléments interactifs.

### Règle d'or n°5

Il ne doit jamais y avoir de piège au clavier.

### Règle d'or n°6

Ne pas utiliser ARIA (quand on peut faire autrement) !

### Règle d'or n°6bis

ARIA ne change QUE la sémantique, pas le comportement ni l'apparence d'un élément.

### Règle d'or n°7

Sur un lien, l'attribut `aria-label` doit toujours reprendre l'intitulé visible du lien.
