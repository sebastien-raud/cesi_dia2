// Correction : Initials B.B.
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les versions remplacées par une étape
// suivante sont laissées en commentaire.


// Étape 1 : sélectionner le champ et le badge
const nameInput = document.querySelector('#name');
const initialsElement = document.querySelector('#initials');


// Étape 2 : écrire la fonction getInitials
// l'algorithme de l'exercice 07 des révisions, rangé dans une fonction
// qui reçoit le nom et retourne ses initiales
// (remplacée à l'étape 4, donc mise en commentaire)
// function getInitials(name) {
//     let initials = '';
//
//     for (let index = 0; index < name.length; index++) {
//         if (index === 0) {
//             initials += name[index];
//         } else if (name[index] === ' ' || name[index] === '-') {
//             if (index + 1 < name.length) {
//                 initials += name[index + 1];
//             }
//         }
//     }
//
//     return initials;
// }
//
// console.log(getInitials('Hubert-Félix Thiéfaine'));
// console.log(getInitials('Dorothée'));


// Étape 3 : afficher les initiales à chaque saisie
nameInput.addEventListener('input', function () {
    const initials = getInitials(nameInput.value);

    if (initials === '') {
        initialsElement.textContent = '?';
    } else {
        initialsElement.textContent = initials;
    }

    updateBadgeColor(nameInput.value); // étape 5
});


// Étape 4 : mettre en majuscules et ignorer les espaces en trop
// trim() retire les espaces au début et à la fin ; la lettre suivant une espace
// ou un tiret n'est gardée que si ce n'en est pas une autre
// (la fonction est déclarée ici, mais utilisable plus haut : JavaScript lit
// toutes les déclarations de fonctions avant d'exécuter le code)
function getInitials(name) {
    name = name.trim();
    let initials = '';

    for (let index = 0; index < name.length; index++) {
        if (index === 0) {
            initials += name[index];
        } else if (name[index] === ' ' || name[index] === '-') {
            const nextChar = name[index + 1];

            if (nextChar !== undefined && nextChar !== ' ' && nextChar !== '-') {
                initials += nextChar;
            }
        }
    }

    return initials.toUpperCase();
}


// Étape 5 (bonus) : une couleur de badge pour chaque nom
// charCodeAt donne le code (un nombre) d'un caractère : la somme des codes,
// ramenée entre 0 et 359 avec %, donne une teinte ; le même nom donne
// donc toujours la même couleur
function updateBadgeColor(name) {
    name = name.trim();

    if (name === '') {
        initialsElement.style.backgroundColor = ''; // retour à la couleur du CSS
        return;
    }

    let sum = 0;
    for (let index = 0; index < name.length; index++) {
        sum += name.charCodeAt(index);
    }

    const hue = sum % 360;
    initialsElement.style.backgroundColor = `hsl(${hue}, 60%, 45%)`;
}
