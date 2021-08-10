import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleOrden } from 'src/app/models/DetalleOrden';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ordenes-list-mesero',
  templateUrl: './ordenes-list-mesero.component.html',
  styleUrls: ['./ordenes-list-mesero.component.css']
})
export class OrdenesListMeseroComponent implements OnInit {

  listadoOrdenes:Orden[] =  new Array<Orden>()
  rolUsuario:string
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


  marcarServida(orden:Orden){
    console.log("Orden a actualizar: "+JSON.stringify(orden))
    console.log("Id: "+orden._id)
    this.ordenService.updateOrden(orden._id, "SERVIDA", orden.en_cocina, orden.en_barra)
    .subscribe(res => {
      console.log("actualizado: "+ JSON.stringify(res));
      this.router.navigate(['/ordenes-mesero']);
      //this.router.navigateByUrl('/ordenes')
    /*
      this.ordenService.getOrden(orden._id).subscribe(res => {
        if(res.en_barra === "PREPARADO" && res.en_cocina === "PREPARADO"){
          this.ordenService.updateOrden(orden._id, "PREPARADO", orden.en_cocina, orden.en_barra)
          .subscribe(res => {
          })
        }
      })*/

    });
  }

}
