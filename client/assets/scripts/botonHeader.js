document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("usuario-boton");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
    // Si está logueado
    contenedor.innerHTML = `
        <a href="./carrito.html" title="Ver perfil">
        <img src="./assets/fotos/Carrito.png" alt="Perfil" width="30">
        </a>
    `;
    } else {
    // Si NO está logueado
    contenedor.innerHTML = `
        <a href="./login.html" title="Iniciar sesión">
        <img src="./assets/fotos/Login.png" alt="Login" width="30">
        </a>
    `;
    }
});
