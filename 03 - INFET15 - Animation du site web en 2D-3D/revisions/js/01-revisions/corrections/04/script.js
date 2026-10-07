/* Que faire ?
 *
 * Geoffroy Denledo a testé le système d'aide à la décision.
 * Il est content, mais il se rend compte que ce n'est pas
 * assez précis ! Il nous demande donc de faire quelques
 * améliorations :
 * 
 * - il ne va à la plage qu'entre juin et septembre (inclus)
 * - il ne va à la plage que si l'indice UV est modéré (cf https://fr.wikipedia.org/wiki/Indice_UV)
 * - la piscine est fermée en novembre pour des compétitions et de la maintenance
 * 
 * 1 - On a ajouté deux données :
 *      - le mois (entre 1 : janvier et 12 : décembre)
 *      - l'indice UV
 * 
 * 2 - Reprendre le code de l'exercice 3
 * 
 * 3 - Analyser les nouvelles demandes, et corriger la démarche
 * 
 * 4 - Modifier le code pour l'adapter aux nouveaux besoins
 * 
 * 5 - Faire des tests
 * 
 */

const temperature = 25;
const forceVent = 10;
const mois = 7;
const indiceUV = 6;


// Démarche
// Du texte on déduit que :
// - Si température >= 25 ET force du vent < 20 ET mois >= 6 ET mois <= 9 && indice UV >= 3 ET indice UV <= 5 Alors
//     il va à la plage
// - Sinon Si force du vent < 80 ET mois != 11 Alors
//     il va à la piscine
// - Sinon
//     il reste au chaud

// En JavaScript :
// - Si température >= 25 ET force du vent < 20 Alors
if (temperature >= 25 && forceVent < 20 && mois >= 6 && mois <= 9 && indiceUV >= 3 && indiceUV <= 5) {
//     il va à la plage
  console.log('vu le temps, tu peux aller à la plage');
}
// - Sinon Si force du vent < 80 Alors
else if (forceVent < 80 && mois != 11) {
//     il va à la piscine
  console.log('vu le temps, tu peux aller à la piscine');
}
// - Sinon
else {
//     il reste au chaud
  console.log('vu le temps, tu peux rester au chaud');
}