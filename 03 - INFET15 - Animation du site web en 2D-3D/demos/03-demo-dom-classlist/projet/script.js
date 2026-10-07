// Démo : déclencher une animation CSS depuis le JavaScript
// Toujours les trois mêmes étapes : sélectionner, écouter, agir sur les classes.

// ---------- 1. Afficher une notification ----------

// Sélectionner
const saveButton = document.querySelector('.save-button');
const toast = document.querySelector('.toast');

// Écouter
saveButton.addEventListener('click', () => {
    // Agir : ajouter la classe, le CSS s'occupe de l'animation
    toast.classList.add('is-visible');

    // Retirer la classe au bout de 2 secondes : la notification repart
    setTimeout(() => {
        toast.classList.remove('is-visible');
    }, 2000);
});

// ---------- 2. Rejouer une animation ----------

const form = document.querySelector('.code-form');
const input = document.querySelector('#code');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // pas d'envoi du formulaire ni de rechargement de la page

    if (input.value === '1234') {
        input.classList.remove('is-error');
        input.classList.add('is-success');
    } else {
        input.classList.remove('is-success');
        input.classList.add('is-error');
    }
});

// Étape 2 de la démo : décommenter pour que le champ secoue à CHAQUE erreur.
// Une animation ne rejoue pas si la classe est déjà là : on la retire à la fin de l'animation.
input.addEventListener('animationend', () => {
    input.classList.remove('is-error');
});
