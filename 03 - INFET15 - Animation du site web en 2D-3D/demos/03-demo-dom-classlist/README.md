# Démo : Déclencher une animation en JavaScript

## Objectif

Montrer le principe « le CSS décrit, le JavaScript déclenche » sur deux exemples génériques (une notification, un champ en erreur), avant le TP2.

## Points clés à faire passer

- trois étapes, toujours les mêmes : sélectionner (`querySelector`), écouter (`addEventListener`), agir (`classList`) ;
- le JavaScript ne touche pas au style : il ajoute ou retire une classe, les animations restent dans le CSS ;
- une animation ne rejoue pas si la classe est déjà présente : on la retire à la fin (`animationend`) ;
- la console est l'outil numéro un : une faute dans un sélecteur donne `null`, puis une erreur.

## Projet

Le projet est dans `projet/` : `index.html`, `style.css` et `script.js`. L'ouvrir dans le navigateur (double-clic), les outils de développement ouverts sur l'onglet « Éléments ».

## Déroulé détaillé

### 1. La notification

Cliquer sur « Enregistrer ».

→ La notification glisse depuis le bas, puis repart au bout de 2 secondes. Dans l'onglet « Éléments », montrer la classe `is-visible` qui apparaît puis disparaît sur le `<p class="toast">`.

Montrer les trois fichiers : les deux états dans `style.css` (`.toast` et `.toast.is-visible`, avec la `transition`), l'ajout et le retrait de la classe dans `script.js` (`setTimeout`).

### 2. Le champ qui secoue

Taper `0000` et valider : le champ secoue et devient rouge. Valider une deuxième fois `0000`.

→ Il ne secoue plus : la classe `is-error` est déjà là, l'animation ne se relance pas.

Dans `script.js`, décommenter le bloc `animationend` en fin de fichier, recharger, se tromper deux fois : le champ secoue à chaque erreur. Taper `1234` : il devient vert.

### 3. L'erreur classique

Dans `script.js`, remplacer `'.save-button'` par `'.save-buton'`, recharger, cliquer.

→ Rien ne se passe ; la console affiche `Cannot read properties of null (reading 'addEventListener')`. Lire le message ensemble : le numéro de ligne mène directement à la faute. Corriger.

## Piège à éviter

Ne pas montrer le menu mobile ni les favoris : ce sont les deux exercices du TP2. La démo garde le même principe sur d'autres exemples.
