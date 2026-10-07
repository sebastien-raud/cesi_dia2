/*
 * That is the question...
 *
 * Suite de l'exercice précédent : on veut maintenant
 * mémoriser le nombre de bonnes et mauvaises réponses.
 * 
 * On affiche les résultats lorsque le jeu est terminé.
 * 
 * Pas d'indices, à toi de jouer !
 */

const questions = [
  'Combien font 1 + 1 ?',
  'Quel est le résultat de 4 % 2 ?',
  'Quelle est la capitale de la France (en minuscules) ?',
  'En quelle année est né Renaud ?'
];

const reponses = [
  2,
  '0',
  'paris',
  1952
]

// compteurs de réponses
const compteurs = {
  ok: 0,
  ko: 0
};

// on parcourt les questions. On a besoin de connaître l'indice 
// pour vérifier la réponse : boucle for
for (let indexQuestion = 0; indexQuestion < questions.length; indexQuestion++) {
  // on pose la question, on récupère la réponse de l'utilisateur
  const reponseUtilisateur = prompt(questions[indexQuestion]);

  // on compare la réponse de l'utilisateur avec la bonne réponse
  // comme on récupère des string dans reponseUtilisateur,
  // on utilise == pour comparer (pas de comparaison de type)
  if (reponseUtilisateur == reponses[indexQuestion]) {
    // bravo !
    console.log(`Question n° ${indexQuestion + 1} : OK`);
    compteurs.ok++;
  }
  else {
    console.log(`Question n° ${indexQuestion + 1} : KO`);
    compteurs.ko++;
  }
}

console.log(`Tu as\n  ${compteurs.ok} bonnes réponses\n  ${compteurs.ko} mauvaises réponses`);