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

    let flippedCount = 0;
    let randomPositions = [];
    let maxScore = 56;

    /**
     * Initial setup of the app by loading the images
     */
    function init() {
        console.info('loading the basic setup');

        const totalDiamonds  = 8;

        // clearing the previous place diamonds
        randomPositions.length = 0;
        
        // generating random 8 numbers between 0 to 64
        for (let index = 0; index < totalDiamonds; index++ ) {
            let position = Math.ceil(Math.random() * 64);
            let tempPosition; // which is used when we get any repeated value in the randomPosition array
            if (randomPositions.includes(position)) {
                tempPosition = Math.ceil(Math.random() * position);
                randomPositions.push(tempPosition);
            }
            randomPositions.push(`box-${position}`);
        }

        for (let gridItem of gridContainer.children) {
            // adds Eventlistener for flipping the image
            gridItem.addEventListener('click', flipImage);
            
            let box = gridItem.getAttribute('id');

            // adds multiple background image to few boxes with both question and diamond
            // and remaining with single question background        
            if (randomPositions.includes(box)) {
                gridItem.style.backgroundImage      = `url(${backgroundImage['background-diamond-image']}), url(${backgroundImage['background-question-image']})`;
                gridItem.style.backgroundPosition   = `${backgroundImage['background-question-position']}, ${backgroundImage['background-diamond-position']}`;
                gridItem.style.backgroundSize       = `${backgroundImage['background-size']}`;
                gridItem.style.backgroundRepeat     = `${backgroundImage['background-repeat']}`;
            } else {
                gridItem.style.backgroundImage      = `url(${backgroundImage['background-question-image']})`;
                gridItem.style.backgroundPosition   = `center`;
                gridItem.style.backgroundSize       = `${backgroundImage['background-size']}`;
                gridItem.style.backgroundRepeat     = `${backgroundImage['background-repeat']}`;
            }
        }

        console.info('Apps loads with the basic layout and setup');
    }

    /**
     * Flip event
     * 
     * flips the question image to diamond image
     * 
     * @param {*} event 
     */
    function flipImage(event) {        
        
        let id = event.target.id;
        let element = document.getElementById(id);
        
        if (randomPositions.includes(id)) {
            flippedCount++;
            if (flippedCount !== 8) {                
                element.style.backgroundPosition = `
                    ${backgroundImage['background-diamond-position']},
                    ${backgroundImage['background-question-position']}
                `;          
            } else {
                element.style.backgroundPosition = `
                    ${backgroundImage['background-diamond-position']},
                    ${backgroundImage['background-question-position']}
                `;
                element.removeEventListener('click', flipImage);
                calculateScore(maxScore);
                init();
                return;
            }
            
        } else {
            maxScore--;
            element.style.background = 'none';
        }

        element.removeEventListener('click', flipImage);
    }

    /**
     * Calculate Score
     * 
     * calculates the remaining unopened boxes and shows the score
     * @param {number} total 
     */
    function calculateScore(total) {
        
        let template = document.getElementById('template');
        let score = document.getElementById('current-score');

        template.style.display = 'block';
        score.innerHTML = `Your Score is ${total}`;
    }

    init();
})();
