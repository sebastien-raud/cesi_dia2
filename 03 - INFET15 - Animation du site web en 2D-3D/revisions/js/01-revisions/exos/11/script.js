/*
 * "Et j'ai trié ! Triéé !" (Jean-Michel Apeupré)
 *
  * On nous donne :
 *  - un tableau de données numériques
 * 
 * - Quoi, c'est tout ???
 * - Oui, ben c'est quand même l'exo 11 non ?
 * - Ah ouais, c'est vrai
 * 
 * Le but de la mission, si vous l'voulez bien, est
 * de trier le tableau par ordre croissant ("au beurre ?", "ça va oh...").
 * 
 * Quel est le principe général ?
 *  - pour chaque élément du tableau
 *    - comparer avec l'élément suivant
 *    - si le suivant est plus petit que l'élément actuel
 *      - permuter les deux éléments
 *  - il faut répéter cela tant que le tableau n'est pas trié !
 * 
 * Astuces :
 *   - commencer par regarder comment permuter deux valeurs dans un tableau
 *   - pour le parcours :
 *     - on initialise, avant le parcours, une variable trie qui indique
 *       si le tableau est trié (true) ou non (false)
 *     - tant que le tableau n'est pas trié
 *       - on effectue la comparaison de l'élément courant et du suivant
 *       - s'il faut permuter deux valeurs : c'est que le tableau n'est pas encore trié !
 *     - il y a donc une astuce à gérer pour la variable trie :
 *       - avant le parcours du tableau
 *       - lors de la permutation
 * 
 * Ne pas hésiter à mettre des console.log() pour voir ce qui se passe !
 * 
 * Ce type de tri est nommé "tri à bulles". 
 */

const nombres = [1, 5, 6, 2, 4];
let trie = false;

console.log(nombres, trie);

// placer le code ici

// fin du code

console.log(nombres, trie);