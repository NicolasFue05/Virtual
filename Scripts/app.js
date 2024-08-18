const menuButton = document.getElementById('menubtn');
const menu = document.getElementById('menu');
const menuList = document.getElementById('menu-list');

menuButton.addEventListener('click', function() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';  // Mostrar el menú
        menu.classList.add('menu-animation');  // Añadir animación
        document.body.display = 'none'
    } else {
        menu.classList.add('slide-back')        
        menu.classList.remove('menu-animation');
    }
});