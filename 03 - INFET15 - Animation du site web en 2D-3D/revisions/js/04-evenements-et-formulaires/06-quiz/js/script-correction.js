// Correction : Le quiz
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les versions remplacées par une étape
// suivante sont laissées en commentaire.

// Les données du quiz (fournies) : à chaque indice de question,
// le même indice dans answers est la bonne réponse, en minuscules
const questions = [
    'Combien font 1 + 1 ?',
    'Quel est le résultat de 4 % 2 ?',
    'Quelle est la capitale de la France ?',
    'En quelle année est né Renaud ?'
];

const answers = [
    '2',
    '0',
    'paris',
    '1952'
];


// Étape 1 : sélectionner les éléments
const progressElement = document.querySelector('#progress');
const questionElement = document.querySelector('#question');
const formElement = document.querySelector('form');
const answerInput = document.querySelector('#answer');
const feedbackElement = document.querySelector('#feedback');


// Étape 2 : afficher la question en cours
// plus de boucle comme avec prompt : c'est chaque envoi du formulaire qui fait
// avancer le quiz ; currentIndex retient où on en est, d'un envoi à l'autre
let currentIndex = 0;

function showQuestion() {
    progressElement.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    questionElement.textContent = questions[currentIndex];
}

showQuestion();


// Étape 3 : vérifier la réponse et passer à la suivante
// (remplacée à l'étape 4, donc mise en commentaire)
// formElement.addEventListener('submit', function (event) {
//     event.preventDefault();
//
//     const userAnswer = answerInput.value.trim().toLowerCase();
//     if (userAnswer === '') {
//         return;
//     }
//
//     if (userAnswer === answers[currentIndex]) {
//         score++;
//         feedbackElement.textContent = '✅ Bonne réponse !';
//     } else {
//         feedbackElement.textContent = `❌ Raté, la réponse était : ${answers[currentIndex]}`;
//     }
//
//     currentIndex++;
//     answerInput.value = '';
//     showQuestion();
// });

let score = 0;


// Étape 4 : terminer le quiz
// après la dernière question, questions[currentIndex] n'existe plus (undefined) :
// on affiche le score et on cache le formulaire au lieu de la question suivante
formElement.addEventListener('submit', function (event) {
    event.preventDefault();

    const userAnswer = answerInput.value.trim().toLowerCase();
    if (userAnswer === '') {
        return;
    }

    if (userAnswer === answers[currentIndex]) {
        score++;
        feedbackElement.textContent = '✅ Bonne réponse !';
    } else {
        feedbackElement.textContent = `❌ Raté, la réponse était : ${answers[currentIndex]}`;
    }

    currentIndex++;
    answerInput.value = '';

    if (currentIndex === questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
});

function endQuiz() {
    progressElement.textContent = 'Terminé !';
    questionElement.textContent = `Score : ${score} / ${questions.length}`;
    formElement.hidden = true;

    updateBestScore(); // étape 5
}


// Étape 5 (bonus) : retenir le meilleur score
// localStorage garde des chaînes, même après la fermeture du navigateur ;
// getItem retourne null si rien n'est enregistré, et Number(null) vaut 0
const bestElement = document.querySelector('#best');

function updateBestScore() {
    let bestScore = Number(localStorage.getItem('quizBestScore'));

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('quizBestScore', bestScore);
    }

    bestElement.textContent = `Meilleur score : ${bestScore} / ${questions.length}`;
}
