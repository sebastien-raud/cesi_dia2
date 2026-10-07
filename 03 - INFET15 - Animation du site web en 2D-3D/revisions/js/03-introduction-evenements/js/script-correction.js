// Correction : Introduction aux événements
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js
// Le code ci-dessous est l'état final : les versions remplacées par une étape
// suivante sont laissées en commentaire.


// Étape 1 : sélectionner le bouton
const buttonElement = document.querySelector('button');
console.log(buttonElement);


// Étape 2 : afficher un message au clic sur le bouton (alert)
// addEventListener(type, fonction) : la fonction est appelée à chaque événement
buttonElement.addEventListener('click', function () {
    alert("Chouette, j'adore être cliqué !");
});


// Étape 3 : ajouter la classe « move » au survol du bouton
// (remplacée à l'étape 5, donc mise en commentaire)
// buttonElement.addEventListener('mouseover', function () {
//     buttonElement.classList.add('move');
// });


// Étape 4 : changer le texte du bouton
buttonElement.textContent = 'Attrape-moi si tu peux...';


// Étape 5 : basculer la classe « move » à chaque survol (toggle)
// toggle ajoute la classe si elle est absente, la retire si elle est présente
// (remplacée à l'étape 6, donc mise en commentaire)
// buttonElement.addEventListener('mouseover', function () {
//     buttonElement.classList.toggle('move');
// });


// Étape 6 : utiliser event.currentTarget dans la fonction
// la fonction reçoit l'événement en paramètre ; event.currentTarget est l'élément
// sur lequel l'écouteur a été posé : ici, le bouton
buttonElement.addEventListener('mouseover', function (event) {
    console.log(event.currentTarget);
    event.currentTarget.classList.toggle('move');
});
