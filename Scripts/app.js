const menuButton = document.getElementById('menubtn');
const menu = document.getElementById('menu');
const menuList = document.getElementById('menu-list');


menuButton.addEventListener('click', function () {
    if (menu.style.display === 'none' || menu.style.display === '') {
        // Mostrar el menú
        menu.style.display = 'block';  
        menu.classList.add('menu-animation');
        menuList.classList.add('menu-animation');  
    } else {
        // Añadir clases de animación de regreso
        menu.classList.add('slide-back');
        menuList.classList.add('slide-back');
        menu.classList.remove('menu-animation');
        menuList.classList.remove('menu-animation');

        // Esperar a que la animación termine antes de ocultar el menú
        menu.addEventListener('animationend', () => {
            // Limpiar clases
            menu.style.display = 'none';
            menu.classList.remove('slide-back');  
            menuList.classList.remove('slide-back');
        }, { once: true });  
    }
});
