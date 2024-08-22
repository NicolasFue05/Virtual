const menuButton = document.getElementById('menubtn');
const menu = document.getElementById('menu');
const menuList = document.getElementById('menu-list');

// Get the data from the JSON file
async function getData() {
    const url = '../Scripts/games.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Ha ocurrido un Error | Status ${response.status}`);
        } else {
            return await response.json();
        }
    } catch (err) {
        console.error(err);
    }
}

// Display all the cards in the index page
function displayCardGame() {
    const gamesCardContainer = document.querySelector('.best-videogames');
    try {
        getData().then(response => {
            for (let i = 0; i < response.Games.length; i++) {
                // Create the card elements
                let linkGame = document.createElement('a');
                let gameURL = './game.html';
                linkGame.addEventListener('click', () => {
                    linkGame.setAttribute('href', gameURL + `?id=${i}`);
                });
                linkGame.style.cursor = 'pointer';
                linkGame.style.textDecoration = 'none';
                linkGame.style.color = '#fff';

                const videogameContainer = document.createElement('div');
                videogameContainer.classList.add('videogame-container');

                let videogameFrontpage = document.createElement('img');
                videogameFrontpage.setAttribute('src', `${response.Games[i].frontPage}`);

                let videogameName = document.createElement('p');
                videogameName.classList.add('videogame-title');
                videogameName.textContent = response.Games[i].name;

                const priceHeartContainer = document.createElement('div');
                priceHeartContainer.classList.add('price-heart');

                let videogamePrice = document.createElement('p');
                videogamePrice.setAttribute('id', 'videogame-price');
                videogamePrice.textContent = `$${response.Games[i].normalPrice}`;

                // Create the Card
                videogameContainer.appendChild(videogameFrontpage);
                videogameContainer.appendChild(videogameName);
                priceHeartContainer.appendChild(videogamePrice);
                videogameContainer.appendChild(priceHeartContainer);
                linkGame.appendChild(videogameContainer);

                gamesCardContainer.appendChild(linkGame);
            }
        });
    } catch (err) {
        console.error(err);
    }
}

// MAIN
document.addEventListener('DOMContentLoaded', () => {
    // Show and hide the menu with animations
    menuButton.addEventListener('click', function () {
        if (menu.style.transform === 'translateX(0%)' || menu.style.transform === '') {
            // Hide the menu
            menu.classList.add('slide-back');
            menuList.classList.add('slide-back');
            menu.classList.remove('menu-animation');
            menuList.classList.remove('menu-animation');

            // Wait for the animation to end before hiding the menu
            menu.addEventListener('animationend', () => {
                menu.style.transform = 'translateX(100%)';
                menu.classList.remove('slide-back');
                menuList.classList.remove('slide-back');
            }, { once: true });
        } else {
            // Show the menu
            menu.style.transform = 'translateX(0%)';
            menu.classList.add('menu-animation');
            menuList.classList.add('menu-animation');
        }
    });

    displayCardGame();
});
