from flask import Flask, request, redirect,url_for, abort, render_template, jsonify
from flask_cors import CORS
from extensions import db

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mi_base_de_datos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

from models import Usuario, Producto, Pedido

with app.app_context():
    db.create_all()


def productos_base():
    # Productos que se añadirian el momento del deploy/reset de bdd
    with app.app_context():
        if Producto.query.count() == 0:
            p1 = Producto(nombre="Llavero pelotita", valor=850, imagen="https://dcdn-us.mitiendanube.com/stores/154/782/products/6610r-de5de5b32c99bdc05a5ddf0283c81a1d-640-0.png")
            p2 = Producto(nombre="Pulsera", valor=600, imagen="https://dcdn-us.mitiendanube.com/stores/154/782/products/935396-11-72edecf2b98f8aadc915093802889095-1024-1024.jpg")
            p3 = Producto(nombre="Choppera", valor=8000, imagen="https://cdn.v2.tiendanegocio.com/gallery/23176/img_23176_1936f44f4fe.png?class=sm")
            p4 = Producto(nombre="Pelota de futbol", valor=15000, imagen="https://acdn-us.mitiendanube.com/stores/770/810/products/749705-mla31638291260_072019-o-1876dc55624fffcd9115689659169375-480-0.jpg")
            p5 = Producto(nombre="Gorra con visera", valor=600, imagen="https://quemoda.com.ar/wp-content/uploads/2022/12/producto_14765_43971.jpg")
            db.session.add_all([p1, p2, p3, p4, p5])
            db.session.commit()


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/productos", methods=["GET"])
def productos():
    productos = Producto.query.all()
    lista = [{"id": u.id, "nombre": u.nombre, "valor": u.valor, "imagen": u.imagen} for u in productos]
    if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
        return jsonify(lista)
    else:
        return render_template("producto.html", productos=lista)

@app.route("/usuarios", methods=["GET"])
def usuarios():
    usuarios = Usuario.query.all()

    lista = []
    for u in usuarios:
        pedidos_data = []
        for p in u.pedidos:
            productos_nombres = [prod.nombre for prod in p.productos]
            pedidos_data.append({
                "id": p.id,
                "productos": productos_nombres
            })

        lista.append({
            "id": u.id,
            "nombre": u.nombre,
            "email": u.email,
            "pedidos": pedidos_data
        })

    if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
        return jsonify(lista)
    else:
        return render_template("usuarios.html", usuarios=lista)

@app.route("/usuario/<int:id>", methods=["GET"])
def usuario_por_id(id):
    usuario = Usuario.query.get(id)
    
    if not usuario:
        # Devuelve 404 si no existe
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    pedidos_data = []
    for p in usuario.pedidos:
        productos_nombres = [prod.nombre for prod in p.productos]
        pedidos_data.append({
            "id": p.id,
            "productos": productos_nombres
        })
        
    datos = {
        "id": usuario.id,
        "nombre": usuario.nombre,
        "email": usuario.email,
        "pedidos": [{"id": p.id, "productos":pedidos_data} for p in usuario.pedidos]
    }
    
    return jsonify(datos)

@app.route("/crear_usuario", methods=["POST"])
def api_crear_usuario():
    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    contrasenia = data.get("contrasenia")

    if not nombre or not email or not contrasenia:
        return jsonify({"error": "Faltan datos"}), 400

    if Usuario.query.filter_by(email=email).first():
        return jsonify({"error": "El email ya existe"}), 400

    nuevo_usuario = Usuario(nombre=nombre, email=email, contrasenia=contrasenia)
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"mensaje": "Usuario creado correctamente", "id": nuevo_usuario.id}), 201

@app.route("/borrar_usuario/<int:id>", methods=["POST"])
def borrar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    # Borro pedidos relacionados
    Pedido.query.filter_by(usuario_id=usuario.id).delete()
    db.session.delete(usuario)
    db.session.commit()
    return redirect(url_for("usuarios"))

@app.route("/crear_pedido", methods=["POST"])
def crear_pedido():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    productos = data.get("productos")

    if not usuario_id or not productos or not isinstance(productos, list):
        return jsonify({"error": "Datos inválidos"}), 400

    usuario = Usuario.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    nuevos_productos = Producto.query.filter(Producto.id.in_(productos)).all()
    if not nuevos_productos:
        return jsonify({"error": "Productos no encontrados"}), 404

    pedido = Pedido(usuario_id=usuario.id)
    pedido.productos = nuevos_productos

    db.session.add(pedido)
    db.session.flush()  # fuerza que se asigne un ID antes de relacionar
    db.session.commit()

    return jsonify({
        "mensaje": "Venta registrada correctamente",
        "pedido_id": pedido.id,
        "productos": [p.nombre for p in nuevos_productos]
    }), 201


@app.route("/crear_producto", methods=["GET","POST"])
def crear_producto():
    if request.method == "GET":
        return render_template("crear_producto.html")
    
    if request.method == "POST":
        nombre = request.form.get("nombre")
        valor = request.form.get("precio")
        imagen = request.form.get("imagen")  
        # Validación básica
        if not nombre or not valor:
            return "Faltan datos", 400
        
        try:
            valor = int(valor)
        except ValueError:
            return "Precio inválido", 400  # Crear y guardar producto
        
        nuevo_producto = Producto(nombre=nombre, valor=valor, imagen=imagen)
        db.session.add(nuevo_producto)
        db.session.commit()
        
        return redirect(url_for("productos"))  # Redirige a la lista de productos
    
@app.route("/borrar_productos/<int:id>", methods=["POST"])
def borrar_productos(id):
    producto = Producto.query.get_or_404(id)
    db.session.delete(producto)
    db.session.commit()
    return redirect(url_for("productos"))

@app.route("/modificar_producto/<int:id>", methods=["GET", "POST"])
def modificar_producto(id):
    producto = Producto.query.get_or_404(id)

    if request.method == "POST":
        producto.nombre = request.form.get("nombre")
        producto.valor = int(request.form.get("valor"))
        producto.imagen = request.form.get("imagen")
        db.session.commit()
        return redirect(url_for("productos"))

    # Si es GET, muestro el formulario con los datos actuales
    return render_template("modificar_producto.html", producto=producto)


@app.route("/borrar_productos/<int:id>", methods=["GET", "DELETE"])
def borrar_producto():
    return None

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    contrasenia = data.get("contrasenia")

    if not email or not contrasenia:
        return jsonify({"mensaje": "Faltan datos"}), 400

    usuario = Usuario.query.filter_by(email=email).first()

    if usuario and usuario.contrasenia == contrasenia:
        return jsonify({
            "mensaje": "Login exitoso",
            "usuario_id": usuario.id,
            "nombre": usuario.nombre
        }), 200
    else:
        return jsonify({"mensaje": "Email o contraseña incorrectos"}), 401

# Por las dudas :p
@app.route("/reset_db")
def reset_db():
    db.drop_all()
    db.create_all()
    productos_base()
    return "Base de datos reiniciada", 200


if __name__ == "__main__":
    productos_base()
    app.run(debug=True)