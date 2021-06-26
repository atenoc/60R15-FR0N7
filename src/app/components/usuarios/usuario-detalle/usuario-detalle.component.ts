import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  id: string;
  usuario: Usuario;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log("id_usuario: " + this.id)
      this.usuarioService.getUsuario(this.id)   //volver a llamar los datos con el id recibido
        .subscribe(
          res => {
            this.usuario = res;
            console.log("res:" + res.nombre)
          },
          err => console.log("error: " + err)
        )
    });
  }

  actualizarUsuario(nombre: HTMLInputElement, correo: HTMLInputElement, rol: HTMLInputElement): boolean {

    //console.log("datos: "+this.producto._id, nombre.value, descripcion.value, telefono.value, direccion.value)

    this.usuarioService.updateUsuario(this.usuario._id, nombre.value, correo.value, rol.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/usuarios']);
      });

    return false;
  }

}
