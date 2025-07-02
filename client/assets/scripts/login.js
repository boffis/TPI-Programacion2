document.addEventListener("DOMContentLoaded", function (){

    const login_error = document.getElementById("login_error")
    const email = document.getElementById("email")
    const contrasenia = document.getElementById("contrasenia")

    const mostrarError = (element,mensaje)=>{
        element.textContent = mensaje;
    }

    const ocultarError = (element) =>{
        element.textContent = "";
    }

    const validateEmail = () => {
        const value = email.value.trim()
        const expresionRegular = /^[^\s@]+@[^\s@]+.[^\s@]+$/

        if (!value || !expresionRegular.test(value)) {

            mostrarError(login_error, "El email debe tener el siguiente formato nombre@dominio.com")

            return false
        }

        ocultarError(login_error)
        return true
    }

    const form = document.getElementsByClassName("form-container")[0]
    form.addEventListener("submit", function(e) {
        e.preventDefault()
        if (validateEmail()) {

            fetch('http://localhost:5000/login', {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email.value,
            contrasenia: contrasenia.value
        })})
        .then(response => {
            //si trae error THROW NEW ERROR, salta al catch
            if (!response.ok) {
                return response.json().then(data=>{
                    throw new Error (data.error || "Hubo un error")
                })
            }
            return response.json()
        })
        .then(data => {
            // por el throww, si trae error el fetch, no entra al :then
            //  console.log('Respuesta del servidor:', data);
            console.log(data.pedidos)
            localStorage.setItem("usuario", JSON.stringify({
                nombre:data.nombre,
                email:email.value,
                pedidos:data.pedidos,
                id:data.usuario_id
            }))

            // window.location.replace("/tp-dos/client/index.html");
        })
        .catch(error => {
            // console.error('Error:', error);
            login_error.textContent = error
        });
        } 

    })


})