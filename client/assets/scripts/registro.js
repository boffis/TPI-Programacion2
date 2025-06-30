document.addEventListener("DOMContentLoaded", ()=>{
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password")
    const terminos = document.getElementById("terminos");


    const errNombre = document.getElementById("nombre-error");
    const errEmail = document.getElementById("email-error");
    const errPassword = document.getElementById("password-error");
    const errTerminos = document.getElementById("terminos-error");


    const mostrarError = (element,mensaje)=>{
        element.textContent = mensaje;
    }

    const ocultarError = (element) =>{
        element.textContent = "";
    }

    const validateNombre = ()=>{
        const value = nombre.value.trim();

        if(value.length < 4){
            mostrarError(errNombre, "Ingrese un nombre con mas de 4 letras");
            return false;
        }
        ocultarError(errNombre);
        return true;
    }


    const validateEmail = () => {
        const value = email.value.trim()
        const expresionRegular = /^[^\s@]+@[^\s@]+.[^\s@]+$/

        if (!value || !expresionRegular.test(value)) {

            mostrarError(errEmail, "El email debe tener el siguiente formato nombre@dominio.com")

            return false
        }

        ocultarError(errEmail)
        return true

    }

        const validatePassword = () => {
        const value = password.value.trim();
        if (value.length < 6) {
            mostrarError(errPassword, "La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        ocultarError(errPassword);
        return true;
    }

    const validateTerminos = () => {
        if (!terminos.checked) {
            mostrarError(errTerminos, "Debe aceptar los términos y condiciones");
            return false;
        }
        ocultarError(errTerminos);
        return true;
    }

    const form = document.getElementById("registroForm");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const validoNombre = validateNombre() 
        const validoEmail = validateEmail() 
        const validoPassword = validatePassword() 
        const validoTerminos = validateTerminos()

        

        
        if (validoNombre&&validoEmail&&validoPassword&&validoTerminos) {

        fetch('http://localhost:5000/crear_usuario', {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nombre: nombre.value,
            email: email.value,
            contrasenia: password.value
        })})
        .then(response => response.json())
        .then(data => {
        console.log('Respuesta del servidor:', data);
        successMessage.textContent = "Registro exitoso";
        form.reset();
        })
        .catch(error => {
        console.error('Error:', error);
        });
        
        } else {
            successMessage.textContent = "";
        }
    });
});
