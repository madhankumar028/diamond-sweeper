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

    /**
     * Initial setup of the app by loading the images
     */
    function init() {
        console.info('loading the basic setup');

        const totalBoxes    = 64;
        const totalDiamonds  = 8;


        for (let index = 0; index < totalDiamonds; index++ ) {
            let position = Math.floor(Math.random() * 64) + 1;
            randomPositions.push(`box-${position}`);
        }

        console.log(randomPositions);

        for (let gridItem of gridContainer.children) {
            // adds Eventlistener for flipping the image
            gridItem.addEventListener('click', flipImage);
            
            // console.log(gridItem.getAttribute('id'));
            let box = gridItem.getAttribute('id');

            // adds multiple background image to all the boxes with both question and diamond
            
            if (randomPositions.includes(box)) {
                console.log('count');
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
        
        console.info('flip starts');
        
        console.info('increases the flip counts');
        flippedCount++;

        console.log(flippedCount);

        console.log(event.target.id);
        console.log('clicked for flip the image');
        
        let id = event.target.id;
        let element = document.getElementById(id);

        if (randomPositions.includes(id)) {
            element.style.backgroundPosition = `
                ${backgroundImage['background-diamond-position']},
                ${backgroundImage['background-question-position']}
            `;
        } else {
            element.style.background = 'none';
        }   

        console.info('flipped')
        element.removeEventListener('click', flipImage);
    }

    /**
     * Calculate Score
     * 
     * calculates the remaining unopened boxes and shows the score
     * @param {number} remainingGrids 
     */
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
