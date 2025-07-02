from extensions import db
# tabla de relacion N a M entre pedidos y productos
detalle = db.Table(
    'detalle',
    db.Column('pedido_id', db.Integer, db.ForeignKey('pedido.id'), primary_key=True),
    db.Column('producto_id', db.Integer, db.ForeignKey('producto.id'), primary_key=True)
)
