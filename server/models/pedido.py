from extensions import db
from .detalle import detalle 
class Pedido (db.Model):
    __tablename__="pedido"
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    productos = db.relationship('Producto', secondary=detalle, backref='pedidos', lazy=True)


    def __repr__(self):
        return f"<Pedido {self.id}>"

