// Correction : Plage, piscine ou maison ?
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js


// Étape 1 : sélectionner les éléments
const temperatureInput = document.querySelector('#temperature');
const windInput = document.querySelector('#wind');
const uvInput = document.querySelector('#uv');
const monthSelect = document.querySelector('#month');

const temperatureValue = document.querySelector('#temperature-value');
const windValue = document.querySelector('#wind-value');
const uvValue = document.querySelector('#uv-value');

const resultElement = document.querySelector('#result');


// Étape 2 : afficher la valeur des curseurs
// l'événement input se déclenche pendant que l'on fait glisser le curseur
temperatureInput.addEventListener('input', function () {
    temperatureValue.textContent = temperatureInput.value;
});

windInput.addEventListener('input', function () {
    windValue.textContent = windInput.value;
});

uvInput.addEventListener('input', function () {
    uvValue.textContent = uvInput.value;
});


// Étape 3 : écrire la fonction de décision
// les conditions de l'exercice 04 des révisions ; les valeurs sont lues
// dans les champs, et converties en nombres
function decide() {
    const temperature = Number(temperatureInput.value);
    const wind = Number(windInput.value);
    const uv = Number(uvInput.value);
    const month = Number(monthSelect.value);

    if (temperature >= 25 && wind < 20 && month >= 6 && month <= 9 && uv >= 3 && uv <= 5) {
        resultElement.textContent = '🏖️ Vu le temps, tu peux aller à la plage';
        document.body.className = 'beach'; // étape 5
    } else if (wind < 80 && month !== 11) {
        resultElement.textContent = '🏊 Vu le temps, tu peux aller à la piscine';
        document.body.className = 'pool'; // étape 5
    } else {
        resultElement.textContent = '🏠 Vu le temps, tu peux rester au chaud';
        document.body.className = 'home'; // étape 5
    }
}

// une première décision, dès le chargement de la page
decide();


// Étape 4 : décider à chaque changement
// un élément peut avoir plusieurs écouteurs : ceux de l'étape 2 restent en place
temperatureInput.addEventListener('input', decide);
windInput.addEventListener('input', decide);
uvInput.addEventListener('input', decide);

// pour une liste déroulante, l'événement change se déclenche quand le choix change
monthSelect.addEventListener('change', decide);


// Étape 5 (bonus) : changer la couleur du fond
// className remplace toutes les classes de l'élément par celle indiquée :
// pas besoin de retirer les deux autres
// (le code est dans la fonction decide, à l'étape 3)
