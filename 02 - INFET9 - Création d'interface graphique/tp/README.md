# 🔗 L'Atelier du Meuble : le projet des TP

![OpenJDK](https://img.shields.io/badge/Java-21-437291?logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?logo=apachemaven&logoColor=white)
![JavaFX](https://img.shields.io/badge/JavaFX-21-0077B5)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)

L'application de facturation d'INFET10 fait des PDF, envoie des e-mails et protège ses mots de passe. Pendant trois jours, vous lui donnez enfin de vraies fenêtres.

# 📑 Sommaire

- 🔗 Le client [↗](#client)
- 🎯 Le cahier des charges [↗](#cahier)
- 🔄 Comment on travaille [↗](#fonctionnement)
- ✅ Prérequis [↗](#prerequis)

---

<a id="client"></a>
# 🔗 Le client

**L'Atelier du Meuble**, menuiserie de huit personnes, revient vers vous. Son application fonctionne, mais uniquement en ligne de commande : Guy en a des sueurs froides, et Paul la relance onze fois par jour.

| Qui | Rôle | Ce qu'elle ou il attend de vous |
| --- | --- | --- |
| **Sarah Bote** | gérante | une application agréable, que toute l'équipe utilise sans formation |
| **Ella Lavisse** | comptable | voir, retrouver et trier les factures en un coup d'œil |
| **Guy Mauve** | stagiaire comptable en alternance | des écrans qui l'empêchent de se tromper (et qui le laissent corriger) |
| **Paul Hissage** | secrétaire | se connecter et naviguer sans se perdre |

Ils vous écriront au début de chaque TP.

---

<a id="cahier"></a>
# 🎯 Le cahier des charges

| # | Besoin (user story) | TP |
| --- | --- | --- |
| 1 | En tant que **gérante**, je veux une application avec des fenêtres et des boutons, afin que personne n'ait à taper de commandes | TP1 |
| 2 | En tant que **secrétaire**, je veux me connecter par un écran identifiant / mot de passe, afin d'accéder à l'application | TP2, TP3, TP5 |
| 3 | En tant que **stagiaire**, je veux un formulaire de facture qui refuse une saisie incomplète, afin de ne pas enregistrer d'erreur | TP4, TP5 |
| 4 | En tant que **comptable**, je veux la liste de toutes les factures dans un tableau, afin de préparer les relances | TP6 |
| 5 | En tant que **comptable**, je veux rechercher, filtrer par date et trier les factures, afin de retrouver une facture en deux secondes | TP7 |
| 6 | En tant que **secrétaire**, je veux un menu toujours visible, afin de passer d'un écran à l'autre sans relancer l'application | TP8 |
| 7 | En tant que **stagiaire**, je veux ouvrir le détail d'une facture et la modifier, afin de corriger une erreur sans créer de doublon | TP9 |
| 8 | En tant que **gérante**, je veux une amélioration de votre choix (supprimer une facture, par exemple : attention à la réglementation, voir le TP10), afin de simplifier la vie de l'équipe | TP10 |

Contraintes :

- Java 21, JavaFX 21, Maven ;
- les services d'INFET10 sont repris tels quels (`AuthService`, `InvoiceRepository`, `InvoicePdfService`) : on ne les réécrit pas ;
- l'application reste accessible **uniquement** après connexion ;
- les repères d'ergonomie du Jour 1 s'appliquent à tous les écrans : cohérence, retour visuel, prévention des erreurs.

---

<a id="fonctionnement"></a>
# 🔄 Comment on travaille

- Un TP = une étape du projet, dans un dossier `NN-nom/` :
  - `README.md` : l'énoncé (le mail du jour, le travail demandé, les pièges à éviter), affiché directement en ouvrant le dossier ;
  - `01-depart/` : le projet de départ, qui reprend le corrigé du TP précédent ; vous pouvez aussi continuer avec votre propre code ;
  - `02-corrige/` : une solution possible, à ouvrir **après** avoir essayé.
- Dans les énoncés, des aides se déplient au besoin, du plus léger au plus détaillé : 💡 un indice, 🆘 une aide plus poussée, 🔑 la réponse. Cherchez d'abord, dépliez ensuite.
- Lancer l'application avec `mvn javafx:run`.
- À partir du TP5, connexion avec l'identifiant `admin` et le mot de passe `S3basti3n!` (créés au premier lancement).

---

<a id="prerequis"></a>
# ✅ Prérequis

- Le module INFET10 (Maven, services de l'application de facturation) ;
- JDK 21 et Maven 3.9 (installé, ou intégré à l'IDE) ;
- un IDE Java (IntelliJ IDEA, Eclipse ou VS Code) ;
- Scene Builder (Gluon), à partir du TP3.
