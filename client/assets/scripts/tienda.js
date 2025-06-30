
document.addEventListener("DOMContentLoaded" , function (){


fetch('http://localhost:5000/productos', {method: "GET", headers: {"Accept": "application/json"}})
    .then(res => {
        return res.json();
    })
    .then(data => {
        productos=data
        console.log("Productos:", data);

        
        localStorage.setItem("productos", JSON.stringify(data));

        const container = document.getElementById("cartas")

        productos.forEach(producto =>{
            const carta = document.createElement("div")

            carta.className = "carta"

            carta.innerHTML = `<a  href="./detalle.html?id=${producto.id}">
                <div>
                    <img src="${producto.imagen}" alt="producto4">
                </div>
                <h5> ${producto.nombre} </h5>
            </a>`


            container.appendChild(carta)
        })
    })
    .catch(err => console.error(err));


})