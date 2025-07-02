document.addEventListener("DOMContentLoaded", function () {

    //RENDERIZA LOS DATOS EN CUENTA_MANAGER Y LE DA FUNCIONALIDAD A LOS BOTONES DE LOGOUT Y BORRAR USUARIO
    if (!localStorage.getItem("usuario")) {
    window.location.replace("/tp-dos/client/index.html");
    }
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    document.getElementById("cuenta_id").textContent = "ID: " + usuario.id
    document.getElementById("cuenta_email").textContent = "Email: " + usuario.email
    document.getElementById("cuenta_nombre").textContent = usuario.nombre
    const boton_logout = document.getElementById("boton_logout")
    const boton_borrar_cuenta = document.getElementById("boton_borrar_cuenta")
    boton_logout.addEventListener("click", function () {
        if (window.confirm("Seguro que quieres salir de la sesion?")) {
            localStorage.removeItem("usuario")
            localStorage.removeItem("carrito")
            window.location.replace("/tp-dos/client/index.html");
        }
    })
    boton_borrar_cuenta.addEventListener("click", function() {
        if (window.confirm("Seguro que quieres borrar esta cuenta? Esta accion es irreversible")) {
            fetch(`http://localhost:5000/borrar_usuario/${usuario.id}`, {method:"POST", headers: {"Accept": "application/json"}})
            .then(res=>{
                window.alert("Usuario borrado correctamente!")
                localStorage.removeItem("carrito")
                localStorage.removeItem("usuario")
                console.log("Intentando redirigir...");
                window.location.assign("/tp-dos/client/index.html")
            })
            .catch(err=>{
                window.alert("Algo salio mal...")
            })
        }
    })
})