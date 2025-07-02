document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const boton = document.getElementById("botonVenta");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    //1 comprar 2 sacar
    let funcionalidad = 1
    if (producto = carrito.find(p => p.id === id)) {
                boton.innerText = "Sacar del carrito"
                funcionalidad = 2
                console.log(funcionalidad)
            }
        else boton.innerText = "Meter al carrito"
    
    boton.addEventListener("click", function(e){
        
            
        if (funcionalidad == 1) {
            const productosGuardados = JSON.parse(localStorage.getItem("productos"));
            producto = productosGuardados.find(p => p.id === id);
            carrito.push(producto)
            funcionalidad = 2
        } 
        else {
            carrito = carrito.filter(p=>p.id !== id)
            funcionalidad = 1
        }
            localStorage.setItem("carrito", JSON.stringify(carrito));

        if (producto = carrito.find(p => p.id === id)) {
                boton.innerText = "Sacar del carrito"
                funcionalidad = 2
                console.log(funcionalidad)
            }
            else {
                boton.innerText = "Meter al carrito"
                funcionalidad = 1
                console.log(funcionalidad)
            }
    })


})