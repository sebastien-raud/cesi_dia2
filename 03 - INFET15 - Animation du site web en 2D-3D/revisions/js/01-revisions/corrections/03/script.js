/* Que faire ?
 *
 * Geoffroy Denledo se demande ce qu'il doit faire aujourd'hui :
 *  - aller à la plage
 *  - aller à la piscine
 *  - rester au chaud chez lui.
 * 
 * Bien entendu, tout cela dépend de plusieurs facteurs :
 *  - la température
 *  - le vent
 * 
 * Pour l'aider, nous allons développer un programme d'aide à la décision !
 * (cf https://fr.wikipedia.org/wiki/Aide_%C3%A0_la_d%C3%A9cision).
 * 
 * Les informations sont les suivantes :
 *  - en dessous d'une température de 25°C, il ne va pas à la plage
 *  - il n'y va pas non plus si le vent souffle à plus de 20 km/h
 *  - enfin, il ne souhaite pas sortir de chez lui si le vent souffle à plus
 *    de 80 km/h (parce qu'il va à pied à la piscine !)
 * 
 * 1 - On a des données initiales :
 *      - la constante temperature qui contient la température en °C
 *      - la constante forceVent qui contient la force du vent en km/h
 * 
 * 2 - On souhaite afficher des phrases du type :
 *      - "vu le temps, tu peux aller à la plage"
 *      - "vu le temps, tu peux aller à la piscine"
 *      - "vu le temps, tu peux rester au chaud"
 * 
 * 3 - Reprendre les informations disponibles et écrire, sous forme de 
 *     commentaires, la démarche à appliquer
 * 
 * 4 - Mettre en place le code d'aide à la décision
 * 
 * 5 - Tester avec différentes valeurs de température et de force du vent
 */

const temperature = 25;
const forceVent = 10;

// Démarche
// Du texte on déduit que :
// - Si température >= 25 ET force du vent < 20 Alors
//     il va à la plage
// - Sinon Si force du vent < 80 Alors
//     il va à la piscine
// - Sinon
//     il reste au chaud

// En JavaScript :
// - Si température >= 25 ET force du vent < 20 Alors
if (temperature >= 25 && forceVent < 20) {
//     il va à la plage
  console.log('vu le temps, tu peux aller à la plage');
}
// - Sinon Si force du vent < 80 Alors
else if (forceVent < 80) {
//     il va à la piscine
  console.log('vu le temps, tu peux aller à la piscine');
}
// - Sinon
else {
//     il reste au chaud
  console.log('vu le temps, tu peux rester au chaud');
}