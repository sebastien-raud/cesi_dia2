# 🔗 L'Atelier du Meuble : le projet des TP

![OpenJDK](https://img.shields.io/badge/Java-21-437291?logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?logo=apachemaven&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)

Pendant deux jours, vous faites grandir l'application de facturation d'une petite menuiserie, au rythme des demandes de son équipe.

# 📑 Sommaire

- 🔗 Le client [↗](#client)
- 🎯 Le cahier des charges [↗](#cahier)
- 🔄 Comment on travaille [↗](#fonctionnement)
- ✅ Prérequis [↗](#prerequis)

---

<a id="client"></a>
# 🔗 Le client

**L'Atelier du Meuble** fabrique des meubles sur mesure : huit personnes, un atelier qui sent bon le bois, et une petite application Java de facturation, en ligne de commande. Elle calcule les factures, mais ne sait ni les mettre en forme, ni les garder, ni les envoyer.

| Qui | Rôle | Ce qu'elle ou il attend de vous |
| --- | --- | --- |
| **Sarah Bote** | gérante | une application fiable et sûre, sans surprise |
| **Ella Lavisse** | comptable | des factures propres, justes, retrouvables |
| **Guy Mauve** | stagiaire comptable en alternance | une application qui pardonne ses erreurs (il en fait) |
| **Paul Hissage** | secrétaire | moins de papier, moins de manipulations |

Ils vous écriront au début de chaque TP.

---

<a id="cahier"></a>
# 🎯 Le cahier des charges

| # | Besoin (user story) | TP |
| --- | --- | --- |
| 1 | En tant qu'**équipe de développement**, je veux un projet Maven propre, afin d'ajouter des bibliothèques sans les télécharger à la main | TP1 |
| 2 | En tant que **comptable**, je veux des factures en PDF à la mise en page soignée, afin de les envoyer sans retouche | TP2, TP3, TP4 |
| 3 | En tant que **stagiaire**, je veux que les factures soient enregistrées, afin de les retrouver d'un lancement à l'autre | TP4 |
| 4 | En tant que **gérante**, je veux un accès par identifiant et mot de passe, afin que personne ne lise les mots de passe, même en cas de fuite | TP5 |
| 5 | En tant que **secrétaire**, je veux envoyer la facture par e-mail avec son PDF, afin d'arrêter d'imprimer et de scanner | TP6 |

Contraintes :

- Java 21, Maven ;
- bibliothèques gratuites, maintenues, sous licence permissive (usage commercial) ;
- données dans une base SQLite (`invoices.db`) ;
- pas encore d'interface graphique : elle viendra au module suivant, INFET9.

---

<a id="fonctionnement"></a>
# 🔄 Comment on travaille

- Un TP = une étape du projet, dans un dossier `NN-nom/` :
  - `README.md` : l'énoncé (le mail du jour, le travail demandé, les pièges à éviter), affiché directement en ouvrant le dossier ;
  - `01-depart/` : le projet de départ ; pas besoin d'avoir fini le TP précédent ;
  - `02-corrige/` : une solution possible, à ouvrir **après** avoir essayé.
- Dans les énoncés, des aides se déplient au besoin, du plus léger au plus détaillé : 💡 un indice, 🆘 une aide plus poussée, 🔑 la réponse. Cherchez d'abord, dépliez ensuite.
- Compiler avec `mvn compile`, lancer la classe `Main` depuis l'IDE.
- Les TP 2, 5 et 6 commencent par une **recherche** de bibliothèque : il n'y a pas une seule bonne réponse, mais un choix à justifier.

---

<a id="prerequis"></a>
# ✅ Prérequis

- JDK 21 ;
- Maven 3.9 (installé, ou intégré à l'IDE) ;
- un IDE Java (IntelliJ IDEA, Eclipse ou VS Code) ;
- facultatif : le client `sqlite3` ou DB Browser for SQLite, pour regarder dans la base.
