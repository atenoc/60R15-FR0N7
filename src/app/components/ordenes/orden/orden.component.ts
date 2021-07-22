import { Component, OnInit } from '@angular/core';
import { DetalleOrden } from 'src/app/models/DetalleOrden';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  orden:Orden = new Orden();
  detalleOrden:DetalleOrden = new DetalleOrden()

  constructor(private ordenService: OrdenService) { }

  ngOnInit() {
    this.orden = this.ordenService.orden
    console.log("CARGA ORDEN_noOrden:" +this.orden.noOrden)
  }

  calcularCantidad(posicion:number){
    console.log("calcular cantidaes")
    this.ordenService.orden.actualizarCantidades(posicion)
    this.ordenService.guardarLocalStorage()
    console.log("Fin")
  }

  guardarOrdenLocal(){
    this.ordenService.guardarOrdenLocalStorage()
    this.orden = new Orden(null)
    console.log("Se reinició objeto")
  }

  guardarOrden(){

    /* validar si el datalle de la orden trae al menos una COMIDA / BEBIDA */
    let noComidas = this.ordenService.orden.detalleOrden.filter(t => t.tipo_producto === "COMIDA").length
    console.log("noComida: "+ noComidas)
    let noBebidas = this.ordenService.orden.detalleOrden.filter(t => t.tipo_producto === "BEBIDA").length
    console.log("noBebidas: "+ noBebidas)

    if(noComidas > 0){
      this.ordenService.orden.en_cocina = "SI"
    }else{
      this.ordenService.orden.en_cocina = "PREPARADO"
    }
    if(noBebidas > 0){
      this.ordenService.orden.en_barra = "SI"
    }else{
      this.ordenService.orden.en_barra = "PREPARADO"
    }


    this.ordenService.createOrden(
      this.ordenService.orden.noMesa,
      this.ordenService.orden.nombreCliente,
      this.ordenService.orden.en_cocina,
      this.ordenService.orden.en_barra,
      this.ordenService.orden.detalleOrden

      ).subscribe(
        res => {
          console.log(res)
          console.log("Estatus: ORDENADO")
          this.guardarOrdenLocal()
      }, 
        err => {
          console.log(err)
      });
  }

  eliminar(posicion: number){
    this.ordenService.orden.detalleOrden.splice(posicion, 1) 
    this.ordenService.orden.actualizarTotalOrden()
    this.ordenService.guardarLocalStorage()
  }

}
