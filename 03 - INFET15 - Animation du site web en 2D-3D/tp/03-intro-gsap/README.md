# TP3 : Intro animée avec GSAP

## Contexte

> **De :** Sarah Bote, gérante · **Objet :** Faire bonne impression
>
> Bonjour,
>
> Le site est agréable, et Paul montre le menu à tout le monde. Dans deux semaines, nous tenons un stand au salon de l'habitat : le site tournera sur un grand écran.
>
> J'aimerais que l'arrivée sur la page soit plus soignée : que les éléments se mettent en place un par un, comme un rideau qui s'ouvre. Rien de clinquant, nous vendons des meubles, pas des feux d'artifice.
>
> Sarah

L'arrivée actuelle (TP1) est en CSS : chaque délai est calculé à la main, et l'on ne peut pas la rejouer. Une bibliothèque d'animation, GSAP, fait ça beaucoup plus simplement.

## Objectif

Intégrer GSAP dans la page et construire l'intro avec une timeline.

## Prérequis

- Séquence « GSAP : animer avec une bibliothèque » ;
- TP2 terminé (le dossier `01-depart/` reprend son corrigé) ;
- une connexion Internet (GSAP est chargé depuis un CDN).

## Travail demandé

1. Dans `style.css`, supprimer les animations CSS du bandeau d'accueil (`@keyframes fade-in-up`, `@keyframes breathe` et les trois règles `animation`) : GSAP les remplace.
2. Dans `index.html`, charger GSAP depuis le CDN, **avant** `main.js` :

   ```html
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js" defer></script>
   ```

3. Vérifier le chargement : dans la console, taper `gsap.version` doit afficher `3.15.0` (ou plus récent).
4. Dans `main.js`, créer une timeline qui fait arriver, dans l'ordre : l'en-tête (depuis le haut), le titre, le slogan, puis le bouton (en grossissant).
5. Ajouter à la timeline l'apparition des six cartes produits en fondu, l'une après l'autre (`stagger`).
6. Ajouter dans le bandeau un bouton « Rejouer l'intro » (classe `replay-button`) qui relance la timeline depuis le début.

<details>
<summary>💡 Pourquoi supprimer les animations CSS ?</summary>

Une animation CSS sur `transform` est prioritaire sur les styles posés par GSAP : le titre ne bougerait pas, ou bougerait deux fois. Un élément = un seul outil pour l'animer.

</details>

<details>
<summary>💡 to, from : lequel choisir ?</summary>

`gsap.to` anime **vers** un état. `gsap.from` anime **depuis** un état, jusqu'à l'état normal défini par le CSS. Pour une arrivée, `from` est idéal : on décrit seulement d'où l'élément vient.

<details>
<summary>🆘 Toujours coincé ?</summary>

```js
const intro = gsap.timeline();

intro
    .from('.site-header', { y: -100, opacity: 0, duration: 0.6 })
    .from('.hero h1', { y: 30, opacity: 0, duration: 0.6 });
```

Chaque `.from(...)` ajouté à la timeline démarre quand le précédent se termine : aucun délai à calculer.

</details>
</details>

<details>
<summary>💡 Les cartes, une par une ?</summary>

Une seule ligne suffit : `.from('.product-card', { opacity: 0, stagger: 0.15 })` anime toutes les cartes, chacune 0,15 s après la précédente.

</details>

<details>
<summary>🆘 Rejouer l'intro ?</summary>

```html
<button class="replay-button" type="button">Rejouer l'intro</button>
```

```js
document.querySelector('.replay-button').addEventListener('click', () => {
    intro.restart();
});
```

La timeline se pilote comme une vidéo : `play()`, `pause()`, `reverse()`, `restart()`.

</details>

### Pour aller plus loin

7. Faire démarrer le slogan et le bouton **avant** la fin de l'animation précédente, pour une arrivée plus fluide (paramètre de position `'-=0.3'`).
8. Éviter de répéter `duration` et `ease` à chaque ligne : `gsap.timeline({ defaults: { ... } })`.
9. Faire « respirer » le bouton en boucle à la fin de l'intro, comme au TP1 mais avec GSAP (`repeat: -1`, `yoyo: true`).
10. Ne pas jouer l'intro si l'utilisateur a demandé à réduire les animations.

<details>
<summary>🔑 La réponse (point 10)</summary>

La règle CSS `prefers-reduced-motion` du TP1 ne concerne que les animations CSS : GSAP l'ignore. `gsap.matchMedia()` n'exécute la fonction que si la media query est vraie :

```js
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
    const intro = gsap.timeline();
    // ... toute l'intro et le bouton « Rejouer » ici
});
```

Si l'utilisateur préfère moins de mouvement, rien n'est créé : la page s'affiche directement dans son état final.

</details>

## Points de vigilance

- L'ordre des scripts compte : GSAP d'abord, `main.js` ensuite ; sinon, erreur `gsap is not defined` dans la console ;
- les cartes n'ont qu'un fondu (`opacity`), pas de mouvement : elles ont déjà une transition CSS sur `transform` pour le survol (TP1), qui ralentirait un mouvement piloté par GSAP ;
- une intro doit rester courte (2 à 3 secondes) : le visiteur est venu voir des meubles ;
- tester le bouton « Rejouer » plusieurs fois de suite, et le menu mobile du TP2 : il doit toujours fonctionner.

## Résultat attendu

- Au chargement : l'en-tête descend, puis le titre, le slogan et le bouton arrivent l'un après l'autre, puis les cartes apparaissent en cascade ;
- « Rejouer l'intro » relance toute la séquence ;
- après l'intro, le survol des cartes et le menu mobile fonctionnent comme avant ;
- aucune erreur dans la console.
