/*
 * Ça bulle encore ?
 *
 * On garde le même tableau qu'à l'exercice précédent, mais
 * cette fois-ci on cherche à le trier... selon l'ordre
 * alphabétique des villes !
 * 
 * Et aucun indice, il faut faire preuve d'imagination, des tests
 * et peut-être un peu aussi de recherches...
 */

const temperatures = [
  {
    "city": "Paris",
    "temperature": 20
  },
  {
    "city": "Marseille",
    "temperature": 28
  },
  {
    "city": "Lille",
    "temperature": 17
  },
  {
    "city": "Lyon",
    "temperature": 25
  },
  {
    "city": "Strasbourg",
    "temperature": 24
  }
];
let trie = false;

console.log(temperatures, trie);

// placer le code ici

// on boucle tant que le tableau n'est pas trié
while (!trie) {
  // avant de parcourir les éléments on considère que
  // le tableau est trié. Ça permettra de quitter la boucle 
  // while... si le tableau est bien trié !
  trie = true;

  console.log('dans while');

  // on parcourt le tableau, jusqu'à l'avant-dernier élément
  // car on compare l'élément courant avec le suivant
  for (let i = 0; i < temperatures.length - 1; i++) {
    console.log('  dans for, i : ', i);
    console.log('  ' + temperatures[i + 1].city + ' < ' + temperatures[i].city + ' ?');
    // est-ce que l'élément suivant est plus petit que le courant ?
    if (temperatures[i + 1].city < temperatures[i].city) {
      console.log('    on permute !');
      // si oui, on permute les valeurs en utilisant
      // une variable temporaire. Ce qui permet de ne pas
      // perdre une valeur pendant la permutation.
      let temp = temperatures[i];
      temperatures[i] = temperatures[i + 1];
      temperatures[i + 1] = temp;
      // on vient d'échanger deux éléments, le tableau n'était
      // donc pas trié, on va repartir pour un tour...
      trie = false;
    }
  }
  console.log('  fin for, trie : ', trie)
}

// fin du code

console.log(temperatures, trie);