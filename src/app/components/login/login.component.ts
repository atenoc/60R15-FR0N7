import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'login';
  user:firebase.User

  formLogin:FormGroup
  datosCorrectos:boolean = true
  textError:string =''

  constructor( private formB: FormBuilder, private afAuth: AngularFireAuth, 
      private spinner: NgxSpinnerService, private router: Router) { 
    
  }

  ngOnInit() {

    /*
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide() 
    }, 2000);
    */


    this.afAuth.user.subscribe((usuario)=>{
      this.user=usuario
      if(this.user){
        this.router.navigate(['/productos'])
      }else{
        console.log("¡Sin sesión!")
      }
    })

    console.log("validando formulaio")
    this.formLogin =  this.formB.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.required]
    })
 
  }

  ingresar(){

    if(this.formLogin.valid){
      this.spinner.show() //
      this.afAuth.auth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.password)
      .then((usuario)=>{
        //console.log("Ingresando, usuario: "+usuario.user.email)
        //console.log("El usuario es: " + JSON.stringify(usuario))
        this.formLogin.reset()
        this.spinner.hide() //
      }).catch((error)=>{
        this.datosCorrectos = false
        this.textError = "Correo o contraseña incorrectos"
        console.log("Error al autentificar: " + error)
        this.spinner.hide() //
      })

    }else{
      this.datosCorrectos = false
      this.textError = 'Verifica tus datos'
      console.log("Datos Incorrectos")
    }

  }

  login() {
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //this.afAuth.auth.signInWithEmailAndPassword('car.ateno@gmail.com','123456')
  }

  logout() {

    //this.afAuth.auth.signOut();

  }
/*
  resetPassword(){
    console.log("Reseteando Password")
    this.afAuth.auth.sendPasswordResetEmail("car.ateno@gmail.com")
    .then((respuesta)=>{
      console.log("Respuestas: "+ respuesta)
    }).catch((error)=>{
      console.log("Ocurrió un error: "+ error)
    })
       
  }
  */

  resetearPassword(correo: HTMLInputElement){
    console.log("Recuepando contraseña para: " + correo.value)
    this.afAuth.auth.sendPasswordResetEmail(correo.value)
    .then((respuesta)=>{
      console.log("Respuesta recuperar contraseña: "+ respuesta)
    }).catch((error)=>{
      console.log("Ocurrió un error al resetear correo: "+ error)
    })

    // Falta cerrar modal...

  }

}
