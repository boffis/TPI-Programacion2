from extensions import db

class Usuario (db.Model):
    __tablename__="usuario"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    contrasenia = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    
    pedidos = db.relationship("Pedido", backref="usuario", lazy=True)

    def __repr__(self):
        return f"<Usuario {self.nombre}>"

