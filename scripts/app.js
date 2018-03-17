/**
 * Diamond sweeper
 * 
 * Author Madhankumar J
 */
(function() {
    'use strict';
    
    const gridContainer = document.getElementsByClassName('game-container')[0];

    const backgroundImage = {
        'background-image': 'assets/images/question.png',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'contain'
    };

    function init() {
        console.log('App loads with basic layout');

        for (let gridItem of gridContainer.children) {
            // adds Eventlistener for flipping the image
            gridItem.addEventListener('click', flipImage);
            
            // adds background image to all the boxed
            gridItem.style.backgroundImage = `url(${backgroundImage['background-image']})`;
            gridItem.style.backgroundPosition = `${backgroundImage['background-position']}`;
            gridItem.style.backgroundSize = `${backgroundImage['background-size']}`;
            gridItem.style.backgroundRepeat = `${backgroundImage['background-repeat']}`;            
        }
    }

    function flipImage() {
        console.log('clicked for flip the image');
    }

    init();
})();
