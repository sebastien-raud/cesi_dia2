// Correction : Convertisseur de températures
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les versions remplacées par une étape
// suivante sont laissées en commentaire.


// Étape 1 : sélectionner les deux champs
const celsiusInput = document.querySelector('#celsius');
const fahrenheitInput = document.querySelector('#fahrenheit');
console.log(celsiusInput, fahrenheitInput);


// Étape 2 : afficher dans la console ce qui est saisi en Celsius
// l'événement input se déclenche à chaque modification du champ
// (clavier, flèches du champ, copier-coller…)
// (remplacée à l'étape 3, donc mise en commentaire)
// celsiusInput.addEventListener('input', function () {
//     console.log(celsiusInput.value, typeof celsiusInput.value);
// });


// Étape 3 : convertir les Celsius en Fahrenheit
// value est toujours une chaîne : Number() la transforme en nombre
// (remplacée à l'étape 5, donc mise en commentaire)
// celsiusInput.addEventListener('input', function () {
//     const celsius = Number(celsiusInput.value);
//     const fahrenheit = celsius * 9 / 5 + 32;
//     fahrenheitInput.value = fahrenheit;
// });


// Étape 4 : convertir dans l'autre sens
// attention à lire le bon champ : ici, c'est fahrenheitInput
// (remplacée à l'étape 5, donc mise en commentaire)
// fahrenheitInput.addEventListener('input', function () {
//     const fahrenheit = Number(fahrenheitInput.value);
//     const celsius = (fahrenheit - 32) * 5 / 9;
//     celsiusInput.value = celsius;
// });


// Étape 5 : gérer le champ vide et arrondir
// Math.round arrondit à l'entier : multiplier par 10 puis diviser par 10
// garde un chiffre après la virgule
celsiusInput.addEventListener('input', function () {
    if (celsiusInput.value === '') {
        fahrenheitInput.value = '';
        return;
    }

    const celsius = Number(celsiusInput.value);
    const fahrenheit = celsius * 9 / 5 + 32;
    fahrenheitInput.value = Math.round(fahrenheit * 10) / 10;

    updateThermometer(celsius); // étape 6
});

fahrenheitInput.addEventListener('input', function () {
    if (fahrenheitInput.value === '') {
        celsiusInput.value = '';
        return;
    }

    const fahrenheit = Number(fahrenheitInput.value);
    const celsius = (fahrenheit - 32) * 5 / 9;
    celsiusInput.value = Math.round(celsius * 10) / 10;

    updateThermometer(celsius); // étape 6
});


// Étape 6 (bonus) : faire monter le thermomètre
// le thermomètre va de -20 °C (vide, 0 %) à 50 °C (plein, 100 %)
const mercuryElement = document.querySelector('.mercury');

function updateThermometer(celsius) {
    let percent = (celsius + 20) / 70 * 100;

    // rester entre 0 et 100 %, même pour -40 °C ou 80 °C
    percent = Math.max(0, Math.min(100, percent));

    mercuryElement.style.height = percent + '%';
}
