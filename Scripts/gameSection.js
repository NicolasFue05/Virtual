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

