// Correction : Le poème dans le désordre
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les versions remplacées par une étape
// suivante sont laissées en commentaire.


// Étape 1 : sélectionner les vers et les zones de texte
const verseElements = document.querySelectorAll('.verse');
const poemElement = document.querySelector('#poem');
const messageElement = document.querySelector('#message');
console.log(verseElements.length); // 8


// Étape 2 : réagir au clic sur chaque vers
// une seule fonction pour les 8 boutons : event.currentTarget est le vers cliqué
// (fonction remplacée à l'étape 3, donc mise en commentaire ; la boucle reste)
// function handleVerseClick(event) {
//     console.log(event.currentTarget.textContent);
// }

// handleVerseClick est déclarée plus bas (étape 4) : JavaScript lit toutes les
// déclarations de fonctions avant d'exécuter le code
for (const verseElement of verseElements) {
    verseElement.addEventListener('click', handleVerseClick);
}


// Étape 3 : ajouter le vers cliqué au poème
// \n est un retour à la ligne ; le CSS du poème (white-space: pre-line) l'affiche
// (fonction remplacée à l'étape 4, donc mise en commentaire)
// function handleVerseClick(event) {
//     const verseElement = event.currentTarget;
//     poemElement.textContent += verseElement.textContent + '\n';
//     verseElement.disabled = true;
// }


// Étape 4 : n'accepter que le bon vers
// data-order="3" dans le HTML se lit en JavaScript avec dataset.order,
// sous forme de chaîne : '3'
let placedCount = 0;

function handleVerseClick(event) {
    const verseElement = event.currentTarget;
    const order = Number(verseElement.dataset.order);

    if (order !== placedCount + 1) {
        messageElement.textContent = "❌ Raté, ce n'est pas le vers suivant !";
        return;
    }

    placedCount++;
    poemElement.textContent += verseElement.textContent + '\n';
    verseElement.disabled = true;

    if (placedCount === verseElements.length) {
        messageElement.textContent = '🎉 Bravo, le poème est reconstitué !';
    } else {
        messageElement.textContent = '';
    }
}


// Étape 5 (bonus) : recommencer
const restartButton = document.querySelector('#restart');

restartButton.addEventListener('click', function () {
    placedCount = 0;
    poemElement.textContent = '';
    messageElement.textContent = '';

    for (const verseElement of verseElements) {
        verseElement.disabled = false;
    }
});
