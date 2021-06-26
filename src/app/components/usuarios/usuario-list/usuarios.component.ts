import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  user:firebase.User
  usuarios: Usuario[] = [];

  constructor(private router: Router, 
    private afAuth: AngularFireAuth, private usuarioService: UsuarioService ) { }

  ngOnInit() {
    /* Validando sesión */
    console.log("Validando sesión...")
    this.afAuth.user.subscribe((usuario)=>{
      this.user=usuario
      if(this.user){
        
        console.log("Obteniendo usuarios...")

        this.usuarioService.getUsuarios()
        .subscribe(
          res => {
            this.usuarios = res;
          },
          err => console.log(err)
        )

      }else{
        console.log("¡Sin sesión! ->> login")
        this.router.navigate(['/login']);
      }
    })

  
  }

  agregarUsuario(){
    this.router.navigate(['/usuario-form']);
  }

  selectedUser(id: string) {
    this.router.navigate(['/usuario-detalle', id]);
  }

  deleteUser(id: string) {
    this.usuarioService.deleteUsuario(id)
      .subscribe(res => {
        console.log("res delete:" + res)
        this.router.navigate(['/usuarios']);
      })

    /* Recargamos el componente*/  
    this.ngOnInit();
  }

}
