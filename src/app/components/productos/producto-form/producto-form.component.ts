import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { AngularFireAuth } from 'angularfire2/auth';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  file:File
  photoSelected: string | ArrayBuffer
  uid:string //id_usuario
  //tid:string //id_tienda

  constructor(private productoService: ProductoService, private router: Router,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
    /* Validando sesión */
    this.afAuth.user.subscribe((usuario)=>{
      if(usuario){
        this.uid=usuario.uid
      }
    })
  }

  fotoSeleccionada(event:HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      //vista previa
      const reader = new FileReader()
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  subirFoto(nombre: HTMLInputElement, descripcion: HTMLTextAreaElement, categoria: HTMLInputElement, precio: HTMLInputElement){
    
    this.productoService.createProducto(nombre.value, descripcion.value, categoria.value, precio.value, this.file, this.uid)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/productos'])
      }, 
        err => {
          console.log(err)
      });

    return false;
  }

}
