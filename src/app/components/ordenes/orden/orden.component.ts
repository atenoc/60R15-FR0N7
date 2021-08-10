import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleOrden } from 'src/app/models/DetalleOrden';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  orden:Orden = new Orden();
  detalleOrden:DetalleOrden = new DetalleOrden()
  user:firebase.User
  nombreUsuario:string

  constructor(private ordenService: OrdenService, private afAuth: AngularFireAuth, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.orden = this.ordenService.orden
    console.log("CARGA ORDEN_noOrden:" +this.orden.noOrden)

    this.afAuth.user.subscribe((usuario)=>{
      if(usuario){
        this.usuarioService.getUsuarioXcorreo(usuario.email)
        .subscribe(
          res => {
            if(res){

              let objeto = JSON.stringify(res)
              var stringify = JSON.parse(objeto);
            
              for (var i = 0; i < stringify.length; i++) {
                  this.nombreUsuario = stringify[i]['nombre'];
                  console.log("Nombre: " + this.nombreUsuario)
              }

            }
        }, 
          err => {
            console.log(err)
        }); 

      }else{
        console.log("¡Sin sesión!")
      }
    })

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
      this.ordenService.orden.en_cocina = "COCINA_LISTA"
    }
    if(noBebidas > 0){
      this.ordenService.orden.en_barra = "SI"
    }else{
      this.ordenService.orden.en_barra = "BARRA_LISTA"
    }


    this.ordenService.createOrden(
      this.ordenService.orden.noMesa,
      this.ordenService.orden.nombreCliente,
      this.ordenService.orden.en_cocina,
      this.ordenService.orden.en_barra,
      this.ordenService.orden.creado_por = this.nombreUsuario,
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
