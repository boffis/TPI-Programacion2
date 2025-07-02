document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productosGuardados.find(p => p.id === id);
    if (producto) {
        document.getElementById("detalleId").textContent = `id: ${producto.id}`;
        document.getElementById("detalleNombre").textContent = producto.nombre;
        document.getElementById("detallePrecio").textContent = `$ ${producto.valor}`;
        document.getElementById("detalleImagen").src = producto.imagen;


    } else {
        window.alert("Producto no encontrado");
        window.location.replace("/tp-dos/client/index.html");
    }
});
