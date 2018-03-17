/**
 * Diamond sweeper
 * 
 * Author Madhankumar J
 */
(function() {
    'use strict';
    
    const gridContainer = document.getElementsByClassName('game-container')[0];

    const backgroundImage = {
        'background-question-image': 'assets/images/question.png',
        'background-diamond-image': 'assets/images/diamond.png',        
        'background-question-position': '600px',
        'background-diamond-position': '5px',        
        'background-size': 'contain',
        'background-repeat': 'no-repeat'
    };

    function init() {
        console.log('App loads with basic layout');

        for (let gridItem of gridContainer.children) {
            // adds Eventlistener for flipping the image
            gridItem.addEventListener('click', flipImage);
            
            // adds multiple background image to all the boxes with both question and diamond
            gridItem.style.backgroundImage      = `url(${backgroundImage['background-diamond-image']}), url(${backgroundImage['background-question-image']})`;
            gridItem.style.backgroundPosition   = `${backgroundImage['background-question-position']}, ${backgroundImage['background-diamond-position']}`;
            gridItem.style.backgroundSize       = `${backgroundImage['background-size']}, ${backgroundImage['background-size']}`;
            gridItem.style.backgroundRepeat     = `${backgroundImage['background-repeat']}`;
        }
    }

    function flipImage(event) {
        
        console.info('flip starts');
        
        console.log(event.target.id);
        console.log('clicked for flip the image');
        
        let id = event.target.id;
        let element = document.getElementById(id);

        element.style.backgroundPosition = `
            ${backgroundImage['background-diamond-position']},
            ${backgroundImage['background-question-position']}
        `;

        console.info('flipped')
        element.removeEventListener('click', flipImage);
    }

    function calculateScore(remainingGrids) {
        localStorage.setItem('HighestScore', remainingGrids);
        
        let score = remainingGrids;
        let highestScore = localStorage.getItem('HighestScore');

        score > highestScore
            ? (localStorage.setItem('HighestScore', score), highestScore = score)
            : '';
    }

    init();
})();
