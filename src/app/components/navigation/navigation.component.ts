import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/models/Usuario';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user:firebase.User
  nombreEmail: string
  rolUsuario:string
  //mostrarMiOrden:boolean = false

  constructor(private afAuth: AngularFireAuth, private spinner: NgxSpinnerService, 
    private router: Router, public ordenService:OrdenService, private usuarioService: UsuarioService) {}

  ngOnInit() {

    this.afAuth.user.subscribe((usuario)=>{
      this.user=usuario
      if(this.user){
        if(this.user.displayName){
          this.nombreEmail = this.user.displayName 
          console.log("Nombre Usuario: "+ this.nombreEmail)
        }else{
          this.nombreEmail = this.user.email
          console.log("Correo Usuario: "+ this.nombreEmail)
        }

        /**validamos el rol del usuario logueado  */
        console.log("Obteniendo rol...")
        this.usuarioService.getUsuarioXcorreo(this.user.email)
        .subscribe(
          res => {
            console.log("res: " +res)

            if(res){
              //console.log("existe")
              let objeto = JSON.stringify(res)
              var stringify = JSON.parse(objeto);
            
              for (var i = 0; i < stringify.length; i++) {
                  //console.log("stringify rol: " + stringify[i]['rol']);
                  this.rolUsuario = stringify[i]['rol'];
                  console.log("Rol Usuario: " + this.rolUsuario)
              }

            }else{
              //console.log("no existe")
              this.rolUsuario = "ADMINISTRADOR";
              console.log("Rol: " + this.rolUsuario)
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
/*
  logout() {
    this.spinner.show()
    this.afAuth.auth.signOut();

    setTimeout(() => {
      this.spinner.hide() 
      this.router.navigate(['/login'])


    }, 500);
  }*/

  logout(){
    Swal.fire({
      title: `¡Atención!`,
      text: "¿Estás seguro que deseas salir?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aeaeae',
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        /*si dan clic en si, eliminar */

        this.spinner.show()
        this.afAuth.auth.signOut();
    
        setTimeout(() => {
          this.spinner.hide() 
          this.router.navigate(['/login'])  
        }, 500);
  
      }
    })
    }

}
