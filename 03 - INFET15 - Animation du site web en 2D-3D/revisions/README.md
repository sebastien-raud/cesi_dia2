# 📘 Révisions

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Des fiches, des exercices guidés et des défis pour revoir les bases du front et s'entraîner à animer une page (CSS, JavaScript, GSAP), en autonomie.

# 📑 Sommaire

- 🎯 Objectif [↗](#objectif)
- 🚀 Démarrer [↗](#demarrer)
- 🗂️ Structure [↗](#structure)

---

<a id="objectif"></a>
# 🎯 Objectif

Animer une page (en CSS, en JavaScript, avec GSAP, Phaser ou Three.js) demande d'être à l'aise avec quelques bases. Ce dossier sert à les revoir et à s'entraîner, à ton rythme :

- pas d'ordre imposé : choisis ce dont tu as besoin ;
- chaque exercice est indépendant, ses prérequis sont indiqués en tête de l'énoncé ;
- en cas de blocage : les aides à déplier de chaque étape, puis la correction ; cherche d'abord par toi-même.

---

<a id="demarrer"></a>
# 🚀 Démarrer

| Ton besoin | Par où commencer |
| --- | --- |
| Choisir comment animer (CSS, JS, GSAP, Phaser, Three.js) | [mémo : animer une page web](memo-animer-une-page.md) |
| S'entraîner aux animations CSS | [défis CSS d'animation](css/README.md) |
| Revoir JavaScript, le DOM, les événements, et animer en JavaScript | [exercices JavaScript](js/README.md) |
| Vérifier qu'une page est accessible | [fiches accessibilité](a11y/README.md) (commencer par le [récap](a11y/cours/recap.md)) |

Chaque partie a sa page d'entrée, qui explique comment travailler.

---

<a id="structure"></a>
# 🗂️ Structure

- [Mémo : animer une page web](memo-animer-une-page.md) : quel outil pour quel besoin, exemples minimaux, pièges, performances, accessibilité
- CSS : défis d'animation ([sommaire](css/README.md))
  - [01 : le bouton « J'aime »](css/01-bouton-j-aime/README.md) : `@keyframes`, `scale`, `transition`, `:hover`, `:active`
  - [02 : le soulignement animé](css/02-soulignement-anime/README.md) : `::after`, `scaleX`, `transform-origin`
  - [03 : le loader à trois points](css/03-loader-trois-points/README.md) : `animation-delay`, `:nth-child`
  - [04 : le menu burger](css/04-menu-burger/README.md) : transitions, `rotate`, panneau qui glisse
  - [05 : la carte qui se retourne](css/05-carte-qui-se-retourne/README.md) : `perspective`, `preserve-3d`, `backface-visibility`
  - [06 : la machine à écrire](css/06-machine-a-ecrire/README.md) : `steps()`, unité `ch`, plusieurs animations
- JavaScript : exercices ([sommaire](js/README.md))
  - [01 : révisions des bases](js/01-revisions/README.md) : 13 exercices progressifs dans la console
  - [02 : introduction au DOM](js/02-introduction-dom/README.md) : sélectionner, modifier, ajouter, supprimer des éléments
  - [03 : introduction aux événements](js/03-introduction-evenements/README.md) : `addEventListener`, `classList`, `event.currentTarget`
  - [04 : événements et formulaires](js/04-evenements-et-formulaires/README.md) : 6 petits exercices repris des révisions, `input`, `change`, `submit`, `preventDefault()`
  - [05 : Blob, le petit monstre](js/05-classes-et-animations-css/README.md) : classes et animations CSS, `animationend`, clavier, variables CSS
  - [06 : la confiserie](js/06-creer-des-elements/README.md) : `createElement`, `<template>`, apparition en cascade, délégation, `filter`
  - [07 : la coccinelle au jardin](js/07-souris-et-clavier/README.md) : `mousemove`, `keydown`/`keyup`, `translate` et `rotate`, déplacement fluide, collisions
  - [08 : les balles rebondissantes](js/08-timers-et-boucle-d-animation/README.md) : `setTimeout`, `setInterval`, `requestAnimationFrame`, rebonds, gravité, temps écoulé
  - [09 : attrape les lucioles](js/09-mini-jeu-lucioles/README.md) : mini-jeu complet en cahier des charges (score, chrono, difficulté, record avec `localStorage`)
  - [10 : Blob prend des cours de danse](js/10-blob-avec-gsap/README.md) : GSAP, `to`/`from`, timeline, `stagger`, `timeScale`, `matchMedia`, `Draggable`
- Accessibilité ([sommaire](a11y/README.md))
  - fiches transverses : [récap](a11y/cours/recap.md), [outils et glossaire](a11y/cours/outils.md), [HTML et sémantique : balises de base](a11y/cours/balises-semantiques.md)
  - fiches thématiques : [sémantique](a11y/cours/fiches/1.semantics.md), [régions repères](a11y/cours/fiches/2.landmarks.md), [images et contenus visuels](a11y/cours/fiches/3.images.md), [navigation, liens et boutons](a11y/cours/fiches/4.nav-links-buttons.md), [polices et styles](a11y/cours/fiches/5.fonts-styles.md), [formulaires](a11y/cours/fiches/6.forms.md), [tableaux](a11y/cours/fiches/7.tableaux.md), [médias (vidéos et audio)](a11y/cours/fiches/8.medias.md), [ARIA et composants d'interface riche](a11y/cours/fiches/9.aria.md)

Chaque README renvoie vers ses énoncés et ses corrections, et chaque page a un lien de retour.
