// Correction : Trié ou pas ?
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les versions remplacées par une étape
// suivante sont laissées en commentaire.


// Étape 1 : sélectionner les éléments et créer le tableau
const formElement = document.querySelector('form');
const numberInput = document.querySelector('#number');
const numbersElement = document.querySelector('#numbers');
const statusElement = document.querySelector('#status');

// const : le tableau lui-même ne sera jamais remplacé, mais on peut
// toujours lui ajouter des éléments
const numbers = [];


// Étape 2 : intercepter l'envoi du formulaire
// submit se déclenche au clic sur le bouton « Ajouter » ou avec Entrée dans le champ ;
// preventDefault() empêche le navigateur de recharger la page
// (remplacée à l'étape 3, donc mise en commentaire)
// formElement.addEventListener('submit', function (event) {
//     event.preventDefault();
//     console.log(numberInput.value);
// });


// Étape 3 : ajouter le nombre à la liste
formElement.addEventListener('submit', function (event) {
    event.preventDefault();

    if (numberInput.value === '') {
        return;
    }

    numbers.push(Number(numberInput.value));

    // (remplacé à l'étape 4 par l'appel à render, donc mis en commentaire)
    // numbersElement.textContent = numbers.join(', ');

    render(); // étape 4

    // vider le champ, et y replacer le curseur pour le nombre suivant
    numberInput.value = '';
    numberInput.focus();
});


// Étape 4 : dire si la liste est triée
// isSorted : l'algorithme de l'exercice 10 des révisions, dans une fonction
// qui reçoit un tableau et retourne true ou false
function isSorted(array) {
    for (let index = 0; index < array.length - 1; index++) {
        if (array[index + 1] < array[index]) {
            return false; // return quitte la fonction, et donc la boucle
        }
    }

    return true;
}

// render : affiche la liste et son statut, d'après le tableau
function render() {
    numbersElement.textContent = numbers.join(', ');

    if (isSorted(numbers)) {
        statusElement.textContent = '✅ La liste est triée';
    } else {
        statusElement.textContent = "❌ La liste n'est pas triée";
    }
}


// Étape 5 (bonus) : trier la liste
// le tri à bulles de l'exercice 11 des révisions ; le bouton « Trier » est en
// dehors du formulaire : il ne déclenche donc pas submit
const sortButton = document.querySelector('#sort');

sortButton.addEventListener('click', function () {
    let sorted = false;

    while (!sorted) {
        sorted = true;

        for (let index = 0; index < numbers.length - 1; index++) {
            if (numbers[index + 1] < numbers[index]) {
                const temp = numbers[index];
                numbers[index] = numbers[index + 1];
                numbers[index + 1] = temp;
                sorted = false;
            }
        }
    }

    render();
});
