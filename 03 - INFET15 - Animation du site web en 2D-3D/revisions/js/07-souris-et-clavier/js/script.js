// La coccinelle au jardin
// Les consignes détaillées, les résultats attendus et les aides sont dans le README.md.
// Écris ton code sous chaque étape, puis recharge la page pour tester.


// ----- Fourni (rien à modifier) -----

// Boucle d'animation, pour l'étape 9 (l'exercice 08 explique comment l'écrire).
// startLoop(update) appelle la fonction update(dt) à chaque image ;
// dt est le temps écoulé depuis l'image précédente, en secondes.
function startLoop(update) {
    let lastTime = null;
    function frame(time) {
        const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
        lastTime = time;
        update(dt);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

// Pour l'étape 10 : renvoie true si les deux éléments se chevauchent à l'écran.
function touches(elementA, elementB) {
    const a = elementA.getBoundingClientRect();
    const b = elementB.getBoundingClientRect();
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}


// Étape 1 : afficher les coordonnées de la souris dans le jardin


// Étape 2 : une fleur suit la souris


// Étape 3 : la fleur suit avec un léger retard (classe smooth)


// Étape 4 : un clic fait apparaître des étincelles qui s'envolent


// Étape 5 : les flèches déplacent la coccinelle


// Étape 6 : la coccinelle s'oriente dans le sens de la marche


// Étape 7 : la coccinelle ne sort pas du jardin


// Étape 8 : les flèches ne font plus défiler la page


// Étape 9 : déplacement fluide et en diagonale (touches gardées en mémoire)


// Étape 10 : des feuilles à manger, et un score


// Étape 11 (bonus) : une araignée se promène ; la toucher, c'est perdu
