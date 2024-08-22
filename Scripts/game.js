// Change the heart button
const heartButton = document.querySelector('.hearts');
const heartImage = document.querySelector('.white');

if (heartButton && heartImage) {
    heartButton.addEventListener('click', () => {
        if (heartImage.classList.contains('white')) {
            heartImage.classList.remove('white');
            heartImage.classList.add('red');
            heartImage.setAttribute('src', '../GraphicalResouces/hearts/red.png');
        } else if (heartImage.classList.contains('red')) {
            heartImage.classList.remove('red');
            heartImage.classList.add('white');
            heartImage.setAttribute('src', '../GraphicalResouces/hearts/white.png');
        }
    });
}

async function getData() {
    const url = '../Scripts/games.json'
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Ha ocurrido un Error | Status ${data.status}`)
        } else {
            return await response.json();
        }
    }
    catch (err) {
        console.error(err)
    }
}



// Display the content in the game page
function displayGameData() {
    const gameId = String(window.location.search)
    const gameIndex = gameId.slice(4)
    console.log(gameIndex)
    try {
        // iterar sobre el elemento
        getData().then(response => {

            for (let i = 0; i < response.Games.length; i++) {
                if (gameIndex == i) {
                    const headerName = document.querySelector('.header-name h1')
                    headerName.textContent = response.Games[i].name

                    const displayImage = document.querySelector('.show-image-container img')
                    displayImage.setAttribute('src', response.Games[i].frontPage)

                    const developersInfo = document.querySelector('.devs-info p')
                    developersInfo.textContent = `Developers: ${response.Games[i].developers}`

                    const description = document.querySelector('.description-container p')
                    description.textContent = response.Games[i].gameDescription

                    const normalPrice = document.querySelector('.normal-price p')
                    normalPrice.textContent = `Normal price: ${response.Games[i].normalPrice}`

                    const memberPrice = document.querySelector('.member-price p')
                    memberPrice.textContent = `Member price: ${response.Games[i].memberPrice}`

                    const playersInfo = document.querySelector('.players-container p')
                    playersInfo.textContent = response.Games[i].players

                    const platformsInfo = document.querySelector('.platforms-container p')
                    platformsInfo.textContent = response.Games[i].platforms

                    const wifiInfo = document.querySelector('.online-container p')
                    wifiInfo.textContent = response.Games[i].wifi
                    const imageButton = document.querySelectorAll('.image-buttons-container img');

                    for (let j = 0; j < response.Games[i].images.length; j++) {
                        imageButton[j].setAttribute('src', response.Games[i].images[j])

                        imageButton[j].addEventListener('click', () => {
                            displayImage.setAttribute('src', response.Games[i].images[j])
                        })
                    }
                }
            }

        })
    }
    catch (err) {
        console.error(err)
    }

}
// Function to handle the comprar button and storage the game data  
function cartButton() {
    const idGame = String(window.location.search);
    const gameIndex = idGame.slice(4);

    try {
        getData().then(response => {
            for (let i = 0; i < response.Games.length; i++) {
                if (gameIndex == i) {
                    let game = {
                        "gameName": response.Games[i].name,
                        "gameFrontpage": response.Games[i].frontPage,
                        "gamePrice": response.Games[i].normalPrice
                    };
                    // Guarda el juego como un objeto directamente, sin array
                    localStorage.setItem(response.Games[i].name, JSON.stringify(game));
                    alert('El videojuego se guardó en el carrito!');
                    console.log(game);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const addCartButton = document.querySelector('.add-button');

    displayGameData();
    addCartButton.addEventListener('click', cartButton);

    const menuButton = document.getElementById('menubtn');
    const menu = document.getElementById('menu');
    const body = document.body;

    // Toggle menu visibility
    menuButton.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            body.classList.remove('menu-active');
        } else {
            menu.classList.add('show');
            body.classList.add('menu-active');
        }
    });

});
