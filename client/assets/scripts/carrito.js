document.addEventListener("DOMContentLoaded", function(){
    const ventana_productos = document.getElementsByClassName("productos")[0]
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    //si un producto se habia metido en el carrito y despues se saco de productos, se saca de carrito
    carrito = carrito.filter(prod=>productos.find(prod2=>prod2.id===prod.id))
    localStorage.setItem("carrito", JSON.stringify(carrito))
    if (carrito && carrito.length>0) {
        
        carrito.forEach(producto =>{
            const carrito_item = document.createElement("div")

            carrito_item.className = "carrito_item"

            carrito_item.innerHTML = `<a  href="./detalle.html?id=${producto.id}">
                <div>
                    <img src="${producto.imagen}" alt="producto4">
                </div>
                <h5> ${producto.nombre} </h5>
            </a>`


            ventana_productos.appendChild(carrito_item)
        })
    } else {
        ventana_productos.innerHTML = `<h1 id="carrito_vacio">El carrito esta vacio!</h1>`
    }
})