import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleOrden } from 'src/app/models/DetalleOrden';
import { Orden } from 'src/app/models/Orden';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ordenes-list-barra',
  templateUrl: './ordenes-list-barra.component.html',
  styleUrls: ['./ordenes-list-barra.component.css']
})
export class OrdenesListBarraComponent implements OnInit {

  listadoOrdenes:Orden[] =  new Array<Orden>()
  rolUsuario:string
  listaDetalleOrdenTmp:DetalleOrden[] =  new Array<DetalleOrden>()

  constructor(
    private afAuth: AngularFireAuth, 
    private usuarioService: UsuarioService, 
    private ordenService: OrdenService,
    private router: Router
  ) {
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

            if(this.rolUsuario==="BARTENDER"){
              console.log("BARTENDER")
              
              this.ordenService.getOrdenes()
              .subscribe(res => {
              
                for (let orden of res) {
                  this.listaDetalleOrdenTmp = orden.detalleOrden.filter(x => x.tipo_producto === "BEBIDA")
                  orden.detalleOrden = this.listaDetalleOrdenTmp
                  this.listadoOrdenes.push(orden)
                  this.listadoOrdenes = this.listadoOrdenes.filter(o => o.en_barra === "SI")
                }
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


  liberarDeBarra(orden:Orden){
    this.ordenService.updateOrden(orden._id, orden.estatus, orden.en_cocina, "PREPARADO")
    .subscribe(res => {
      this.router.navigate(['/ordenes-barra']);
      //this.router.navigateByUrl('/ordenes-barra')
    });
  }

}
