[← Accessibilité](../README.md)

# HTML et sémantique

Balises sémantiques courantes et cas d'utilisation classiques.

## Structure
### `header`

- en-tête du document
  - navigation principale
  - logo
  - zone de recherche

- en-tête d'une section
  - informations sur la section

- en-tête d'un article
  - titre
  - chapô
  - auteur
  - date de l'article

- en-tête d'un aparté (`aside`)
  - titre
  - phrase d'accroche

### `main`

Contenu principal du document. Contient des sections, l'article, une liste d'articles...

> Il ne peut y avoir qu'un seul `main` dans un document.

### `footer`

- pied de page
  - licence du site (par exemple copyright)
  - liens vers mentions légales, contact
  - liens internes pour référencement

- pied de section ou d'article
  - auteur
  - date
  - lien vers l'article (permalink)

- informations sur une citation longue (auteur, source, ...)

### `section`

Partie générique d'un document :

- groupe de contenu thématique
- délimitation de chapitres ou de parties d'un texte

### `article`

Partie autonome d'un document utilisable de façon indépendante :

- message de forum
- météo, composants divers (widget)
- article de magazine, de presse, de blog
- fiche produit
- commentaire

### `aside`

Aparté, partie du document dont le contenu n'a pas de lien direct avec le contenu principal.

- partie "contact" permanente sur le site
- informations complémentaires sur le contenu du document

### `nav`

Section de navigation :

- navigation principale (menu du site, souvent sous forme de `ul` / `li`)
- autres liens de navigation, par exemple dans le `footer` du document
- table des matières, index


## Mises en avant

### `mark`

- texte marqué ou surligné à cause de sa pertinence dans le contexte
  - affichage d'un mot clé dans une page de résultats de recherche

### `strong`

- met en avant l'importance d'un texte, souvent représenté par du gras

### `em`

- emphase, marque un texte sur lequel on veut insister, souvent représenté en italique

## Citations

### `q`

- citation courte

### `blockquote`

- bloc de citation, citation longue
- peut contenir :
  - `footer` avec autres éléments pour donner des précisions (auteur, source, ...)
  - `cite` pour indiquer une source (éventuellement dans `footer`)

### `cite`

- titre d'une œuvre, d'une citation
  - titre d'un livre
  - titre d'une chanson
  - titre d'un film
  - une page web
  - un site web
  - un billet de blog
  - ...

## Divers

### `figure`

- images ou graphiques avec légende

```html
<figure>
  <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset" />
  <figcaption>An elephant at sunset</figcaption>
</figure>
```

### `details`

- affichage de détails supplémentaires (à déplier)

```html
<details>
    <summary>La réponse ici</summary>
    La réponse à la question est 42.
</details>
```
Exemple : _quelle est la réponse à la question ?_

<details>
    <summary>La réponse ici</summary>
    La réponse à la question est 42.
</details>