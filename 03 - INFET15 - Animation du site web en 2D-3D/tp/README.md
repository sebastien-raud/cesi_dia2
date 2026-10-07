# 🔗 L'Atelier du Meuble : le projet des TP

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-3-0AE448?logo=greensock&logoColor=black)
![Phaser](https://img.shields.io/badge/Phaser-4-8A2BE2)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white)

L'Atelier du Meuble a un site vitrine propre, mais tout plat. Pendant deux jours, vous lui donnez du mouvement, un jeu et même une troisième dimension.

# 📑 Sommaire

- 🔗 Le client [↗](#client)
- 🎯 Le cahier des charges [↗](#cahier)
- 🔄 Comment on travaille [↗](#fonctionnement)
- ✅ Prérequis [↗](#prerequis)

---

<a id="client"></a>
# 🔗 Le client

**L'Atelier du Meuble**, menuiserie de huit personnes, fabrique des meubles en bois massif. Son site a été fait « en vitesse, entre deux commandes » : le HTML est sérieux, mais sur un écran d'ordinateur, une table fait la largeur d'un terrain de foot.

| Qui | Rôle | Ce qu'elle ou il attend de vous |
| --- | --- | --- |
| **Sarah Bote** | gérante | un site qui donne envie, sur téléphone comme sur ordinateur |
| **Ella Lavisse** | comptable | moins de meubles retournés parce que « ce n'était pas comme sur la photo » |
| **Guy Mauve** | stagiaire comptable en alternance | un jeu-concours (c'est son idée, il y tient beaucoup) |
| **Paul Hissage** | secrétaire | un site qu'il peut montrer aux clients sur son téléphone, sans zoomer |

Ils vous écriront au début de chaque TP.

---

<a id="cahier"></a>
# 🎯 Le cahier des charges

| # | Besoin (user story) | TP |
| --- | --- | --- |
| 1 | En tant que **gérante**, je veux un site lisible sur tous les écrans et qui réagit quand on le survole, afin qu'il donne envie de rester | TP1 |
| 2 | En tant que **secrétaire**, je veux un menu qui s'ouvre d'un geste sur téléphone, afin de montrer le site aux clients sans zoomer | TP2 |
| 3 | En tant que **gérante**, je veux une arrivée soignée sur la page d'accueil, afin de faire bonne impression dès la première seconde | TP3 |
| 4 | En tant que **stagiaire**, je veux un petit jeu sur le site, afin d'attirer des visiteurs avec un jeu-concours | TP4 |
| 5 | En tant que **comptable**, je veux que les clients voient un meuble sous tous les angles, afin de réduire les retours | TP5 |

Contraintes :

- HTML, CSS et JavaScript, sans outil de build : les bibliothèques se chargent par CDN ;
- le HTML fourni est sémantique et accessible : il le reste ;
- une animation sert l'utilisateur (retour visuel, attirer l'attention) ; elle respecte les personnes gênées par le mouvement (`prefers-reduced-motion`).

---

<a id="fonctionnement"></a>
# 🔄 Comment on travaille

- Un TP = une étape du site, dans un dossier `NN-nom/` :
  - `README.md` : l'énoncé (le mail du jour, le travail demandé, les pièges à éviter), affiché directement en ouvrant le dossier ;
  - `01-depart/` : le site de départ, qui reprend le corrigé du TP précédent ; vous pouvez aussi continuer avec votre propre code ;
  - `02-corrige/` : une solution possible, à ouvrir **après** avoir essayé.
- Dans les énoncés, des aides se déplient au besoin, du plus léger au plus détaillé : 💡 un indice, 🆘 une aide plus poussée, 🔑 la réponse. Cherchez d'abord, dépliez ensuite.
- Ouvrir le site avec l'extension **Live Server** de VS Code (clic droit sur `index.html` › « Open with Live Server ») : indispensable à partir du TP4.
- Garder les outils de développement ouverts (`F12`) : la console affiche les erreurs, le mode responsive simule un téléphone.

---

<a id="prerequis"></a>
# ✅ Prérequis

- Les jours 1 et 2 du module (CSS avancé) et le module « Développement FrontEnd » ;
- un navigateur récent (Firefox, Chrome ou Edge) ;
- VS Code avec l'extension Live Server ;
- une connexion Internet (bibliothèques chargées par CDN, à partir du TP3).
