const JSONPath = '../Scripts/users.json';
const loginButton = document.getElementById('loginbtn');
const userInputForm = document.getElementById('user-input-login');
const usernameMessage = document.getElementById('username-message');

// Check the user in the JSON file
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

    // if users match > Change the message
    if (usersMatch) {
        usernameMessage.style.color = 'green';
        usernameMessage.textContent = 'Correct user';
        // git it the pass check to the main page
        // Se agrega el link de la pagina principal a el boton
        window.location.href = '../Html/index.html' // Set the location when both match
    } else {
        usernameMessage.style.color = 'red';
        usernameMessage.textContent = 'Wrong user';
    }
}

// Check the password in the JSON file
async function checkPassword(){
    try{
        const users = await fetch(JSONPath)
        let userData;
        if(!users.ok){
            console.error(`Error to find data | Status : ${(users).status}`)
        }else{
            userData = await users.json();
            console.log(userData)
        }
    }
    catch(err){
        console.error(err)
    }
}



// Asegurarse de que todo el contenido esté cargado antes de agregar el evento
document.addEventListener('DOMContentLoaded', () => {
    loginButton.addEventListener('click', () => {
        const userInput = userInputForm.value;  // Obtener el valor del campo de entrada
        checkUser(userInput);
        // Pasarle la funcion para validar la password
        checkPassword()    
    });
});