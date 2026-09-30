# Tableau comparatif : bibliothèques PDF (corrigé)

> Version de référence pour le formateur. Les apprenants remplissent `tableau-comparatif.md` (vierge) pendant le TP ; ce corrigé sert de base de correction/relance, pas de solution à distribuer telle quelle.
>
> Les colonnes "Activité du projet" et "Sécurité" sont à revérifier au moment de la formation (état des projets, versions, CVE) : elles évoluent dans le temps et n'ont pas été validées à la dernière minute pour ce document.

| Critère | OpenPDF | Apache PDFBox | iText (7+) | openpdf-html |
| --- | --- | --- | --- | --- |
| Fonctionnalités | Complète : texte, tableaux (`PdfPTable`), images, styles | Complète mais bas niveau (positionnement x/y manuel, pas de mise en page automatique) | La plus riche du marché (formulaires, signatures, PDF/A...) | Rendu HTML + CSS → PDF, hérite du moteur OpenPDF |
| Java compatible | Java 8+ | Java 8+ | Java 8+ | Java 8+ (testé sous Java 21) |
| Documentation | Bonne : hérite de la doc historique d'iText 4/5, beaucoup de tutoriels/StackOverflow | Bonne, documentation officielle Apache complète | Très complète, mais orientée vers l'offre commerciale | Correcte (README + exemples GitHub), moins de tutoriels tiers |
| Activité du projet | Active (LibrePDF/OpenPDF sur GitHub) | Très active (projet Apache Software Foundation) | Très active, mais double version (communautaire limitée / commerciale poussée) | Active, portée par la même équipe que OpenPDF |
| Licence | LGPL / MPL (permissive) | Apache 2.0 (la plus permissive des quatre) | **AGPL ou licence commerciale payante** ⚠️ : voir remarque ci-dessous | LGPL / MPL (même famille que OpenPDF) |
| Dépendances | Peu de dépendances transitives | Peu de dépendances transitives | Peu de dépendances transitives | Dépend d'OpenPDF + **nécessite un binding SLF4J** au runtime (sinon `NoClassDefFoundError` au premier appel : piège identifié en TP3) |
| Sécurité | Pas de vulnérabilité majeure connue à la rédaction de ce document | Pas de vulnérabilité majeure connue à la rédaction de ce document | Pas de vulnérabilité majeure connue à la rédaction de ce document | Projet plus récent, pas de vulnérabilité majeure connue à la rédaction de ce document |
| Facilité d'utilisation | Bonne : API orientée document (`Paragraph`, `PdfPTable`) | Moyenne : demande de gérer soi-même le positionnement | Bonne, mais la configuration de licence ajoute une friction | Très bonne pour qui connaît déjà HTML/CSS ; ne nécessite pas d'apprendre une API de mise en page dédiée |

## ⚠️ Le piège iText

iText a changé de modèle de licence entre la version 5 (MPL/LGPL, permissive) et la version 7+ (AGPL ou licence commerciale payante). Utiliser iText 7+ dans un produit distribué sans licence commerciale expose à devoir republier tout le code source de l'application sous AGPL. C'est l'exemple type d'un choix technique qui semblait évident (bibliothèque la plus connue/complète) mais qui cache un risque business : d'où l'intérêt du critère "licence" dans la grille de comparaison.

## Solution retenue

**`openpdf-html`** (`com.github.librepdf:openpdf-html`), en sortie de TP2 comme piste bonus.

**Argumentaire :**

* même famille de licence que OpenPDF (LGPL/MPL), pas de piège type iText ;
* contourne la complexité structurelle du PDF (positionnement, pagination, polices) vue en théorie (9h45-10h15) : on écrit du HTML/CSS (une compétence déjà connue) plutôt que d'apprendre une API bas niveau supplémentaire ;
* pattern courant en entreprise (génération de factures/rapports depuis un template HTML) ;
* limite assumée : projet plus jeune, documentation moins abondante que la bibliothèque OpenPDF elle-même, **nécessite un POC de validation avant d'être retenu en confiance** (fait au TP3 : rendu vérifié, y compris les accents français, avec un point d'attention sur la dépendance SLF4J).

Ce choix n'est pas présenté comme "la bonne réponse" aux apprenants avant qu'ils aient fait leur propre comparaison : il est révélé par le formateur en fin de TP2, une fois la comparaison OpenPDF/PDFBox/iText faite par les groupes.
