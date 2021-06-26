import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  formNuevoUsuario:FormGroup
  datosCorrectos:boolean = true
  textError:string =''

  constructor(private afAuth: AngularFireAuth, private formB: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.formNuevoUsuario =  this.formB.group({
      nombre:['',Validators.required],
      rol:['',Validators.required],
      correo:['',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.required]
    })
  }

  crearUsuario(){

    if(this.formNuevoUsuario.valid){
      console.log("El nombre es: "+ this.formNuevoUsuario.value.nombre)
      console.log("El rol es: "+ this.formNuevoUsuario.value.rol)
      console.log("El correo es: "+ this.formNuevoUsuario.value.correo)
      console.log("El password es: "+ this.formNuevoUsuario.value.password)

      /* Primero se guarda el usuario en Firebase Auth*/ 
      this.afAuth.auth.createUserWithEmailAndPassword(this.formNuevoUsuario.value.correo, this.formNuevoUsuario.value.password);

      /* Se guarda el usuario en la base de datos local */
      this.usuarioService.createUsuario(this.formNuevoUsuario.value.nombre, this.formNuevoUsuario.value.correo, this.formNuevoUsuario.value.rol)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/usuarios'])
          console.log("Usuario Registrado correctamente")
      }, 
        err => {
          console.log(err)
      });

      
    }else{
      this.textError = 'Verifica tus datos'
      this.datosCorrectos = false
    }

    
  }


}
