const JSONPath = '../Scripts/users.json';
const loginButton = document.getElementById('loginbtn');
const userInputForm = document.getElementById('user-input-login');
const usernameMessage = document.getElementById('username-message');

// Función para verificar si el usuario existe en el archivo JSON
async function checkUser(userInput) {
    let usersMatch = false;
    try {
        const users = await fetch(JSONPath);
        let userData;
        if (!users.ok) {
            console.error(`Error al manejar el archivo JSON | Status: ${users.status}`);
        } else {
            userData = await users.json();
            const usersContainer = userData.Users;

            // Verificar si el nombre de usuario coincide con alguno en el JSON
            for (let i = 0; i < usersContainer.length; i++) {
                if (userInput === usersContainer[i].Username) {
                    console.log('¡Correct user!');
                    usersMatch = true;
                    break;
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
    let compruebeLink = document.getElementById('compruebe-link');

    // Cambiar el mensaje dependiendo del resultado
    if (usersMatch) {
        usernameMessage.style.color = 'green';
        usernameMessage.textContent = 'Correct user';
        // git it the pass check to the main page
        compruebeLink.setAttribute('href', './index.html') 
        console.log(`Pass check : ${compruebeLink}`)
    } else {
        usernameMessage.style.color = 'red';
        usernameMessage.textContent = 'Wrong user';
    }
}

// Asegurarse de que todo el contenido esté cargado antes de agregar el evento
document.addEventListener('DOMContentLoaded', () => {
    loginButton.addEventListener('click', () => {
        const userInput = userInputForm.value;  // Obtener el valor del campo de entrada
        checkUser(userInput);  // Llamar a la función checkUser con el valor de entrada
    });
});
