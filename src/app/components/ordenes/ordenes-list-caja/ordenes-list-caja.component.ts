import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleOrden } from 'src/app/models/DetalleOrden';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ordenes-list-caja',
  templateUrl: './ordenes-list-caja.component.html',
  styleUrls: ['./ordenes-list-caja.component.css']
})
export class OrdenesListCajaComponent implements OnInit {

  listadoOrdenes:Orden[] =  new Array<Orden>()
  rolUsuario:string
  //listaDetalleOrdenTmp:DetalleOrden[] =  new Array<DetalleOrden>()
  listadoOrdenesTmp:Orden[] =  new Array<Orden>()

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

            if(this.rolUsuario==="BARTENDER" || this.rolUsuario==="ADMINISTRADOR"){
              console.log(this.rolUsuario)
              
              this.ordenService.getOrdenes()
              .subscribe(res => {

                this.listadoOrdenes = res.filter(o => o.estatus === "SERVIDO")
              
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

}
