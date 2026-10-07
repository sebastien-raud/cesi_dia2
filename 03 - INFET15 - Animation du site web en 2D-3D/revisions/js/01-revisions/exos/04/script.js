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
