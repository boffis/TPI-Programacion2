document.addEventListener("DOMContentLoaded", function () {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    const container = document.getElementsByClassName("historial_pedidos")[0];
        console.log(usuario)
    
    usuario.pedidos.forEach(pedido=> {
        console.log(pedido)
        const render_pedido = document.createElement("div")
        render_pedido.className="render_pedido"
        render_pedido.innerHTML = `
        <h5>Pedido id: ${pedido.id}</h5>
        <p>productos:</p>`

        pedido.productos.forEach(producto=>{
            const producto_pedido = document.createElement("div")
            producto_pedido.className="producto_pedido"
            producto_pedido.innerHTML = `
            <p>Producto id: ${producto.id}</p>
            <p>${producto.nombre}</p>
            `
            render_pedido.appendChild(producto_pedido)
        })
        container.appendChild(render_pedido)
    })
})