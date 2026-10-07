/* Que faire ?
 *
 * Geoffroy Denledo a testé le système d'aide à la décision.
 * Il est content, mais nous, qui avons développé le logiciel,
 * on se dit que l'on peut améliorer le code !
 * 
 * Pourquoi ne pas regrouper les informations dans un objet ?
 * 
 * On a donc un objet donnees qui contient toutes les informations.
 * 
 * 1 - Analyser l'objet
 * 2 - Reprendre le code de l'exercice 4 et l'adapter au nouveau
 *     format de données.
 */

const donnees = {
  temperature: 25,
  forceVent: 10,
  mois: 7,
  indiceUV: 6
};

if (donnees.temperature >= 25 && donnees.forceVent < 20 && 
    donnees.mois >= 6 && donnees.mois <= 9 && 
    donnees.indiceUV >= 3 && donnees.indiceUV <= 5) {
  console.log('vu le temps, tu peux aller à la plage');
}
else if (donnees.forceVent < 80 && donnees.mois != 11) {
  console.log('vu le temps, tu peux aller à la piscine');
}
else {
  console.log('vu le temps, tu peux rester au chaud');
}