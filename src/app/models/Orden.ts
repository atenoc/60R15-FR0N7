import { DetalleOrden } from "./DetalleOrden";
import { Producto } from "./Producto";

export class Orden {
    _id?:string;
    noOrden: number;
    noMesa: number;
    nombreCliente: string;
    totalOrden: number;
    estatus: string;
    creado_por:string;
    en_cocina:string;
    en_barra:string;
    fecha:Date;
    detalleOrden: Array<DetalleOrden>;

    constructor(datos?: Orden){

        if(datos != null){
            this._id = this._id;
            this.noOrden = datos.noOrden;
            this.noMesa = datos.noMesa;
            this.nombreCliente = datos.nombreCliente;
            this.totalOrden = datos.totalOrden;
            this.estatus = datos.estatus;
            this.creado_por = datos.creado_por;
            this.en_cocina = datos.en_cocina;
            this.en_barra = datos.en_barra;
            this.fecha = datos.fecha;
            this.detalleOrden = datos.detalleOrden;
            return;
        }

        this._id = this._id;
        this.noOrden = this.noOrden;
        this.noMesa = this.noMesa;
        this.nombreCliente = this.nombreCliente;
        this.totalOrden = this.totalOrden;
        this.detalleOrden = new Array<DetalleOrden>();
    }

    agregarProducto(producto: Producto){

        let detalleOrden: DetalleOrden = new DetalleOrden()
        detalleOrden.idProducto = producto._id
        detalleOrden.nombre = producto.nombre
        detalleOrden.categoria = producto.categoria
        if(producto.categoria === "SNACKS" || producto.categoria === "TACOS" || producto.categoria === "TORTAS"){
            detalleOrden.tipo_producto = "COMIDA" 
        }else if(producto.categoria === "BEBIDAS" || producto.categoria === "JUGOS" || producto.categoria === "REFRESCOS"){
            detalleOrden.tipo_producto = "BEBIDA" 
        }
        detalleOrden.cantidad = 1
        detalleOrden.precio = producto.precio
        detalleOrden.total = detalleOrden.cantidad * detalleOrden.precio

       let productoExiste: number = this.detalleOrden.filter(prod=> prod.idProducto == producto._id).length
        if (productoExiste > 0){

            let posicion: number = this.detalleOrden.findIndex(prod=> prod.idProducto == producto._id)
            this.detalleOrden[posicion].cantidad++
            this.detalleOrden[posicion].total = this.detalleOrden[posicion].cantidad * this.detalleOrden[posicion].precio

        }else{
            this.detalleOrden.push(detalleOrden)
        }

        this.actualizarTotalOrden();
        
    }

    public actualizarTotalOrden(){
        console.log("actualizarTotalOrden")
        this.totalOrden = 0
        this.detalleOrden.forEach(producto=>{
            this.totalOrden = this.totalOrden + producto.total     
        })
        console.log("total Orden: "+ this.totalOrden)
    }

    public actualizarCantidades(posicion:number){
        console.log("Servicio - actualizar cantidades. posición: " +posicion)
        this.detalleOrden[posicion]
        .total= this.detalleOrden[posicion].cantidad *
                this.detalleOrden[posicion].precio
        
        this.actualizarTotalOrden()
    }

}