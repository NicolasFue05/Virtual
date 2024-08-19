const gameBigTitle = document.querySelector('.header-name h1');
const displayImage = document.querySelector('.show-image-container img')
const imageButtons = document.getElementsByClassName('image-change-btn')

// Get the games data (it has to be opened on a local server like the Live Server Extension)
async function getData() {
    const url = "../Scripts/games.json"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Ha ocurrido un Error | ${response.status}`)
        } else {
            const data = await response.json();
            return data
        }
    }
    catch (err) {
        console.error(err)
        return null
    }
}
// Show the data into the page
function displayGameData(gameName) {
    try {
        getData().then(response => {
            console.log(response.Games)

            // Loops through the json until the game name matches
            for (let i = 0; i < response.Games.length; i++) {
                //if the name match change it in all the nodes
                if (gameName == response.Games[i].name) {
                    gameBigTitle.textContent = response.Games[i].name; // Set the Big Name
                    displayImage.setAttribute('src', `${response.Games[i].images[i]}`) // set the display image
                    // Set the images into the buttons
                    for (let j = 0; j < imageButtons.length; j++) {
                        imageButtons[j].setAttribute('src', `${response.Games[i].images[j]}`)
                    }
                    break
                }
            }

        })
    }
    catch (err) {
        console.error(err)
    }
}

displayGameData('The Last of Us 2')
// Change the heart button

const heartButton = document.querySelector('.hearts')
const heartImage = document.querySelector('.white')

heartButton.addEventListener('click', () => {
    if(heartImage.classList.contains('white')){
        heartImage.classList.remove('white')
        heartImage.classList.add('red')
        heartImage.setAttribute('src', '../GraphicalResouces/hearts/red.png')
    }else if(heartImage.classList.contains('red')){
        heartImage.classList.remove('red')
        heartImage.classList.add('white')
        heartImage.setAttribute('src', '../GraphicalResouces/hearts/white.png')
    }
})