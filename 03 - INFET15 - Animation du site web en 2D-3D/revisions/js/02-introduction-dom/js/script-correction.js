// Correction : Introduction au DOM
// Pour la tester : dans index.html, remplacer js/script.js par js/script-correction.js


// Étape 1 : sélectionner tous les paragraphes et afficher leur nombre
// getElementsByTagName renvoie une collection (une sorte de liste) d'éléments
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs);
console.log(paragraphs.length);


// Étape 2 : sélectionner le paragraphe de classe « inutile »
// getElementsByClassName renvoie aussi une collection, même s'il n'y a qu'un élément :
// [0] prend le premier élément de la collection
const uselessParagraph = document.getElementsByClassName('inutile')[0];
console.log(uselessParagraph);


// Étape 3 : sélectionner les sections « generalites » et « histoire »
// un identifiant est unique : getElementById renvoie directement l'élément
const generalSection = document.getElementById('generalites');
const historySection = document.getElementById('histoire');
console.log(generalSection, historySection);


// Étape 4 : sélectionner le titre de niveau 1 avec un sélecteur CSS
// querySelector renvoie le premier élément qui correspond au sélecteur
const title = document.querySelector('h1');
console.log(title);


// Étape 5 : sélectionner tous les liens avec un sélecteur CSS
// querySelectorAll renvoie tous les éléments qui correspondent au sélecteur
const links = document.querySelectorAll('a');
console.log(links);


// Étape 6 : afficher le texte de chaque lien dans la console
for (const link of links) {
    console.log(link.textContent);
}


// Étape 7 : ajouter l'identifiant « title-1 » au titre
title.id = 'title-1';


// Étape 8 : ajouter la classe « blue » au titre
title.classList.add('blue');


// Étape 9 : ouvrir tous les liens dans un nouvel onglet (target="_blank")
for (const link of links) {
    link.target = '_blank';
}


// Étape 10 : ajouter un pied de page dans #container
const footer = document.createElement('footer');      // création d'un élément footer
footer.textContent = 'source : Wikipedia / DOM';      // ajout du texte
const container = document.querySelector('#container'); // sélection du conteneur
container.append(footer);                             // ajout du pied de page


// Étape 11 : supprimer la section « inutile »
const uselessSection = document.querySelector('#inutile');
uselessSection.remove();
