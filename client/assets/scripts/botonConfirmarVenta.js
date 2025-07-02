document.addEventListener("DOMContentLoaded", function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || null
    const container_boton = document.getElementsByClassName("container_boton")[0]
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    const boton_confirmar_venta = document.createElement("button")
    if (carrito && carrito.length > 0) {
        boton_confirmar_venta.className = "boton_confirmar_venta"
        
        boton_confirmar_venta.textContent = "Comprar!"
        
        container_boton.addEventListener("click", function(){
        boton_confirmar_venta.disabled = true;
        boton_confirmar_venta.textContent = "procesando...";

            const lista_id_carrito = carrito.map(prod=>prod.id)
            console.log(lista_id_carrito)
        fetch('http://localhost:5000/crear_pedido', {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            usuario_id: usuario.id,
            productos: lista_id_carrito
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
            // console.log('Respuesta del servidor:', data);
            usuario.pedidos.push({
                id:data.pedido_id,
                productos:carrito
            })
            
            localStorage.setItem("usuario", JSON.stringify(usuario))
            localStorage.removeItem("carrito")
            
        })
        .catch(error => {
            // console.error('Error:', error);      
                window.alert(error.message)
        })
        
        boton_confirmar_venta.disabled = false;
        boton_confirmar_venta.textContent = "Comprar!";
        })
        
        container_boton.appendChild(boton_confirmar_venta)
    }
})