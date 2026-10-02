---
title: Bilan du module
---

# Bilan du module

Trois jours, une application de facturation avec une vraie interface

---

## L'application de facturation

| Écran | Réalisé |
| --- | --- |
| Connexion | `AuthService` d'INFET10, verrou d'accès |
| Menu | coquille `BorderPane` et `MenuBar` |
| Saisie d'une facture | formulaire, data binding, validation |
| Liste des factures | `TableView`, recherche, filtre par date, tri |
| Détail | double-clic, retour au menu |

---

## Le parcours complet

<v-switch>
<template #0><img class="h-100" src="./public/app-login-rempli.png" alt="Connexion"><p class="credit">Connexion</p></template>
<template #1><img class="h-100" src="./public/app-menu.png" alt="Menu"><p class="credit">Menu</p></template>
<template #2><img class="h-100" src="./public/app-tableau.png" alt="Liste des factures"><p class="credit">Liste des factures</p></template>
<template #3><img class="h-100" src="./public/app-detail.png" alt="Détail d'une facture"><p class="credit">Détail d'une facture</p></template>
</v-switch>

---

## Notions

| Thème | Notions |
| --- | --- |
| Client lourd | lourd vs léger, bibliothèques graphiques |
| JavaFX | Stage, Scene, Node, layouts, événements |
| Structure | FXML, Controller, MVC, Scene Builder |
| Données | Properties, binding, mapping, injection |
| Écrans | formulaire, TableView, filtres, navigation, menus |

<!-- Et les repères RAD / UX : cohérence, retour utilisateur, prévention des erreurs. -->

---

## Pour aller plus loin

---

## Des ressources à garder

| Ressource | Pour |
| --- | --- |
| [openjfx.io](https://openjfx.io/) | documentation et versions de JavaFX |
| [Scene Builder](https://gluonhq.com/products/scene-builder/) | l'éditeur visuel de FXML |
| [Nielsen Norman Group](https://www.nngroup.com/articles/ten-usability-heuristics/) | les heuristiques d'ergonomie |

---

## Des questions ?

---

## Sources

- Fiche module INFET9 (CESI)
- Les présentations du module ; captures : corrigé du TP 9
