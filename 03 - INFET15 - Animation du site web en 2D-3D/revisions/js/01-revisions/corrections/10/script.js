/*
 * "Ça va trier chérie" (à peu près la Cité de la peur)
 *
 * On nous donne :
 *  - un tableau de données numériques
 *  - un booléen
 * 
 * L'objectif est de mettre true dans le booléen si le tableau
 * est ordonné par ordre croissant (trié) et false si ce n'est
 * pas le cas.
 * 
 * Pour cela, il faut comparer chaque valeur du tableau
 * avec la suivante. Si la suivante est plus petite que
 * la précédente, c'est que le tableau n'est pas trié.
 * 
 * Afficher le booléen lorsque le traitement est terminé.
 * 
 * Tester avec différentes valeurs dans le tableau.
 */

const nombres = [1, 5, 6, 2, 4];
let estTrie = true;

// Solution 1 - for

// possibilité avec for, on va jusqu'à l'avant-dernier
// élément qui sera comparé au dernier élément.
for (let index = 0; index < nombres.length - 1; index++) {
  // si le nombre suivant est plus petit que le nombre actuel
  if (nombres[index + 1] < nombres[index]) {
    // le tableau n'est pas trié
    estTrie = false;
    // on peut même quitter la boucle pour 
    // gagner du temps de traitement !
    break;
  }
}

console.log(estTrie);

// Solution 2 - while

// on remet estTrie à true
estTrie = true;
// variable de boucle
let index = 0;

// possibilité avec while, on boucle tant que
// l'on sait que c'est trié, et sans déborder du tableau (cf for)
while (estTrie && index < nombres.length - 1) {
  // si le nombre suivant est plus petit que le nombre actuel
  if (nombres[index + 1] < nombres[index]) {
    // le tableau n'est pas trié
    estTrie = false;
  }
  index++;
}

console.log(estTrie);