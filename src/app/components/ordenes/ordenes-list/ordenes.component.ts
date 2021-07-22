import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleOrden } from 'src/app/models/DetalleOrden';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  listadoOrdenes:Orden[] =  new Array<Orden>()

  rolUsuario:string
  listadoOrdenesTmp:Orden[] =  new Array<Orden>()
  listaDetalleOrdenTmp:DetalleOrden[] =  new Array<DetalleOrden>()

  constructor(
    private afAuth: AngularFireAuth, 
    private usuarioService: UsuarioService, 
    private ordenService: OrdenService,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit() {

    this.afAuth.user.subscribe((usuario)=>{
      if(usuario){

        //validamos el rol del usuario logueado  

        this.usuarioService.getUsuarioXcorreo(usuario.email)
        .subscribe(
          res => {
            if(res){

              let objeto = JSON.stringify(res)
              var stringify = JSON.parse(objeto);
            
              for (var i = 0; i < stringify.length; i++) {
                  this.rolUsuario = stringify[i]['rol'];
                  console.log("Rol Usuario: " + this.rolUsuario)
              }

            }else{
              this.rolUsuario = "ADMINISTRADOR";
              console.log("Rol: " + this.rolUsuario)
            }

            //Mostramos ordenes de acuerdo al perfil

            if(this.rolUsuario==="COCINERO"){

              this.ordenService.getOrdenes()
              .subscribe(res => {
              
                for (let orden of res) {
                  //console.log("ORDEN: "+orden.noOrden)
                  this.listaDetalleOrdenTmp = orden.detalleOrden.filter(x => x.tipo_producto === "COMIDA")
                  //console.log("filtrado: "+ JSON.stringify( this.listaDetalleOrdenTmp))
                  orden.detalleOrden = this.listaDetalleOrdenTmp
                  this.listadoOrdenes.push(orden)
                  this.listadoOrdenes = this.listadoOrdenes.filter(o => o.en_cocina === "SI")
                }
              })
            }

            if(this.rolUsuario==="BARTENDER"){
              console.log("BARTENDER")
              
              this.ordenService.getOrdenes()
              .subscribe(res => {
              
                for (let orden of res) {
                  //console.log("ORDEN: "+orden.noOrden)
                  //console.log("ORDEN: "+JSON.stringify(orden))
                  this.listaDetalleOrdenTmp = orden.detalleOrden.filter(x => x.tipo_producto === "BEBIDA")
                  orden.detalleOrden = this.listaDetalleOrdenTmp
                  this.listadoOrdenes.push(orden)
                  this.listadoOrdenes = this.listadoOrdenes.filter(o => o.en_barra === "SI")
                }
              })
            }

            if(this.rolUsuario==="MESERO"){
              this.ordenService.getOrdenes()
              .subscribe(res => {

                this.listadoOrdenes = res
              /*
                for (let orden of res) {
                  this.listaDetalleOrdenTmp = orden.detalleOrden.filter(x => x.tipo_producto === "BEBIDA")
                  orden.detalleOrden = this.listaDetalleOrdenTmp
                  this.listadoOrdenes.push(orden)
                  this.listadoOrdenes = this.listadoOrdenes.filter(o => o.en_barra === "SI")
                }*/
              })
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

  get ordenesLocalStorage(): Orden[]{
    let ordenes: Orden[] =  JSON.parse(localStorage.getItem("ordenes"))
    if(ordenes ==  null){
      return new Array<Orden>();
    }
    return ordenes
  }

  liberarDeCocina(orden:Orden){
    //update a variable en_cocina
    console.log("ORden a actualizar: "+JSON.stringify(orden))
    console.log("Id: "+orden._id)
    this.ordenService.updateOrden(orden._id, orden.estatus, "PREPARADO", orden.en_barra)
    .subscribe(res => {
      console.log("Respuesta: "+ res);
      this.router.navigate(['/ordenes']);
      //this.router.navigateByUrl('/ordenes')
      
    });
  }

  liberarDeBarra(orden:Orden){
    //console.log("ORden a actualizar: "+JSON.stringify(orden))
    //console.log("Id: "+orden._id)
    this.ordenService.updateOrden(orden._id, orden.estatus, orden.en_cocina, "PREPARADO")
    .subscribe(res => {
      //console.log("Respuesta: "+ res);
      this.router.navigate(['/ordenes']);
      //this.router.navigateByUrl('/ordenes')
    });
  }

}
