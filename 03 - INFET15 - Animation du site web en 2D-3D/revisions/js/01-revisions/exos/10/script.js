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
let estTrie = false;