// charger le dom 
document.addEventListener('DOMContentLoaded', function(){
"use strict";
// Récupération des éléments du DOM
const joueur = document.getElementById('joueur');
const bloc = document.getElementById('bloc');
const scoreText = document.getElementById('score');
// Initialisation du score
let score = 0;

// Fonction pour déplacer le joueur vers la gauche
function mouvGauche(){
// getComputedStyle() représentant le style calculé de l'élément joueur
    // extraire la valeur de la propriété CSS "left"
    const gauche = parseInt(window.getComputedStyle(joueur).getPropertyValue("left"));
if (gauche <= 0) {
   return;  // Ne rien faire si le joueur est déjà à gauche
}
//prend la position actuelle à gauche et en soustrayant 150 pixels.
const nv_gauche = gauche - 150;
    // met à jour la propriété CSS left de l'élément joueur avec la nouvelle position calculée (nv_gauche).
    joueur.style.left = nv_gauche + "px";
}

// Fonction pour déplacer le joueur vers la gauche

function mouvDroite(){    
    const droite = parseInt(window.getComputedStyle(joueur).getPropertyValue("left"));
    if (droite >= 300) {  // Ne rien faire si le joueur est déjà à droite
        return;
     }
    //  fais une condition si l'ecran est inféruer à 668px
    const nv_droite = droite + 150;
    joueur.style.left = nv_droite + "px";
}
// Écouteur d'événement pour les touches du clavier (gauche et droite)
document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') mouvGauche();
    else if(e.key === 'ArrowRight') mouvDroite();
});
document.getElementById('gauche').addEventListener('click', mouvGauche);
document.getElementById('droite').addEventListener('click', mouvDroite);
// Événement utilisé pour le bloc pour qu'il apparait de maniére aléatoire
bloc.addEventListener('animationiteration', ()=>{
    //Positionnement aléatoire du bloc à chaque répétition de l'animation
    const bloc_aleatoire = Math.floor((Math.random()*3)) *150;
    bloc.style.left = bloc_aleatoire + "px";
    //incrémentation du score  
    score++;
    // on l'affiche dans le titre
    scoreText.innerHTML= `Score: ${score}`;
})
setInterval(()=>{
    // Vérification de collision entre le joueur et le bloc à intervalle régulier
    let joueur_gauche = parseInt(window.getComputedStyle(joueur).getPropertyValue("left"));
    let bloc_gauche =  parseInt(window.getComputedStyle(bloc).getPropertyValue("left"));
    let bloc_haut =  parseInt(window.getComputedStyle(bloc).getPropertyValue("top"));
    // vérification collision entre le joueur et le bloc
    
    if (joueur_gauche == bloc_gauche  && bloc_haut<650 && bloc_haut>460){
        alert(`Game Over !! \n Ton score est ${score}`);
        bloc.style.top = -100 + "px";
        // Réinitialise le score à zéro
        score = 0;
        scoreText.innerHTML ="Score : 0";
        // Recharge la page pour recommencer le jeu
        location.reload();
        
    }
},1);
});