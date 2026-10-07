/*
 * Initials B.B.
 *
 * En JavaScript, on peut manipuler une chaîne de caractères comme un tableau !
 * Par exemple :
 *   const titre = 'Initials B.B.';
 *   console.log(titre.length); // 13
 *   console.log(titre[2]); // i
 * 
 * On peut donc comparer des lettres :
 *   console.log(titre[2] == 'i'); // true
 * 
 * On te donne un tableau qui contient une liste de prénoms et noms.
 * L'objectif est :
 * 1 - de parcourir le tableau
 * 2 - pour chaque élément du tableau
 * 3 -   rechercher les initiales en les mémorisant dans une chaîne de caractères
 *       Pour cela :
 *        - tu peux parcourir les caractères de la chaîne
 *        - le premier caractère doit être mémorisé
 *        - chaque caractère après une espace ou un tiret doit être mémorisé
 * 4 - Afficher l'élément et les initiales
 */

const artistes = [
    'Renaud Séchan',
    'Sylvie Vartan',
    'Georges Brassens',
    'Sabine Paturel',
    'Hubert-Félix Thiéfaine',
    'Dorothée',
    'Serge Gainsbourg',
    'Jane Birkin'
];