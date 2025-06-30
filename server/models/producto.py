from extensions import db

class Producto (db.Model):
    __tablename__="producto"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    valor = db.Column(db.Integer, nullable = False)
    imagen = db.Column(db.String)

    def __repr__(self):
        return f"<producto {self.nombre}>"

