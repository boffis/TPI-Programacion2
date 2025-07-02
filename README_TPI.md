# TPI-Programacion2
el archivo comprimido es muy pesado para enviar en el CVG

link al repositorio:
https://github.com/boffis/TPI-Programacion2

integrantes:
Bagni Mattia, Turiani Lucas, Di Pangrazio Franco, Parenti Tomas, Boffa Tomas, Franco Mecoli

BACKEND
    MODELOS DB
        USUARIO{
            ID:INT,
            NOMBRE:STR,
            CONTRASENIA:STR,
            EMAIL:STR
        }
        PRODUCTO{
            ID:INT,
            NOMBRE:STR,
            VALOR:INT,
            IMAGEN(URL):STR
        }
        PEDIDO{
            ID:INT,
            USUARIO_ID:FK(USUARIO),
            PRODUCTOS:FK(DETALLE)
        }
        DETALLE -> TALBA DE RELACION N-M ENTRE PRODUCTOS Y PEDIDOS
    
    RUTAS
        
FRONTEND