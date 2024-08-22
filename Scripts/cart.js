
async function getData() {
    const url = '../Scripts/games.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Ha ocurrido un Error | Status : ${response.status}`);
        } else {
            return await response.json();
        }
    }
    catch (err) {
        console.error(err);
    }
}

function displayGameValues() {
    try {
        getData().then(response => {
            for (let i = 0; i < response.Games.length; i++) {
                let key = response.Games[i].name;
                if (localStorage.getItem(key)) {
                    // Recupera el juego como un objeto (no un array)
                    const gameData = JSON.parse(localStorage.getItem(key));

                    // Crea los elementos de la tarjeta
                    const cardContainer = document.createElement('div');
                    cardContainer.classList.add('card-container');

                    const imgElement = document.createElement('img');
                    imgElement.src = gameData.gameFrontpage || 'ruta/por/defecto.png';
                    imgElement.alt = `${gameData.gameName} Cover`;

                    const namePriceContainer = document.createElement('div');
                    namePriceContainer.classList.add('name-price-container');

                    const nameElement = document.createElement('p');
                    nameElement.id = 'game-name';
                    nameElement.textContent = gameData.gameName;

                    const priceElement = document.createElement('p');
                    priceElement.id = 'price-container';
                    priceElement.textContent = `$${gameData.gamePrice}`;

                    // Añade los elementos al contenedor de la tarjeta
                    namePriceContainer.appendChild(nameElement);
                    namePriceContainer.appendChild(priceElement);
                    cardContainer.appendChild(imgElement);
                    cardContainer.appendChild(namePriceContainer);

                    // Añade la tarjeta al contenedor principal de tarjetas
                    const gamesContainer = document.querySelector('.games-container');
                    gamesContainer.appendChild(cardContainer);
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayGameValues();

    document.getElementById('comprar').addEventListener('click', () => {
        const gamesContainer = document.querySelector('.games-container');
        while (gamesContainer.firstChild) {
            gamesContainer.removeChild(gamesContainer.firstChild)
        } if (gamesContainer.firstChild === null) {
            alert('Videojuegos comprados con exito')
        }

    })

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