import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'angular-masterGym';
  user:firebase.User
  cargando:boolean = true

  constructor(public afAuth: AngularFireAuth)
  {
    /*
    this.afAuth.user.subscribe((usuario)=>{
      setTimeout(() => {
        this.cargando = false
        this.user=usuario
        if(this.user==null){
          console.log("Sin sesión...")
        }else{
          console.log("El usuario es: " + JSON.stringify(this.user))
        }
        
      }, 1000);

    })*/
  }

}
