/*
 * That is the question...
 *
 * Nous avons deux tableaux :
 *  - un premier qui contient des questions
 *  - un second qui contient... les réponses !
 * 
 * Les questions et les réponses sont correctement ordonnées :
 * à chaque indice de question, le même indice dans le tableau
 * des réponses est la réponse à la question.
 * 
 * On veut parcourir toutes les questions.
 * À chaque question, on la pose à l'internaute en utilisant
 * l'instruction : 
 *   const reponseUtilisateur = prompt(expression1)
 * où expression est la question et responseUtilisateur
 * la réponse donnée par l'utilisateur.
 * 
 * Attention : la réponse est toujours récupérée sous forme
 *             d'une chaîne de caractères !
 * 
 * Si besoin : https://developer.mozilla.org/fr/docs/Web/API/Window/prompt
 * 
 * Pour tester en console :
 *   let reponse = prompt('Quelle est la réponse ?');
 *   console.log(reponse);
 * 
 * Pour chaque question, on affiche en console "OK" si
 * la réponse de l'utilisateur est bonne, sinon "KO".
 * 
 * On affiche également le numéro de la question avant le OK / KO.
 * 
 * Il faut donc comparer la réponse de l'utilisateur avec
 * la bonne réponse dans le tableau des réponses.
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
  }
  else {
    console.log(`Question n° ${indexQuestion + 1} : KO`);
  }
}