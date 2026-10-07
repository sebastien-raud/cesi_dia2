[← Révisions](../README.md)

# Exercices JavaScript

Dix exercices, des bases du langage jusqu'à un petit jeu complet et à GSAP. Chaque exercice est indépendant : ses prérequis sont indiqués en tête de son énoncé.

| Ton besoin | Exercice | Notions |
| --- | --- | --- |
| Revoir variables, conditions, boucles, tableaux | [01 : révisions des bases](01-revisions/README.md) | 13 exercices progressifs dans la console |
| Sélectionner et modifier des éléments de la page | [02 : introduction au DOM](02-introduction-dom/README.md) | `querySelector`, `classList`, ajouter, supprimer |
| Réagir à un clic, au survol | [03 : introduction aux événements](03-introduction-evenements/README.md) | `addEventListener`, `classList`, `event.currentTarget` |
| S'entraîner aux événements avec des formulaires simples | [04 : événements et formulaires](04-evenements-et-formulaires/README.md) | 6 petits exercices repris des révisions : `input`, `change`, `submit`, `preventDefault()` |
| Déclencher une animation CSS en JavaScript | [05 : Blob, le petit monstre](05-classes-et-animations-css/README.md) | classes et animations CSS, `animationend`, clavier, variables CSS |
| Créer des éléments à partir de données | [06 : la confiserie](06-creer-des-elements/README.md) | `createElement`, `<template>`, apparition en cascade, délégation, `filter` |
| Souris, clavier, piloter un personnage | [07 : la coccinelle au jardin](07-souris-et-clavier/README.md) | `mousemove`, `keydown`/`keyup`, `translate` et `rotate`, collisions |
| Minuteries, boucle d'animation, préparer Phaser | [08 : les balles rebondissantes](08-timers-et-boucle-d-animation/README.md) | `setTimeout`, `setInterval`, `requestAnimationFrame`, gravité, temps écoulé |
| Réaliser un petit jeu complet (projet en autonomie) | [09 : attrape les lucioles](09-mini-jeu-lucioles/README.md) | cahier des charges : score, chrono, difficulté, record avec `localStorage` |
| Animer avec GSAP | [10 : Blob prend des cours de danse](10-blob-avec-gsap/README.md) | `to`/`from`, timeline, `stagger`, `timeScale`, `matchMedia`, `Draggable` |

## Comment travailler

- Ouvrir le fichier `index.html` de l'exercice dans le navigateur.
- Ouvrir la console (`F12`, onglet Console) : les résultats et les erreurs s'y affichent.
- Suivre l'énoncé, dans le README de l'exercice, avec des aides à déplier à chaque étape (💡 indice, 🆘 aide, 🔑 réponse). Seul 01 est différent : une liste d'exercices dont les énoncés sont en commentaire dans chaque `script.js`. 04 regroupe six petits exercices, chacun avec son README.
- La correction est fournie (`script-correction.js` ou dossier `corrections/`) : cherche d'abord par toi-même.

Pour choisir le bon outil d'animation : le [mémo « Animer une page web »](../memo-animer-une-page.md).
