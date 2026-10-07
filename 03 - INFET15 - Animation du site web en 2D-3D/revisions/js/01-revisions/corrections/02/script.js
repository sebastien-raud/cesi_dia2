/* Combien fait-il ?
 *
 * Pour convertir des degrés Celsius en degrés Fahrenheit, la formule est la suivante :
 * °F = (°C * 9/5) + 32
 * 
 * Voici une variable qui contient une liste de températures en degrés Celsius :
 *  - créer une variable tempFahrenheit qui pourra contenir une liste
 *  - cette variable doit contenir la liste des températures converties en degrés Fahrenheit 
 *    depuis la variable tempCelsius
 *  - contrôler les valeurs obtenues
 */

const tempCelsius = [25, 10, 15.5, 32.8, 35];

// tempFahrenheit est du type tableau
const tempFahrenheit = [];

// on parcourt toutes les valeurs de tempCelsius
// pour les convertir une à une
for (const temp of tempCelsius) {
    tempFahrenheit.push((temp * 9/5) + 32);
}

console.log(tempFahrenheit);


// Résultat : [ 77, 50, 59.9, 91.03999999999999, 95 ]